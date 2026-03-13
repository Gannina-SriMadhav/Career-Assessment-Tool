const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');
const connectDB = require('./config/db');

dotenv.config();

const seedAdmin = async () => {
  await connectDB();
  const exists = await Admin.findOne({ username: 'admin' });
  if (!exists) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    await Admin.create({ username: 'admin', password: hashedPassword });
    console.log('Admin user created: admin / admin123');
  } else {
    console.log('Admin already exists');
  }
  process.exit();
};

seedAdmin();
