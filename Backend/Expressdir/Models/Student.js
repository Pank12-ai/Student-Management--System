const mongoose = require("mongoose");
//using validation in studentSchema
const studentSchema = new mongoose.Schema({
   name:{
      type:String,
      required:[true,"Name is required"] ,
      trim:true,
      minlength:[3,"Name must be atleast 3 characters"]
   },
   Age:{
      type:Number ,
      required:[true,"Age is required"],
      min:[14,"Age cannot be less tha 14"]
   },
   rollNo: {
      type:Number,
      required:[true,"Roll Number is required"],
      unique:true
   },
   gender: {
      type:String,
      enum:{
         values:["Male","Female","Other"],
         message:"gender must be Male,Female or Other"
      },
     
      required:true
   },
   course:{
     
    type: String,
    enum:{
       values: ["MCA", "BCA", "BTech"],
       message:"course must be MCA,BCA Or Btech"
    },
 
    required: true
   },
   
   semester:{
      type:Number ,
      min:[1,"semester cannot be less than 1"],
      max:[8,"semester cannot be greater than 8"],
      required:true
   },

   email:{
      type:String ,
      required:true ,
      unique:true ,
      lowercase:true ,
      match:[/^\S+@\S+\.\S+$/,"Invalid email format"]

   }

});

const Student = mongoose.model(
   "Student",
   studentSchema
);

module.exports = Student;  