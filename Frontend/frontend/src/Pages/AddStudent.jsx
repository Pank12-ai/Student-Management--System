import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function AddStudent() {

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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            await api.post("/students", formData);

            alert("Student Added Successfully");

            navigate("/");

        } catch (err) {
            console.log(err.response?.data);
        }
    };

    return (
        <div className="container mt-4">

            <h2>Add Student</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="form-control mb-3"
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="form-control mb-3"
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter initial Password"
                    className="form-control mb-3"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="rollNo"
                    placeholder="Roll Number"
                    className="form-control mb-3"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="course"
                    placeholder="Course"
                    className="form-control mb-3"
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="semester"
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
                    name="Age"
                    placeholder=" Enter age"
                    className="form-control mb-3"
                    onChange={handleChange}
                />

                <button className="btn btn-success">
                    Add Student
                </button>

            </form>

        </div>
    )
}
export default AddStudent ;