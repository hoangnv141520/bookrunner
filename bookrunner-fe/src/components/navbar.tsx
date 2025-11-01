import React, { useState, useEffect, useCallback } from 'react';
import { FaShoppingCart, FaSearch, FaStore } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { checkLogin, logout } from '../pages/Auth/utils/login.util';
import { AuthState } from '../types/auth';

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const [auth, setAuth] = useState<AuthState>({
        isAuthenticated: false,
        user: null
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await checkLogin();
                setAuth(data);
            } catch (error) {
                console.error("Failed to check login status:", error);
            }
        };
        fetchData();
    }, []);

    const handleScroll = useCallback(() => {
        const currentScrollPos = window.scrollY;
        const isScrollingDown = prevScrollPos < currentScrollPos;

        if (isScrollingDown && currentScrollPos > 70) {
            setVisible(false);
        } else {
            setVisible(true);
        }

        setPrevScrollPos(currentScrollPos);
    }, [prevScrollPos]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    const handleLogout = async () => {
        try {
            await logout();
            setAuth({
                isAuthenticated: false,
                user: null
            });
        } catch (error) {
            console.error("Failed to logout:", error);
        }
    };

    return (
        <nav
            className={`bg-gradient-to-r from-gray-800 to-gray-900 p-4 px-8 shadow-lg fixed top-0 w-full z-50 transition-transform duration-300 ${visible ? 'transform-none' : 'transform -translate-y-full'
                }`}
        >
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-xl font-bold relative group">
                    <Link to="/" className="flex items-center">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 group-hover:from-purple-500 group-hover:to-blue-400 transition-all duration-500">Book runner</span>
                    </Link>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                </div>

                <div className="hidden md:flex space-x-6 items-center">
                    <Link to="/shop" className="text-gray-300 hover:text-white transition-colors duration-300 relative group px-3 py-1 flex items-center">
                        <FaStore className="mr-1" />
                        Shop
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-purple-400 group-hover:w-full transition-all duration-300"></span>
                    </Link>

                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-64 p-2 pl-10 rounded-full bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                        />
                        <FaSearch className="absolute left-3 top-3 text-gray-400" />
                    </div>

                    {!auth.user ? (
                        <div className="flex items-center space-x-4">
                            <Link to="/login" className="text-gray-300 hover:text-white transition-colors duration-300 relative group px-3 py-1">
                                Login
                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-purple-400 group-hover:w-full transition-all duration-300"></span>
                            </Link>

                            <Link to="/register" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                                Sign Up
                            </Link>
                        </div>
                    ) : (
                        <div className="relative group">
                            <div className="cursor-pointer">
                                <img
                                    className="rounded-full h-10 w-10 object-cover"
                                    src={auth.user.image}
                                    alt="User"
                                    width={40}
                                    height={40}
                                />
                            </div>

                            <div className="absolute text-gray-300 right-0 pt-2 w-40 bg-gray-800 shadow-lg rounded-lg hidden group-hover:block border border-gray-700">
                                <ul className="list-none p-2">
                                    <li className="px-4 py-2 cursor-pointer hover:bg-gray-700 rounded transition-colors">
                                        <Link to={`/user/${auth.user.id}`}>
                                            Tài khoản
                                        </Link>
                                    </li>
                                    <li className="px-4 py-2 cursor-pointer hover:bg-gray-700 rounded transition-colors">
                                        <Link to={'/bookmark'}>Thư viện</Link>
                                    </li>
                                    <li className="px-4 py-2 cursor-pointer hover:bg-gray-700 rounded transition-colors">
                                        <Link to={'/profile'}>Cài đặt</Link>
                                    </li>
                                    <li
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-700 rounded transition-colors text-red-400"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>

                <div className="md:hidden">
                    <button
                        className="text-white p-2 focus:outline-none"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {isMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden mt-4 bg-gray-800 rounded-lg p-4 shadow-xl animate-fadeIn">
                    <div className="flex items-center justify-between mb-4">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full p-2 pl-10 rounded-full bg-gray-700 text-white border border-gray-600"
                            />
                            <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
                        </div>
                    </div>
                    <div className="flex flex-col space-y-3">
                        <Link
                            to="/shop"
                            className="text-white flex items-center space-x-2 p-2 hover:bg-gray-700 rounded transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <FaStore />
                            <span>Shop</span>
                        </Link>
                        <Link
                            to="/cart"
                            className="text-white flex items-center space-x-2 p-2 hover:bg-gray-700 rounded transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <FaShoppingCart />
                            <span>Cart</span>
                        </Link>

                        {!auth.user ? (
                            <>
                                <Link
                                    to="/login"
                                    className="text-white flex items-center space-x-2 p-2 hover:bg-gray-700 rounded transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <span>Login</span>
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2 rounded text-center transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Sign Up
                                </Link>
                            </>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="text-white p-2 hover:bg-gray-700 rounded transition-colors text-left"
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;