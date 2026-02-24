import { useEffect, useState } from "react";
import { useContext, createContext } from "react";
import { useNavigate } from "react-router";

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

const api_url = "http://localhost:3000/api/users";

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
                alert(data.message);
                return;
            }

            navigate("/login");
        } catch (err) {
            console.log(err);
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
                alert(data.message);
                return;
            }

            setUser(data);
            if (formData.remember === "on") localStorage.setItem("user", JSON.stringify(data));
            navigate("/profile");
        } catch (err) {
            console.log(err);
        }
    }

    const logout = async () => {
        setUser(null);
        localStorage.removeItem("user");
        navigate("/")
    }

    const editInfo = async (formData) => {
        try {
            const res = await fetch(`${api_url}/edit/${formData.id}`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(formData)
            })

            const data = await res.json();

            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <AuthContext.Provider value={{ loading, user, editInfo, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}