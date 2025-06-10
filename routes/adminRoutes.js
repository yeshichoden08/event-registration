const express = require('express');
const router = express.Router();
const path = require('path');

const adminController = require('../controller/adminController');
const eventController = require('../controller/eventController');
const upload = require('../middleware/upload'); // 👈 import multer middleware

// Admin Dashboard Route
router.get('/dashboard', adminController.getAdminDashboard);

// Show all events
router.get('/events', eventController.showAllEvents);

// Show the form to add a new event
router.get('/events/new', eventController.showAddEventForm);

// Handle form submission to add a new event with image
router.post('/events', upload.single('image'), eventController.addEvent); // 👈 upload applied

// Show the form to edit an event
router.get('/events/:id/edit', eventController.showEditEventForm);

// Handle form submission to update an event with optional image upload
router.post('/events/:id/update', upload.single('image'), eventController.updateEvent); // 👈 upload applied

// Handle event deletion
router.post('/events/:id/delete', eventController.deleteEvent);

module.exports = router;
