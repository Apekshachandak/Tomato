import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://apeksha:tomato@cluster0.tt9ai.mongodb.net/Project').then(()=>console.log("DB connected"));
}