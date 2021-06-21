const express=require('express');
const path=require('path');

const rootDir=require('../utils/path');


const router=express.Router();

const products=[];

router.get('/add-product',(req,res,next)=>{
    // res.send(`
    // <form action="/admin/add-product"method="POST">
    //     <input type="text" name="book">
    //     <button type="submit">Add product</button>
    // </form>
    // `);
   // res.sendFile(path.join(__dirname,'../','views','add-product.html'));
    //another way of doing above is using own util or helper to shorten code

    //res.sendFile(path.join( rootDir,'views','add-product.html'));

    //render pug file
    res.render('add-product',{path:"admin/add-product",pageTitle:"Add Product "});
});
router.post('/add-product',(req,res,next)=>{
    products.push({title:req.body.title});
    res.redirect('/');
})

exports.routes=router;
exports.products=products;