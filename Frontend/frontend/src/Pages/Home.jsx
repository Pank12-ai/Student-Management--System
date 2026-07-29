import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../services/api"

function Home(){
     const [students, setStudents] = useState([]);
     const [search, setSearch] = useState("");
    const [course, setCourse] = useState("");
     const [gender, setGender] = useState("");
    const [semester, setSemester] = useState("");


     const navigate = useNavigate();
   

    const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);


    //FETCH STUDENTS
  const fetchStudents = async()=>{
    try{
      //students fetch krne ke liye frontend se jane wali api
       const response=await api.get("/students",{
       // const response=await api.get( "/api/auth/me");
         params: {
        search ,
        course,
        gender,
        semester,
        page
    }
       })



       setStudents(response.data.students);
       setTotalPages(response.data.totalPages);
      //  console.log(response.data);
    }catch(err){
        console.log(err.response?.data);
    }
  }
  useEffect(()=>{
    fetchStudents();

  },[search,course,gender,semester,page]);
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
// Dashboard Statistics

const totalStudents = students.length;

const maleStudents = students.filter(
    (student) => student.gender === "Male"
).length;

const femaleStudents = students.filter(
    (student) => student.gender === "Female"
).length;

const otherStudents = students.filter(
    (student) => student.gender === "Other"
).length;




  return (
  <div className="container mt-4">

    <h2>Students</h2>
 <Link to="/add-student">
    <button className="btn btn-primary mb-3">
        Add Student
    </button>
</Link>
<div className="mb-3">
    <input
        type="text"
        className="form-control"
        placeholder="Search Student by Name..."
        value={search}
        onChange={(e) => {setSearch(e.target.value);
        setPage(1);}}
    />
</div>

<div className="row mb-3">

    <div className="col-md-4">
        <select
            className="form-select"
            value={course}
            onChange={(e) => {setCourse(e.target.value)
            setPage(1);
            }}
         >  
            <option value="">All Courses</option>
            <option value="MCA">MCA</option>
            <option value="BCA">BCA</option>
            <option value="BTech">BTech</option>
       </select>
    </div>

    <div className="col-md-4">
        <select
            className="form-select"
            value={gender}
            onChange={(e) => {setGender(e.target.value);
            setPage(1);}}
            >
            
        
            <option value="">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
        </select>
    </div>

    <div className="col-md-4">
        <select
            className="form-select"
            value={semester}
            onChange={(e) => {setSemester(e.target.value);
            setPage(1);
            }}
            >
        
            <option value="">All Semesters</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
        </select>
    </div>

</div>

<button
    className="btn btn-secondary mt-2"
    onClick={() => {
        setSearch("");
        setCourse("");
        setGender("");
        setSemester("");
    }}
>
    Reset Filters
</button>
<div className="row mb-4">

    <div className="col-md-3">
        <div className="card text-white bg-primary">
            <div className="card-body">
                <h5>Total Students</h5>
                <h2>{totalStudents}</h2>
            </div>
        </div>
    </div>

    <div className="col-md-3">
        <div className="card text-white bg-success">
            <div className="card-body">
                <h5>Male Students</h5>
                <h2>{maleStudents}</h2>
            </div>
        </div>
    </div>

    <div className="col-md-3">
        <div className="card text-white bg-danger">
            <div className="card-body">
                <h5>Female Students</h5>
                <h2>{femaleStudents}</h2>
            </div>
        </div>
    </div>

    <div className="col-md-3">
        <div className="card text-white bg-warning">
            <div className="card-body">
                <h5>Other</h5>
                <h2>{otherStudents}</h2>
            </div>
        </div>
    </div>

</div>
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
               onClick={() => navigate(`/edit-student/${student._id}`)}
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

    <div className="d-flex justify-content-between align-items-center mt-3">

    <button
        className="btn btn-primary"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
    >
        Previous
    </button>

    <span>
        Page {page} of {totalPages}
    </span>

    <button
    
        className="btn btn-primary"
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
    >
        Next
    </button>

</div>

  </div>
);
}



export default Home;