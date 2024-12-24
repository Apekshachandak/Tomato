import foodModel from "../models/foodModel.js";

import fs from "fs";

//add food item
const addFood = async (req, res) => {
     let image_filename=`${req.file.filename}`;

    const food=new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        image:image_filename,
        category:req.body.category
    });
    try{
        await food.save();
        res.json({success:true,message:'Food item added successfully'});
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:'Failed to add food item'});
    }
};

//all food list
const listFood=async(req,res)=>{
   try{
    const foods=await foodModel.find({});
    res.json({success:true,data:foods});
   }
   catch(err){
    console.log(err);
    res.json({success:false,message:'Failed to fetch food list'});
   }
}

//remove food item
const removeFood=async(req,res)=>{
    try {
        const food=await foodModel.findById(req.body.id);
        fs.unlinkSync(`./uploads/${food.image}`,()=>{});//from folder
        await foodModel.findByIdAndDelete(req.body.id);//from mongodb
        res.json({success:true,message:'Food item removed successfully'});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:'Failed to remove food item'});
    }
}

export { addFood,listFood,removeFood };