const url = "mongodb://localhost:27017/";

var ObjectID = require('mongodb').ObjectID;

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

    public findInArray(collection: string, field: string, value: any, offset: number, limit: number){
        return new Promise<any>((resolve, reject)=>{
            this.mongoClient.connect(url, (err, db)=>{
                if(err) throw err;
                
                console.log("dbCreated");
                let dbo = db.db('database');
                let request: string = '{"'+field+'": { "$all": [';
                typeof value == 'string'? request += '"'+value+'"' : request+= value;
                request += ']}}';
                console.log('request', request);    
                
                dbo.collection(collection).find(JSON.parse(request)).skip(offset).limit(limit).toArray().then(res=>{
                    resolve(res);
                });
            });
        });
    }

    public findById(collection: string, id: string){
        return new Promise<any>((resolve, reject)=>{
            this.mongoClient.connect(url, (err, db)=>{
                if(err) throw err;

                let dbo = db.db('database');
                
                dbo.collection(collection).findOne({_id: new ObjectID(id)}, (err, res)=>{
                    resolve(res);
                })
            });
        });
    }
}