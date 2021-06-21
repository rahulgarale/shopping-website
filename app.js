const express= require('express');
const path=require('path');

const admin=require('./routes/admin');
const shop=require('./routes/shop');

const app =express();

//app.set use to set anything globally like we are setting view engine here


//set ejs templating engine
app.set('view engine','ejs');
app.set('views','views');

//set pug(jade) templating engine
// app.set('view engine','pug');
// app.set('views','views');

const port=process.env.port || 3000;

//used to parsed request body
app.use(express.urlencoded({extended:false}));

//to use serves file statically
app.use(express.static(path.join(__dirname,'public')));
//handling admin routes
app.use('/admin',admin.routes);

//handling admin routes
app.use(shop);


//return 404 page for unhandle routes
app.use((req,res,next)=>{
    // res.status(404).send("<h1>Oops! Page not Found</h1>");

    //res.status(404).sendFile(path.join(__dirname,'views','404.html'));

    res.status(404).render('404',{pageTitle:"Page Not Found "});
})


app.listen(port,()=>{
    console.log("server listining at",port);
});