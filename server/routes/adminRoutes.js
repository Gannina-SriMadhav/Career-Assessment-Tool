const express = require('express');
const router = express.Router();
const { getDashboardMetrics, getStudents, deleteStudent, getAdminQuestions, addQuestion, deleteQuestion } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/auth');

router.get('/dashboard', protect, admin, getDashboardMetrics);
router.get('/students', protect, admin, getStudents);
router.delete('/students/:id', protect, admin, deleteStudent);
router.get('/questions', protect, admin, getAdminQuestions);
router.post('/questions', protect, admin, addQuestion);
router.delete('/questions/:id', protect, admin, deleteQuestion);

module.exports = router;
