import Category from "../models/category.model.js";

const createCategory = async (req,res) => {
    const {name} = req.body;

    try{
        const category = await Category.findOne({name});
        if(category) return res.status(400).json({message:'Category already exist'});

        const newCategory = new Category({name});

        await newCategory.save();
        return res.status(200).json({message:'Category created '});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:'Server Error'})
    }
}

const allCategory = async (req,res) => {

    try{
        const category = await Category.find();
        if(!category) return res.status(400).json({message:'No Category already exist'});

        return res.status(200).json({message:'Category fetched ',category});

    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:'Server  Error'});
    }
}

export {createCategory,allCategory}