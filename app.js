const express= require('express');
const path=require('path');
const session=require('express-session'); //use for set session obejct
const MongoDbStore=require('connect-mongodb-session')(session)  //used to store session in mongodb

const adminRoutes=require('./routes/admin');
const shop=require('./routes/shop');
const authRoutes=require('./routes/auth');
const pageNotFoundController=require('./controllers/404');
//const db=require('./utils/database');
const UserModal=require('./models/user');
//const User = require('./models/user');
const db=require('./utils/db_mongoose');
const User=db.Users;

const MONGODBURI="mongodb+srv://rahul_nodeTut:123@cluster0.wq8zj.mongodb.net/shop?retryWrites=true&w=majority";

const app =express();
//initalize mongoDBstore to store sessions
const store=new MongoDbStore({
    uri:MONGODBURI,
    collection:'sessions'
})

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

//setting up session middelware
app.use(session({secret:"this is just long sting",resave:false,saveUninitialized:false,store:store }));

//check user auth
app.use((req,res,next)=>{
    if(!req.session.user){
       return next();
    }
    User.findById(req.session.user._id)
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

//handling shop routes
app.use(shop);

//handling auth routes
app.use(authRoutes)

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
.catch((err)=>{
    console.log(err)
})

//by mongodb mongoClient
// db.mongoConnect(()=>{
//     //console.log(client);
//     app.listen(port,()=>{
//         console.log("server listining at",port);
//     });
// })

