import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const Authcontext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchUser = async () => {

            const token = localStorage.getItem("token");

            if (!token) {
                setLoading(false);
                return;
            }

            try {

                const response = await api.get("/auth/me");

                setUser(response.data);

            } catch (err) {

                localStorage.removeItem("token");
                setUser(null);

            }

            setLoading(false);
        };

        fetchUser();

  
    }, []);
       const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
};   


    return (
        <Authcontext.Provider value={{ user, setUser, loading ,logout}}>
            {children}
        </Authcontext.Provider>
    );
};

export const useAuth = () => useContext(Authcontext);