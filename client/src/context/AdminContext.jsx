import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./Auth.context";

const AdminContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAdmin = () => useContext(AdminContext);

const api_url = "https://onlinemarket-o6s5.onrender.com/api/admin";

export const AdminProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const { user, loading } = useAuth();

    const getAllUsers = async () => {
        try {
            const res = await fetch(`${api_url}/users`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(user)
            });

            const data = await res.json();

            setUsers(data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (!loading) getAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading])

    const deleteUser = async (id) => {
        try {
            const res = await fetch(`${api_url}/deleteuser/${id}`, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(user)
            });

            const data = await res.json();

            setUsers(data);
        } catch (err) {
            console.log(err);
        }
    }

    const changeRole = async (id, role) => {
        try {
            const res = await fetch(`${api_url}/changerole/${id}/${user._id}`, {
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({ role })
            })

            const data = await res.json();

            if (!res.ok) {
                throw new Error("Failed to change role");
            }

            setUsers(data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <AdminContext.Provider value={{ users, getAllUsers, deleteUser, changeRole }}>
            {children}
        </AdminContext.Provider>
    )
}