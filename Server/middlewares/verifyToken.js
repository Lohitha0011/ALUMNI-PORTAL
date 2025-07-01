const jwt = require('jsonwebtoken');
const dotEnv = require('dotenv');
const Admin = require('../models/Admin');
const Alumni = require('../models/Alumni');
const Student = require('../models/Student');

dotEnv.config();
const secretKey = process.env.JWT_SECRET;

const verifyToken = async (req, res, next) => {
    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({ error: "Token required" });
    }

    try {
        const decoded = jwt.verify(token, secretKey);

        let user;
        switch (decoded.role) {
            case 'admin':
                user = await Admin.findById(decoded.userId);
                break;
            case 'alumni':
                user = await Alumni.findById(decoded.userId);
                break;
            case 'student':
                user = await Student.findById(decoded.userId);
                break;
            default:
                return res.status(401).json({ error: "Invalid role" });
        }

        if (!user) {
            return res.status(404).json({ error: `${decoded.role.charAt(0).toUpperCase() + decoded.role.slice(1)} not found` });
        }

        req.userId = user._id;
        req.role = decoded.role;

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Invalid token" });
    }
};

module.exports = verifyToken;
