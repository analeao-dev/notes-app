import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/cart-context";
import { useState } from "react";

const Header = () => {
    const { carts, totalItems, totalPrice, decreaseCartItem } = useCart();
    const [cartIsOpen, setCartIsOpen] = useState(false);

    const handleCartOpen = () => {
        console.log('clique')
        setCartIsOpen(!cartIsOpen);
    }
    return (
        <>
            <div className="flex justify-between items-center p-6 bg-white">
                <h1 className="text-xl text-blue-600 font-extrabold">ShopMate</h1>
                <div className="relative">
                    <button className="cursor-pointer" onClick={() => handleCartOpen()}>
                        <FaShoppingCart className="text-gray-500 text-2xl" />
                        <span className="inline-flex items-center rounded-full bg-red-400 px-2 py-1 
                    text-xs font-medium text-white inset-ring inset-ring-red-400/20
                    absolute mt-[-35px]">{totalItems}</span>
                    </button>
                </div>
            </div>

            {cartIsOpen && (
                <div className="bg-white w-96 p-4 border-1 shadow-md">
                    {carts && (
                        carts.map((cart) => (
                            <div key={cart.id}>
                                <span className="font-medium">{cart.name}</span>
                                <div className="flex justify-between items-center pb-2 text-sm">
                                    <span className="text-gray-500">{cart.quantity} x {cart.price}</span>
                                    <button onClick={() => decreaseCartItem(cart)} className="text-red-500 cursor-pointer">Remove</button>
                                </div>
                            </div>
                        ))
                    )}
                    <div className="border border-gray-200 my-3"></div>
                    <div className="flex justify-between text-xl font-medium mb-4">
                        <span>Total:</span>
                        <span>${totalPrice}</span>
                    </div>
                    <button className="w-full bg-red-500 rounded p-2 text-white font-medium">Clear Cart</button>
                </div>
            )}

        </>

    )
}

export default Header;