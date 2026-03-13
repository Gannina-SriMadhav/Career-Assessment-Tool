const express = require('express');
const router = express.Router();
const { getDashboard, getQuestions, submitAnswers } = require('../controllers/studentController');
const { protect } = require('../middleware/auth');

router.get('/dashboard', protect, getDashboard);
router.get('/tests/:type', protect, getQuestions);
router.post('/submit', protect, submitAnswers);

module.exports = router;
