import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";

//login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user=await userModel.findOne({email:email});
        if(!user){
            return res.json({success:false,message:'Invalid credentials'});
        }
        else{
            const isMatch=await bcrypt.compare(password,user.password);
            if(!isMatch){
                return res.json({success:false,message:'Invalid credentials'});
            }
            else{
                const token=createToken(user._id);
                res.json({success:true,token:token});
            }
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:'Server error'});
    }
}

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}
//register user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        //check if alr exists
        const exists=await userModel.findOne({email:email});
        if(exists){
            return res.json({success:false,message:'User already exists'});
        }
        //validate email format and strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:'Invalid email format'});
        }
        if(password.length<8){
            return res.json({success:false,message:'Password must be atleast 8 characters long'});
        }
        //hash password
        const salt=await bcrypt.genSalt(10);
        const hashedpassword=await bcrypt.hash(password,salt);

        const newUser=new userModel({
            name:name,
            email:email,
            password:hashedpassword
        });

        const user=await newUser.save();
        const token=createToken(user._id);
        res.json({success:true,token:token});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:'Server error'});
    }
}

export { loginUser, registerUser }