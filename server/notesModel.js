const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  type: {type:String, required:true},
  title: { type: String, required: true },
  link: { type: String, required: true },
  numberOfPages: { type: Number, required: true }
});

module.exports = mongoose.model('Notes', notesSchema);