import { useAuth } from "../context/Auth.context";
import { useProducts } from "../context/Products.context";
import { Link } from "react-router";

const FeaturedProducts = () => {
    const { products } = useProducts();
    const { user } = useAuth();

    const featuredProducts = products.slice(0, 8);

    if (featuredProducts.length === 0) return null;

    const saveToLocalStorage = (product) => {
        localStorage.setItem("product", JSON.stringify(product));
    }

    return (
        <section className="py-16 px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">Featured Products</h2>
                    <p className="text-gray-600 text-center mb-12">Check out our best sellers this season</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {
                            featuredProducts.map(product => (
                                <div  key={product._id || product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl duration-300 transition">
                                    <div className="bg-gray-200 h-48 flex items-center justify-center overflow-hidden">
                                        {
                                            product.img ? (
                                                <img src={product.img} alt={product.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-5xl">📷</span>
                                            )
                                        }
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-gray-800 truncate">{product.name}</h3>
                                        <p className="text-gray-600 text-sm mt-2 line-clamp-2">{product.description}</p>
                                        <div className="flex justify-between items-center mt-4">
                                            <div>
                                                <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                                                { product.category && <p className="text-xs text-gray-500 mt-1">{product.category}</p> }
                                            </div>
                                            {
                                                user && (
                                                    <Link  to={`/product/${product._id}`} onClick={() => saveToLocalStorage(product)} className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500 transition text-sm font-semibold">
                                                        View
                                                    </Link>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    {
                        user && (
                            <div className="text-center mt-12">
                                <Link  to="/shop" className="bg-blue-600 text-white px-10 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
                                    View All Products
                                </Link>
                            </div>
                        )
                    }
                </div>
            </section>
    )
}

export default FeaturedProducts;