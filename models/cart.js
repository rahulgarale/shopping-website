const fs=require('fs');
const path=require('path')

const p =path.join(path.dirname(require.main.filename),'data','cart.json');

module.exports= class Cart{
    static addProduct(id,productPrice){
        fs.readFile(p,(err,fileData)=>{
            let cart={products:[],totalPrice:0};
            if(!err){
                cart= JSON.parse(fileData);
            }
            const existingProdIndex=cart.products.findIndex(p=>p.id===id)
            const existingProduct=cart.products[existingProdIndex];
            let updatedProduct
            if(existingProduct){
                updatedProduct={...existingProduct};
                updatedProduct.qty+=1;
                cart.products=[...cart.products];
                cart.products[existingProdIndex]=updatedProduct;
            }else{
                updatedProduct={id:id,qty:1};
                cart.products=[...cart.products,updatedProduct];
            }
            cart.totalPrice+= parseFloat(productPrice);
            fs.writeFile(p,JSON.stringify(cart),(err)=>{
                console.log(err);
            })
        })

    }
    static deleteProduct(id,prodPrice){
        fs.readFile(p,(err,fileData)=>{
            if(err){
                return
            }
            const cart= JSON.parse(fileData);
            let updatedCart={...cart}
            const prod=updatedCart.products.find(p=>p.id===id);
            if(!prod){
                return;
            }
            const prodQty=prod.qty;
            updatedCart.products=updatedCart.products.filter(p=>p.id !== id);
            updatedCart.totalPrice=updatedCart.totalPrice- (prodPrice *prodQty); 
            fs.writeFile(p,JSON.stringify(updatedCart),(err)=>{
                console.log(err);
            })
        })
    }

    static getCart(cb){
        fs.readFile(p,(err,fileData)=>{
            if(err){
                cb(null)
            }else{
                const cart=JSON.parse(fileData);
                cb(cart);
            }
        });
    }
}