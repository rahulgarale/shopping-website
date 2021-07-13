const mongodb =require('mongodb');
const MongoClient= mongodb.MongoClient;
const uri = "mongodb+srv://rahul_nodeTut:123@cluster0.wq8zj.mongodb.net/shop?retryWrites=true&w=majority";
let _db;

const mongoClient=(callback)=>{    
    MongoClient.connect(uri,{ useUnifiedTopology: true })
    .then((result)=>{
        console.log('database connected');
        _db=result.db('shop');
        callback();
    })
    .catch((err)=>{
        console.log("Error",err);
    })
}

const getDb=()=>{
     if(_db){
        return _db;
     }
     throw 'No Database connected'
}

exports.mongoConnect=mongoClient;
exports.getDb=getDb;