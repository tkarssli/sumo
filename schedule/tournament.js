const schedule = require('node-schedule');
const axios = require('axios');

const Tournament = require('../models/Tournament');
const Wrestler = require('../models/Wrestler');


// *    *    *    *    *    *
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    │
// │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
// │    │    │    │    └───── month (1 - 12)
// │    │    │    └────────── day of month (1 - 31)
// │    │    └─────────────── hour (0 - 23)
// │    └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)


const day = 1
module.exports = () => {
axios.get(`http://www.sumo.or.jp/EnHonbashoMain/torikumi_ajax/1/1/`)
  .then(response => {
    const json = response.data;
    checkIfTournamentExists(json)
    .then(tournament =>{
      Tournament.populate(tournament, {path: "wrestlers.wrestler", model: "wrestlers", select: "-image"}, () => {
        let day = tournament.days.length + 1;
        axios.get(`http://www.sumo.or.jp/EnHonbashoMain/torikumi_ajax/1/${day}/`)
        .then( response =>  {
          if(response.data.TorikumiData !== undefined && response.data.TorikumiData.length > 1){
            getTournyDay(tournament, day, response.data)
          }
        })
      })
    })
  })
}
// getAllTournyDays(1, json);

const checkIfTournamentExists = (json) => {
  return Tournament.findOne({webId: parseInt(json.basho_id)})
    .then(tournament => {

      // Check if tournament created
      if(!tournament){
        let date = new Date(json.dayHead.replace(/&nbsp;/g, ' ').split(/Day\s.([^\n\r]*)/)[1]);
        let newTournament = new Tournament({
          month: date.getMonth(),
          webId: parseInt(json.basho_id),
          wrestlers:[],
          days:[]
        })

        // Create objects of wrestlers with webIds
        let wrestlers = [];
        json.TorikumiData.forEach((match, index) => {
          let eastWebId = match.east.rikishi_id
          let westWebId = match.west.rikishi_id
          wrestlers.push({ wrestler: eastWebId, score: 0},{ wrestler: westWebId, score: 0})
        });

        // Convert webIds into database wrestler document ids
        let requests = [];
        wrestlers.forEach(w => {
          requests.push(axios.get(`http://localhost:5000/api/wrestlers/${w.wrestler}`))
        })

        return Promise.all(requests).then(responses => {
          responses.forEach(response => {
            const i = wrestlers.findIndex((el) => parseInt(el.wrestler) === response.data.wrestler.webId)
            wrestlers[i].wrestler = response.data.wrestler._id
        })

          newTournament.wrestlers = wrestlers;
          newTournament.save();
          return newTournament;
        })
      } else {
        return tournament
      }
    })
}


const getTournyDay = async (tournament, day, json) => {
  if(json.TorikumiData.length === 0) return;
  const asyncs = [];

  tournament.days.push({
    day: day,
    fights: []
  });
  json.TorikumiData.forEach((fight, i) => {
    const fightObj = {
      wrestlers: []
    }
    const eastIndex = getWrestlerIndexInTournament(tournament, parseInt(fight.east.rikishi_id));
    const westIndex = getWrestlerIndexInTournament(tournament, parseInt(fight.west.rikishi_id));
    
    let promise;
    if ( eastIndex >= 0) {
      fightObj.east = tournament.wrestlers[eastIndex].wrestler._id;
      if(fight.judge === "1"){
        tournament.wrestlers[eastIndex].score++;
        fightObj.winner =  fightObj.east;
      }
      fightObj.wrestlers.push(fightObj.east)
    } else {
      promise = axios.get(`http://localhost:5000/api/wrestlers/${fight.east.rikishi_id}`)
        .then( w => {
          fightObj.east = w.data.wrestler._id
          if(fight.judge === "1"){
            fightObj.winner =  fightObj.east;
          }
          fightObj.wrestlers.push(fightObj.east)
        })
      asyncs.push(promise)
    }
      
      
    if ( westIndex >= 0) {
      fightObj.west = tournament.wrestlers[westIndex].wrestler._id;
      if(fight.judge === "2"){
        tournament.wrestlers[westIndex].score++;
        fightObj.winner =  fightObj.west;
      }
      fightObj.wrestlers.push(fightObj.west)
    } else {
      promise = axios.get(`http://localhost:5000/api/wrestlers/${fight.west.rikishi_id}`)
        .then( w => {
          fightObj.west = w.data.wrestler._id
          if(fight.judge === "2"){
            fightObj.winner =  fightObj.west;
          }
          fightObj.wrestlers.push(fightObj.west)
        })
      asyncs.push(promise)
    }

    Promise.all(asyncs).then( () => { 
      tournament.days[day-1].fights.push(fightObj)
    })
  })
  Promise.all(asyncs).then( () => {
    tournament.save()})
}

const getWrestlerIndexInTournament = (tournament, webId) => {
  let index;
  index = tournament.wrestlers.findIndex( el => el.wrestler.webId === webId);
  return index;
}