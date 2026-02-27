import { useNavigate } from "react-router";
import { useCategories } from "../context/CategoriesContext";

const Shop = () => {
    const { categories } = useCategories();
    const navigate = useNavigate();

    return (
        <section className="flex justify-center items-center flex-col">
            <h1 className="text-[40px] mt-12.5">CATEGORIES</h1>
            <div className="w-[82%] flex justify-center items-center flex-wrap gap-10 mt-10">
                {
                    categories.map(categori => {
                        return (
                            <div key={categori._id} onClick={() => navigate(`/products/${categori.categori}`)} className="w-80 shadow hover:shadow-xl duration-300 rounded-[5px] h-92.5 cursor-pointer">
                                <img src={categori.img} alt={categori.categori} className="w-full h-[80%]" />
                                <p className="text-center h-[20%] text-2xl mt-2">{categori.categori} ({categori.productCount} items)</p>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}

export default Shop;