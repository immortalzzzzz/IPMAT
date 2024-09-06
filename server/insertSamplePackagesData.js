const mongoose = require('mongoose');
const Package = require('./packagesDataModel'); // Adjust the path as necessary

mongoose.connect('mongodb://localhost:27017/Ipmat', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log('MongoDB connected');

    const samplePackages = [
        {
            id:1,
            title: 'Basic Package',
            description: 'This is a basic package including quizzes, notes, and lectures.',
            imageLink: 'https://via.placeholder.com/300',
            cost: 500,
            quizIds: [1, 2, 3],
            notesIds: [1, 2],
            lectureIds: [1]
        },
        {
            id:2,
            title: 'Standard Package',
            description: 'This is a standard package including more quizzes, notes, and lectures.',
            imageLink: 'https://via.placeholder.com/300',
            cost: 1000,
            quizIds: [4, 5, 6],
            notesIds: [3, 4],
            lectureIds: [2, 3]
        },
        {
            id:3,
            title: 'Premium Package',
            description: 'This is a premium package with extensive content.',
            imageLink: 'https://via.placeholder.com/300',
            cost: 1500,
            quizIds: [7, 8, 9],
            notesIds: [5, 6],
            lectureIds: [4, 5, 6]
        },
        {
            id:4,
            title: 'Ultimate Package',
            description: 'This package includes all available content.',
            imageLink: 'https://via.placeholder.com/300',
            cost: 2000,
            quizIds: [10, 11, 12],
            notesIds: [7, 8, 9],
            lectureIds: [7, 8, 9]
        }
    ];

    try {
        await Package.insertMany(samplePackages);
        console.log('Sample packages inserted successfully');
    } catch (error) {
        console.error('Error inserting sample packages:', error);
    } finally {
        mongoose.connection.close();
    }
}).catch(error => {
    console.error('MongoDB connection error:', error);
});
