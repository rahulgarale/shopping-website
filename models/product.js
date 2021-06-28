const { json } = require('body-parser');
const fs=require('fs');
const { type } = require('os');
const path =require('path');

const Cart=require('./cart')

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
    constructor(id,title,imageUrl,price,desc){
        this.id=id;
        this.title=title;
        this.imageUrl=imageUrl;
        this.price=price;
        this.desc=desc;

    }
    save(){
        console.log(this);
        getProductFromFile((products)=>{
            if(this.id){
                console.log(this.id,"",p);
                console.log('here')
                const existingProdIndex=products.findIndex(p=>p.id===this.id);
                let updatedProduct=[...products];
                updatedProduct[existingProdIndex]=this;
                fs.writeFile(p,JSON.stringify(updatedProduct),(err)=>{
                    console.log(err);
                });
            }else{
                this.id=Math.floor(Math.random() * (999999 - 1 + 1) + 1).toString();
                products.push(this)
                fs.writeFile(p,JSON.stringify(products),(err)=>{
                    console.log(err);
                });
            }
        })

    }
    static fetchAll(cb){
        getProductFromFile(cb)
    }
    static finById(id,cb){
        getProductFromFile((products)=>{
            const product=products.find(p=>p.id===id);
            cb(product);
        })
    }
    static deleteById(id){
        getProductFromFile(products=>{
            const prod=products.find(p=>p.id===id);
            const updatedProduts=products.filter(p=>p.id !==id);
            fs.writeFile(p,JSON.stringify(updatedProduts),err=>{
                if(!err){
                    Cart.deleteProduct(id,prod.price)
                }else{
                    console.log(err);
                }
            })
        })
    }
}