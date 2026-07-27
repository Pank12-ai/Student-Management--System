import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../services/api"
function Home(){
     const [students, setStudents] = useState([]);
     const navigate = useNavigate();
    useEffect(()=>{
        fetchStudents();
    },[]);
    //FETCH STUDENTS
  const fetchStudents = async()=>{
    try{
      //students fetch krne ke liye frontend se jane wali api
       const response=await api.get("/students");
       // const response=await api.get( "/api/auth/me");
       setStudents(response.data.students);
      //  console.log(response.data);
    }catch(err){
        console.log(err.response?.data);
    }
  }
  //Delete students
  const deleteStudent = async (id) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) {
        return;
    }

    try {

        await api.delete(`/students/${id}`);

        alert("Student deleted successfully");

        fetchStudents();

    } catch (err) {

        console.log(err.response?.data);

    }

};  
  return (
  <div className="container mt-4">

    <h2>Students</h2>
 <Link to="/add-student">
    <button className="btn btn-primary mb-3">
        Add Student
    </button>
</Link>
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Course</th>
          <th>Semester</th>
        </tr>
      </thead>

      <tbody>

        {students.map((student) => (

          <tr key={student._id}>
            <td>{student.name}</td>
            <td>{student.email}</td>
            <td>{student.course}</td>
            <td>{student.semester}</td>

             <td>
              {/* view button */}
  <button  className="btn btn-info btn-sm me-2"
    onClick={() => navigate(`/student/${student._id}`)}>
    View
  </button>

             {/* edit button  */}
              <button className="btn btn-warning btn-sm me-2"
               onClick={() => navigate(`/student/${student._id}`)}
              >
                Edit
              </button>

          {/* delete button */}
              <button className="btn btn-danger btn-sm"        onClick={() => deleteStudent(student._id)}>
                Delete
              </button>
            </td>
          </tr>

        ))}

      </tbody>
    </table>

  </div>
);
}


export default Home;