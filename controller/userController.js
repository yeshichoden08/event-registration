const db = require('../config/db');


exports.getDashboard = (req, res) => {
  res.render('user/dashboard', { message: null });
};

//Events
exports.getEventsPage = async (req, res) => {
  try {
    const events = await db.any('SELECT * FROM events ORDER BY date ASC');
    res.render('user/events', { events });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).send('Failed to load events');
  }
};

exports.getEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await db.oneOrNone('SELECT * FROM events WHERE id = $1', [id]);
    if (!event) return res.status(404).send('Event not found');
    res.render('event-detail', { event }); // Create this view if needed
  } catch (error) {
    console.error('Error fetching event by ID:', error);
    res.status(500).send('Failed to load event');
  }
};

