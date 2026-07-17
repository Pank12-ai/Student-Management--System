const express=require("express");
const router=express.Router();
const {
    getStudents,
    getStudentById,    
    createStudent,
    updateStudent,
    deleteStudent,
   
}= require("../Controllers/studentController");
const auth=require("../Middleware/authMiddleware");
const authorize = require("../Middleware/roleMiddleware");

router.get("/",auth,getStudents);
router.get("/:id",auth,getStudentById);
router.post("/",auth,createStudent);
router.put("/:id",auth,updateStudent);
router.delete("/:id",auth,deleteStudent);
router.delete("/:id",auth,authorize("admin"),deleteStudent);

module.exports=router ;
