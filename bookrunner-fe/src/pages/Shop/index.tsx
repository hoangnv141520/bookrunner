import React, { useEffect, useState, useMemo } from 'react';
import {
    FaSearch, FaShoppingCart, FaStar, FaStarHalfAlt, FaRegStar, FaBookOpen,
    FaSortAmountDown
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Filter from './component/Filter';
import { AuthState, BookData } from '../../types/auth';
import BookCard from './component/BookCard';
import BookListItem from './component/BookListItem';
import Pagination from './component/Pagination';
import { checkLogin } from '../Auth/utils/login.util';

const Shop: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('grid');
    const [books, setBooks] = useState<BookData[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOption, setSortOption] = useState('best-selling');
    const [auth, setAuth] = useState<AuthState>({
        isAuthenticated: false,
        user: null
    });
    const booksPerPage = 9;
    const server = import.meta.env.VITE_SERVER
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch(`${server}/api/books`);
                const data = await response.json();
                const data2 = await checkLogin();
                setAuth(data2);
                console.log(data2);

                setBooks(data);
            }
            catch (error) {
                console.error('Error fetching books:', error);
            }
        };
        fetchBooks();
    }, []);

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, searchQuery]);

    const filteredBooks = useMemo(() => {
        return books.filter(book => {
            const matchesCategory = selectedCategory === 'all' ||
                book.categories.some(category => category.name === selectedCategory);
            const matchesSearch =
                book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                book.author.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [books, selectedCategory, searchQuery]);
    const calculateAverageRating = (votes: { value: number }[]): number => {
        if (votes.length === 0) return 0;
        return votes.reduce((sum, vote) => sum + vote.value, 0) / votes.length;
    };

    const sortedBooks = useMemo(() => {
        const sorted = [...filteredBooks];

        switch (sortOption) {
            case 'price-low':
                return sorted.sort((a, b) => a.price - b.price);
            case 'price-high':
                return sorted.sort((a, b) => b.price - a.price);
            case 'highest-rated':
                return sorted.sort((a, b) => calculateAverageRating(b.votes) - calculateAverageRating(a.votes));
            case 'newest':
                return sorted.sort((a, b) => new Date(b.createat || '').getTime() - new Date(a.createat || '').getTime());
            default:
                return sorted; // Best selling (default)
        }
    }, [filteredBooks, sortOption]);

    const paginatedBooks = useMemo(() => {
        return sortedBooks.slice(
            (currentPage - 1) * booksPerPage,
            currentPage * booksPerPage
        );
    }, [sortedBooks, currentPage, booksPerPage]);

    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);



    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(<FaStar key={i} className="text-yellow-400" />);
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
            } else {
                stars.push(<FaRegStar key={i} className="text-gray-500" />);
            }
        }

        return <div className="flex">{stars}</div>;
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOption(e.target.value);
    };

    const handleCategoryChange = (categoryId: string | number) => {
        setSelectedCategory(String(categoryId));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-950 p-6 flex flex-col gap-8 relative">
            {/* Background effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(79,42,173,0.15),rgba(15,15,26,0.6))] animate-pulse duration-[10s]"></div>
            <BackgroundDecorations />

            {/* Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto">
                <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} auth={auth} />

                {/* Featured books carousel */}
                {/* <Featured books={ftBooks} /> */}

                {/* Main shop content */}
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Sidebar */}
                    <Filter selectedCategory={selectedCategory} setSelectedCategory={handleCategoryChange} />

                    {/* Book grid */}
                    <div className="w-full lg:w-3/4">
                        <div className="bg-gray-900/70 backdrop-blur-sm border border-purple-900/50 rounded-lg p-6 shadow-[0_0_20px_rgba(79,42,173,0.2)]">
                            {/* Controls */}
                            <div className="flex justify-between items-center mb-6">
                                <div className="text-gray-300">
                                    Showing <span className="text-purple-300 font-medium">{paginatedBooks.length}</span> results
                                </div>

                                <div className="flex items-center space-x-4">
                                    <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />

                                    <div className="flex items-center text-gray-400">
                                        <FaSortAmountDown className="mr-2" />
                                        <select
                                            className="bg-gray-800 border border-purple-900/50 rounded px-2 py-1 text-sm focus:outline-none focus:border-purple-700/50"
                                            onChange={handleSortChange}
                                            value={sortOption}
                                        >
                                            <option value="best-selling">Best Selling</option>
                                            <option value="price-low">Price: Low to High</option>
                                            <option value="price-high">Price: High to Low</option>
                                            <option value="highest-rated">Highest Rated</option>
                                            <option value="newest">Newest Arrivals</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Book views */}
                            {viewMode === 'grid' ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {paginatedBooks.map((book) => (
                                        <BookCard
                                            key={book.id}
                                            book={book}
                                            renderStars={renderStars}
                                            calculateAverageRating={calculateAverageRating}
                                            auth={auth}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {paginatedBooks.map((book) => (
                                        <BookListItem
                                            key={book.id}
                                            book={book}
                                            calculateAverageRating={calculateAverageRating}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Empty state */}
                            {paginatedBooks.length === 0 && (
                                <EmptyState />
                            )}

                            {/* Pagination */}
                            {paginatedBooks.length > 0 && (
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    setCurrentPage={setCurrentPage}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Header Component
const Header: React.FC<{ searchQuery: string, setSearchQuery: (query: string) => void, auth: AuthState }> = ({ searchQuery, setSearchQuery, auth }) => (
    <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl md:text-4xl text-purple-300 font-medium tracking-wider drop-shadow-[0_0_8px_rgba(162,136,227,0.5)] flex items-center mb-4 md:mb-0">
            <FaBookOpen className="mr-3 text-purple-400" />
            Arcane Library
        </h1>

        <div className="flex items-center space-x-4">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search mystical tomes..."
                    className="w-64 py-2 px-4 pl-10 bg-gray-800/70 border border-purple-900/50 focus:border-purple-700/50 rounded-md text-gray-300 outline-none transition-colors duration-300"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
            </div>

            <Link to="/cart" className="relative p-2 bg-gray-800/70 border border-purple-900/50 hover:border-purple-700/50 rounded-md text-purple-300 transition-colors duration-300">
                <FaShoppingCart className="text-xl" />
                {auth.user?.cartDetail && auth.user.cartDetail.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-600 rounded-full text-xs flex items-center justify-center text-white">{auth.user?.cartDetail.length}</span>)}
            </Link>
        </div>
    </div>
);

// ViewModeToggle Component
const ViewModeToggle: React.FC<{ viewMode: string, setViewMode: (mode: string) => void }> = ({ viewMode, setViewMode }) => (
    <div className="flex items-center">
        <button
            className={`p-2 ${viewMode === 'grid' ? 'text-purple-300' : 'text-gray-500 hover:text-purple-300'} transition-colors duration-300`}
            onClick={() => setViewMode('grid')}
            aria-label="Grid view"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
        </button>

        <button
            className={`p-2 ${viewMode === 'list' ? 'text-purple-300' : 'text-gray-500 hover:text-purple-300'} transition-colors duration-300`}
            onClick={() => setViewMode('list')}
            aria-label="List view"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </button>
    </div>
);

// EmptyState Component
const EmptyState: React.FC = () => (
    <div className="py-16 text-center">
        <div className="text-gray-400 mb-2">No mystical tomes found matching your criteria.</div>
        <div className="text-gray-500 text-sm">Try adjusting your search or filters.</div>
    </div>
);

// Background Decorations
const BackgroundDecorations: React.FC = () => (
    <>
        <div className="absolute top-10 left-10 text-purple-500/10 text-6xl select-none">⦿</div>
        <div className="absolute bottom-10 right-10 text-purple-500/10 text-6xl select-none">⟡</div>
        <div className="absolute top-1/2 right-1/4 text-purple-500/10 text-4xl select-none">⧗</div>
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-purple-300/20 rounded-full blur-sm animate-pulse"></div>
        <div className="absolute top-1/3 left-2/3 w-2 h-2 bg-purple-300/20 rounded-full blur-sm animate-pulse"></div>
        <div className="absolute top-2/3 left-1/2 w-1.5 h-1.5 bg-purple-300/20 rounded-full blur-sm animate-pulse"></div>
        <div className="absolute top-1/5 right-1/3 w-1 h-1 bg-purple-300/20 rounded-full blur-sm animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-purple-300/20 rounded-full blur-sm animate-pulse"></div>
        <div className="absolute bottom-20 left-20 text-purple-500/10 text-5xl select-none rotate-45">✧</div>
        <div className="absolute top-40 right-40 text-purple-500/10 text-4xl select-none">⟐</div>
        <div className="absolute bottom-1/3 right-1/4 text-purple-500/10 text-5xl select-none">⧖</div>
        <div className="absolute top-1/4 left-1/3 text-purple-500/10 text-4xl select-none rotate-12">⧉</div>
    </>
);

export default Shop;