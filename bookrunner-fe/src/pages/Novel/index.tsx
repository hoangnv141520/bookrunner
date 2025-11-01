import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCalendarAlt } from 'react-icons/fa';
import RelatedNovels from './components/RelatedNovels';
import CoverImage from './components/CoverImage';
import NovelDetail from './components/NovelDetail';
import Poster from './components/Poster';
import { AuthState, NovelData } from '../../types/auth';
import TopNovels from './components/TopNovels';
import { checkLogin } from '../Auth/utils/login.util';

const NovelPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [currentTab, setCurrentTab] = useState<'description' | 'chapters'>('description');
    const [novel, setNovel] = useState<NovelData>();
    const [novels, setNovels] = useState<NovelData[]>([])
    const [auth, setAuth] = useState<AuthState>({
        isAuthenticated: false,
        user: null
    });
    const server = import.meta.env.VITE_SERVER

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${server}/api/novels/${id}`);
                const data = await response.json();
                // console.log(data);
                setNovel(data[0]);
                const response2 = await fetch(`${server}/api/novels/outstanding`);
                const data2 = await response2.json();
                // console.log("outstanding ", data2);
                setNovels(data2);
                const data3 = await checkLogin();
                setAuth(data3);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-gray-900 to-indigo-950 p-4 gap-4">
            <div className="w-full lg:w-[70%] space-y-6">
                <div className="bg-gray-900/70 backdrop-blur-sm border border-purple-900/50 rounded-lg overflow-hidden shadow-[0_0_20px_rgba(79,42,173,0.2)]">
                    <div className="p-6">
                        {novel ? (
                            <div className="flex flex-col md:flex-row gap-6">
                                <CoverImage novel={novel} auth={auth} />
                                <NovelDetail novel={novel} />
                            </div>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>

                    <div className="border-t border-purple-900/30">
                        <div className="flex">
                            <button
                                onClick={() => setCurrentTab('description')}
                                className={`flex-1 py-3 font-medium transition-colors duration-300 ${currentTab === 'description'
                                    ? 'text-purple-300 border-b-2 border-purple-500'
                                    : 'text-purple-400/60 hover:text-purple-400/80'
                                    }`}
                            >
                                Giới Thiệu
                            </button>
                            <button
                                onClick={() => setCurrentTab('chapters')}
                                className={`flex-1 py-3 font-medium transition-colors duration-300 ${currentTab === 'chapters'
                                    ? 'text-purple-300 border-b-2 border-purple-500'
                                    : 'text-purple-400/60 hover:text-purple-400/80'
                                    }`}
                            >
                                Danh Sách Chương
                            </button>
                        </div>
                        <div className="p-6">
                            {currentTab === 'description' && (
                                <p className="text-purple-200/80 leading-relaxed">{novel?.novel_desc}</p>
                            )}
                            {currentTab === 'chapters' && (
                                <div className="space-y-3">
                                    {novel?.chapters.map((chapter) => (
                                        <div key={chapter.id} className="border-b border-purple-900/20 pb-3">
                                            <div className="flex flex-wrap justify-between items-center">
                                                <Link
                                                    to={`/chapter/${chapter.id}`}
                                                    className="text-purple-300 hover:text-purple-200 transition-colors duration-300 flex-grow"
                                                >
                                                    {chapter.name}
                                                </Link>
                                                <div className="flex items-center text-sm text-purple-400/70 space-x-4">
                                                    <span className="flex items-center">
                                                        <FaCalendarAlt className="mr-1" />
                                                        {new Date(chapter.createat).toLocaleString('en-CA', { hour12: false })}
                                                    </span>

                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {
                    novel ? (
                        <RelatedNovels />
                    ) : (
                        <p>Loading...</p>
                    )
                }
                {/* <CommentSection /> */}
            </div>

            <div className="w-full lg:w-[30%] space-y-6">
                {novel ? (
                    <Poster novel={novel} auth={auth} />
                ) : (
                    <p>Loading...</p>
                )}
                <div className="bg-gray-900/70 backdrop-blur-sm border border-purple-900/50 rounded-lg p-6 shadow-[0_0_20px_rgba(79,42,173,0.2)]">
                    <h3 className="text-xl font-medium text-purple-300 tracking-wide mb-4">Thẻ Phổ Biến</h3>

                    <div className="flex flex-wrap gap-2">
                        {['Fantasy', 'Action', 'Romance', 'Drama', 'Adventure', 'Comedy', 'Magic', 'School Life', 'Isekai', 'Mystery'].map(tag => (
                            <Link
                                key={tag}
                                to={`/tag/${tag.toLowerCase()}`}
                                className="px-3 py-1 bg-gray-800/40 text-purple-200 text-sm rounded-full border border-purple-900/30 hover:border-purple-500/50 transition-colors duration-300 backdrop-blur-sm"
                            >
                                {tag}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="bg-gray-900/70 backdrop-blur-sm border border-purple-900/50 rounded-lg p-6 shadow-[0_0_20px_rgba(79,42,173,0.2)]">
                    <h3 className="text-xl font-medium text-purple-300 tracking-wide mb-4">Truyện Nổi Bật Tuần Này</h3>

                    <TopNovels novels={novels} ></TopNovels>
                </div>
            </div>
        </div>
    );
}

export default NovelPage;