const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Alumni Post Schema
const alumniEventSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Alumni',  // Reference to the Alumni schema
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  eventDate: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  mode:{
    type:String,
    required:true
  },
  audiance:{
    type:String,
    required:true
  },
  image: {
    type: String  // URL or path to the image if there's an image with the post
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('AlumniEvent', alumniEventSchema);
