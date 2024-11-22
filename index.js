import dotenv from 'dotenv'
import express from 'express'
import dbConnection from './modules/utils/db.js';
import userRouter from './modules/routes/user.route.js'
import productRouter from './modules/routes/product.route.js'

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/user',userRouter);
app.use('/api/product',productRouter)


// dbconnection
dbConnection();

// server listening 
const Port = process.env.Port || 4000 ;

app.listen(Port,()=>{
    console.log(`Server listenig at http://localhost:${Port}`);
})