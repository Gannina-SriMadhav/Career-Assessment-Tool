const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Student = require('../models/Student');
const Admin = require('../models/Admin');
const sendEmail = require('../utils/sendEmail');

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register a new student
// @route   POST /api/auth/student/register
// @access  Public
const registerStudent = async (req, res) => {
  const { name, email, password, age, education } = req.body;

  try {
    const studentExists = await Student.findOne({ email });
    if (studentExists) return res.status(400).json({ message: 'Student already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const student = await Student.create({
      name, email, password: hashedPassword, age, education
    });

    if (student) {
      res.status(201).json({ message: 'Registration successful. You can now log in.' });
    } else {
      res.status(400).json({ message: 'Invalid student data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};



// @desc    Auth student & get token
// @route   POST /api/auth/student/login
// @access  Public
const loginStudent = async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email });
    if (student && (await bcrypt.compare(password, student.password))) {
      res.json({
        _id: student._id,
        name: student.name,
        email: student.email,
        token: generateToken(student._id, 'student')
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Forgot Password
// @route   POST /api/auth/student/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
  try {
    const student = await Student.findOne({ email: req.body.email });
    if (!student) return res.status(404).json({ message: 'There is no user with that email address' });
    
    const resetToken = crypto.randomBytes(20).toString('hex');
    student.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    student.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 mins
    
    await student.save();
    
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5174'}/reset-password/${resetToken}`;
    const message = `You requested a password reset. Please go to this link to change your password: \n\n ${resetUrl} \n\n If you didn't request this, ignore this email.`;
    
    // Development fallback: Log the URL so it can be clicked even without SMTP config
    console.log('\n======================================================');
    console.log(' DEVELOPMENT MODE: PASSWORD RESET LINK GENERATED');
    console.log(' 👉 ' + resetUrl);
    console.log('======================================================\n');
    
    try {
      await sendEmail({
        email: student.email,
        subject: 'CareerTest - Password Reset Request',
        message
      });
      res.json({ message: 'Password reset email sent' });
    } catch (error) {
      student.resetPasswordToken = undefined;
      student.resetPasswordExpire = undefined;
      await student.save();
      return res.status(500).json({ message: 'Email could not be sent' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Reset Password
// @route   PUT /api/auth/student/reset-password/:token
// @access  Public
const resetPassword = async (req, res) => {
  try {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    
    const student = await Student.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });
    
    if (!student) return res.status(400).json({ message: 'Invalid or expired password reset token' });
    
    const salt = await bcrypt.genSalt(10);
    student.password = await bcrypt.hash(req.body.password, salt);
    student.resetPasswordToken = undefined;
    student.resetPasswordExpire = undefined;
    
    await student.save();
    
    res.json({ message: 'Password has been reset successfully. You can now log in with your new password.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Auth admin & get token
// @route   POST /api/auth/admin/login
// @access  Public
const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (admin && (await bcrypt.compare(password, admin.password))) {
      res.json({
        _id: admin._id,
        username: admin.username,
        token: generateToken(admin._id, 'admin')
      });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { registerStudent, loginStudent, forgotPassword, resetPassword, loginAdmin };
