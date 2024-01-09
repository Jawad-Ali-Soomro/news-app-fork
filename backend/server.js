import app from "./src/app.js";
import { PORT } from "./src/config/exportEnv.js";
import connectDB from "./src/database/connection.js";
//connect mongoDB  atlas database   as  cloud service
connectDB();
app.get("/about",(req,res)=>{
    res.status(200).json({message:"Welcome to about NewsApp server !"});
});
app.get("/",(req,res)=>{
    res.status(200).json({message:"Welcome to NewsApp server !"});
});
//server has running on given port
app.listen(PORT, () => {
    console.log("server running on port :", PORT);
});
