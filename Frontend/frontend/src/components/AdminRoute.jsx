import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

function AdminRoute({ children }) {

    const { user, loading } = useAuth();
     console.log("AUTH CONTEXT:",user,loading );
    if (loading) return <h3>Loading...</h3>;

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (user.role !== "admin") {
        return <Navigate to="/user-dashboard" replace />;
    }

    return children;
}

export default AdminRoute;