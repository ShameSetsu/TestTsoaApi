// const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

export class Mongo {
    mongoClient = require('mongodb').MongoClient;

    constructor(){
        
    }

    public insert(collection: string, item: any): Promise<any>{
        return new Promise<any>((resolve, reject)=>{
            this.mongoClient.connect(url, (err, db)=>{
                if(err) throw err;
                
                console.log("dbCreated");
                let dbo = db.db('database');

                dbo.collection(collection).insertOne(item, (err, res)=>{
                    if (err) reject(err);
                    resolve(res);
                });
            });
        });
    }
}