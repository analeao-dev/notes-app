import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/cart-context';
import { useState } from 'react';

const Header = () => {
	const { cart, totalItems, totalPrice, removeFromCart, clearCart } = useCart();
	const [showDropdown, setshowDropdown] = useState(false);

	return (
		<div className='relative'>
			<div className='flex justify-between items-center p-6 bg-white shadow-md'>
				<h1 className='text-xl text-blue-600 font-extrabold'>ShopMate</h1>
				<div className='relative'>
					<button className='cursor-pointer' onClick={() => setshowDropdown(!showDropdown)}>
						<div className='relative'>
							<FaShoppingCart className='text-gray-500 text-2xl' />
							{totalItems > 0 && (
								<span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full'>
									{totalItems}
								</span>
							)}
						</div>
					</button>
				</div>
			</div>

			{showDropdown && (
				<div className='absolute right-0 top-14 mr-4 bg-white w-80 p-4 border shadow-lg rounded z-50'>
					<h2 className='font-semibold text-lg mb-2'>Cart Items</h2>
					{cart.length === 0 ? (
						<p className='text-gray-500 text-sm'>Your cart is empty</p>
					) : (
						<>
							<ul className='max-h-60 overflow-y-auto divide-y divide-gray-200'>
								{cart.map((item) => (
									<li key={item.id} className='flex justify-between items-center'>
										<div>
											<p className='font-semibold'>{item.name}</p>
											<p className='text-sm text-gray-500'>
												{item.quantity} x ${item.price}
											</p>
										</div>
										<button
											onClick={() => removeFromCart(item)}
											className='text-sm text-red-500 hover:underline cursor-pointer'
										>
											Remove
										</button>
									</li>
								))}
							</ul>
							<div className='mt-4 flex justify-between font-semibold'>
								<span>Total:</span>
								<span>${totalPrice}</span>
							</div>
							<button
								onClick={clearCart}
								className='w-full mt-3 bg-red-500 rounded p-2 text-white font-medium cursor-pointer transition hover:bg-red-600'
							>
								Clear Cart
							</button>
						</>
					)}
				</div>
			)}
		</div>
	);
};

export default Header;
