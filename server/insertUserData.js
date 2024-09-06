const userData = require('./userDataModel');
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/Ipmat', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Database connected successfully'))
.catch(err => console.error('Database connection error:', err));


const sampleData = [
    {
        email: "bro@gmail.com",
        name: "Bro",
        purchases: {
          notes: [2], // Sample data for purchases
          quizzes: [2,3], // Sample data for purchases
          lectures: [1,2,3], // Sample data for purchases
        },
        progress: {
          notes: [1, 2], // Sample data for progress
          quizzes: [3, 4], // Sample data for progress
          lectures: [1, 2], // Sample data for progress
        }
      },    {
        email: "abc@gmail.com",
        name: "Hello World",
        purchases: {
          notes: [1], // Sample data for purchases
          quizzes: [1,2], // Sample data for purchases
          lectures: [1,2,3], // Sample data for purchases
        },
        progress: {
          notes: [1, 2], // Sample data for progress
          quizzes: [3, 4], // Sample data for progress
          lectures: [1, 2], // Sample data for progress
        }
      }


];
const insertSampleData = async () => {
    try {
        await userData.insertMany(sampleData);
        console.log('Sample data inserted successfully');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error inserting sample data:', error);
        mongoose.connection.close();
    }
};

insertSampleData();