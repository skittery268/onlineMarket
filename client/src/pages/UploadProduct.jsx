import { useEffect } from "react";
import { useCategories } from "../context/Categories.context";
import { useProducts } from "../context/Products.context";
import { useForm } from "../hooks/useForm";

const UploadProduct = () => {
    const { categories, getCategories } = useCategories();
    const [formData, handleChange, handleSubmit, resetForm] = useForm({
        title: "",
        description: "",
        img: "",
        category: "",
        price: 1,
        productCount: 1
    });

    const { uploadProduct } = useProducts();

    useEffect(() => {
        getCategories();
    }, [getCategories, uploadProduct])

    return (
        <section className="relative flex justify-center items-center h-200">
            <h1 className="absolute top-5 text-[40px]">Upload Product</h1>
            <form className="relative flex justify-center items-center flex-col w-200 h-150 shadow-lg rounded-[10px]" onSubmit={(e) => { handleSubmit(e, uploadProduct); resetForm() }}>
                <label className="flex flex-col absolute top-5 left-5">
                    Product Title
                    <input type="text" name="title" value={formData.title} placeholder="Enter Product Title..." onChange={handleChange} className="w-190 border p-2" required />
                </label>
                <label className="flex flex-col absolute top-25 left-5">
                    Product Description
                    <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Enter Product Description..." className="p-2 w-190 h-20 border" required>

                    </textarea>
                </label>
                <label className="flex flex-col absolute top-55 left-5">
                    Image URL
                    <textarea name="img" value={formData.img} placeholder="Enter Image URL..." onChange={handleChange} className="h-22.75 p-2 w-95 border" required>

                    </textarea>
                </label>
                <label className="flex flex-col absolute top-55 right-5">
                    Product Price
                    <input type="number" name="price" value={formData.price} placeholder="Enter price" onChange={handleChange} className="h-7.5 p-2 w-85 border" required />
                </label>
                <label className="flex flex-col absolute top-70 right-5">
                    Product Count
                    <input type="number" name="productCount" value={formData.productCount} placeholder="Enter product count" onChange={handleChange} className="h-7.5 p-2 w-85 border" required />
                </label>
                <h1 className="absolute left-5 bottom-55 text-lg">Choose Product Category</h1>
                <div className="flex flex-wrap absolute left-5 bottom-45 gap-4">
                    {
                        categories.map(category => {
                            return (
                                <label key={category._id} className="flex items-center space-x-2 cursor-pointer">
                                    <input type="radio" name="category" value={category.categori} checked={formData.category === category.categori} onChange={handleChange} className="form-radio h-4 w-4" required />
                                    <span className="capitalize select-none">{category.categori}</span>
                                </label>
                            )
                        })
                    }
                </div>
                <button type="submit" className="absolute bottom-5 left-5 w-190 h-15 bg-gray-800 rounded-full cursor-pointer hover:bg-gray-900 text-white">Submit</button>
            </form>
        </section>
    )
}

export default UploadProduct;