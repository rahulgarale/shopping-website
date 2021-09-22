const User = require('../utils/db_mongoose').Users;
const bcrypt = require('bcryptjs');
const crypto= require('crypto');

exports.getAuth = (req, res, next) => {
    // const isloggedin=req.get('Cookie').split(';')[0].split('=')[1];
    // console.log(isloggedin);
    let message= req.flash('error');
    if(message.length>0){
        message=message[0];
    }else{
        message=null;
    }
    res.render('auth/login',
        { 
            path: "/login", 
            pageTitle: "Login ", 
            isAuthenticated: req.session.isloggedin,
            errorMessage:message
        }
    );
}
exports.postLogin = (req, res, next) => {
    //coookie setup
    // res.setHeader('Set-Cookie','loggedIn=true') //set cookie name loggedIn
    // req.isLoggedin=true;
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
        .then((user) => {
            if (!user) {
                req.flash('error','Invalid Email or Password')
                return res.redirect('/login');
            }
            bcrypt.compare(password, user.password)
                .then((doMatch) => {
                    if (doMatch) {
                        req.session.isloggedin = true;
                        req.session.user = user;
                        return req.session.save((err) => {
                            console.log(err);
                            res.redirect('/');
                        });

                    }
                    return res.redirect('/login');
                })
                .catch(err => {
                    console.log(err);
                })

        })
        .catch(err => {
            console.log(err);
        })

}
exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/')
    })
}

exports.getSignup = (req, res, next) => {
    // const isloggedin=req.get('Cookie').split(';')[0].split('=')[1];
    // console.log(isloggedin);
    let message= req.flash('error');
    if(message.length>0){
        message=message[0];
    }else{
        message=null;
    }
    res.render('auth/signup', { path: "/signup", pageTitle: "Signup ", isAuthenticated: req.session.isloggedin,errorMessage:message });
}

exports.postSignup = (req, res, next) => {
    const email=req.body.email;
    const password=req.body.password;
    const confirmPassword=req.body.confirmPassword;
    
    User.findOne({email:email})
    .then(userDoc=>{
        if(userDoc){
            req.flash('error','User already exists, Please try again with differant email id')
            return res.redirect('/signup')
        }
        return bcrypt
            .hash(password,12)
            .then(encryptedPass=>{
                const user= new User({
                    email:email,
                    password:encryptedPass,
                    cart:{
                        items:[]
                    }
                });
                return user.save();
            })
    })
    .then(user=>{
        return res.redirect('/login');
    })
}

exports.getReset=(req,res,next)=>{
    let message= req.flash('error');
    if(message.length>0){
        message=message[0];
    }else{
        message=null;
    }
    res.render('auth/resetPassword', 
        { 
            path: "/resetPassword", 
            pageTitle: "Reset Password", 
            isAuthenticated: req.session.isloggedin,
            errorMessage:message 
        });
}

exports.postResetPass=(req,res,next)=>{
    let message= req.flash('error');
    let token;
    if(message.length>0){
        message=message[0];
    }else{
        message=null;
    }
    crypto.randomBytes(42,(err,buffer)=>{
        if(err){
            console.log(err);
            return res.redirect('/reset');
        }
        User.findOne({email:req.body.email})
        .then(result=>{
            if(!result){
                req.flash('error','User not found');
                return res.redirect('/reset');
            }
        token=buffer.toString('hex');
        result.resetPassToken=token;
        result.resetPassExpiration=Date.now() +3600000;
        return result.save();
    })
    .then(()=>{
        res.redirect(`/reset/${token}`);
    })
    .catch(err=>{
        console.log(err);
    })
    });
    
   
}
exports.getResetPassToken=(req,res,next)=>{
    let message= req.flash('error');
    let token=req.params.token;
    if(message.length>0){
        message=message[0];
    }else{
        message=null;
    }
   
    User.findOne({resetPassToken:token,resetPassExpiration:{$gt:Date.now()}})
    .then((result)=>{
        res.render('auth/new-password', 
        { 
            path: "/new-password", 
            pageTitle: "Reset Password", 
            isAuthenticated: req.session.isloggedin,
            errorMessage:message,
            resetPasstoken:token,
            email:result.email
        });
    })
    .catch(err=>{
        console.log(err);
    })

}
exports.postNewPassword=(req,res,next)=>{
    const token=req.body.token;
    const email=req.body.email;
    let resetUser;
    User.findOne({email:email,resetPassToken:token,resetPassExpiration:{$gt:Date.now()}})
    .then((data)=>{
        if(!data){
            req.flash('error','Token expires');
            res.redirect('/reset');
        }
        resetUser=data;
        return bcrypt.hash(req.body.password,12)
    })
    .then((hasedPassword)=>{        
        resetUser.password=hasedPassword;
        resetUser.resetPassExpiration=undefined;
        resetUser.resetPassToken=undefined;
       return resetUser.save();
    })
    .then(()=>{
        res.redirect('/login');
    })
    .catch(err=>{
        console.log(err);
    })
}