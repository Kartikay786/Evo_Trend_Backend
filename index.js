import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import dbConnection from './modules/utils/db.js';
import userRouter from './modules/routes/user.route.js'
import productRouter from './modules/routes/product.route.js'
import cartRoute from './modules/routes/cart.routes.js'

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/user',userRouter);
app.use('/api/product',productRouter);
app.use('/api/cart',cartRoute);


// dbconnection
dbConnection();

// server listening 
const Port = process.env.Port || 4000 ;

app.listen(Port,()=>{
    console.log(`Server listenig at http://localhost:${Port}`);
})