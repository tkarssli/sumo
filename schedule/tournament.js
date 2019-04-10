const schedule = require('node-schedule');
const axios = require('axios');

const Tournament = require('../models/Tournament');


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
axios.get(`http://www.sumo.or.jp/EnHonbashoMain/torikumi/1/${day}/`)
.then(response => {
  Tournament.findOne({webId: parseInt(json.basho_id)})
  .then(tournament => {
    if(tournament){

    } else {
      
    }
  })
})

getAllTournyDays(1);

const getAllTournyDays = (day) => {
  if(day > 15) return;
  
  const json = response.data;
  Tournament.findOne({webId: parseInt(json.basho_id)})
  .then(tournament => {
  })
}