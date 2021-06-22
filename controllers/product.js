const Product=require('../models/product');

exports.getAddProduct=(req,res,next)=>{
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
}

exports.postAddProduct=(req,res,next)=>{
    const product=new Product(req.body.title);
    product.save();
    res.redirect('/');
}

exports.getProduct=(req,res,next)=>{
    //res.send({"Message":"Hello"});
    Product.fetchAll((data)=>{
        res.render("shop",{prods:data,path:"/shop",pageTitle:"MyShop"});
    })
    //following will send file 
    //res.sendfile need absolute path so with the help of path module we can do path join
  //  res.sendFile(path.join(rootDir, 'views','shop.html'))
 
  ///below method use to render page with set default view engine so here its with ejs
  //res.render("shop",{prods:productData,path:"/shop",pageTitle:"MyShop"});
}