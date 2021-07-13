const fs=require('fs');
const path =require('path');
const mongodb=require('mongodb');

const Cart=require('./cart')
const getDb=require('../utils/database').getDb;

const p =path.join(path.dirname(require.main.filename),'data','products.json');

const getProductFromFile=(cb)=>{
    fs.readFile(p,(err,fileData)=>{
        if(err){
            cb([]);
        }else{
         cb(JSON.parse(fileData));
        }
    })
}
        
module.exports= class Product{
    constructor(id,title,imageUrl,price,desc,userId){
        this._id=id;
        this.title=title;
        this.imageUrl=imageUrl;
        this.price=price;
        this.desc=desc;
        this.userId=userId;

    }
    save(){
        // console.log(this);
        // getProductFromFile((products)=>{
        //     if(this.id){
        //         console.log(this.id,"",p);
        //         console.log('here')
        //         const existingProdIndex=products.findIndex(p=>p.id===this.id);
        //         let updatedProduct=[...products];
        //         updatedProduct[existingProdIndex]=this;
        //         fs.writeFile(p,JSON.stringify(updatedProduct),(err)=>{
        //             console.log(err);
        //         });
        //     }else{
        //         this.id=Math.floor(Math.random() * (999999 - 1 + 1) + 1).toString();
        //         products.push(this)
        //         fs.writeFile(p,JSON.stringify(products),(err)=>{
        //             console.log(err);
        //         });
        //     }
        // })


        //using DB
        const db=getDb();
        db.collection('products').insertOne(this)
        .then()
        .catch(err=>{
            console.log(err);
        })

    }

    update(){
        const db=getDb();
        if(this._id){
           return db.collection('products')
            .updateOne({_id:new mongodb.ObjectID(this._id)},{$set:{title:this.title,imageUrl:this.imageUrl,price:this.price,desc:this.desc}})

        }
    }
    static fetchAll(){
        const db=getDb();
        return db.collection('products').find().toArray()
        .then(products=>{
            
            return products;
        })
        .catch(err=>{
            console.log(err);
        })
    }
    static finById(id){
        // getProductFromFile((products)=>{
        //     const product=products.find(p=>p.id===id);
        //     cb(product);
        // })
        
        //ObjectID methods
        //console.log(new mongodb.ObjectID(id).valueOf())


        //using DB
        const db=getDb();
        
        return db.collection('products').find({_id: new mongodb.ObjectID(id)}).next()
        .then(products=>{
            
            return products;
        })
        .catch(err=>{
            console.log(err);
        })

    }
    static deleteById(id){
        // getProductFromFile(products=>{
        //     const prod=products.find(p=>p.id===id);
        //     const updatedProduts=products.filter(p=>p.id !==id);
        //     fs.writeFile(p,JSON.stringify(updatedProduts),err=>{
        //         if(!err){
        //             Cart.deleteProduct(id,prod.price)
        //         }else{
        //             console.log(err);
        //         }
        //     })
        // })

        //using DB
        const db=getDb();
        return db.collection('products').remove({_id:new mongodb.ObjectID(id)})
       
    }
}