const Student=require("../Models/Student");
const getStudents=async(req,res)=>{
    try{
        // const filter ={
           
        // };
        const filter={ } ;
        console.log(filter);
        //filter by course,gender,semester 
        if(req.query.course){
            filter.course=req.query.course ;
        }
         if(req.query.gender){
            filter.gender=req.query.gender ;
        }
        if(req.query.semester){
            filter.semester=req.query.semester ;
        }
        if(req.query.minAge || req.query.maxAge){
            filter.age ={};
            if(req.query.minAge){
                filter.age.$gte=parseInt(req.query.minAge)
            }
            if(req.query.maxAge){
                filter.age.$lte=parseInt(req.query.maxAge)
            }
        }
        // //search by name using regex
        // if(req.query.search){
        //     filter.name=new RegExp(req.query.search,"i");
        // }
        //
        const students=await Student.find(filter);
        
        res.json(students);
      }
      catch(err){
        res.status(500).json({
            message:err.message 
        })
      }

}
const getStudentById=async(req,res)=>{
try{
        const student=await Student.findById(req.params.id);
        if(!student){
            return res.status(404).json({
                message:"Student not found"
            });
        }
       res.json(student); 
 }
 catch(err){
 res.status(500).json({
    message:err.message 
 });
 }
};


const createStudent=async(req,res)=>{
    try{
        const student=await Student.create(req.body);
        res.status(201).json(student);
    }
    catch(err){
         if(err.code ===11000){
        return res.status(400).json({
    message:"Email or Roll Number already exists"
        })
    }
        res.status(500).json({
       message:err.message
        })
   
    
    }
};
const updateStudent=async(req,res)=>{
    try{
        const student=await Student.findByIdAndUpdate(
            req.params.id ,
            req.body,
            {new:true}
        );
        res.json(student);
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
};

const deleteStudent = async(req,res)=>{
    try{
        const student = await Student.findByIdAndDelete(
            req.params.id
        );

        res.json(student);
    }
    catch(err){
        res.status(500).json({
            message:err.message 
        });
    }
};

module.exports={
    getStudents ,
    getStudentById ,
   
    createStudent ,
    updateStudent ,
    deleteStudent

};
