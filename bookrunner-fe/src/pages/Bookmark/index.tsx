import React, { useEffect, useState } from 'react';
import { AuthState, NovelLike, NovelRecent } from '../../types/auth';
import { checkLogin } from '../Auth/utils/login.util';
import { Link } from 'react-router-dom';

const Bookmark: React.FC = () => {
    const [activeTab, setActiveTab] = useState('reading');
    const [auth, setAuth] = useState<AuthState>();
    const [recentNovel, setRecentNovel] = useState<NovelRecent[]>([])
    const [like, setLike] = useState<NovelLike[]>([])
    const server = import.meta.env.VITE_SERVER
    useEffect(() => {
        const checkout = async () => {
            const res = await checkLogin();
            setAuth(res);
            auth ? auth : auth;
            const response = await fetch(`${server}/api/novelrecent/user/${res.user.id}`)
            const res2 = await response.json();
            const response2 = await fetch(`${server}/api/novel-like/user/${res.user.id}`)
            const res1 = await response2.json();
            setLike(res1)
            setRecentNovel(res2)
        }
        checkout()
    }, [])
    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 p-6 flex flex-col gap-8">
            {/* Header */}
            <div className="w-full max-w-6xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 tracking-tight">
                    <svg className="inline w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                    </svg>
                    Thư viện của tôi
                </h1>

                {/* Tabs */}
                <div className="bg-zinc-900 rounded-lg mb-8 border border-zinc-800">
                    <div className="flex">
                        <button
                            className={`py-4 px-6 font-medium transition-colors duration-200 relative ${activeTab === 'reading'
                                ? 'text-white'
                                : 'text-gray-500 hover:text-gray-300'
                                }`}
                            onClick={() => setActiveTab('reading')}
                        >
                            Đang đọc
                            {activeTab === 'reading' && (
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500"></span>
                            )}
                        </button>
                        <button
                            className={`py-4 px-6 font-medium transition-colors duration-200 relative ${activeTab === 'completed'
                                ? 'text-white'
                                : 'text-gray-500 hover:text-gray-300'
                                }`}
                            onClick={() => setActiveTab('completed')}
                        >
                            Yêu thích
                            {activeTab === 'completed' && (
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500"></span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="w-full">
                    {activeTab === 'reading' && (
                        recentNovel && recentNovel.length > 0 ? (
                            <>
                                {recentNovel.map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-zinc-900 rounded-lg mb-4 overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-all duration-200"
                                    >
                                        <div className="p-5 flex">
                                            <div className="w-20 h-28 flex-shrink-0 bg-zinc-800 rounded overflow-hidden">
                                                <img
                                                    src={item.novel?.image}
                                                    alt="Book cover"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            <div className="ml-5 flex-1">
                                                <div className="flex justify-between">
                                                    <Link to={`/novel/${item.novel.id}`} className="font-medium text-lg text-white hover:text-indigo-300 cursor-pointer transition-colors duration-200">
                                                        {item.novel?.title}
                                                    </Link>
                                                </div>

                                                <div className="text-gray-400 text-sm mt-1">
                                                    Tác giả: {item.novel.author.name}
                                                </div>

                                                <div className="flex items-center mt-3">
                                                    <Link to={`/chapter/${item.last_read_chapter_id}`} className="text-gray-400 hover:text-indigo-300 text-sm">
                                                        Đang đọc: {item.last_read_chapter_name}
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <div className="bg-zinc-900 rounded-lg p-10 text-center border border-zinc-800">
                                <div className="text-gray-300 mb-3">Không có truyện nào.</div>
                                <div className="text-sm text-gray-500">
                                    Hãy thêm truyện vào tủ sách của bạn để dễ dàng quản lý và theo dõi.
                                </div>
                            </div>
                        )
                    )}

                    {activeTab === 'completed' && (
                        like && like.length > 0 ? (
                            <>
                                {like.map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-zinc-900 rounded-lg mb-4 overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-all duration-200"
                                    >
                                        <div className="p-5 flex">
                                            <div className="w-20 h-28 flex-shrink-0 bg-zinc-800 rounded overflow-hidden">
                                                <img
                                                    src={item.novel?.image}
                                                    alt="Book cover"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            <div className="ml-5 flex-1">
                                                <div className="flex justify-between">
                                                    <Link to={`/novel/${item.novel.id}`} className="font-medium text-lg text-white hover:text-indigo-300 cursor-pointer transition-colors duration-200">
                                                        {item.novel?.title}
                                                    </Link>
                                                </div>

                                                <div className="text-gray-400 text-sm mt-1">
                                                    Tác giả: {item.novel.author.name}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <div className="bg-zinc-900 rounded-lg p-10 text-center border border-zinc-800">
                                <div className="text-gray-300 mb-3">Không có truyện nào.</div>
                                <div className="text-sm text-gray-500">
                                    Hãy thêm truyện vào tủ sách của bạn để dễ dàng quản lý và theo dõi.
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div >
    );
};

export default Bookmark;