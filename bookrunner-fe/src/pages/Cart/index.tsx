import React, { useEffect, useState } from 'react';
import { FaShoppingCart, FaTrashAlt, FaPlus, FaMinus, FaArrowRight, FaBookOpen, FaCoins } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { AuthState, CartData } from '../../types/auth';
import { checkLogin } from '../Auth/utils/login.util';

const Cart: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartData[]>([]);
    const [auth, setAuth] = useState<AuthState>({
        isAuthenticated: false,
        user: null
    });
    const navigate = useNavigate();
    const server = import.meta.env.VITE_SERVER
    useEffect(() => {
        const fetchData = async () => {
            const data1 = await checkLogin();
            if (!data1.isAuthenticated) {
                navigate('/login');
                return;
            }
            setAuth(data1);
            auth ? auth : auth;
            const response = await fetch(`${server}/api/cart-detail/user/${data1.user?.id}`);
            const data = await response.json();
            setCartItems(data);
        }
        fetchData();
    }, []);

    const getTotal = () => {
        return cartItems.reduce((total, item) => total + (item.book.price * item.quantity), 0);
    };

    const removeItem = (id: number) => {
        fetch(`${server}/api/cart-detail/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const updateQuantity = (id: number, change: number, index: number) => {
        if (change == 1) {
            fetch(`${server}/api/cart-detail/add-quantity`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: id,
                    }),
                }
            )
        } else if (change == -1) {
            fetch(`${server}/api/cart-detail/remove-quantity`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: id,
                    }),
                }
            )
            if (cartItems[index].quantity == 1) {
                removeItem(id);
                cartItems.splice(index, 1);
            }
        }

        setCartItems(cartItems.map(item =>
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
        ));
    };



    const checkOut = async () => {
        if (cartItems.length == 0) {
            alert('Vui lòng thêm vào giỏ hàng');
        } else {
            const res = await fetch(`${server}/api/payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: getTotal() * 1.08,
                })
            })
            const data = await res.json();
            const res3 = await fetch(`${server}/api/check-status-transaction`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    orderId: data.orderId,
                })
            })
            const data3 = await res3.json();
            console.log(data3);
            const res2 = await fetch(`${server}/api/payments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    orderId: data.orderId,
                    amount: (getTotal() * 1.08),
                    user: cartItems[0].user,
                    payUrl: data.payUrl,
                    resultCode: data3.resultCode,
                    message: data3.message,
                })
            })
            const data2 = await res2.json();
            console.log(data2);

            window.location.href = data2.payUrl;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-950 p-6 flex flex-col gap-8 relative">
            {/* Mysterious fog effect */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(79,42,173,0.15),rgba(15,15,26,0.6))] animate-pulse duration-[10s]"></div>

            {/* Decorative elements */}
            <div className="absolute top-10 left-10 text-purple-500/10 text-6xl select-none">⦿</div>
            <div className="absolute bottom-10 right-10 text-purple-500/10 text-6xl select-none">⟡</div>
            <div className="absolute top-1/2 right-1/4 text-purple-500/10 text-4xl select-none">⧗</div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto">
                {/* Header */}
                <h1 className="text-3xl md:text-4xl text-purple-300 text-center mb-8 font-medium tracking-wider drop-shadow-[0_0_8px_rgba(162,136,227,0.5)] flex items-center justify-center">
                    <FaShoppingCart className="mr-3 text-purple-400" />
                    Your Mystical Collection
                </h1>

                {/* Cart content */}
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Cart items */}
                    <div className="w-full lg:w-2/3">
                        <div className="bg-gray-900/70 backdrop-blur-sm border border-purple-900/50 rounded-lg p-6 shadow-[0_0_20px_rgba(79,42,173,0.2)]">
                            <h2 className="text-xl text-purple-300 mb-6 font-medium tracking-wide flex items-center">
                                <FaBookOpen className="mr-2" /> Arcane Tomes ({cartItems.length})
                            </h2>

                            {cartItems.length > 0 ? (
                                <div className="space-y-6">
                                    {cartItems.map((item, index) => (
                                        <div key={item.id} className="flex items-center p-4 bg-gray-800/40 rounded-lg border border-purple-900/30 hover:border-purple-700/50 transition-all duration-300">
                                            <div className="w-16 h-24 md:w-20 md:h-28 flex-shrink-0 bg-gray-800 rounded overflow-hidden shadow-[0_0_10px_rgba(79,42,173,0.3)]">
                                                <img
                                                    src={item.book.image}
                                                    alt={item.book.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            {/* Book details */}
                                            <div className="ml-4 md:ml-6 flex-1">
                                                <h3 className="font-medium text-lg text-purple-300">{item.book.title}</h3>
                                                <p className="text-gray-400 text-sm">by {item.book.author.name}</p>
                                                <p className="text-purple-400 font-medium mt-2">{item.book.price.toLocaleString('vi-VN')} VND</p>
                                            </div>

                                            {/* Quantity controls */}
                                            <div className="flex items-center space-x-1 md:space-x-2 ml-2">
                                                <button
                                                    onClick={() => updateQuantity(item.id, -1, index)}
                                                    className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-800 text-purple-300 hover:bg-purple-900 transition-colors duration-300 border border-purple-700/50"
                                                >
                                                    <FaMinus size={12} />
                                                </button>

                                                <span className="w-8 text-center text-gray-300">{item.quantity}</span>

                                                <button
                                                    onClick={() => updateQuantity(item.id, 1, index)}
                                                    className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-800 text-purple-300 hover:bg-purple-900 transition-colors duration-300 border border-purple-700/50"
                                                >
                                                    <FaPlus size={12} />
                                                </button>

                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-red-900/30 text-red-300 hover:bg-red-900/50 transition-colors duration-300 ml-2 border border-red-800/50"
                                                >
                                                    <FaTrashAlt size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-10">
                                    <p className="text-gray-400 mb-2">Your collection is empty.</p>
                                    <p className="text-gray-500 text-sm">Discover mystical tomes to add to your arcane library.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Order summary */}
                    <div className="w-full lg:w-1/3">
                        <div className="bg-gray-900/70 backdrop-blur-sm border border-purple-900/50 rounded-lg p-6 shadow-[0_0_20px_rgba(79,42,173,0.2)] sticky top-6">
                            <h2 className="text-xl text-purple-300 mb-6 font-medium tracking-wide flex items-center">
                                <FaCoins className="mr-2" /> Order Summary
                            </h2>

                            <div className="space-y-4">
                                <div className="flex justify-between text-gray-300">
                                    <span>Subtotal</span>
                                    <span>{getTotal().toLocaleString('vi-VN')} VND</span>
                                </div>

                                <div className="flex justify-between text-gray-300">
                                    <span>Shipping</span>
                                    <span className="text-purple-400">Free</span>
                                </div>

                                <div className="flex justify-between text-gray-300">
                                    <span>Tax</span>
                                    <span>{(getTotal() * 0.08).toLocaleString('vi-VN')} VND</span>
                                </div>

                                <div className="h-px bg-purple-900/50 my-4"></div>

                                <div className="flex justify-between font-medium">
                                    <span className="text-gray-200">Total</span>
                                    <span className="text-purple-300 text-xl">
                                        {(getTotal() * 1.08).toLocaleString('vi-VN')} VND
                                    </span>
                                </div>

                                <div className="pt-4">
                                    <button
                                        onClick={() => checkOut()}
                                        className="w-full py-3 bg-purple-800/80 hover:bg-purple-700/80 text-purple-100 rounded-md font-medium tracking-wide transition-colors duration-300 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(147,51,234,0.3)] border border-purple-700/50">
                                        Proceed to Checkout <FaArrowRight size={14} />
                                    </button>
                                </div>

                                <Link to="/shop" className="pt-2">
                                    <button
                                        className="w-full py-2 bg-transparent hover:bg-gray-800/50 text-purple-400 hover:text-purple-300 rounded-md font-medium tracking-wide transition-colors duration-300 border border-purple-900/50 hover:border-purple-700/50">
                                        Continue Browsing
                                    </button>
                                </Link>

                                {/* Coupon code
                                <div className="pt-4">
                                    <div className="text-sm text-gray-400 mb-2">Add a Coupon Code</div>
                                    <div className="flex">
                                        <input
                                            type="text"
                                            placeholder="Enter code"
                                            className="flex-1 py-2 px-3 bg-gray-800/50 border border-purple-900/50 focus:border-purple-700/50 rounded-l-md text-gray-300 outline-none transition-colors duration-300"
                                        />
                                        <button className="px-4 bg-purple-900/80 hover:bg-purple-800 text-purple-300 rounded-r-md transition-colors duration-300 border-y border-r border-purple-700/50">
                                            Apply
                                        </button>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;