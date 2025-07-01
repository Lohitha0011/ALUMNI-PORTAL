const { default: mongoose } = require("mongoose");

const adminSchema = new mongoose.Schema({
    in_name: {
        type: String,
        required: true,
        unique: true
    },
    in_city: {
        type: String,
        required: true
    },
    in_email: {
        type: String,
        required: true,
        unique: true
    },
    in_password: {
        type: String,
        required: true
    },
    in_url: {
        type: String
    },
    in_image: {
        type: String
    },
    alumni: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Alumni'  // Reference to the Alumni model, holding alumni IDs
    }],
    student: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'  // Reference to the Student model, holding student IDs
    }]
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
