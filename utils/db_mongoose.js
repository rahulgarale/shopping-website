const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://rahul_nodeTut:123@cluster0.wq8zj.mongodb.net/shop?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true})
.then(result=>{
    console.log("database connected");
})
.catch(err=>{
    console.log(err);
})
module.exports={
    Product:require('../models/product'),
    Users:require('../models/user'),
    Orders:require('../models/orders')
}
