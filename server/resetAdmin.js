const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');
const connectDB = require('./config/db');

dotenv.config();

const resetAdmin = async () => {
  await connectDB();
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('admin123', salt);
  await Admin.findOneAndUpdate({ username: 'admin' }, { password: hashedPassword }, { upsert: true, new: true });
  console.log('Admin password forcefully reset to admin123');
  process.exit();
};

resetAdmin();
