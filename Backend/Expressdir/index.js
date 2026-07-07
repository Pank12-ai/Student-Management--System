const express = require("express");
const mongoose = require("mongoose");

const studentRoutes = require("./routes/StudentRoutes");

const app = express();

app.use(express.json());

mongoose.connect(
   "mongodb://127.0.0.1:27017/studentdb"
)
.then(()=>{
   console.log("mongodb connected");
})
.catch((err)=>{
    console.log(err);
})

app.use("/api/students", studentRoutes);

app.listen(3000,()=>{
    console.log( "Server running on port 3000" );
});
