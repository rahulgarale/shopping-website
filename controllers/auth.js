const User=require('../utils/db_mongoose').Users;
const bcrypt=require('bcryptjs');
exports.getAuth=(req,res,next)=>{
    // const isloggedin=req.get('Cookie').split(';')[0].split('=')[1];
    // console.log(isloggedin);
    res.render('auth/login',{path:"/login",pageTitle:"Login ",isAuthenticated:req.session.isloggedin});
}
exports.postLogin=(req,res,next)=>{
    //coookie setup
    // res.setHeader('Set-Cookie','loggedIn=true') //set cookie name loggedIn
    // req.isLoggedin=true;
    const email=req.body.email;
    const password=req.body.password;
    User.findOne({email:email})
    .then((user)=>{
       if(!user){
        return res.redirect('/login');
       }
       bcrypt.compare(password,user.password)
       .then((doMatch)=>{
           if(doMatch){
            req.session.isloggedin=true;
            req.session.user=user;
           return req.session.save((err)=>{
                console.log(err);
                res.redirect('/');
            });

           }
           return res.redirect('/login');
       })
       .catch(err=>{
           console.log(err);
       })
       
    })
    .catch(err=>{
        console.log(err);
    })
    
}
exports.postLogout=(req,res,next)=>{
    req.session.destroy((err)=>{
        console.log(err);
        res.redirect('/')
    })    
}

exports.getSignup=(req,res,next)=>{
    // const isloggedin=req.get('Cookie').split(';')[0].split('=')[1];
    // console.log(isloggedin);
    res.render('auth/signup',{path:"/signup",pageTitle:"Signup ",isAuthenticated:req.session.isloggedin});
}

exports.postSignup=(req,res,next)=>{
     
}
