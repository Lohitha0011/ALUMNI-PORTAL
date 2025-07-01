const express = require('express');
const router = express.Router();
const { createEvent, getAllEvents } = require('../controllers/alumniEventsController');
const upload = require('../config/eventsMulterConfig'); // Multer configuration

// Route to create a new post (with image upload)
router.post('/create-event/:alumniId', upload.single('image'), createEvent);

// Route to get all posts (latest first)
router.get('/all-events', getAllEvents);

module.exports = router;
