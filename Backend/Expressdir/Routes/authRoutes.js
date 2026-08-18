const express=require("express");
const router=express.Router();
const {register,login,getMe}=require("../Controllers/authController");
const auth=require("../Middleware/authMiddleware.js");
const { updateMyStudent } = require("../Controllers/studentController.js");
//adding routes 
router.get("/me", auth, getMe);
router.put("/me",auth,updateMyStudent);
router.post("/register",register);
router.post("/login",login);

module.exports=router ;
