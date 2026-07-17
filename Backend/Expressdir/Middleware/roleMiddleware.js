const authorize=(role)=>{
return (req,res,next)=>{
   if(req.user.role!=role){
    return res.status(403).json({
        message:"you are not authorized to access this resource"
    })

   }
   next();
 }
}
module.exports=authorize ;
