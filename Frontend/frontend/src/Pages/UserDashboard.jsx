import { useEffect, useState } from "react";
import api from "../services/api";

function UserDashboard() {

    const [user, setUser] = useState(null);

    useEffect(() => {

        const fetchMe = async () => {
            try {

                const response = await api.get("/auth/me");

                setUser(response.data);

            } catch (err) {
                console.log(err.response?.data);
            }
        };

        fetchMe();

    }, []);

    if (!user) {
        return <h3>Loading...</h3>;
    }

    return (
        <div className="container mt-4">

            <h2>Welcome {user.name} 👋</h2>

            <div className="card mt-3">
                <div className="card-body">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                </div>
            </div>

        </div>
    );
}

export default UserDashboard;