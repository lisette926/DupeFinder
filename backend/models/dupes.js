const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dupePerfumes = new Schema({
  name: String,
//   top_notes: Array,
//   middle_notes: Array,
//   bottom_notes: Array,
  image: String,
   
});

module.exports = mongoose.model('DupeData', dupePerfumes);