import User from "../models/user.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const genToken = (_id)=>{
    const sceret_key = process.env.TokenScretKey ;

    return jwt.sign({_id},sceret_key,{expiresIn :'1D'})   ; 
}

// customer register user 
const cRegister = async (req,res)=>{
    const {name,email,password} = req.body;

    try{
        const existEmail = await User.findOne({email});
        if(existEmail) return res.status(404).json({message:'Email is Already used'});

        const user = new User({name,email,password});

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password,salt);

        await user.save();


        if(user) return res.status(200).json({message:'User Registered Successfully',user});

    }
    catch(err){
        console.log('Error at customer register',err);
        return res.status(500).json({message:'Server Error',err});
    }
}

// customer Login
const cLogin = async (req,res)=>{
    const {email,password} = req.body;

    try{
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message:'Email not found'});
        
        const isMatch = bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({message:'Invalid Password'});

        const token = genToken(user._id);

        return res.status(200).json({message:'Login Successfully',user,token});
    }
    catch(err){
        console.log('Server Error',err);
        return res.status(500).json({message:'Server Error'});
    }

}

// admin register
const adminRegister = async (req,res)=>{
    const {name,email,password} = req.body;
    const admin = true;

    try{
        const existEmail = await User.findOne({email});
        if(existEmail) return res.status(404).json({message:'Email is Already used'});

        const user = new User({name,email,password,isAdmin:admin});

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password,salt);

        await user.save();


        if(user) return res.status(200).json({message:'User Registered Successfully',user});

    }
    catch(err){
        console.log('Error at customer register',err);
        return res.status(500).json({message:'Server Error',err});
    }
}

// admin Login
const adminLogin = async (req,res)=>{
    const {email,password} = req.body;

    try{
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message:'Email not found'});
        
        const isMatch = bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({message:'Invalid Password'});

        if(!user.isAdmin) return res.status(400).json({message:'you are not an admin'});

        const token = genToken(user._id);

        return res.status(200).json({message:'Login Successfully',user,token});
    }
    catch(err){
        console.log('Server Error',err);
        return res.status(500).json({message:'Server Error'});
    }

}
export {cRegister,cLogin,adminRegister,adminLogin}