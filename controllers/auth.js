const User=require('../utils/db_mongoose').Users;
exports.getAuth=(req,res,next)=>{
    // const isloggedin=req.get('Cookie').split(';')[0].split('=')[1];
    // console.log(isloggedin);
    res.render('auth/login',{path:"/login",pageTitle:"Login ",isAuthenticated:req.session.isloggedin});
}
exports.postLogin=(req,res,next)=>{
    //coookie setup
    // res.setHeader('Set-Cookie','loggedIn=true') //set cookie name loggedIn
    // req.isLoggedin=true;
    
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
     
}
