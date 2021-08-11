exports.get404=(req,res,next)=>{
    // res.status(404).send("<h1>Oops! Page not Found</h1>");

    //res.status(404).sendFile(path.join(__dirname,'views','404.html'));

<<<<<<< HEAD
    res.status(404).render('404',{pageTitle:"Page Not Found",path:"",isAuthenticated:req.isLoggedin});
=======
    res.status(404).render('404',{pageTitle:"Page Not Found",path:"",isAuthenticated:req.session.isloggedin});
>>>>>>> 4d53e224cb9524730b012e7c83ba0ed4f351fb31
}