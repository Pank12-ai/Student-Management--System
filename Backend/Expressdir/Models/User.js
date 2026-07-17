const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        
    },
    email:{
        type:String ,
        required:true ,
        unique:true,
        lowercase:true ,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,"Invalid email format"]
    },
    password:{
        type:String ,
        required:true ,
        minLength:[6,"Password must be atleast 6 characters"],
       
    },
    role:{
        type:String ,
        enum:{
            values:["admin","user"],
            default:"user",
            message:"role must be admin or user"
        }
     },
     name:{
        
     }
    }
)
module.exports = mongoose.model("User", userSchema);