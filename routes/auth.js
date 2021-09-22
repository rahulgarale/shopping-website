const authController=require('../controllers/auth');
const express=require('express');
const router=express.Router();

router.get('/login',authController.getAuth)

router.post('/login',authController.postLogin);

router.post('/logout',authController.postLogout);

router.get('/signup',authController.getSignup)

router.post('/signup',authController.postSignup)

router.get('/reset',authController.getReset);

router.post('/reset',authController.postResetPass);

router.get('/reset/:token',authController.getResetPassToken)

router.post('/reset/newPassword',authController.postNewPassword)

module.exports=router;
