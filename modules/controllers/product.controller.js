import Product from "../models/product.model.js";
import cloudinary from "../utils/cloudinary.js";
import fs from 'fs'

// create product by admin

const createProduct = async (req, res) => {
    const { productName,brand, description, price, stock } = req.body;
    let imageUrl = null;
    const categoryid = req.params.categoryid;


    try {
        // check file uploaded
        if (req.file) {
            const result = await cloudinary.uploader.upload(
                req.file.path, {
                resource_type: 'image',
            })

            imageUrl = result.secure_url;

            fs.unlinkSync(req.file.path);
        }


        const product = await Product.findOne({ productName });
        if (product) return res.status(400).json({ message: 'This product already added ' });

        const newProduct = new Product({ productName, description,brand, price, stock, image:imageUrl, category:categoryid });

        await newProduct.save();
        return res.status(200).json({ message: 'Product added Successfuly', newProduct })

    }
    catch (err) {
        console.log('Error at product added :', err);
        return res.status(500).json({ message: 'server Error' });
    }
}

// get product
const getProduct = async (req,res) => {

    try{
        const product = await Product.find();
        
        return res.status(200).json({message:'Product fetched Successfully',product});
    }
    catch(err){
        console.log('Error at product added :', err);
        return res.status(500).json({ message: 'server Error' });
    }
}

// get product by id 
const getProductById = async (req,res) => {
    const id = req.params.id ;

    try{
        const product = await Product.findById({_id:id});
        if(!product) return res.status(400).json({message:'Product not found'});
        
        return res.status(200).json({message:'Product fetched Successfully',product});
    }
    catch(err){
        console.log('Error :', err);
        return res.status(500).json({ message: 'server Error' });
    }
}


// delete product
const deleteProduct = async (req, res) => {
    const productId = req.params.id;

    try {
        const product = await Product.findById({ _id: productId });
        if (!product) return res.status(400).json({ message: 'Product not Found' });

        await product.deleteOne();
        return res.status(200).json({ message: 'Product delete Successfully' });
    }
    catch (err) {
        console.log('Error at product Deletion', err);
        return res.status(500).json({ message: 'Server Error' })
    }
}

// update product
const updateProduct = async (req, res) => {
    const productId = req.params.id;
    const { name, description, price, stock, image,category,brand } = req.body;

    try {
        const product = await Product.findById({ _id: productId });
        if (!product) return res.status(400).json({ message: 'Product not Found' });

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.stock = stock || product.stock;
        product.imageUrl = image || product.imageUrl;
        product.category = category || product.category;
        product.brand = brand || product.brand

        const updateProduct = await product.save();
        return res.status(200).json({ message: 'Product updated Successfully',updateProduct });
    }
    catch (err) {
        console.log('Error at product Deletion', err);
        return res.status(500).json({ message: 'Server Error' })
    }
}

// get product by category id
const getBycategoryId = async (req,res) => {
    const id = req.params.id ;

    try{
        const product = await Product.find({category:id});
        if(!product) return res.status(400).json({message:'Product not found'});
        
        return res.status(200).json({message:'Product fetched Successfully',product});
    }
    catch(err){
        console.log('Error :', err);
        return res.status(500).json({ message: 'server Error' });
    }
}

export { createProduct, deleteProduct,getProduct,getProductById,updateProduct,getBycategoryId }