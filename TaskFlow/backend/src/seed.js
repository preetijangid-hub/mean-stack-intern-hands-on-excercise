// Creates a demo account with sample tasks so the dashboard has data to show.
// Run with: npm run seed
require('dotenv').config();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User');
const Task = require('./models/Task');

const DEMO_EMAIL = 'demo@taskflow.com';
const DEMO_PASSWORD = 'Demo@123';

const sampleTasks = [
  { title: 'Design login page', description: 'Create wireframes for the login screen', priority: 'High', status: 'Completed' },
  { title: 'Set up MongoDB Atlas', description: 'Create cluster and connect backend', priority: 'High', status: 'Completed' },
  { title: 'Build task list UI', description: 'Add search and filters to the task list page', priority: 'Medium', status: 'In Progress' },
  { title: 'Write backend tests', description: 'Cover auth and task API happy/error paths', priority: 'Medium', status: 'In Progress' },
  { title: 'Deploy to Render', description: 'Deploy backend and frontend services', priority: 'High', status: 'Pending' },
  { title: 'Add dark mode', description: 'Nice-to-have UI improvement', priority: 'Low', status: 'Pending' },
];

const seed = async () => {
  await connectDB();

  let demoUser = await User.findOne({ email: DEMO_EMAIL });

  if (!demoUser) {
    const hashedPassword = await bcrypt.hash(DEMO_PASSWORD, 10);
    demoUser = await User.create({
      name: 'Demo User',
      email: DEMO_EMAIL,
      password: hashedPassword,
    });
    console.log('Demo user created:', DEMO_EMAIL);
  } else {
    console.log('Demo user already exists:', DEMO_EMAIL);
  }

  await Task.deleteMany({ user: demoUser._id });

  const tasksToInsert = sampleTasks.map((task, index) => ({
    ...task,
    user: demoUser._id,
    dueDate: new Date(Date.now() + (index + 1) * 2 * 24 * 60 * 60 * 1000),
  }));

  await Task.insertMany(tasksToInsert);
  console.log(`Inserted ${tasksToInsert.length} sample tasks`);

  console.log('\nDemo login credentials:');
  console.log('Email:', DEMO_EMAIL);
  console.log('Password:', DEMO_PASSWORD);

  await mongoose.disconnect();
  process.exit(0);
};

seed().catch((error) => {
  console.error('Seeding failed:', error.message);
  process.exit(1);
});
