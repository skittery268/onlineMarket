import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { toast } from 'react-toastify';

const AdminContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAdmin = () => useContext(AdminContext);

const api_url = "https://onlinemarket-o6s5.onrender.com/api/admin";

export const AdminProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const { user, loading } = useAuth();

    const getAllUsers = useCallback(async () => {
        if (!user) return;
        try {
            const res = await fetch(`${api_url}/users/${user.role}`);

            const data = await res.json();

            setUsers(data);
        } catch (err) {
            toast.error(err.message);
        }
    }, [user])

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (!loading && user) getAllUsers();

    }, [getAllUsers, loading, user])

    const deleteUser = async (id) => {
        if (!user) return;
        try {
            const res = await fetch(`${api_url}/deleteuser/${id}`, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(user)
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message);
                return;
            }

            setUsers(data);
            toast.success("User deleted successfully!");
        } catch (err) {
            toast.error(err.message);
        }
    }

    const changeRole = async (id, role) => {
        if (!user) return;
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
                toast.error(data.message);
                return;
            }

            setUsers(data);
            toast.success("User role changed successfully!");
        } catch (err) {
            toast.error(err.message);
        }
    }

    return (
        <AdminContext.Provider value={{ users, getAllUsers, deleteUser, changeRole }}>
            {children}
        </AdminContext.Provider>
    )
}