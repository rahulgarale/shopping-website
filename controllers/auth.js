<<<<<<< HEAD
exports.getAuth=(req,res,next)=>{
    // const isloggedin=req.get('Cookie').split(';')[0].split('=')[1];
    // console.log(isloggedin);
    res.render('auth/login',{path:"/login",pageTitle:"Login ",isAuthenticated:req.isloggedin});
=======
const User=require('../utils/db_mongoose').Users;
exports.getAuth=(req,res,next)=>{
    // const isloggedin=req.get('Cookie').split(';')[0].split('=')[1];
    // console.log(isloggedin);
    res.render('auth/login',{path:"/login",pageTitle:"Login ",isAuthenticated:req.session.isloggedin});
>>>>>>> 4d53e224cb9524730b012e7c83ba0ed4f351fb31
}
exports.postLogin=(req,res,next)=>{
    //coookie setup
    // res.setHeader('Set-Cookie','loggedIn=true') //set cookie name loggedIn
    // req.isLoggedin=true;
<<<<<<< HEAD
    req.session.isloggedin=true;
    res.redirect('/');
=======
    
    User.findById("60eedbe4cfc52112f42499b8")
    .then((user)=>{
       // console.log(data)
        req.session.isloggedin=true;
        req.session.user=user;
        req.session.save((err)=>{
            console.log(err);
            res.redirect('/');
        });
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
     
>>>>>>> 4d53e224cb9524730b012e7c83ba0ed4f351fb31
}
