const Notes = require('./notesModel');
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/Ipmat', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Database connected successfully'))
.catch(err => console.error('Database connection error:', err));


const sampleData = [{
  id: 1,
  title: 'SDF Notes',
  link: '/sdfT3.pdf',
  numberOfPages: 2
},{
    id: 2,
    title: 'Demo Notes',
    link: '/demo.pdf',
    numberOfPages: 1


}];
const insertSampleData = async () => {
    try {
        await Notes.insertMany(sampleData);
        console.log('Sample data inserted successfully');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error inserting sample data:', error);
        mongoose.connection.close();
    }
};

insertSampleData();