const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const LeagueSchema = new Schema({
  players: [{ 
    playerId: { type: Schema.Types.ObjectId, ref: 'users'},
    wrestlers: [{type: Schema.Types.ObjectId, ref: 'wrestlers'}],
    owner: Boolean
  }]
})

module.exports = Tournament = mongoose.model('leagues', LeagueSchema)