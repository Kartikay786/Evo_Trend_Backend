import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    item:[
        {
            productId : { 
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product',
                required:true
            } ,
            quantity:{
                type:Number,
                required:true
            }
        }
    ],
    totalPrice:{
        type:Number,
        required:true,
    },
    isPaid:{
        type:Boolean,
        default:false
    },
    status:{
        type:String,
        default:'Pending'
    },
    paymentId:{
        type:String,
        required:true
    }
},{timestamps:true})

const Order = new mongoose.model('Order',orderSchema);

export default Order