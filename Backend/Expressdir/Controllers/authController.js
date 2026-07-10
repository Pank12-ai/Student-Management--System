const User=require('../Models/User');
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const JWT_SECRET = "mysecretkey";
const register=async(req,res)=>{

 try{
    if (req.body.password.length < 8) {
    return res.status(400).json({
        message: "Password can't be less than 8 characters"
    });
}
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
     const user=await User.create(req.body);
    res.status(201).json({
        message:"User registered successfully",
        user
    });

 }
 catch(err){
    if(err.code ===11000){
        return res.status(400).json({
            message:"Email already exists"
        });
    }
    res.status(500).json({
        message:err.message
    });
 }
};

const login=async(req,res)=>{
    try{
        //email se user dhundho
        const user=await User.findOne({email:req.body.email});
        //agar user nhi mila
        if(!user){
            return res.status(400).json({
                message:"User not found"
            })
        }
        //agar user mila to password check kro
        const ismatch=await bcrypt.compare(req.body.password,user.password);
        if(!ismatch){
            return res.status(401).json({
                  message:"Invalid password"
            })
          
        }
        //agar password match ho gya to token generate
    const token=jwt.sign({
    id:user._id,
    role:user.role},
    JWT_SECRET,{
        expiresIn:"0.30h"
    }
  )
  res.status(200).json({
    message:"Login successful",
    token 
  })
}
    
    catch(err){
        res.status(500).json({
            message:err.message 
        })
    }
};


module.exports={
    register,
    login

};