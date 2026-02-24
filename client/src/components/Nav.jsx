import { Link } from "react-router";
import { useAuth } from "../context/Auth.context";
import { useState } from "react";

const Nav = () => {
    const [open, setOpen] = useState(false);

    const { user, logout } = useAuth();

    return (
        <header className="flex justify-center items-center">
            <div className="h-20"></div>
            <nav className="pt-3 h-20 w-full bg-blue-400 pb-3 fixed top-0 z-10">
                <Link to={"/"} className="text-[25px] text-white absolute top-4 left-20">Online Market</Link>
                <ul className="absolute top-6 left-100 flex justify-center items-center text-white gap-10">
                    <li><Link to={"/"} className="text-[17px] hover:text-[#e5e5e5] transition">Home</Link></li>
                    { user && <li><Link to={"/shop"} className="text-[17px] hover:text-[#e5e5e5] transition">Shop</Link></li> } 
                </ul>
                
                <img src={user?.role === "admin" ? "./icons/management.png" : "./icons/settings.png"} onClick={() => setOpen(!open)} className="absolute right-10 h-5 top-6 cursor-pointer" />

                {
                    open && (
                        <div className={`bg-white ${user ? "h-50" : "h-20"} ${user?.role === "admin" && "h-60"} w-50 absolute right-10 top-15 rounded-[5px] flex flex-col justify-center gap-3 pl-6 shadow-lg`}>
                            {
                                user?.role === "admin" && (
                                    <>
                                        <Link to={"/admin"} onClick={() => setOpen(false)} className="text-gray-400 w-25 hover:text-red-500 transition duration-300">Admin Panel</Link>
                                    </>
                                )
                            }
                            {
                                !user ? (
                                    <>
                                        <Link to={"/login"} onClick={() => setOpen(false)} className="text-gray-400 w-5 hover:text-blue-400 transition duration-300">Login</Link>
                                        <Link to={"/register"} onClick={() => setOpen(false)} className="text-gray-400 w-5 hover:text-blue-400 transition duration-300">Register</Link>
                                    </>
                                ) : (
                                    <>
                                        <Link to={"/profile"} onClick={() => setOpen(false)} className="text-gray-400 w-25 hover:text-blue-400 transition duration-300">My Account</Link>
                                        <Link to={"/cart"} onClick={() => setOpen(false)} className="text-gray-400 w-5 hover:text-blue-400 transition duration-300">Cart</Link>
                                        <Link to={"/wishlist"} onClick={() => setOpen(false)} className="text-gray-400 w-20 hover:text-blue-400 transition duration-300">Whish List</Link>
                                        <Link to={"/uploadproduct"} onClick={() => setOpen(false)} className="text-gray-400 w-30 hover:text-blue-400 transition duration-300">Upload Product</Link>
                                        <button onClick={() => { logout(); setOpen(false) }} className="text-[17px] text-gray-400 hover:text-red-500 text-start transition duration-300 cursor-pointer">Log Out</button>
                                    </>
                                )
                            }
                        </div>
                    )
                }
            </nav>
        </header>
    )
}

export default Nav;