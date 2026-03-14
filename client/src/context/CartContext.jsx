import { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

const CartContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);

const api_url = "https://onlinemarket-o6s5.onrender.com/api/cart";

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const { loading, user } = useAuth();

    const getCart = async () => {
        if (!user) return;
        try {
            const res = await fetch(`${api_url}/${user._id}`);

            const data = await res.json();

            setCart(data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (!loading && user && cart.length === 0) getCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, user])

    const addToCart = async (product) => {
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

            setCart(data);
            toast.success("Product added to cart!");
        } catch (err) {
            toast.error(err.message);
        }
    }

    const deleteFromCart = async (productId) => {
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

            setCart(data);
            toast.success("Product deleted from cart!");
        } catch (err) {
            toast.error(err.message);
        }
    }

    const changeQuantity = async (productId, quantity) => {
        if (!user) return;
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
        if (!user) return;
        try {
            const res = await fetch(`${api_url}/${user._id}`, {
                method: "DELETE"
            })

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message);
                return;
            }

            setCart(data);
            localStorage.removeItem("product");
            toast.success("Products paid for!");
        } catch (err) {
            toast.error(err.message);
        }
    }

    return (
        <CartContext.Provider value={{ cart, clearCart, changeQuantity, deleteFromCart, setCart, getCart, addToCart }}>
            {children}
        </CartContext.Provider>
    )
}