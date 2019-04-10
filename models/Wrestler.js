const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const WrestlerSchema = new Schema({
  webId: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  stable: {
    type: String
  },
  ringName: {
    type: String
  },
  rank: {
    type: String 
  },
  dob: {
    type: Date
  },
  pob: {
    type: String
  },
  height: {
    type: Number
  },
  weight: {
    type: Number
  },
  image: {
    data: String, 
    contentType: String
  }
})

module.exports = Wrestler = mongoose.model('wrestlers', WrestlerSchema);