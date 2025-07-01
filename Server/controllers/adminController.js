const Admin= require('../models/Admin');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const dotEnv = require('dotenv')
const Alumni = require('../models/Alumni')
const multer = require('multer')
const path = require('path')

dotEnv.config();
const secretKey = process.env.WhoAreYou

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/');
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+path.extname(file.originalname));
    }
})

const upload = multer({storage:storage})

const adminRegister = async (req, res) => {
    const { in_name, in_city, in_email, in_password, in_url } = req.body;
    const in_image = req.file?req.file.filename:undefined
    
    try {
        // Check if email already exists
        const adminEmail = await Admin.findOne({ in_email });
        if (adminEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(in_password, 10);

        // Create new admin record
        const newAdmin = new Admin({
            in_name,
            in_city,
            in_email,
            in_password: hashedPassword,
            in_url,
            in_image
        });

        await newAdmin.save();

        res.status(201).json({ message: "Admin Registered Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Admin Login
const adminLogin = async (req, res) => {
    const { in_email, in_password } = req.body;

    try {
        const admin = await Admin.findOne({ in_email });
        const adminId = admin._id;
        if (!admin || !(await bcrypt.compare(in_password, admin.in_password))) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Generate JWT Token
        const token = jwt.sign({ adminId: admin._id }, secretKey, { expiresIn: '1h' });

        res.status(200).json({
            success: "Login Successful",
            token,
            adminId,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getAllAdminsById = async (req, res) => {
    const { adminId } = req.params;  // ObjectId of the specific collage (Admin)

    try {
        // Fetch all alumni associated with the given collage (Admin)
        const admin = await Admin.findById({ _id:adminId }).populate('alumni').populate('student');

        if (!admin || admin.length === 0) {
            return res.status(404).json({ message: "No admin found for this college" });
        }

        res.status(200).json({ admin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get All Admins
const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find()
            .populate('alumni')  // Populate the alumni field
            .populate('student');  // Populate the student field

        res.status(200).json({ admins });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {adminRegister:[upload.single('in_image'), adminRegister], adminLogin, getAllAdminsById, getAllAdmins}
