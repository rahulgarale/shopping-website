const authController=require('../controllers/auth');
const express=require('express');
const router=express.Router();

router.get('/login',authController.getAuth)

router.post('/login',authController.postLogin);
<<<<<<< HEAD
=======

router.post('/logout',authController.postLogout);

router.get('/signup',authController.getSignup)

router.post('/signup',authController.postSignup)

>>>>>>> 4d53e224cb9524730b012e7c83ba0ed4f351fb31
module.exports=router;
