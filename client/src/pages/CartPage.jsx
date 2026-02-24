import { useState } from "react";
import { useNavigate } from "react-router";
import Order from "../components/Order";
import Cart from "../components/Cart";
import SubTotal from "../components/SubTotal";
import { useCart } from "../context/CartContext";

const CartPage = () => {
    const [open, setOpen] = useState(false);
    const [openOrder, setOpenOrder] = useState(false);
    const { cart } = useCart();
    const navigate = useNavigate();

    return (
        <>
            <h1 className="text-[30px] mt-17 ml-30">Shopping Cart</h1>
            <Cart />

            {
                cart.length !== 0 && (
                    <>
                        <div className="ml-30 bg-[#F8F8F8] border border-[#D2D2D2] mt-5 w-302 h-13 flex items-center relative transition">
                            <p className="ml-4 text-[#7E7E7E] cursor-pointer hover:text-[#21B3F1] duration-300" onClick={() => setOpen(!open)}>Discount Coupon 🠋</p>

                            <div className={`transition deuration-300 absolute border border-[#D2D2D2] w-302 h-13 flex justify-center items-center ${open ? "translate-y-13 opacity-100" : "translate-y-0 opacity-0 pointer-events-none"}`}>
                                <input type="text" name="discount" placeholder="50fifty" className="w-295 pl-5 outline-none h-9 border border-gray-300 rounded-[5px]" />
                            </div>
                        </div>

                        <SubTotal open={open} />

                        <div className="w-302 ml-30 mt-5 flex justify-between items-center">
                            <button onClick={() => navigate("/shop")} className="bg-[#21B3F1] text-white h-12 w-46 rounded-full hover:bg-[#454545] cursor-pointer duration-300">Continue Shopping</button>
                            <button onClick={() => setOpenOrder(true)} className="bg-[#21B3F1] text-white h-12 w-54 rounded-full hover:bg-[#454545] cursor-pointer duration-300">PROCEED TO CHECK OUT</button>
                        </div>
                    </>
                )
            }

            { openOrder && <Order setOpenOrder={setOpenOrder} /> }
        </>
    )
}

export default CartPage;