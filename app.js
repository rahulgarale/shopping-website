const express= require('express');
const path=require('path');

const adminRoutes=require('./routes/admin');
const shop=require('./routes/shop');
const pageNotFoundController=require('./controllers/404');
const db=require('./utils/database');
const UserModal=require('./models/user');
const User = require('./models/user');

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

//check user auth
app.use((req,res,next)=>{
    UserModal.findById("60ddae436f8deb05b845c539")
    .then((data)=>{
     //  console.log(data)
       req.user=new User(data.name,data.email,data.cart,data._id);
        next();
        
    })
    .catch(err=>{
        console.log(err);
    })

})

//handling admin routes
app.use('/admin',adminRoutes);

//handling admin routes
app.use(shop);


//return 404 page for unhandle routes
app.use(pageNotFoundController.get404)

db.mongoConnect(()=>{
    //console.log(client);
    app.listen(port,()=>{
        console.log("server listining at",port);
    });
})

