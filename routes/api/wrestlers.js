const express = require("express");
const passport = require('passport');
const cheerio = require("cheerio");
const axios = require("axios")

const router = express.Router();

const Wrestler = require('../../models/Wrestler');

router.get('/:id', (req, res) => {
  // router.get('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {

  Wrestler.findOne({webId: req.params.id})
    .then(wrestler => {
      if(wrestler){
        return res.json({ wrestler })

      } else {
        // Get Wrestler HTML
        axios.get(`http://www.sumo.or.jp/EnSumoDataRikishi/profile/${req.params.id}`)
        .then(response => {
          const $ = cheerio.load(response.data);
          const rows = $('.mdTable2 tbody').children("tr")
          const image = $('#mainContent > div:nth-child(3) img')
          
          //Get image data
          axios.get(`http://www.sumo.or.jp${image.attr('src')}`)
            .then( response => {
              const buffer = Buffer.alloc(response.data.length, response.data, 'binary').toString('base64')
              const wrestler = new Wrestler({
                webId: req.params.id,
                name: $(rows[2]).children('td').text().trim(),
                stable: $(rows[1]).children('td').text().trim(),
                ringName: $(rows[3]).children('td').text().trim(),
                rank: $(rows[4]).children('td').text().trim(),
                dob: new Date($(rows[5]).children('td').text().trim()),
                pob: $(rows[6]).children('td').text().trim(),
                height: parseFloat($(rows[7]).children('td').text().trim()),
                weight: parseFloat($(rows[8]).children('td').text().trim()),
                image: {
                  data: buffer,
                  contentType: 'image/jpg'
                }
            
              })
              wrestler.save()
                .then(wrestler => {
                  res.json(wrestler)
                })
                .catch(err => console.log(err))
            })
        })
        .catch(err => console.log(err));
      }
    })
})



router.get("/test", (req, res) => res.json({
  msg: "This is the wrestlers route"
}));

module.exports = router;