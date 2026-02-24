/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useProducts } from "../context/Products.context";
import { useCart } from "../context/CartContext";
import { useWhishList } from "../context/WhishList";
import { useAuth } from "../context/Auth.context";

const Product = () => {
    const [open, setOpen] = useState(false);
    const [inWhishList, setInWhishList] = useState(false);
    const { id } = useParams();
    const { products, deleteProduct } = useProducts();
    const { cart, setCart, changeQuantity, addToCart } = useCart();
    const { whishList, addToWhishList, deleteFromWhishList } = useWhishList();
    const { user } = useAuth();
    const navigate = useNavigate();

    let product = products.find(p => p._id === id);
    if (localStorage.getItem("product")) {
        product = JSON.parse(localStorage.getItem("product"));
    }

    useEffect(() => {
        const exist = whishList.find(p => p._id === product._id);

        if (exist) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setInWhishList(true);
        } else {
            setInWhishList(false);
        }

        if (!product) {
            navigate("/shop");
        }
    }, [product, navigate, whishList]);

    if (!product) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        const quantity = e.target.quantity.value;

        product.quantity = parseInt(quantity);
    };

    const addCart = () => {
        const exist = cart.find(p => p._id === product._id);

        if (exist) {
            setCart(prev => {
                return prev.map(prod => {
                    if (prod._id === product._id) {
                        changeQuantity(prod._id, product.quantity);
                        return { ...prod, quantity: product.quantity };
                    } else {
                        return prod;
                    }
                })
            })
        } else {
            addToCart(product);
        }
    }

    const addWhishList = () => {
        const exist = whishList.find(p => p._id === product._id);

        if (!exist) {
            addToWhishList(product);
        } else {
            deleteFromWhishList(product._id);
        }
    }

    return (
        <section>
            <div className="h-160 mt-20 flex justify-center items-center">
                <img src={product.img} alt={product.title} className="h-150 w-150 shadow rounded-[45px] mr-10 hover:shadow-lg duration-400" />
                <div>
                    <h1 className="text-2xl">{product.title}</h1>
                    <p className="text-[30px] font-bold text-[#21B3F1] border-b border-b-gray-200 pb-3">${product.price}.00</p>
                    <div className="leading-6.25 border-b border-b-gray-200 pb-3 mb-3">
                        <h1 className="mt-3">Availability: <span className="text-green-500">in Stock</span></h1>
                        <h1>Tags: <span className="text-[#21B3F1] cursor-pointer" onClick={() => navigate(`/products/${product.category}`)}>{product.category}</span></h1>
                        <h1>Collections: <span className="text-[#21B3F1] cursor-pointer" onClick={() => navigate(`/products/${product.category}`)}>{product.category}</span></h1>
                        <h1>Product Count: <span className="text-green-500 cursor-pointer">{product.productCount}</span></h1>
                    </div>

                    <div className="relative">
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="qty" className="text-gray-500">Qty:</label>
                            <input type="number" name="quantity" id="qty" defaultValue={"1"} min={"1"} max={product.productCount} className="mt-25 ml-7 border border-gray-300 outline-none rounded-full h-10 w-23 pl-10 text-gray-400" />
                        </form>

                        <div className={`absolute border cursor-pointer border-gray-300 ${inWhishList ? "bg-[#21B3F1]" : "hover:border-white hover:bg-[#21B3F1]"} rounded-full right-0 bottom-0 h-10 w-10`} onClick={addWhishList}>
                            <img src="/icons/heartBlack.png" className={`p-2 duration-300 ${inWhishList ? "invert" : "hover:invert"}`} />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <button className="mt-10 text-center w-123 rounded-full hover:bg-[#21B3F1] hover:text-white duration-300 cursor-pointer font-bold h-10 border border-gray-300 active:bg-white active:text-[#21B3F1]" onClick={addCart}>Add to Cart</button>
                        { (user?.role === "admin" || product.authorId === user._id) && <button className="mt-3 text-center w-123 rounded-full hover:bg-red-500 hover:text-white duration-300 cursor-pointer font-bold h-10 border border-gray-300 active:bg-white active:text-red-500" onClick={() => { deleteProduct(product._id); navigate("/shop")}}>Delete Product</button> }
                    </div>

                    <div className="flex justify-between items-center mt-5">
                        <div className="relative">
                            <h1 className="text-[20px]">Product Details</h1>

                            {
                                open && <p className="absolute top-10 w-124">{product.description}</p>
                            }
                        </div>

                        {
                            open ? <img src="/icons/minus.png" className="cursor-pointer h-3" onClick={() => setOpen(false)} /> : <img src="/icons/plus.png" className="cursor-pointer h-3" onClick={() => setOpen(true)} />
                        }
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Product;