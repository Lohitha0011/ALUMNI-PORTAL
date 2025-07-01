const AlumniEvent = require('../models/AlumniEvents');

// Save an event to the database with image
const createEvent = async (req, res) => {
  try {
    const { title, description, eventDate, location, mode, audiance } = req.body;
    const { alumniId } = req.params; 

    // Create a new event object
    const newEvent = new AlumniEvent({
      author:alumniId,
      title,
      description,
      eventDate,
      location,
      mode,
      audiance
    });

    // If an image is uploaded, store its path
    if (req.file) {
      newEvent.image = `/uploads/events/${req.file.filename}`;
    }

    // Save the event to the database
    await newEvent.save();

    res.status(201).json({ message: 'Event created successfully', event: newEvent });
  } catch (err) {
    res.status(500).json({ error: 'Error creating event', details: err.message });
  }
};

// Fetch all events, sorted by the latest eventDate
const getAllEvents = async (req, res) => {
  try {
    const events = await AlumniEvent.find()
      .populate('author', 'au_name')  // Populate author's name from the Alumni collection
      .sort({ eventDate: -1 });       // Sort by the latest event date

    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching events', details: err.message });
  }
};

module.exports = {
  createEvent,
  getAllEvents
};
