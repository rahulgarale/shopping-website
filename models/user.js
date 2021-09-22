const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    resetPassToken:String,
    resetPassExpiration:Date,
    cart: {
        items: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Products',
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ]
    }
})
userSchema.methods.addToCart = function (product) {
    const cartIndex = this.cart.items.findIndex(cp => {
        return cp.productId.toString() === product._id.toString();
    })
    let updatedQuantity = 1;
    const updatedCartProdItems = [...this.cart.items];
    if (cartIndex >= 0) {
        updatedQuantity = this.cart.items[cartIndex].quantity + 1;
        updatedCartProdItems[cartIndex].quantity = updatedQuantity;
    } else {
        updatedCartProdItems.push({
            productId: product._id,
            quantity: updatedQuantity
        });
    }
    const updatedCart = {
        items: updatedCartProdItems
    }
    this.cart = updatedCart;
    return this.save();
}

userSchema.methods.getCart = function () {
    return this.populate('cart.items.productId')
        .execPopulate()
    // .then(prods => {
    //     return prods;
    // });
}

userSchema.methods.deleteItemFromCart = function (prodId) {
    const updatedCartItems = this.cart.items.filter(p => {
        return p.productId.toString() !== prodId.toString()
    });
    this.cart.items=updatedCartItems;
    return this.save();
}

userSchema.methods.clearCart = function () {
    this.cart={items:[]};
    return this.save();
}
module.exports = mongoose.model('User', userSchema);



//by direct mongoDB

// const mongodb=require('mongodb');
// const getDB=require('../utils/database').getDb;

// class User{
//     constructor(userName,email,cart,id){
//         this.name=userName;
//         this.email=email;
//         this.cart=cart;
//         this._id=id;
//     }
//     save(){
//         const db=getDB();
//         return db.collection('users').insetOne(this);
//     }
//     static findById(id){
//         const db=getDB();
//         return db.collection('users').findOne({_id:new mongodb.ObjectID(id)});
//     }

//     addToCart(product){
//         const cartIndex=this.cart.items.findIndex(cp=>{
//             return cp.productId.toString() === product._id.toString();
//         })
//         let updatedQuantity=1;
//         const updatedCartProdItems=[...this.cart.items];
//         if(cartIndex >=0){
//             updatedQuantity=this.cart.items[cartIndex].quantity +1;
//             updatedCartProdItems[cartIndex].quantity=updatedQuantity;
//         }else{
//             updatedCartProdItems.push({productId:new mongodb.ObjectID(product._id),quantity:updatedQuantity});
//         }
//         const updatedCart={
//             items:updatedCartProdItems
//         }
//         const db=getDB();
//         return db.collection('users').updateOne({_id:new mongodb.ObjectID(this._id)},{$set:{cart:updatedCart}});
//     }
//     getCart(){
//         const db=getDB();
//         const prodIds=this.cart.items.map(prod=>{
//             return prod.productId;
//         });
//        return db.collection('products').find({_id:{$in:prodIds}}).toArray()
//         .then(prods=>{
//             return prods.map(prd=>{
//                 return {
//                     ...prd,quantity:this.cart.items.find(item=>{
//                         return item.productId.toString()=== prd._id.toString();
//                     }).quantity
//                 };
//             });
//         });
//     }

//     deleteItemFromCart(prodId){
//         const db=getDB();
//         const updatedCartItems=this.cart.items.filter(p=>{
//            return p.productId.toString()!==prodId.toString()
//             });
//         return db.collection('users').updateOne(
//             {_id:new mongodb.ObjectID(this._id)},
//             {$set:{cart:{items:updatedCartItems} } } );
//      }

//     addOrder(){
//         const db=getDB();
//          return this.getCart()
//         .then(products=>{
//             const order={
//                 items:products,
//                 user:{
//                     _id:new mongodb.ObjectId(this._id),
//                     name:this.name
//                 }
//             }
//             return db.collection('orders').insertOne(order)
//         })
//         .then((data)=>{
//             this.cart={items:[]};
//             return db.collection('users').updateOne(
//                 {_id:new mongodb.ObjectId(this._id)},
//                 {$set:{cart:{items:[]}}})
//         })
//     }

//     getOrders(){
//         const db=getDB();
//         return db.collection('orders').find({'user._id':new mongodb.ObjectId(this._id)}).toArray();
//     }
// }

// module.exports=User;