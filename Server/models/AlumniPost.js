const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Alumni Post Schema
const alumniPostSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Alumni',  // Reference to the Alumni schema
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  tags: [{
    type: String
  }],
  image: {
    type: String  // URL or path to the image if there's an image with the post
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'Alumni'  // Alumni who liked the post
  }],
  comments: [{
    author: {
      type: Schema.Types.ObjectId,
      ref: 'Alumni'  // Reference to the Alumni who commented
    },
    content: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('AlumniPost', alumniPostSchema);
