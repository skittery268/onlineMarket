import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

const WhishListContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useWhishList = () => useContext(WhishListContext);

const api_url = "https://onlinemarket-o6s5.onrender.com/api/whishlist"

export const WhishListProvider = ({ children }) => {
    const [whishList, setWhishList] = useState([]);
    const { loading, user } = useAuth();

    const getWhishList = async () => {
        if (!user) return;
        try {
            const res = await fetch(`${api_url}/${user._id}`);

            const data = await res.json();

            setWhishList(data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (!loading && user && whishList.length === 0) getWhishList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, user])

    const addToWhishList = async (product) => {
        if (!user) return;
        try {
            const res = await fetch(`${api_url}/${user._id}`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(product)
            })

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message);
                return;
            }

            setWhishList(data);
            toast.success("Product added to wish list!");
        } catch (err) {
            toast.error(err.message);
        }
    }

    const deleteFromWhishList = async (productId) => {
        if (!user) return;
        try {
            const res = await fetch(`${api_url}/${user._id}/${productId}`, {
                method: "DELETE"
            })

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message);
                return;
            }

            setWhishList(data);
            toast.success("Product deleted from wish list!");
        } catch (err) {
            toast.error(err.message);
        }
    }

    return (
        <WhishListContext.Provider value={{ whishList, getWhishList, addToWhishList, deleteFromWhishList }}>
            {children}
        </WhishListContext.Provider>
    )
}