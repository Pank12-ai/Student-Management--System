import {useState} from "react" ;
import api from "../services/api";
 import { useNavigate } from "react-router-dom";
function Login(){
 const[email,setEmail]=useState("");
 const[password,setPassword]=useState("");
 const navigate = useNavigate();
 const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
        const response=await api.post("/auth/login",{
            email,
            password,
        });
       
       
        localStorage.setItem("token", response.data.token);
        navigate("/");
      // console.log(localStorage.getItem("token"));
       console.log(response.data); 
    }
    catch(err){
   console.log(err);
    }
 }
 return(
    <form className="container mt-5" onSubmit={handleSubmit}>
    <h2 className="mb-4">Login</h2>
    <div className="mb-3">
        <label>Email</label>
        <input type="email"
        className="form-control"
       value={email}
       onChange={(e)=>setEmail(e.target.value)}
       />
       
    </div>
    <div className="mb-3">
        <label>Password</label>
        <input type="password"className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)}/>
    </div>
   <button type="submit" className="btn btn-primary">Login</button>
    </form>
 );
}
export default Login;