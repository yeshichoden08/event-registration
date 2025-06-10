const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/authMiddleware');
const userController = require('../controller/userController');


router.get('/dashboard', isAuthenticated, userController.getDashboard);

router.get('/events', userController.getEventsPage);
router.get('/events/:id', userController.getEventById);


module.exports = router;