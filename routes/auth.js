const authController=require('../controllers/auth');
const express=require('express');
const router=express.Router();

router.get('/login',authController.getAuth)

router.post('/login',authController.postLogin);
module.exports=router;
