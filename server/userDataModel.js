const mongoose = require("mongoose");

const userDataSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  purchases: {
    notes: [
      {
        type: Number, 
      },
    ],
    quizzes: [
      {
        type: Number, 
      },
    ],
    lectures: [
      {
        type: Number, 
      },
    ],
    lives: [
      {
        type: Number, 
      },
    ]
  },
  progress: {
    notes: [
      {
        type: Number,
      },
    ],
    quizzes: [
      {
        type: Number, 
      },
    ],
    lectures: [
      {
        type: Number, 
      },
    ],
  },
});

const userDataModel = mongoose.model("UserData", userDataSchema);

module.exports = userDataModel;
