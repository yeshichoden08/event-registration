// controllers/adminController.js
const db = require('../config/db');

// Show admin dashboard
exports.getAdminDashboard = async (req, res) => {
  try {
    // Example: fetch recent activity or events
    const recentEvents = await db.any('SELECT * FROM events ORDER BY date DESC LIMIT 5');

    res.render('admin/admindashboard', { recentEvents }); // create this view
  } catch (error) {
    console.error('Error loading dashboard:', error);
    res.status(500).send('Failed to load dashboard');
  }
};
