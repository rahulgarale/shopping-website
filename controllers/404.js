exports.get404=(req,res,next)=>{
    // res.status(404).send("<h1>Oops! Page not Found</h1>");

    //res.status(404).sendFile(path.join(__dirname,'views','404.html'));

    res.status(404).render('404',{pageTitle:"Page Not Found",path:""});
}