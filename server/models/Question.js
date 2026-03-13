const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  type: { type: String, enum: ['Aptitude', 'Personality', 'Interest'], required: true },
  options: [{
    text: { type: String, required: true },
    score: { type: Number, required: true }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);
