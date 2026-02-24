import { useCategories } from "../context/Categories.context";
import { Link } from "react-router";
import { useAuth } from "../context/Auth.context";

const Categories = () => {
    const { categories } = useCategories();
    const { user } = useAuth();

    if (categories.length === 0) return null;

    return (
        <section className="py-16 px-6 bg-gray-50">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">Browse Categories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map(category => (
                        <Link  key={category._id} to={user ? `/products/${category.categori}` : "/login"} className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-xl duration-300 transition">
                            <div className="text-5xl mb-4"><img src={category.img} alt={category.categori} /></div>
                            <h3 className="text-xl font-bold text-gray-800">{category.categori}</h3>
                            <p className="text-gray-500 mt-2">Click to explore</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Categories;