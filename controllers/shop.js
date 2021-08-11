const Product=require('../models/product');

const Cart=require('../models/cart');
const User = require('../models/user');
const db=require('../utils/db_mongoose');
const { ObjectID } = require('mongodb');
const { Orders } = require('../utils/db_mongoose');
const Products=db.Product;
const Order=db.Orders;

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
  // Product.fetchAll()
  // .then(data=>{
  //   res.render("shop/product-list",{prods:data,path:"/products",pageTitle:"MyShop"});
  // })
  // .catch(err=>{
  //   console.log(err);
  // })

  //using mongoose
  Products.find()
  .then(data=>{
    res.render("shop/product-list",{prods:data,path:"/products",pageTitle:"MyShop",isAuthenticated:req.isLoggedin});
  })
  .catch(err=>{
      console.log(err);
    })
}

exports.getSingleProduct= (req,res,next)=>{
  const prodID= req.params.productId;
  console.log("productID",prodID);
  Products.findById({_id: new ObjectID(prodID)})
  .then((data)=>{
    res.render("shop/product-detail",{product:data,path:"/products",pageTitle:"MyShop",isAuthenticated:req.isLoggedin});
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
  // Product.fetchAll()
  // .then(data=>{
  //   res.render("shop/index",{prods:data,path:"/shop",pageTitle:"MyShop"});
  // })
  // .catch(err=>{
  //   console.log(err);
  // })

  //using mongoose
  Products.find()
  .then(data=>{
    res.render("shop/index",{prods:data,path:"/shop",pageTitle:"MyShop",isAuthenticated:req.isLoggedin});
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
  .then(data=>{
    res.render('shop/cart',{path:'/cart',pageTitle:'Your Cart',products:data.cart.items,isAuthenticated:req.isLoggedin})
  })
}

exports.postCart=(req,res,next)=>{
  const prodId=req.body.productId;
  // Product.finById(prodId,(prodData)=>{
  //   Cart.addProduct(prodId,prodData.price)
  // })
  Products.findById(prodId)
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
  // req.user.getOrders()
  // .then(data=>{
  //   console.log(data);
  //   res.render("shop/orders",{orders:data,path:"/orders",pageTitle:"Your orders"});
  // })

  //by mongoose
  Orders.find({"user.userId":req.user._id})
  .then(data=>{
    res.render("shop/orders",{orders:data,path:"/orders",pageTitle:"Your orders",isAuthenticated:req.isLoggedin});
  })
  .catch(err=>{
    console.log(err);
  })
}

exports.postOrders=(req,res,next)=>{
  req.user.getCart()
  .then(result=>{
    const products=result.cart.items.map(p=>{
      return {quantity:p.quantity,product:{...p.productId._doc}} ///._doc to get data and not meta data here we need all produ data like title,des,price so that we can create obj using spred and only get _doc obj which has only data and not metadaa to be store
    });
    const order= new Order(
      {
        user:{
          userId:req.user
        },
        products:products
      }
    )
    return order.save();
  })
  .then(result=>{
    return req.user.clearCart();
    
  })
  .then(()=>{
    res.redirect('/orders');
  })
  .catch(err=>{
    console.log(err);
  })
}

exports.getCheckout=(req,res,next)=>{
  Product.fetchAll((data)=>{
    res.render("shop/checkout",{prods:data,path:"/checkout",pageTitle:"Checkout",isAuthenticated:req.isLoggedin});
})

}