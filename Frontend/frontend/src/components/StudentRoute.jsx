import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext"; 

function StudentRoute({ children }) {

    const { Student, loading } = useAuth();

    if (loading) return <h3>Loading...</h3>;

    if (!Student) {
        return <Navigate to="/login" />;
    }

    if (user.role !== "Student") {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default StudentRoute; 