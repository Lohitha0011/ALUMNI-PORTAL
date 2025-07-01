const { default: mongoose } = require("mongoose");

const alumniSchema = new mongoose.Schema({
    au_name: {
        type: String,
        required: true,
    },
    au_collage: {
        type: String,   
        required: true
    },
    au_email: {
        type: String,
        required: true,
        unique: true
    },
    au_password: {
        type: String,
        required: true
    },
    au_from_year: {
        type: Date,  
        required: true
    },
    au_to_year: {
        type: Date, 
        required: true
    },
    au_linkedin: {
        type: String,
        required: true
    },
    au_image: {
        type: String,
    },
    au_verify: {
        type: String,
    },
    au_contact: {
        type: String,
        required: true
    },
    admin: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'  // This references the Admin schema (college)
    }]
});

const Alumni = mongoose.model('Alumni', alumniSchema);

module.exports = Alumni;
