const User=require('../Models/User')
const Student=require('../Models/Student') 
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const JWT_SECRET = "mysecretkey";
const register = async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            rollNo,
            age,
            gender,
            course,
            semester
        } = req.body;

        // 1. Password validation
        if (password.length < 8) {
            return res.status(400).json({
                message: "Password can't be less than 8 characters"
            });
        }
        
        // 2. Check email
        console.log("Received email:", email);

        const existingUser = await User.findOne({ email });
        console.log("Existing user:", existingUser);
        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        // 3. Check roll number
        const existingStudent = await Student.findOne({ rollNo });

        if (existingStudent) {
            return res.status(400).json({
                message: "Roll Number already exists"
            });
        }

        // 4. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 5. Create User
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "student"
        });

        // 6. Create Student profile
        const student = await Student.create({
            user: user._id,
            rollNo,
            age,
            gender,
            course,
            semester
        });

        // 7. Response
        res.status(201).json({
            message: "Student registered successfully",

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },

            student
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: err.message
        });
    }
};

const login=async(req,res)=>{
    console.log("login api hit")
    console.log(req.body);
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
        expiresIn:"1h"
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

const getMe=async(req,res)=>{
    const user=await User.findById(req.user.id).select("-password");
    res.json(user);
}
module.exports={
    register,
    login,
    getMe 

};
