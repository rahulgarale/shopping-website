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
    res.render('admin/edit-product',{path:"admin/add-product",pageTitle:"Add Product ",editMode:false});
}

exports.postAddProduct=(req,res,next)=>{
    const title=req.body.title;
    const imageUrl=req.body.imageUrl;
    const price=req.body.price;
    const desc=req.body.desc;
    const product=new Product(null,title,imageUrl,price,desc);
    product.save();
    res.redirect('/products');
}

exports.getEditProduct=(req,res,next)=>{
    const editMode=req.query.edit;
   
    const prodId=req.params.prodId;
    
    if(!editMode){
        return res.redirect('/')
    }
    Product.finById(prodId,(data)=>{
       res.render('admin/edit-product',
        {path:"admin/edit-product",
        pageTitle:"Edit Product",
        editMode:editMode,
        product:data
        });
    });
    
}

exports.postEditProduct=(req,res,next)=>{
    const prodId=req.body.prodId;
    const title=req.body.title;
    const imageUrl=req.body.imageUrl;
    const price=req.body.price;
    const desc=req.body.desc;
    const product=new Product(prodId,title,imageUrl,price,desc);
    product.save();
    res.redirect('/admin/products');
}

exports.postDeleteProduct=(req,res,next)=>{
    const prodId=req.body.prodId;
    Product.deleteById(prodId);
    res.redirect('/admin/products');
  

}

exports.getProducts=(req,res,next)=>{
    Product.fetchAll((data)=>{
        res.render("admin/products",{prods:data,path:"admin/products",pageTitle:"Admin Product"});
    })
}