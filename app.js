const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
require('dotenv').config();

// Import DB setup functions
const { createUserTable } = require('./models/userModel');
const { createEventTable } = require('./models/eventModel');

const app = express();
const PORT = process.env.PORT || 3333;
const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

// Use these to check admin login credentials or for seeding admin user


// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET || 'secretkey',
  resave: false,
  saveUninitialized: true,
}));

app.use('/eventuploads', express.static(path.join(__dirname, 'public/eventuploads')));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Import Routes (before using them!)
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');

// Routes
app.use('/', authRoutes);
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);

// Async IIFE to initialize DB schema and start server
(async () => {
  try {
    await createUserTable();
    await createEventTable();

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to initialize database schema:', err);
    process.exit(1); // Exit with failure code if DB setup fails
  }
})();
