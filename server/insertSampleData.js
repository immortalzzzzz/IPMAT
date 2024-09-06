const mongoose = require('mongoose');
const Quiz = require('./quizModel'); 

mongoose.connect('mongodb://localhost:27017/Ipmat', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Database connected successfully'))
.catch(err => console.error('Database connection error:', err));

const sampleData = [{
    id: 3,
    title: "Quiz 3",
    data: {
        questions: [
            {
                quesno: 1,
                ques: 'What is the capital of Japan?',
                options: ['Tokyo', 'Beijing', 'Seoul', 'Bangkok'],
                typeques: 'text',
                typeoptions: 'text'
            },
            {
                quesno: 2,
                ques: 'Who painted the Starry Night?',
                options: ['Leonardo da Vinci', 'Pablo Picasso', 'Vincent van Gogh', 'Claude Monet'],
                typeques: 'text',
                typeoptions: 'text'
            },
            {
                quesno: 3,
                ques: 'What is the chemical symbol for carbon?',
                options: ['C', 'Ca', 'Co', 'Cr'],
                typeques: 'text',
                typeoptions: 'text'
            },
            {
                quesno: 4,
                ques: 'Which is the largest bone in the human body?',
                options: ['Femur', 'Tibia', 'Humerus', 'Radius'],
                typeques: 'text',
                typeoptions: 'text'
            },
            {
                quesno: 5,
                ques: 'Who wrote "Pride and Prejudice"?',
                options: ['Jane Austen', 'Charles Dickens', 'Emily Bronte', 'Charlotte Bronte'],
                typeques: 'text',
                typeoptions: 'text'
            },
            {
                quesno: 6,
                ques: 'What is the chemical symbol for iron?',
                options: ['Fe', 'Au', 'Ag', 'Cu'],
                typeques: 'text',
                typeoptions: 'text'
            },
            {
                quesno: 7,
                ques: 'Who discovered the theory of relativity?',
                options: ['Albert Einstein', 'Isaac Newton', 'Stephen Hawking', 'Niels Bohr'],
                typeques: 'text',
                typeoptions: 'text'
            },
            {
                quesno: 8,
                ques: 'Which is the smallest bone in the human body?',
                options: ['Stapes', 'Cochlea', 'Malleus', 'Incus'],
                typeques: 'text',
                typeoptions: 'text'
            },
            {
                quesno: 9,
                ques: 'Who directed the movie "The Shawshank Redemption"?',
                options: ['Frank Darabont', 'Quentin Tarantino', 'Steven Spielberg', 'Martin Scorsese'],
                typeques: 'text',
                typeoptions: 'text'
            },
            {
                quesno: 10,
                ques: 'What is the chemical symbol for potassium?',
                options: ['K', 'P', 'Pt', 'Po'],
                typeques: 'text',
                typeoptions: 'text'
            }
        ],
        answers: [0, 2, 0, 0, 0, 0, 0, 0, 0, 0] // Answers for Quiz 3
    }
},
{
    id: 4,
    title: "Quiz 4",
    data: {
        questions: [
            {
                quesno: 1,
                ques: 'What is the capital of Australia?',
                options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'],
                typeques: 'text',
                typeoptions: 'text'
            },
            {
                quesno: 2,
                ques: 'Who invented the telephone?',
                options: ['Thomas Edison', 'Alexander Graham Bell', 'Albert Einstein', 'Nikola Tesla'],
                typeques: 'text',
                typeoptions: 'text'
            },
            {
                quesno: 3,
                ques: 'What is the chemical symbol for sodium?',
                options: ['Na', 'Ne', 'Ni', 'Nb'],
                typeques: 'text',
                typeoptions: 'text'
            },
            {
                quesno: 4,
                ques: 'Which is the longest river in the world?',
                options: ['Amazon', 'Nile', 'Mississippi', 'Yangtze'],
                typeques: 'text',
                typeoptions: 'text'
            },
            {
                quesno: 5,
                ques: 'Who wrote "The Great Gatsby"?',
                options: ['F. Scott Fitzgerald', 'Ernest Hemingway', 'John Steinbeck', 'J.D. Salinger'],
                typeques: 'text',
                typeoptions: 'text'
            },
            {
                quesno: 6,
                ques: 'What is the chemical symbol for silver?',
                options: ['Ag', 'Au', 'Fe', 'Cu'],
                typeques: 'text',
                typeoptions: 'text'
            },
            {
                quesno: 7,
                ques: 'Who discovered penicillin?',
                options: ['Alexander Fleming', 'Louis Pasteur', 'Marie Curie', 'Robert Koch'],
                typeques: 'text',
                typeoptions: 'text'
            },
            {
                quesno: 8,
                ques: 'Which is the hardest natural substance on Earth?',
                options: ['Diamond', 'Graphite', 'Quartz', 'Talc'],
                typeques: 'text',
                typeoptions: 'text'
            },
            {
                quesno: 9,
                ques: 'Who painted the Last Supper?',
                options: ['Leonardo da Vinci', 'Pablo Picasso', 'Vincent van Gogh', 'Michelangelo'],
                typeques: 'text',
                typeoptions: 'text'
            },
            {
                quesno: 10,
                ques: 'What is the chemical symbol for calcium?',
                options: ['Ca', 'C', 'Co', 'Cr'],
                typeques: 'text',
                typeoptions: 'text'
            }
        ],
        answers: [2, 1, 0, 0, 0, 0, 0, 0, 0, 0] // Answers for Quiz 4
    }
},{
                id: 5,
                title: "JEE Quiz 1",
                data: {
                    questions: [
                        {
                            quesno: 1,
                            ques: 'What is the atomic number of carbon?',
                            options: ['5', '6', '7', '8'],
                            typeques: 'text',
                            typeoptions: 'text'
                        },
                        {
                            quesno: 2,
                            ques: 'What is the chemical formula of ammonia?',
                            options: ['NH3', 'H2O', 'CO2', 'CH4'],
                            typeques: 'text',
                            typeoptions: 'text'
                        },
                        {
                            quesno: 3,
                            ques: 'Which is the lightest gas?',
                            options: ['Hydrogen', 'Nitrogen', 'Oxygen', 'Helium'],
                            typeques: 'text',
                            typeoptions: 'text'
                        },
                        {
                            quesno: 4,
                            ques: 'Which metal is used for galvanizing iron?',
                            options: ['Zinc', 'Copper', 'Aluminum', 'Lead'],
                            typeques: 'text',
                            typeoptions: 'text'
                        },
                        {
                            quesno: 5,
                            ques: 'What is the SI unit of pressure?',
                            options: ['Pascal', 'Newton', 'Joule', 'Watt'],
                            typeques: 'text',
                            typeoptions: 'text'
                        },
                        {
                            quesno: 6,
                            ques: 'What is the chemical formula of limestone?',
                            options: ['CaCO3', 'NaCl', 'H2SO4', 'HCl'],
                            typeques: 'text',
                            typeoptions: 'text'
                        },
                        {
                            quesno: 7,
                            ques: 'Which gas is responsible for the greenhouse effect?',
                            options: ['Carbon Dioxide', 'Oxygen', 'Nitrogen', 'Methane'],
                            typeques: 'text',
                            typeoptions: 'text'
                        },
                        {
                            quesno: 8,
                            ques: 'What is the unit of electrical resistance?',
                            options: ['Ohm', 'Watt', 'Volt', 'Ampere'],
                            typeques: 'text',
                            typeoptions: 'text'
                        },
                        {
                            quesno: 9,
                            ques: 'Which acid is present in lemon?',
                            options: ['Citric Acid', 'Acetic Acid', 'Sulfuric Acid', 'Hydrochloric Acid'],
                            typeques: 'text',
                            typeoptions: 'text'
                        },
                        {
                            quesno: 10,
                            ques: 'What is the chemical formula of sugar?',
                            options: ['C6H12O6', 'NaCl', 'H2SO4', 'HCl'],
                            typeques: 'text',
                            typeoptions: 'text'
                        }
                    ],
                    answers: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0] // Answers for JEE Quiz 1
                }
            },
            {
                id: 6,
                title: "JEE Quiz 2",
                data: {
                    questions: [
                        {
                            quesno: 1,
                            ques: 'What is the chemical name of baking soda?',
                            options: ['Sodium Bicarbonate', 'Calcium Carbonate', 'Sodium Carbonate', 'Potassium Permanganate'],
                            typeques: 'text',
                            typeoptions: 'text'
                        },
                        {
                            quesno: 2,
                            ques: 'Which metal is extracted by the electrolysis of alumina?',
                            options: ['Aluminum', 'Iron', 'Copper', 'Zinc'],
                            typeques: 'text',
                            typeoptions: 'text'
                        },
                        {
                            quesno: 3,
                            ques: 'What is the chemical formula of common salt?',
                            options: ['NaCl', 'CaCl2', 'MgCl2', 'KCl'],
                            typeques: 'text',
                            typeoptions: 'text'
                        },
                        {
                            quesno: 4,
                            ques: 'Which gas is liberated during photosynthesis?',
                            options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'],
                            typeques: 'text',
                            typeoptions: 'text'
                        },
                        {
                            quesno: 5,
                            ques: 'Which is the heaviest gas?',
                            options: ['Radon', 'Argon', 'Krypton', 'Xenon'],
                            typeques: 'text',
                            typeoptions: 'text'
                        },
                        {
                            quesno: 6,
                            ques: 'What is the chemical formula of rust?',
                            options: ['Fe2O3', 'FeCl3', 'FeSO4', 'Fe(OH)3'],
                            typeques: 'text',
                            typeoptions: 'text'
                        },
                        {
                            quesno: 7,
                            ques: 'Which metal is found in liquid state at room temperature?',
                            options: ['Mercury', 'Gallium', 'Bismuth', 'Cesium'],
                            typeques: 'text',
                            typeoptions: 'text'
                        },
                        {
                            quesno: 8,
                            ques: 'What is the unit of electric charge?',
                            options: ['Coulomb', 'Ampere', 'Ohm', 'Volt'],
                            typeques: 'text',
                            typeoptions: 'text'
                        },
                        {
                            quesno: 9,
                            ques: 'What is the chemical formula of vinegar?',
                            options: ['CH3COOH', 'HCl', 'H2SO4', 'NaOH'],
                            typeques: 'text',
                            typeoptions: 'text'
                        },
                        {
                            quesno: 10,
                            ques: 'Which metal is known as quicksilver?',
                            options: ['Mercury', 'Lead', 'Tin', 'Zinc'],
                            typeques: 'text',
                            typeoptions: 'text'
                        }
                    ],
                    answers: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // Answers for JEE Quiz 2
                }
            }
        ];
const insertSampleData = async () => {
    try {
        await Quiz.insertMany(sampleData);
        console.log('Sample data inserted successfully');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error inserting sample data:', error);
        mongoose.connection.close();
    }
};

insertSampleData();
