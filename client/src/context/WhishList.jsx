import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./Auth.context";

const WhishListContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useWhishList = () => useContext(WhishListContext);

const api_url = "http://localhost:3000/api/whishlist"

export const WhishListProvider = ({ children }) => {
    const [whishList, setWhishList] = useState([]);
    const { loading, user } = useAuth();

    const getWhishList = async () => {
        try {
            const res = await fetch(`${api_url}/${user._id}`);

            const data = await res.json();

            setWhishList(data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (!loading && whishList.length === 0) getWhishList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, user])

    const addToWhishList = async (product) => {
        try {
            const res = await fetch(`${api_url}/${user._id}`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(product)
            })

            const data = await res.json();

            setWhishList(data);
        } catch (err) {
            console.log(err);
        }
    }

    const deleteFromWhishList = async (productId) => {
        try {
            const res = await fetch(`${api_url}/${user._id}/${productId}`, {
                method: "DELETE"
            })

            const data = await res.json();

            setWhishList(data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <WhishListContext.Provider value={{ whishList, getWhishList, addToWhishList, deleteFromWhishList }}>
            {children}
        </WhishListContext.Provider>
    )
}