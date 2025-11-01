// src/pages/Login.tsx
import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LoginFormData } from '../../../types/auth';
import { login } from '../utils/login.util';
const Login = () => {
    
    const navigate = useNavigate();
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: ''
    });
    const [error, setError] = useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData((prev: LoginFormData) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const loginData = {
                email: formData.email,
                password: formData.password
            };
            const result = await login(loginData);
            if (result.message === 'Đăng nhập thành công!' && result.user) {
                console.log("Đăng nhập thành công!");
                navigate('/');
            } else {
                setError(result.message || 'Login failed');
            }
        } catch (err: any) {
            console.error("Login error:", err);
            const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
            setError(errorMessage);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-indigo-950 relative overflow-hidden font-serif">
            {/* Mysterious fog effect */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(79,42,173,0.15),rgba(15,15,26,0.6))] animate-pulse duration-[10s]"></div>

            {/* Simple particles */}
            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-purple-300/20 rounded-full blur-sm"></div>
            <div className="absolute top-1/3 left-2/3 w-2 h-2 bg-purple-300/20 rounded-full blur-sm"></div>
            <div className="absolute top-2/3 left-1/2 w-1.5 h-1.5 bg-purple-300/20 rounded-full blur-sm"></div>
            <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-purple-300/20 rounded-full blur-sm"></div>
            <div className="absolute top-3/4 left-3/4 w-2 h-2 bg-purple-300/20 rounded-full blur-sm"></div>

            <div className="relative z-10 bg-gray-900/70 backdrop-blur-sm border border-purple-900/50 rounded-lg p-8 w-full max-w-md shadow-[0_0_20px_rgba(79,42,173,0.3),0_0_40px_rgba(79,42,173,0.1)]">
                <h2 className="text-2xl md:text-3xl text-purple-300 text-center mb-8 font-medium tracking-wider drop-shadow-[0_0_8px_rgba(162,136,227,0.5)]">
                    Đăng nhập
                </h2>

                {error && (
                    <div className="bg-red-900/20 border-l-4 border-red-400 text-red-300 p-3 mb-6 italic text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
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
                            className="w-full bg-gray-800/70 border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 text-gray-100 rounded px-4 py-2.5 transition-all duration-300"
                            placeholder="your@email.com"
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
                            className="w-full bg-gray-800/70 border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 text-gray-100 rounded px-4 py-2.5 transition-all duration-300"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-700 bg-gray-800/70 text-purple-600 focus:ring-purple-500 focus:ring-offset-gray-900"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                                Ghi nhớ đăng nhập
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="font-medium text-purple-400 hover:text-purple-300 transition-colors duration-300 relative group">
                                Quên mật khẩu?
                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-purple-400 group-hover:w-full transition-all duration-300"></span>
                            </a>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-800 to-indigo-800 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-2.5 px-4 rounded shadow-lg shadow-purple-900/30 transition-all duration-300 relative overflow-hidden group"
                    >
                        <span className="relative z-10 flex items-center justify-center">
                            <svg className="h-5 w-5 mr-2 text-purple-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                            Đăng nhập
                        </span>
                        <span className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-transparent w-1/3 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
                    </button>
                </form>

                <p className="text-center text-gray-400 mt-6">
                    Chưa có tài khoản?
                    <Link to="/register" className="text-purple-400 hover:text-purple-300 ml-2 transition-colors duration-300 relative group">
                        Đăng ký
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-purple-400 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                </p>

                {/* Mystical decorative elements */}
                <div className="absolute -bottom-3 -right-3 w-16 h-16 border-r border-b border-purple-500/30 rounded-br-lg"></div>
                <div className="absolute -top-3 -left-3 w-16 h-16 border-l border-t border-purple-500/30 rounded-tl-lg"></div>
                <div className="absolute top-1/2 -right-1 w-2 h-2 bg-purple-400/40 rounded-full"></div>
                <div className="absolute top-1/4 -left-1 w-2 h-2 bg-purple-400/40 rounded-full"></div>
            </div>

            {/* Mystical symbols floating in background */}
            <div className="absolute bottom-10 left-10 text-purple-500/10 text-6xl select-none">⦿</div>
            <div className="absolute top-10 right-10 text-purple-500/10 text-6xl select-none">⟡</div>
            <div className="absolute bottom-10 right-1/4 text-purple-500/10 text-4xl select-none">⧗</div>
            <div className="absolute top-1/3 left-1/5 text-purple-500/10 text-5xl select-none">⧉</div>
        </div>
    );
};

export default Login;