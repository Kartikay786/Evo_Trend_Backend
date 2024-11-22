import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName :{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    },
    stock:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        required:true,
        // unique:true
    },
    brand:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
    
},{timestamps:true})


const Product = new mongoose.model('Product',productSchema);

export default Product