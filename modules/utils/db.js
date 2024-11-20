import mongoose from "mongoose";

const dbConnection = ()=>{

const Uri = process.env.MongoUrl ; 

    mongoose.connect(Uri)
    .then(()=>{
        console.log('Db connected');
    })
    .catch((err)=>{
        console.log('Db not connected',err);
    })  
}

export default dbConnection;