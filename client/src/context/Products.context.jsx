import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./Auth.context";

const ProductsContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useProducts = () => useContext(ProductsContext);

const api_url = "http://localhost:3000/api/products"

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const { user } = useAuth();

    const getAllProducts = async () => {
        try {
            const res = await fetch(api_url);

            const data = await res.json();

            setProducts(data);
        } catch (err) {
            console.log(err);
        }
    } 

    useEffect(() => {
        if (products.length === 0) getAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const uploadProduct = async (formData) => {
        try {
            const res = await fetch(`${api_url}/${user._id}`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            products.push(data);
        } catch (err) {
            console.log(err);
        }
    }

    const deleteProduct = async (id) => {
        try {
            const res = await fetch(`${api_url}/${id}`, {
                method: "DELETE"
            })

            if (!res.ok) {
                const data = await res.json();
                console.log(data);
                return;
            }

            const data = await res.json();
            setProducts(data);
        } catch (err) {
            console.log(err);
        }
    }

    const editProduct = async (formData, id) => {
        try {
            const res = await fetch(`${api_url}/${id}`, {
                method: "PATCH",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(formData)
            })

            const data = await res.json();

            setProducts(data);
        } catch (err) {
            console.log(err);
        }
    }
    
    return (
        <ProductsContext.Provider value={{ products, getAllProducts, uploadProduct, deleteProduct, editProduct }}>
            {children}
        </ProductsContext.Provider>
    )
}