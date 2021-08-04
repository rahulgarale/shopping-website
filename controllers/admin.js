const { ObjectID } = require('mongodb');
const Product=require('../models/product');
const db=require('../utils/db_mongoose');
const Products=db.Product;

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

    //render ejs file
    res.render('admin/edit-product',{path:"admin/add-product",pageTitle:"Add Product ",editMode:false,isAuthenticated:req.session.isloggedin});
}

exports.postAddProduct=(req,res,next)=>{
    const title=req.body.title;
    const imageUrl=req.body.imageUrl;
    const price=req.body.price;
    const desc=req.body.desc;
    // const product=new Product(null,title,imageUrl,price,desc,req.user._id);
    // product.save();

    //using mongoose
    const ProductData=new Products({title:title,price:price,desc:desc,imageUrl:imageUrl,userId:req.user})
    ProductData.save()
    .then(result=>{
        res.redirect('/admin/products');
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.getEditProduct=(req,res,next)=>{
    const editMode=req.query.edit;
   
    const prodId=req.params.prodId;
    
    if(!editMode){
        return res.redirect('/')
    }
    Products.findById({_id: new ObjectID(prodId)})
    .then(data=>{
       res.render('admin/edit-product',
        {path:"admin/edit-product",
        pageTitle:"Edit Product",
        editMode:editMode,
        product:data,
        isAuthenticated:req.session.isloggedin
        });
    })
    .catch(err=>{
        console.log(err);
    })

    // Product.finById(prodId)
    // .then(data=>{
    //    res.render('admin/edit-product',
    //     {path:"admin/edit-product",
    //     pageTitle:"Edit Product",
    //     editMode:editMode,
    //     product:data
    //     });
    // })
    // .catch(err=>{
    //     console.log(err);
    // })
    
}

exports.postEditProduct=(req,res,next)=>{
    const prodId=req.body.prodId;
    const title=req.body.title;
    const imageUrl=req.body.imageUrl;
    const price=req.body.price;
    const desc=req.body.desc;
    // const product=new Product(prodId,title,imageUrl,price,desc,req.user._id);
    // product.update()
    // .then(()=>{
    //     res.redirect('/admin/products');
    // })
    // .catch(err=>{
    //     console.log(err);
    // })

    //by mongoose
    Products.findById(prodId)
    .then(product=>{
        product.title=title;
        product.imageUrl=imageUrl;
        product.price=price;
        product.desc=desc;
        return product.save();
    })
    .then(()=>{
        res.redirect('/admin/products');
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.postDeleteProduct=(req,res,next)=>{
    const prodId=req.body.prodId;
    // Product.deleteById(prodId)
    // .then(data=>{
    //     //console.log(data);
    //   res.redirect('/admin/products');
  
    // })
    // .catch(err=>{
    //     console.log(err);
    // })

    //by mongoose
    Products.findByIdAndRemove(prodId)
    .then(()=>{
        res.redirect('/admin/products');
    })
    .catch(err=>{
        console.log(err);
    })

}

exports.getProducts=(req,res,next)=>{
   Products.find({})
//    .select('title price -_id')  //to select particular fields
//    .populate('userId') //to populate related tables/schema data
   .then(data=>{
       console.log(data);
       res.render("admin/products",{prods:data,path:"admin/products",pageTitle:"Admin Product",isAuthenticated:req.session.isloggedin})
   })
   .catch(err=>{
       console.log(err);
   })
   
    // Product.fetchAll()
    // .then(data=>{
    //     res.render("admin/products",{prods:data,path:"admin/products",pageTitle:"Admin Product"});
    // })
    // .catch(err=>{
    //     console.log(err);
    // })
}