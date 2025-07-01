const alumniController = require('../controllers/alumniController')
const express = require('express');
const router=express.Router();
const upload = require('../config/AlumniMulterConfig');

router.post('/alumni-register', upload.single('image'), alumniController.alumniRegister);  //endpoints
router.post('/alumni-login', alumniController.alumniLogin);
router.get('/all-alumni/:collageId', alumniController.getAllAlumniById);
router.get('/all-alumni', alumniController.getAllAlumni); 
router.get('/:alumniId', alumniController.getAlumniById);  
router.get('uploads/:imageName',(req,res)=>{
    const imageName = req.params.imageName;
    res.headersSent('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '..' ,'uploads', imageName));
});

module.exports = router;
