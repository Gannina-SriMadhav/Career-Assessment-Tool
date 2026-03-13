const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  education: { type: String, required: true },
  tests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Result' }],
  resetPasswordToken: String,
  resetPasswordExpire: Date
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
