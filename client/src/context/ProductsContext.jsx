import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

const ProductsContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useProducts = () => useContext(ProductsContext);

const api_url = "https://onlinemarket-o6s5.onrender.com/api/products"

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
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (products.length === 0) getAllProducts();
    }, [products.length])

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

            if (!res.ok) {
                toast.error(data.message);
                return;
            }

            products.push(data);
            toast.success("Product uploaded successfully!");
        } catch (err) {
            toast.error(err.message);
        }
    }

    const deleteProduct = async (id) => {
        try {
            const res = await fetch(`${api_url}/${id}`, {
                method: "DELETE"
            })

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message);
                return;
            }

            setProducts(data);
            toast.success("Product deleted successfully!");
        } catch (err) {
            toast.error(err.message);
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