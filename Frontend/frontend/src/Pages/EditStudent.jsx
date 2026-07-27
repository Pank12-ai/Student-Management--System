import { useNavigate,useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../services/api" ;
function EditStudent() {
    
const { id } = useParams();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        rollNo: "",
        course: "",
        semester: "",
        gender: "",
        age: ""
    });
  
     useEffect(() => {
        fetchStudent();
    }, []);

    const fetchStudent = async () => {
        try {

            const response = await api.get(`/students/${id}`);
           console.log("GET Response:", response.data);

            setFormData(response.data);

        } catch (err) {
            console.log(err.response?.data);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
           console.log("Updating ID:", id);
    console.log("Form Data:", formData);

        try {

            const response =await api.put(`/students/${id}`, formData);
             console.log("PUT Response:", response.data);
            alert("Student edited Successfully");

            navigate("/");

        } catch (err) {
              console.log("Full Error:", err);
    console.log("Response:", err.response);
    console.log("Data:", err.response?.data);
        }
    };

    return (
        <div className="container mt-4">

            <h2>Edit Student</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    className="form-control mb-3"
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    className="form-control mb-3"
                    onChange={handleChange}
                />

               

                <input
                    type="text"
                    name="rollNo"
                    placeholder="Roll Number"
                    value={formData.rollNo}
                    className="form-control mb-3"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="course"
                    placeholder="Course"
                    value={formData.course}
                    className="form-control mb-3"
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="semester"
                    value={formData.semester}
                    placeholder="Semester"
                    className="form-control mb-3"
                    onChange={handleChange}
                />

                <select
                    name="gender"
                    className="form-control mb-3"
                    onChange={handleChange}
                >
                    <option value="">Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                </select>

                <input
                    type="number"
                    name="age"
                    placeholder=" Enter age"
                    value={formData.age}
                    className="form-control mb-3"
                    onChange={handleChange}
                />

                <button className="btn btn-success">
                    Update Student
                </button>

            </form>

        </div>
    )
}
export default EditStudent ;