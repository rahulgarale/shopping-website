const express= require('express');
const path=require('path');

const adminRoutes=require('./routes/admin');
const shop=require('./routes/shop');
const pageNotFoundController=require('./controllers/404');

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
app.use('/admin',adminRoutes);

//handling admin routes
app.use(shop);


//return 404 page for unhandle routes
app.use(pageNotFoundController.get404)


app.listen(port,()=>{
    console.log("server listining at",port);
});