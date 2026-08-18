const express=require("express");
const router=express.Router();
const {
    getMyStudent ,
    getStudents ,
    updateMyStudent ,
    getStudentById,   
    updateStudent,
    deleteStudent,
   
}= require("../Controllers/studentController");
const auth=require("../Middleware/authMiddleware");
const authorize = require("../Middleware/authorize");

//routes
router.get("/me",auth,getMyStudent);
router.put("/me",auth,updateMyStudent);
router.get("/",auth,authorize("admin"),getStudents);
router.get("/:id",auth,authorize("admin"),getStudentById);
router.put("/:id",auth,authorize("admin"),updateStudent);
router.delete("/:id",auth,authorize("admin"),deleteStudent);


module.exports=router ;
