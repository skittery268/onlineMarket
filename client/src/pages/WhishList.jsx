import { useNavigate } from "react-router";
import { useWhishList } from "../context/WhishList";
import { useCart } from "../context/CartContext";

const WhishList = () => {
    const { whishList } = useWhishList();
    const navigate = useNavigate();
    const { cart, setCart, changeQuantity, addToCart } = useCart();

    const saveToLocalStorage = (product) => {
        localStorage.setItem("product", JSON.stringify(product));
    }

    const addCart = (product) => {
        const exist = cart.find(p => p._id === product._id)

        if (exist) {
            setCart(prev => {
                return prev.map(p => {
                    if (p._id === product._id) {
                        changeQuantity(p._id, p.quantity + 1);
                        return { ...p, quantity: p.quantity + 1 };
                    } else {
                        return p;
                    }
                })
            })
        } else {
            addToCart(product);
        }
    }

    return (
        <>
            <h1 className="text-[30px] mt-17 ml-45">Whish List</h1>
            { whishList.length === 0 && <h1 className="ml-45 mt-2 text-[25px]">Your whish list is currently empty.</h1> }
            <section className="flex justify-center">
                <div className="flex justify-center items-center flex-wrap mt-10 gap-5 w-300">
                    {
                        whishList.map(product => {
                            return (
                                <div key={product._id} className="relative w-70 flex justify-center items-center flex-col shadow rounded-[20px] h-100 hover:shadow-lg duration-300 group">
                                    <img src={product.img} alt={product.title} className="w-70 h-[80%] cursor-pointer" onClick={() => { saveToLocalStorage(product); navigate(`/product/${product._id}`) }} />
                                    <p className="text-center h-[20%] text-[14px] mt-2 hover:text-[#21B3F1] duration-500 cursor-pointer" onClick={() => { saveToLocalStorage(product); navigate(`/product/${product._id}`) }}>{product.title}</p>
                                    <p className="text-center h-[20%] text-[16px] text-[#21B3F1] font-bold">${product.price}.00</p>
                                    <button className="absolute bg-white h-10 w-30 border border-gray-300 rounded-full -bottom-3 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bottom-5 hover:bg-[#21B3F1] hover:text-white cursor-pointer active:bg-white active:text-[#21B3F1]" onClick={() => addCart(product)}>Add To Cart</button>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
        </>
    )
}

export default WhishList;