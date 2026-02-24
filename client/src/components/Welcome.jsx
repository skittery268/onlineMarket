import { Link } from "react-router";
import { useAuth } from "../context/Auth.context"

const Welcome = () => {
    const { user } = useAuth();

    return (
        <section className="bg-linear-to-r from-blue-400 to-blue-600 text-white py-20 px-6">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="flex-1">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">Welcome to Online Market</h1>
                    <p className="text-lg md:text-xl mb-8 text-blue-100">
                        Discover the best products with amazing prices. Shop online and enjoy fast delivery to your door.
                    </p>
                    <div className="flex gap-4">
                        {user ? (
                            <Link 
                                to="/shop" 
                                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-100 transition"
                            >
                                Start Shopping
                            </Link>
                        ) : (
                            <>
                                <Link 
                                    to="/login" 
                                    className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-100 transition"
                                >
                                    Login
                                </Link>
                                <Link 
                                    to="/register" 
                                    className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-500 transition"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
                <div className="flex-1">
                    <div className="bg-blue-300 rounded-lg p-8 text-center">
                        <p className="text-3xl font-bold">🛍️</p>
                        <p className="text-2xl font-bold mt-4">Shop & Save</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Welcome;