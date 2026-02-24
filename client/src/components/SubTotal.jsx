import { useCart } from "../context/CartContext";

const SubTotal = ({ open }) => {
    const { cart } = useCart();

    const subtotal = cart.reduce((total, product) => {
        return total + Number(product.price) * Number(product.quantity);
    }, 0);

    return (
        <>
            <table className={`ml-30 border border-gray-300 duration-300 ${open ? "mt-18" : "mt-5"}`}>
                <thead>
                    <tr>
                        <th className="pl-87.5 text-[15px] pt-3 pb-3">Shipping, taxes, and discounts will be calculated at checkout.</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-t border-t-gray-300">
                        <td className="text-right pr-5 font-bold">Subtotal:</td>
                        <td className="pr-5 text-[15px] font-bold pt-3 pb-3 border-l border-l-gray-300 pl-87.5">${subtotal}.00</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default SubTotal;