const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    id:{
        type: Number,
        required:true,
        unique:true
    },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageLink: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  quizIds: [{
    type: Number
  }],
  notesIds: [{
    type: Number
  }],
  lectureIds: [{
    type: Number
  }]
});

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;
