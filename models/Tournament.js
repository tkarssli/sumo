const mongoose = require('mongoose')
const Schema   = mongoose.Schema
const Day = require('./Day')

const TournamentSchema = new Schema({
  month: {
    type: Number
  },
  days: [{ type: Schema.Types.ObjectId, ref: 'days'}]
})

// TournamentSchema.virtual('needsUpdate').get(function() {
// })

module.exports = Tournament = mongoose.model('tournaments', TournamentSchema)