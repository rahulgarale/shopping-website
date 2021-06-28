const Product=require('../models/product');

const Cart=require('../models/cart');

exports.getProduct=(req,res,next)=>{
    //res.send({"Message":"Hello"});
    Product.fetchAll((data)=>{
        res.render("shop/product-list",{prods:data,path:"/products",pageTitle:"MyShop"});
    })
    //following will send file 
    //res.sendfile need absolute path so with the help of path module we can do path join
  //  res.sendFile(path.join(rootDir, 'views','shop.html'))
 
  ///below method use to render page with set default view engine so here its with ejs
  //res.render("shop",{prods:productData,path:"/shop",pageTitle:"MyShop"});
}

exports.getSingleProduct= (req,res,next)=>{
  const productId= req.params.productId
  Product.finById(productId,(data)=>{
      res.render("shop/product-detail",{product:data,path:"/products",pageTitle:"MyShop"});
  })
 
}

exports.getIndex=(req,res,next)=>{
  Product.fetchAll((data)=>{
    res.render("shop/index",{prods:data,path:"/shop",pageTitle:"MyShop"});
})
}

exports.getCart=(req,res,next)=>{
  Cart.getCart(cart=>{
  Product.fetchAll((data)=>{
    const cartProduct=[]
    for(product of data ){
      const cartProductData= cart.products.find(p=>p.id===product.id);
      if(cartProductData){
        cartProduct.push({productData:product,qty:cartProductData.qty});
      }  
    }
    res.render("shop/cart",{prods:data,path:"/cart",pageTitle:"Your Cart",products:cartProduct});
  })
})
}

exports.postCart=(req,res,next)=>{
  const prodId=req.body.productId;
  Product.finById(prodId,(prodData)=>{
    Cart.addProduct(prodId,prodData.price)
  })
  res.redirect('/cart');
}

exports.postCartDeleteProduct=(req,res,next)=>{
  const prodId=req.body.prodId;
  if(prodId){
    Product.finById(prodId,(prodData)=>{
      Cart.deleteProduct(prodId,prodData.price);
      res.redirect('/cart');
    })
  }
  else{
    throw 'Product Not found';
  }
  
  
}


exports.getOrders=(req,res,next)=>{
  Product.fetchAll((data)=>{
    res.render("shop/orders",{prods:data,path:"/orders",pageTitle:"Your orders"});
})
}

exports.getCheckout=(req,res,next)=>{
  Product.fetchAll((data)=>{
    res.render("shop/checkout",{prods:data,path:"/checkout",pageTitle:"Checkout"});
})

}