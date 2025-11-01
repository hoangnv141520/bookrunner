// src/pages/Register.tsx
import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { RegisterFormData, AuthResponse } from '../../../types/auth';

type ErrorResponse = {
    response?: {
        data?: {
            message: string;
        };
    };
};

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<RegisterFormData>({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState<string>('');
    const server = import.meta.env.VITE_SERVER

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData((prev: RegisterFormData) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setError('');

        // Basic validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post<AuthResponse>(`${server}/api/auth/register`, {
                username: formData.name,
                email: formData.email,
                password: formData.password
            });
            console.log(response.data);

            navigate('/login');
        } catch (err) {
            const error = err as ErrorResponse;
            setError(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-indigo-950 relative overflow-hidden font-serif">
            {/* Mysterious fog effect */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(79,42,173,0.15),rgba(15,15,26,0.6))] animate-[pulse_10s_ease-in-out_infinite]"></div>

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-purple-300/10 blur-sm"
                        style={{
                            width: `${Math.random() * 6 + 2}px`,
                            height: `${Math.random() * 6 + 2}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animation: `float ${Math.random() * 10 + 10}s linear infinite`
                        }}
                    ></div>
                ))}
            </div>

            <div className="relative z-10 bg-gray-900/70 backdrop-blur-sm border border-purple-900/50 rounded-lg p-8 w-full max-w-md shadow-[0_0_20px_rgba(79,42,173,0.3),0_0_40px_rgba(79,42,173,0.1)]">
                <h2 className="text-2xl md:text-3xl text-purple-300 text-center mb-8 font-medium tracking-wider drop-shadow-[0_0_8px_rgba(162,136,227,0.5)]">
                    Đăng ký
                </h2>

                {error && (
                    <div className="bg-red-900/20 border-l-4 border-red-400 text-red-300 p-3 mb-6 italic text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-purple-300 text-sm tracking-wide mb-1">
                            Tên đăng nhập
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-800/70 border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 text-gray-100 rounded px-4 py-2.5 transition-all duration-300"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-purple-300 text-sm tracking-wide mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-800/70 border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 text-gray-100 rounded px-4 py-2.5 transition-all duration-300"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-purple-300 text-sm tracking-wide mb-1">
                            Mật khẩu
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-800/70 border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 text-gray-100 rounded px-4 py-2.5 transition-all duration-300"
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-purple-300 text-sm tracking-wide mb-1">
                            Xác nhận mật khẩu
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-800/70 border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 text-gray-100 rounded px-4 py-2.5 transition-all duration-300"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-800 to-indigo-800 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-2.5 px-4 rounded shadow-lg shadow-purple-900/30 transition-all duration-300 relative overflow-hidden group"
                    >
                        <span className="relative z-10">Đăng ký</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-transparent w-1/3 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
                    </button>
                </form>

                <p className="text-center text-gray-400 mt-6">
                    Đã có tài khoản?
                    <Link to="/login" className="text-purple-400 hover:text-purple-300 ml-2 transition-colors duration-300 relative group">
                        Đăng nhập
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-purple-400 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                </p>

                {/* Mystical decorative elements */}
                <div className="absolute -bottom-3 -right-3 w-16 h-16 border-r border-b border-purple-500/30 rounded-br-lg"></div>
                <div className="absolute -top-3 -left-3 w-16 h-16 border-l border-t border-purple-500/30 rounded-tl-lg"></div>
                <div className="absolute top-1/2 -right-1 w-2 h-2 bg-purple-400/40 rounded-full"></div>
                <div className="absolute top-1/4 -left-1 w-2 h-2 bg-purple-400/40 rounded-full"></div>
            </div>

            {/* Add Tailwind animations to your tailwind.config.js */}
            {/* 
            theme: {
                extend: {
                    animation: {
                        'float': 'float 20s linear infinite',
                    },
                    keyframes: {
                        float: {
                            '0%': { transform: 'translateY(0) translateX(0)' },
                            '25%': { transform: 'translateY(-10px) translateX(10px)' },
                            '50%': { transform: 'translateY(0) translateX(25px)' },
                            '75%': { transform: 'translateY(10px) translateX(10px)' },
                            '100%': { transform: 'translateY(0) translateX(0)' },
                        }
                    }
                }
            }
            */}
        </div>
    );
};

export default Register;