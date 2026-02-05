import app from "./app.js"
import dotenv from "dotenv"
import { connectDB } from "./src/config/database.config.js";
dotenv.config();

const PORT = process.env.PORT 
connectDB();
app.listen(PORT, (err)=>{
    if (err) {
        console.log(err);
        console.log(`error while starting the server`);
        process.exit(1);
        
        
    }else console.log(`server is running at port ${PORT}`);
    
})