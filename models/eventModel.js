const db = require('../config/db');

const createEventTable = async () => {
  try {
    await db.none(`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        date DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        event_url TEXT
      )
    `);
    console.log("✅ Events table ensured.");
  } catch (err) {
    console.error("❌ Error creating Events table:", err);
  }
};

module.exports = {
  createEventTable
};
