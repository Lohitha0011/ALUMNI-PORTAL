const { default: mongoose } = require("mongoose");

const studentSchema = new mongoose.Schema({
    st_name: {
        type: String,
        required: true,
    },
    st_collage: {
        type: String,
        required: true
    },
    st_pemail: {
        type: String,
        required: true,
        unique: true
    },
    st_cemail: {
        type: String,
        required: true,
        unique: true
    },
    st_password: {
        type: String,
        required: true
    },
    st_from_year: {
        type: Date,  
        required: true
    },
    st_to_year: {
        type: Date, 
        required: true
    },
    st_linkedin: {
        type: String
    },
    image: {
        type: String
    },
    st_contact: {
        type: String,
        required: true
    },
    admin: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    }]
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
