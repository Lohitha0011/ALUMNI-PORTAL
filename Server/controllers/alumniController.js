const Alumni = require('../models/Alumni');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotEnv = require('dotenv');
const multer = require('multer');
const path = require('path');

dotEnv.config();
const secretKey = process.env.WhoAreYou;

// Alumni Registration
const alumniRegister = async (req, res) => {
    try {
        const { au_name, au_collage, au_email, au_password, au_from_year, au_to_year, au_linkedin, au_contact } = req.body;

        // Check if the email already exists
        const alumniExists = await Alumni.findOne({ au_email });
        if (alumniExists) {
            return res.status(400).json({ message: "Alumni with this email already exists" });
        }

        // Check if the referenced college (Admin) exists
        const collage = await Admin.findOne({ in_name: au_collage });
        if (!collage) {
            return res.status(404).json({ message: "College (Admin) not found" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(au_password, 10);

        // Create a new alumni record
        const newAlumni = new Alumni({
            au_name,
            au_collage,
            au_email,
            au_password: hashedPassword,
            au_from_year,
            au_to_year,
            au_linkedin,
            au_contact,
            admin: collage._id
        });

        if (req.file) {
            newAlumni.au_image = `/uploads/alumni/${req.file.filename}`;
          }

        // Save the new alumni to the database
        await newAlumni.save();

        // Associate the alumni with the admin (college)
        await Admin.findByIdAndUpdate(collage._id, {
            $push: { alumni: newAlumni._id }
        });

        res.status(201).json({ message: "Alumni Registered Successfully", alumni: newAlumni });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Alumni Login
const alumniLogin = async (req, res) => {
    const { au_email, au_password } = req.body;

    try {
        const alumni = await Alumni.findOne({ au_email });
        const alumniId = alumni._id;
        if (!alumni || !(await bcrypt.compare(au_password, alumni.au_password))) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Generate JWT Token
        const token = jwt.sign({ alumniId: alumni._id, au_collage: alumni.au_collage }, secretKey, { expiresIn: '1h' });

        res.status(200).json({
            success: "Login Successful",
            token,
            alumniId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get All Alumni for a specific college (Admin) by in_name's ObjectId
const getAllAlumniById = async (req, res) => {
    const { collageId } = req.params;  // ObjectId of the specific collage (Admin)

    try {
        // Fetch all alumni associated with the given collage (Admin)
        const alumni = await Alumni.find({ admin: collageId });

        if (!alumni || alumni.length === 0) {
            return res.status(404).json({ message: "No alumni found for this college" });
        }

        res.status(200).json({ alumni });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get All Alumni
const getAllAlumni = async (req, res) => {
    try {
        const alumni = await Alumni.find();

        res.status(200).json({ alumni });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getAlumniById = async (req, res) => {
    const { alumniId } = req.params;
    try {
        const alumni = await Alumni.findOne({_id:alumniId});

        res.status(200).json({ alumni });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Exporting the functions with multer middleware for image upload on alumni registration
module.exports = {
    alumniRegister,  // Use multer middleware for 'image' field
    alumniLogin,
    getAllAlumniById,
    getAllAlumni,
    getAlumniById
};
