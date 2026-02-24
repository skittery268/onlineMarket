import { createContext, useContext, useEffect, useState } from "react";

const CategoriesContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCategories = () => useContext(CategoriesContext);

const api_url = "http://localhost:3000/api/categories"

export const CategoriesProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
        try {
            const res = await fetch(`${api_url}`);

            const data = await res.json();

            if (!res.ok) throw new Error(data.message);

            setCategories(data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (categories.length === 0) getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <CategoriesContext.Provider value={{ categories, setCategories, getCategories }}>
            {children}
        </CategoriesContext.Provider>
    )
}