const adminController = require('../controllers/adminController')
const express = require('express');
const router=express.Router();

router.post('/admin-register', adminController.adminRegister);  //endpoints
router.post('/admin-login', adminController.adminLogin);
router.get('/all-admins/:adminId', adminController.getAllAdminsById);
router.get('/all-admins', adminController.getAllAdmins);
router.get('/adminuploads/:imageName',(req,res)=>{
    const imageName = req.params.imageName;
    res.headerSent('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '..' ,'adminUploads', imageName));
});

module.exports = router;
