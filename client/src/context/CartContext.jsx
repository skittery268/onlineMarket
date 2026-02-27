import { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { useAuth } from "./AuthContext";
import { useCategories } from "./CategoriesContext";
import { useProducts } from "./ProductsContext";

const CartContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);

const api_url = "https://onlinemarket-o6s5.onrender.com/api/cart";

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const { loading, user } = useAuth();
    const { getCategories } = useCategories();
    const { getAllProducts } = useProducts();

    const getCart = async () => {
        try {
            const res = await fetch(`${api_url}/${user._id}`);

            const data = await res.json();

            setCart(data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (!loading && cart.length === 0) getCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading])

    const addToCart = async (product) => {
        try {
            const res = await fetch(`${api_url}/${user._id}`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(product)
            })

            const data = await res.json();

            setCart(data);
        } catch (err) {
            console.log(err);
        }
    }

    const deleteFromCart = async (productId) => {
        try {
            const res = await fetch(`${api_url}/${user._id}/${productId}`, {
                method: "DELETE"
            })

            const data = await res.json();

            setCart(data);
        } catch (err) {
            console.log(err);
        }
    }

    const changeQuantity = async (productId, quantity) => {
        try {
            const res = await fetch(`${api_url}/${user._id}/${productId}/${quantity}`, {
                method: "PATCH"
            })

            const data = await res.json();

            setCart(data);
        } catch (err) {
            console.log(err);
        }
    }

    const clearCart = async () => {
        try {
            const res = await fetch(`${api_url}/${user._id}`, {
                method: "DELETE"
            })

            const data = await res.json();

            setCart(data);
            localStorage.removeItem("product");
            getCategories();
            getAllProducts();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <CartContext.Provider value={{ cart, clearCart, changeQuantity, deleteFromCart, setCart, getCart, addToCart }}>
            {children}
        </CartContext.Provider>
    )
}