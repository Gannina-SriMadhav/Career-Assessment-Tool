const express = require('express');
const router = express.Router();
const { 
  registerStudent, 
  loginStudent, 
  forgotPassword,
  resetPassword,
  loginAdmin 
} = require('../controllers/authController');

router.post('/student/register', registerStudent);
router.post('/student/login', loginStudent);
router.post('/student/forgot-password', forgotPassword);
router.put('/student/reset-password/:token', resetPassword);
router.post('/admin/login', loginAdmin);

module.exports = router;
