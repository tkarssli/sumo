const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const TournamentSchema = new Schema({
  running: Boolean,
  month: {
    type: Number,
    required: true
  },
  webId: {
    type: Number,
    required: true
  },
  wrestlers: [{
    wrestler:{ 
      type: Schema.Types.ObjectId, 
      ref: "Wrestler" 
    },
    score: Number,
    _id: false
  }],
  days: [{
    day: Number,
    fights: [{ 
      wrestlers: [{type: Schema.Types.ObjectId, ref: "wrestlers"}],
      east: {
        type: Schema.Types.ObjectId,
        ref: "wrestlers"
      },
      west: {
        type: Schema.Types.ObjectId,
        ref: "wrestlers"
      },
      winner: {
        type: Schema.Types.ObjectId,
        ref: "wrestlers"
      }
    }]
  }]
})

module.exports = Tournament = mongoose.model('tournaments', TournamentSchema)