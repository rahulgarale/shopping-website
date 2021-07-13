const Product=require('../models/product');

const Cart=require('../models/cart');
const User = require('../models/user');

exports.getProduct=(req,res,next)=>{
    //res.send({"Message":"Hello"});
    // Product.fetchAll((data)=>{
    //     res.render("shop/product-list",{prods:data,path:"/products",pageTitle:"MyShop"});
    // })
    //following will send file 
    //res.sendfile need absolute path so with the help of path module we can do path join
  //  res.sendFile(path.join(rootDir, 'views','shop.html'))
 
  ///below method use to render page with set default view engine so here its with ejs
  //res.render("shop",{prods:productData,path:"/shop",pageTitle:"MyShop"});

  //using DB
  Product.fetchAll()
  .then(data=>{
    res.render("shop/product-list",{prods:data,path:"/products",pageTitle:"MyShop"});
  })
  .catch(err=>{
    console.log(err);
  })
}

exports.getSingleProduct= (req,res,next)=>{
  const productId= req.params.productId
  Product.finById(productId)
  .then((data)=>{
    res.render("shop/product-detail",{product:data,path:"/products",pageTitle:"MyShop"});
  })
  .catch(err=>{
    console.log(err);
  })
 
}

exports.getIndex=(req,res,next)=>{
//   Product.fetchAll((data)=>{
//     res.render("shop/index",{prods:data,path:"/shop",pageTitle:"MyShop"});
// })

  //using DB
  Product.fetchAll()
  .then(data=>{
    res.render("shop/index",{prods:data,path:"/shop",pageTitle:"MyShop"});
  })
  .catch(err=>{
    console.log(err);
  })
}

exports.getCart=(req,res,next)=>{
//   Cart.getCart(cart=>{
//   Product.fetchAll((data)=>{
//     const cartProduct=[]
//     for(product of data ){
//       const cartProductData= cart.products.find(p=>p.id===product.id);
//       if(cartProductData){
//         cartProduct.push({productData:product,qty:cartProductData.qty});
//       }  
//     }
//     res.render("shop/cart",{prods:data,path:"/cart",pageTitle:"Your Cart",products:cartProduct});
//   })
// })

  req.user.getCart()
  .then(products=>{
    res.render('shop/cart',{path:'/cart',pageTitle:'Your Cart',products:products})
  })
}

exports.postCart=(req,res,next)=>{
  const prodId=req.body.productId;
  // Product.finById(prodId,(prodData)=>{
  //   Cart.addProduct(prodId,prodData.price)
  // })
  Product.finById(prodId)
  .then(prodData=>{
    return req.user.addToCart(prodData)
  })
  .then(result=>{
    res.redirect('/cart');
  })
 // res.redirect('/cart');
}

exports.postCartDeleteProduct=(req,res,next)=>{
  const prodId=req.body.productId;
  console.log(prodId);
  // if(prodId){
  //   Product.finById(prodId,(prodData)=>{
  //     Cart.deleteProduct(prodId,prodData.price);
  //     res.redirect('/cart');
  //   })
  // }
  // else{
  //   throw 'Product Not found';
  // }

  req.user.deleteItemFromCart(prodId)
  .then(result=>{
    res.redirect('/cart');
  })
  .catch(err=>{
    console.log(err);
  })
  
}


exports.getOrders=(req,res,next)=>{
//   Product.fetchAll((data)=>{
//     res.render("shop/orders",{prods:data,path:"/orders",pageTitle:"Your orders"});
// })
  req.user.getOrders()
  .then(data=>{
    console.log(data);
    res.render("shop/orders",{orders:data,path:"/orders",pageTitle:"Your orders"});
  })
}

exports.postOrders=(req,res,next)=>{
  req.user.addOrder()
  .then(result=>{
    res.redirect('shop/orders');
  })
  .catch(err=>{
    console.log(err);
  })
}

exports.getCheckout=(req,res,next)=>{
  Product.fetchAll((data)=>{
    res.render("shop/checkout",{prods:data,path:"/checkout",pageTitle:"Checkout"});
})

}