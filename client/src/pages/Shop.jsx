import { useNavigate } from "react-router";
import { useCategories } from "../context/CategoriesContext";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Shop = () => {
    const { categories } = useCategories();
    const navigate = useNavigate();

    return (
        <motion.section initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="flex justify-center items-center flex-col">
            <h1 className="text-[40px] mt-12.5">CATEGORIES</h1>
            <div className="w-[82%] flex justify-center items-center flex-wrap gap-10 mt-10">
                {
                    categories.map(category => {
                        return (
                            <div key={category._id} onClick={() => navigate(`/products/${category.category}`)} className="w-80 shadow hover:shadow-xl duration-300 rounded-[5px] h-92.5 cursor-pointer">
                                <img src={category.img} alt={category.category} className="w-full h-[80%]" />
                                <p className="text-center h-[20%] text-2xl mt-2">{category.category} ({category.productCount} items)</p>
                            </div>
                        )
                    })
                }
            </div>
        </motion.section>
    )
}

export default Shop;