const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  aptitudeScore: { type: Number, default: 0 },
  personalityScore: { type: Number, default: 0 },
  interestScore: { type: Number, default: 0 },
  suggestedCareer: { type: String, default: 'Pending...' },
  completedCategories: { type: [String], default: [] },
  isComplete: { type: Boolean, default: false },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Result', resultSchema);
