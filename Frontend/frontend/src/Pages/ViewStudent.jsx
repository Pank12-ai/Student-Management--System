import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function ViewStudent() {
    console.log("ViewStudent Rendered");
    const { id } = useParams();
    const navigate = useNavigate();

    const [student, setStudent] = useState(null);

    useEffect(() => {
        fetchStudent();
    }, []);

    const fetchStudent = async () => {
        try {
           console.log("Student ID:", id);
            const response = await api.get(`/students/${id}`);
            console.log("Response:", response.data);
            setStudent(response.data);

        } catch (err) {
            console.log(err.response?.data);
        }
    };

    if (!student) {
        return <h3 className="text-center mt-5">Loading...</h3>;
    }
   console.log(student);
    return (
        <div className="container mt-4">

            <div className="card shadow">

                <div className="card-header bg-primary text-white">
                    <h3>Student Details</h3>
                </div>

                <div className="card-body">

                    <p><strong>Name :</strong> {student.name}</p>

                    <p><strong>Email :</strong> {student.email}</p>

                    <p><strong>Roll No :</strong> {student.rollNo}</p>

                    <p><strong>Course :</strong> {student.course}</p>

                    <p><strong>Semester :</strong> {student.semester}</p>

                    <p><strong>Gender :</strong> {student.gender}</p>

                    <p><strong>Age :</strong> {student.Age}</p>

                    <button
                        className="btn btn-secondary"
                        onClick={() => navigate("/")}
                    >
                        Back
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ViewStudent;