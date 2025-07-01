const Student = require('../models/Student');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotEnv = require('dotenv');
const multer = require('multer');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

// Load environment variables
dotEnv.config();
const secretKey = process.env.WhoAreYou;


// Student Registration
const studentRegister = async (req, res) => {
    const { st_name, st_collage, st_pemail, st_cemail, st_password, st_from_year, st_to_year, st_linkedin, st_contact } = req.body;

    try {
        // Check if personal or college email already exists
        const studentExists = await Student.findOne({ $or: [{ st_pemail }, { st_cemail }] });
        if (studentExists) {
            return res.status(400).json({ message: "Student with this email already exists" });
        }

        // Check if the referenced collage (Admin) exists
        const collage = await Admin.findOne({ in_name: st_collage });
        if (!collage) {
            return res.status(404).json({ message: "Collage (Admin) not found" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(st_password, 10);

        // Create new student record
        const newStudent = new Student({
            st_name,
            st_collage,
            st_pemail,
            st_cemail,
            st_password: hashedPassword,
            st_from_year,
            st_to_year,
            st_linkedin,
            st_contact,
            admin: collage._id
        });

        if (req.file) {
            newStudent.image = `/uploads/posts/${req.file.filename}`;
          }

        await newStudent.save();

        await Admin.findByIdAndUpdate(collage._id, {
            $push: { student: newStudent._id }
        });

        res.status(201).json({ message: "Student Registered Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Student Login
const studentLogin = async (req, res) => {
    const { st_pemail, st_password } = req.body;

    try {
        const student = await Student.findOne({ st_pemail });
        if (!student || !(await bcrypt.compare(st_password, student.st_password))) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Generate JWT Token
        const token = jwt.sign({ studentId: student._id }, secretKey, { expiresIn: '1h' });

        res.status(200).json({
            success: "Login Successful",
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get All Students for a specific college (Admin) by in_name's ObjectId
const getAllStudentsById = async (req, res) => {
    const { collageId } = req.params;  // ObjectId of the specific collage (Admin)

    try {
        // Fetch all students associated with the given collage (Admin)
        const students = await Student.find({ admin: collageId });

        if (!students || students.length === 0) {
            return res.status(404).json({ message: "No students found for this collage" });
        }

        res.status(200).json({ students });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get All Students
const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();

        res.status(200).json({ students });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { studentRegister, studentLogin, getAllStudentsById, getAllStudents };
