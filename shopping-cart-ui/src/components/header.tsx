import { useCart } from "../context/cart-context";

const Header = () => {
    const { products } = useCart();
    return (
        <div className="bg-white">
            <h1 className="text-xl text-blue-600 font-extrabold">ShopMate</h1>
            <p>{products}</p>
        </div>
    )
}

export default Header;