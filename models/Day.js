const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const DaySchema = new Schema({
  month: {
    type: Number
  },
  days: [{ type: Schema.Types.ObjectId, ref: 'days'}]
})

module.exports = Tournament = mongoose.model('tournaments', DaySchema)