const { json } = require('body-parser');
const fs=require('fs');
const { type } = require('os');
const path =require('path');

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
    constructor(t){
        this.title=t
    }
    save(){
        getProductFromFile((products)=>{
            products.push({title:this.title})
            fs.writeFile(p,JSON.stringify(products),(err)=>{
                console.log(err);
            });
        })

    }
    static fetchAll(cb){
        getProductFromFile(cb)
    }
}