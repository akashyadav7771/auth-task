import mongoose from "mongoose";


const connectdb = async()=>{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongodb connected")
}

export default connectdb;