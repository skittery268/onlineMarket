import { useCart } from "../context/CartContext";

const Cart = () => {
    const { cart, setCart, deleteFromCart, changeQuantity } = useCart();

    const handleSubmit = (e, id) => {
        e.preventDefault();

        const quantity = e.target.quantity.value;

        setCart(prev => {
            return prev.map(product => {
                if (product._id === id) {
                    changeQuantity(product._id, quantity);
                    return { ...product, quantity }
                } else {
                    return product
                }
            })
        })
    }

    return (
        <>
            {
                cart.length === 0 ? (
                    <p className="ml-30 mt-2 text-[25px]">Your cart is currently empty.</p>
                ) : (
                    <table className="border ml-30 mt-5 border-gray-300">
                        <thead>
                            <tr className="border">
                                <th className="border border-gray-300 pr-15 pl-15 pt-2 pb-2">Image</th>
                                <th className="border border-gray-300 pr-45 pl-45 pt-2 pb-2">Product Name</th>
                                <th className="border border-gray-300 pr-25 pl-25 pt-2 pb-2">Quantity</th>
                                <th className="border border-gray-300 pr-12 pl-12 pt-2 pb-2">Unit Price</th>
                                <th className="border border-gray-300 pr-12 pl-12 pt-2 pb-2">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cart.map(p => {
                                    return (
                                        <tr key={p._id} className="border border-gray-300">
                                            <td className="border-r border-r-gray-300 flex justify-center items-center"><img src={p.img} className="hover:shadow duration-300 h-27 border border-gray-300 m-3 rounded-[5px]" /></td>
                                            <td className="border-r border-r-gray-300 text-center text-gray-400">{p.title}</td>
                                            <td className="flex relative border-r border-r-gray-300">
                                                <form onSubmit={(e) => handleSubmit(e, p._id)} className="border absolute bottom-7 left-13 border-gray-300 text-gray-400 rounded-[5px]">
                                                    <input type="number" name="quantity" min={"1"} max={p.productCount} placeholder={p.quantity} className="h-10 w-30 pl-3 outline-none pr-3" />
                                                </form>
                                                <button className="h-10 w-10 rounded-[5px] bg-red-600 flex justify-center items-center absolute bottom-7.5 hover:bg-red-700 cursor-pointer duration-300 left-45" onClick={() => deleteFromCart(p._id)}><img src="../icons/cross.png" className="h-4 w-4 bg-white rounded-full" /></button>
                                            </td>
                                            <td className="border-l border-r border-l-gray-300 border-r-gray-300 text-center">${p.price}.00</td>
                                            <td className="text-center">${parseInt(p.price) * parseInt(p.quantity)}.00</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                )
            }
        </>
    )
}

export default Cart;