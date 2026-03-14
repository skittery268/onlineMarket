import { useEffect, useState } from "react";
import { useContext, createContext } from "react";
import { useNavigate } from "react-router";
import { toast } from 'react-toastify';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

const api_url = "https://onlinemarket-o6s5.onrender.com/api/users";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const navigate = useNavigate();

    useEffect(() => {
        const isLogged = JSON.parse(localStorage.getItem("user"));

        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (isLogged) setUser(isLogged);

        setLoading(false);
    }, [])

    const register = async (formData) => {
        try {
            const res = await fetch(`${api_url}/register`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message);
                return;
            }

            navigate("/login");
            toast.success("User registered successfully!");
        } catch (err) {
            toast.error(err.message);
        }
    }

    const login = async (formData) => {
        try {
            const res = await fetch(`${api_url}/login`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(formData)
            })

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message);
                return;
            }

            setUser(data);
            if (formData.remember === "on") localStorage.setItem("user", JSON.stringify(data));
            navigate("/profile");
            toast.success("Login successful");
        } catch (err) {
            toast.error(err.message);
        }
    }

    const logout = async () => {
        setUser(null);
        localStorage.removeItem("user");
        navigate("/")
        toast.success("Logout successful!");
    }

    const editInfo = async (formData) => {
        try {
            const res = await fetch(`${api_url}/edit/${formData.id}`, {
                method: "PATCH",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(formData)
            })

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message);
                return;
            }

            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
            toast.success("User info edited successfully!");
        } catch (err) {
            toast.error(err.message);
        }
    }

    return (
        <AuthContext.Provider value={{ loading, user, editInfo, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}