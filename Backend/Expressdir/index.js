const express = require("express");
const mongoose = require("mongoose");
const cors=require("cors");

const studentRoutes = require("./Routes/StudentRoutes");
const authRoutes=require("./Routes/authRoutes");


const app = express();



//Middleware
app.use(cors({
    origin:"http://localhost:5173"
}))
app.use(express.json());
//routes
app.use("/api/auth",authRoutes);
app.use("/api/students",studentRoutes);

mongoose.connect(
   "mongodb://127.0.0.1:27017/studentdb"
)
.then(()=>{
   console.log("mongodb connected");
})
.catch((err)=>{
   console.log("Status:", err.response?.status);
    console.log("Data:", err.response?.data);
})


app.listen(3000,()=>{
    console.log( "Server running on port 3000" );
})
