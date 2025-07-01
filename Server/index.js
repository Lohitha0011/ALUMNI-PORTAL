const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotEnv = require("dotenv");
const adminRoute = require('./routes/adminRoute');
const alumniRoute = require('./routes/alumniRoute');
const studentRoute = require("./routes/studentRoute");
const postRoutes = require("./routes/postRoutes");
const alumniEventsRoutes = require('./routes/alumniEventRoutes');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

// Configure environment variables
dotEnv.config();

// Middleware to handle JSON requests and cross-origin requests
app.use(bodyParser.json());
app.use(cors());

// Port for the server
const port = process.env.PORT || 4000;

// MongoDB connection using Mongoose
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((error) => console.log("MongoDB connection error:", error));

// Define routes for admin, alumni, and student
app.use('/admin', adminRoute);
app.use('/alumni', alumniRoute);
app.use('/student', studentRoute);
app.use('/post',postRoutes);
app.use('/event',alumniEventsRoutes)

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

// Default route
app.use('/', (req, res) => {
    res.send("<h1>Welcome to our Website</h1>");
});

// Start the server
app.listen(port, () => {
    console.log("Server started at port", port);
});
