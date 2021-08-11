exports.getAuth=(req,res,next)=>{
    // const isloggedin=req.get('Cookie').split(';')[0].split('=')[1];
    // console.log(isloggedin);
    res.render('auth/login',{path:"/login",pageTitle:"Login ",isAuthenticated:req.isloggedin});
}
exports.postLogin=(req,res,next)=>{
    //coookie setup
    // res.setHeader('Set-Cookie','loggedIn=true') //set cookie name loggedIn
    // req.isLoggedin=true;
    req.session.isloggedin=true;
    res.redirect('/');
}
