const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    quesno: Number,
    ques: String,
    options: [String],
    typeques: String,
    typeoptions: String
});

const quizSchema = new mongoose.Schema({
    id: Number,
    title:String,
    type: String,
    data: {
        questions: [questionSchema],
        answers: [Number]
    }
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
