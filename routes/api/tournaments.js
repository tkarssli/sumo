const express = require("express");
const passport = require('passport');
const cheerio = require("cheerio");
const axios = require("axios");

const router = express.Router();

const Tournament = require('../../models/Tournament');

router.get('/', (req, res) => {
  // router.get('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {

  Tournament.where('running', true).exec().then(t=>{
    const tournament = t[0];
    Tournament
      .populate(tournament, {path: "wrestlers.wrestler", model: "wrestlers", select: "-image"})
      .then( () => {

        res.json(tournament)
      })
  })
    
})



router.get("/test", (req, res) => res.json({
  msg: "This is the wrestlers route"
}));

module.exports = router;