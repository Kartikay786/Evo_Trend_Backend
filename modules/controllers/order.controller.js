import Order from "../models/order.model.js";
import Stripe from "stripe";
import Product from '../models/product.model.js'

// userid kisne order place
// kya order items
// uska prie - 
// payment option 
// check psyment done or not 
// updated status 

const stripe = new Stripe('sk_test_51QOCquBfZ0x4L1c9mWfGNUDuk5T20rftx7rVmuabNYm7IcUqrQJTz5TRsjcOFYFOfzrkuspPbRlVQTh2B4u2P6pF00ZlQt9Ib1');

const orderPlace = async (req, res) => {
    const userId = req.user.id;
    const { cartItems, paymentMethodId, totalPrice } = req.body;


    try {
        // check cart items
        console.log(cartItems.length,totalPrice);
        if (cartItems.length == 0) return res.status(400).json({ message: 'Cart is empty' });
      
        if (totalPrice <= 0) return res.status(400).json({ message: 'amount is invalid' });

        // create payment stripe    
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalPrice, // convert into    cents currrnvy unit
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: 'never', // Disables redirect-based methods
              },
            // payment_method: paymentMethodId,
            // confirm: true   // instant payment
        })
        console.log(paymentIntent)
        // Deduct product inventory (optional)
        for (const item of cartItems) {
            const product = await Product.findById(item.productId);
            if (!product || product.stock < item.quantity) {
                throw new Error(`Insufficient stock for product: ${item.productId}`);
            }
            product.stock -= item.quantity;
            await product.save();
        }

        // create order 
        const order = new Order({
            userId,
            item: cartItems,
            totalPrice,
            paymentId: paymentIntent.id,
            status: 'Order Placed',
            isPaid: true
        })

        await order.save();

        return res.status(200).json({message:'Order placed',order});

    }
    catch (err) {
        console.log(err);

        return res.status(500).json({message:'Order not placed',err});
    }
}

// all order
const allOrder = async (req,res)=>{
    try{
        const order = await Order.find();
        if(!order) return res.status(400).json({message:'No Order exist'});

        return res.status(200).json({message:'All order fetched',order});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:'Server Error'});
    }
}

// get order by userid
const orderbyUserid = async (req,res)=>{

    const userId = req.user.id;

    try{
        const order = await Order.find({userId});
        if(!order) return res.status(400).json({message:'No Order exist'});

        return res.status(200).json({message:'All order fetched',order});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:'Server Error'});
    }
}

export {orderPlace,allOrder,orderbyUserid}