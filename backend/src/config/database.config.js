import mongoose from "mongoose"

export const connectDB = async ()=>{
    try {
        let client = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`database connected to ${client.connection.host}`);
        
    } catch (error) {
        console.log("error in connecting database" , error);
        
    }
}