const db = require('../config/db');
const path = require('path');

// GET: Show form to add event
exports.showAddEventForm = (req, res) => {
  res.render('admin-add-event');
};

// GET: Show all events
exports.showAllEvents = async (req, res) => {
  try {
    const events = await db.any('SELECT * FROM events ORDER BY date ASC');
    res.render('admin/events', { events });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).send('Failed to fetch events');
  }
};

// POST: Add new event with image upload
exports.addEvent = async (req, res) => {
  const { title, description, date } = req.body;
  const event_url = req.file ? `/eventuploads/${req.file.filename}` : null;

  try {
    await db.none(
      'INSERT INTO events (title, description, date, event_url) VALUES ($1, $2, $3, $4)',
      [title, description, date, event_url]
    );
    res.redirect('/admin/events');
  } catch (error) {
    console.error('Error adding event:', error);
    res.status(500).send('Failed to add event');
  }
};

// GET: Show form to edit event
exports.showEditEventForm = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await db.oneOrNone('SELECT * FROM events WHERE id = $1', [id]);
    if (!event) return res.status(404).send('Event not found');
    res.render('admin-edit-event', { event });
  } catch (error) {
    console.error('Error fetching event for edit:', error);
    res.status(500).send('Failed to load event');
  }
};

// POST: Update event (with optional image upload)
exports.updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, description, date } = req.body;
  const event_url = req.file ? `/eventuploads/${req.file.filename}` : null;

  try {
    if (event_url) {
      await db.none(
        'UPDATE events SET title = $1, description = $2, date = $3, event_url = $4 WHERE id = $5',
        [title, description, date, event_url, id]
      );
    } else {
      await db.none(
        'UPDATE events SET title = $1, description = $2, date = $3 WHERE id = $4',
        [title, description, date, id]
      );
    }
    res.redirect('/admin/events');
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).send('Failed to update event');
  }
};

// POST: Delete event
exports.deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    await db.none('DELETE FROM events WHERE id = $1', [id]);
    res.redirect('/admin/events');
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).send('Failed to delete event');
  }
};
