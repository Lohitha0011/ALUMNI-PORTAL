const {studentRegister,studentLogin,getAllStudentsById,getAllStudents}= require('../controllers/studentController')
const express = require('express');
const router=express.Router();
const upload = require('../config/StudentMulterConfig');

router.post('/student-register',upload.single('image'), studentRegister);  //endpoints
router.post('/student-login', studentLogin);
router.get('/all-students/:collageId', getAllStudentsById);
router.get('/all-students', getAllStudents);
router.get('/studentuploads/:imageName',(req,res)=>{
    const imageName = req.params.imageName;
    res.headerSent('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '..' ,'studentUploads', imageName));
});

module.exports = router;
