const express=require('express');
const path=require('path');

const rootDir=require('../utils/path');
const adminData=require('./admin')

const router=express.Router();


router.get('/',(req,res,next)=>{
    //res.send({"Message":"Hello"});

    //following will send file 
    //res.sendfile need absolute path so with the help of path module we can do path join
  //  res.sendFile(path.join(rootDir, 'views','shop.html'))
  
  ///below method use to render page with set default view engine so here its with pug(jade)
  res.render("shop",{prods:adminData.products,path:"/shop",pageTitle:"MyShop"});
});

module.exports = router;