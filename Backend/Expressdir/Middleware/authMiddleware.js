const jwt=require('jsonwebtoken')
const JWT_SECRET="mysecretkey"

const auth=async(req,res,next)=>{
  console.log("Middleware started");
   console.log(req.headers);
  const authHeader=req.headers.authorization ;
  if(!authHeader){
    return res.status(401).json({
        message:"Access denied.No token provided"
    })
  }
 
 const token = authHeader.split(" ")[1];

console.log(token);



try{
 const decoded=jwt.verify(token,JWT_SECRET);
 req.user=decoded ;
 next();
 console.log(decoded);

}
catch(err){
  console.log(err.message);
  return res.status(401).json({
    message:"Invalid token"
  });
 }
}
module.exports=auth ;