const Student = require('../models/Student');
const Result = require('../models/Result');
const Question = require('../models/Question');

// @desc    Get admin dashboard metrics
// @route   GET /api/admin/dashboard
// @access  Private/Admin
const getDashboardMetrics = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalTests = await Result.countDocuments();
    res.json({ totalStudents, totalTests });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all students
// @route   GET /api/admin/students
// @access  Private/Admin
const getStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('tests');
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete student
// @route   DELETE /api/admin/students/:id
// @access  Private/Admin
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    await Result.deleteMany({ studentId: student._id });
    await student.deleteOne();
    res.json({ message: 'Student removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all questions
// @route   GET /api/admin/questions
// @access  Private/Admin
const getAdminQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add a question
// @route   POST /api/admin/questions
// @access  Private/Admin
const addQuestion = async (req, res) => {
  const { question, type, options } = req.body;
  try {
    const newQuestion = await Question.create({ question, type, options });
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a question
// @route   DELETE /api/admin/questions/:id
// @access  Private/Admin
const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: 'Question not found' });
    await question.deleteOne();
    res.json({ message: 'Question removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { 
  getDashboardMetrics, getStudents, deleteStudent, getAdminQuestions, addQuestion, deleteQuestion 
};
