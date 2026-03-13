const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Question = require('./models/Question');
const connectDB = require('./config/db');

dotenv.config();

const seedQuestions = async () => {
  await connectDB();
  
  const sampleQuestions = [
    {
      question: "Which of these activities sounds most appealing to you?",
      type: "Interest",
      options: [
        { text: "Fixing a broken machine / hands-on tools", score: 10 },
        { text: "Writing a creative story or designing", score: 15 },
        { text: "Organizing an event and managing people", score: 8 },
        { text: "Analyzing numbers and financial data", score: 12 }
      ]
    },
    {
      question: "How do you prefer to solve a difficult problem?",
      type: "Personality",
      options: [
        { text: "By talking it through with others", score: 12 },
        { text: "By researching and analyzing data quietly", score: 15 },
        { text: "By trusting my intuition and feelings", score: 8 },
        { text: "By taking immediate action and adjusting", score: 10 }
      ]
    },
    {
      question: "If a train travels at 60 mph, how far will it travel in 2.5 hours?",
      type: "Aptitude",
      options: [
        { text: "120 miles", score: 0 },
        { text: "150 miles", score: 15 },
        { text: "180 miles", score: 0 },
        { text: "60.5 miles", score: 0 }
      ]
    },
    {
      question: "Find the odd one out: Paris, London, Tokyo, New York",
      type: "Aptitude",
      options: [
        { text: "Paris", score: 0 },
        { text: "London", score: 0 },
        { text: "Tokyo", score: 0 },
        { text: "New York", score: 10 } // New York is not a capital
      ]
    }
  ];

  try {
    const count = await Question.countDocuments();
    if (count === 0) {
      await Question.insertMany(sampleQuestions);
      console.log('Sample questions inserted successfully!');
    } else {
      console.log(`There are already ${count} questions in the database.`);
    }
  } catch (error) {
    console.error('Error seeding questions:', error);
  } finally {
    process.exit();
  }
};

seedQuestions();
