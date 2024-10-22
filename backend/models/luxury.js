const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const luxuryPerfumes = new Schema({
  name: String,
  top_notes: Array,
  middle_notes: Array,
  bottom_notes: Array,
  image: String,
  dupes: Array
   
});

module.exports = mongoose.model('LuxuryData', luxuryPerfumes);