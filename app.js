const express= require('express');
const path=require('path');

const adminRoutes=require('./routes/admin');
const shop=require('./routes/shop');
const pageNotFoundController=require('./controllers/404');
//const db=require('./utils/database');
const UserModal=require('./models/user');
//const User = require('./models/user');
const db=require('./utils/db_mongoose');
const User=db.Users;

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
    User.findById("60eedbe4cfc52112f42499b8")
    .then((user)=>{
     //  console.log(data)
       req.user=user;
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


//by mongoose
User.findOne()
.then(user=>{
    if(!user){
        const user =new User({name:"Rahul",email:"abc@test.com",cart:{items:[]}})
        user.save();
    }
    app.listen(port,()=>{
        console.log("server listining at",port);
    });
})

//by mongodb mongoClient
// db.mongoConnect(()=>{
//     //console.log(client);
//     app.listen(port,()=>{
//         console.log("server listining at",port);
//     });
// })

