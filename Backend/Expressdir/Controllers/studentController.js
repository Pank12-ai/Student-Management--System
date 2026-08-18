const Student=require("../Models/Student");
const User=require("../Models/User");
const bcrypt=require("bcrypt");
const getStudents=async(req,res)=>{
    try{
        // const filter ={
           
        // };
        //Filtering 
        const filter={ } ;
        if(req.user.role !="admin"){
            filter.user=req.user.id ;
        }
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
        //search by name using regex
        if(req.query.search){
            filter.name=new RegExp(req.query.search,"i");
        }
    
        
        //Sorting
        let sort={};
        if(req.query.sort){
          if(req.query.sort.startsWith("-")){
            let field=req.query.sort.substring(1) ;
            sort[field]=-1 ;
          }
          else{
            sort[req.query.sort]=1 ;
          }
        }

        //pagination
        const page=parseInt(req.query.page)||1 ;
        const limit=parseInt(req.query.limit)||5;
        const skip=(page -1)*limit ;
        if(page <1 || limit<1){
            return res.status(400).json({
                message:"Page and limit must be greater than 0"
            })
        }
       const totalStudents=await Student.countDocuments(filter) ;

      

       //Projection(Field selection)

       let select ="";
      if (req.query.fields) {
    select = req.query.fields.split(",").join(" ");
}
        console.log(req.user);
          console.log(filter);
        const students=await Student.find(filter).select(select).sort(sort).skip(skip).limit(limit) ;

        const totalPages = Math.ceil(totalStudents / limit);
        if (page > totalPages && totalStudents > 0) {
    return res.status(404).json({
        message: "Page not found"
    });
  }
   
        res.json({
            totalStudents,
            totalPages,
            currentPage:page,
            students
        });
      }
      catch(err){
        res.status(500).json({
            message:err.message 
        })
      }

}

const updateMyStudent = async (req, res) => {
    try {

        // Sirf allowed fields
        const allowedFields = [
            "age",
            "gender",
            "course",
            "semester"
        ];

        const updateData = {};

        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                updateData[field] = req.body[field];
            }
        }

        const student = await Student.findOneAndUpdate(
            { user: req.user.id },
            updateData,
            {
                new: true,
                runValidators: true
            }
        );

        if (!student) {
            return res.status(404).json({
                message: "Student profile not found"
            });
        }

        res.status(200).json({
            message: "Profile updated successfully",
            student
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};
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


const getMyStudent = async (req, res) => {
    const student = await Student.findOne({
        user: req.user.id
    }).populate("user", "-password");

    res.json(student);
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
  if(!student){
    return res.status(404).json({
        message:"Student not found"
    });
  }
        // User delete
        await User.findByIdAndDelete(student.user);

        // Student delete
        await Student.findByIdAndDelete(req.params.id);

      
        res.status(200).json({
            message:"Student deleted successfully"
        })
    }
    catch(err){
        res.status(500).json({
            message:err.message 
        });
    }
};

module.exports={
    getMyStudent ,
    updateMyStudent ,
    getStudents ,
    getStudentById ,
    updateStudent ,
    deleteStudent

};
