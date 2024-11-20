import Product from "../models/product.model.js";

// create product by admin

const createProduct = async (req,res)=>{
    const {productName,description, price ,stock , image} = req.body ;

    try{
        const product = await Product.findOne({productName});
        if(product) return res.status(400).json({message:'This product already added '});

        const newProduct = new Product({productName,description,price,stock,image});

        await newProduct.save();
        return res.status(200).json({message:'Product added Successfuly',newProduct})
        
    }
    catch(err){
        console.log('Error at product added :',err);
        return res.status(500).json({message:'server Error'});
    }
}

// delete product
const deleteProduct =  async (req,res)=>{
    const productId = req.params.id;

    try{
        const product = await Product.findById({_id : productId});
        if(!product) return res.status(400).json({message:'Product not Found'});
        
        return res.status(200).json({message:'Product delete Successfully'});
    }
    catch(err){
        console.log('Error at product Deletion',err);
        return res.status(500).json({message:'Server Error'})
    }
}


export {createProduct,deleteProduct}