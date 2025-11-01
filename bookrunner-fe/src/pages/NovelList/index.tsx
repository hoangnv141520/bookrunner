import React, { useState } from 'react';
import {
    FaSearch, FaFilter, FaBookOpen, FaSortAmountDown, FaRegStar, FaStar, FaStarHalfAlt,
    FaEye, FaBookmark, FaChevronRight, FaChevronDown, FaChevronUp
} from 'react-icons/fa';

const NovelListPage: React.FC = () => {
    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    const [expandedFilters, setExpandedFilters] = useState({
        status: true,
        genre: true,
        tags: false,
        rating: false
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('popular');

    // Sample data
    const novels = [
        {
            id: 1,
            title: "The Arcanum of Shadows",
            author: "E.M. Nightshade",
            cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1000",
            rating: 4.5,
            views: 14892,
            bookmarks: 2341,
            chapters: 154,
            status: "Ongoing",
            lastUpdated: "2025-03-18",
            genres: ["Dark Fantasy", "Mystery"],
            tags: ["Magic System", "Kingdom Building", "Anti-Hero"],
            description: "In a world where shadows hold power, a disgraced mage discovers an ancient arcanum that could either save the realm or plunge it into eternal darkness."
        },
        {
            id: 2,
            title: "Ethereal Runes: The Lost Grimoire",
            author: "Selene Moonshadow",
            cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=1000",
            rating: 5.0,
            views: 23567,
            bookmarks: 4120,
            chapters: 212,
            status: "Completed",
            lastUpdated: "2025-03-15",
            genres: ["High Fantasy", "Adventure"],
            tags: ["Magical Academy", "Coming of Age", "Powerful Protagonist"],
            description: "When a young apprentice discovers a grimoire of forgotten runes, she must navigate a dangerous world of ancient magic and political intrigue."
        },
        {
            id: 3,
            title: "Whispers of the Void",
            author: "Lysander Veil",
            cover: "https://images.unsplash.com/photo-1531501410720-c8d437636169?q=80&w=1000",
            rating: 4.2,
            views: 9876,
            bookmarks: 1543,
            chapters: 87,
            status: "Ongoing",
            lastUpdated: "2025-03-20",
            genres: ["Cosmic Horror", "Psychological"],
            tags: ["Eldritch", "Mystery", "Mind Bending"],
            description: "A scholar's investigation into mysterious whispers leads him to uncover cosmic horrors beyond human comprehension."
        },
        {
            id: 4,
            title: "Chronicles of the Astral Planes",
            author: "Orion Starweaver",
            cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1000",
            rating: 4.7,
            views: 18245,
            bookmarks: 3012,
            chapters: 176,
            status: "Ongoing",
            lastUpdated: "2025-03-19",
            genres: ["Sci-Fantasy", "Adventure"],
            tags: ["Multiple Realms", "Unique Magic", "Strategic Battles"],
            description: "A group of planeswalkers navigate the infinite astral planes, each with their own laws of reality and magic."
        },
        {
            id: 5,
            title: "Alchemical Transmutation",
            author: "Aurum Mercurius",
            cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1000",
            rating: 4.8,
            views: 15678,
            bookmarks: 2789,
            chapters: 143,
            status: "Completed",
            lastUpdated: "2025-03-10",
            genres: ["Historical Fantasy", "Mystery"],
            tags: ["Alchemy", "Renaissance", "Secret Society"],
            description: "In Renaissance Europe, an apprentice alchemist discovers the true formula for the philosopher's stone, drawing the attention of dangerous secret societies."
        },
        {
            id: 6,
            title: "Elemental Convergence",
            author: "Pyro Stormweaver",
            cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1000",
            rating: 4.3,
            views: 11234,
            bookmarks: 1876,
            chapters: 97,
            status: "Hiatus",
            lastUpdated: "2025-02-28",
            genres: ["Action", "Fantasy"],
            tags: ["Elemental Magic", "Tournament", "Training"],
            description: "Four elemental mages from rival kingdoms must set aside their differences to prevent a catastrophic convergence of primal forces."
        }
    ];

    // Filter options
    const filterOptions = {
        status: ["All", "Ongoing", "Completed", "Hiatus"],
        genre: ["All", "Dark Fantasy", "High Fantasy", "Cosmic Horror", "Psychological", "Sci-Fantasy", "Historical Fantasy", "Action", "Adventure", "Mystery"],
        tags: ["Magic System", "Kingdom Building", "Anti-Hero", "Magical Academy", "Coming of Age", "Powerful Protagonist", "Eldritch", "Mind Bending", "Multiple Realms", "Strategic Battles", "Alchemy", "Renaissance", "Secret Society", "Elemental Magic", "Tournament", "Training"],
        rating: ["5 Stars", "4+ Stars", "3+ Stars"]
    };

    const toggleFilter = (filter: string) => {
        setActiveFilters(prev =>
            prev.includes(filter)
                ? prev.filter(f => f !== filter)
                : [...prev, filter]
        );
    };

    const toggleFilterSection = (section: string) => {
        setExpandedFilters(prev => ({
            ...prev,
            [section]: !prev[section as keyof typeof prev]
        }));
    };

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

    const filteredNovels = novels.filter(novel => {
        if (searchQuery && !novel.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !novel.author.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false;
        }

        for (const filter of activeFilters) {
            if (filterOptions.status.includes(filter) && filter !== "All") {
                if (novel.status !== filter) return false;
            }
            if (filterOptions.genre.includes(filter) && filter !== "All") {
                if (!novel.genres.includes(filter)) return false;
            }
            if (filterOptions.tags.includes(filter)) {
                if (!novel.tags.includes(filter)) return false;
            }
            if (filter === "5 Stars" && novel.rating < 5) return false;
            if (filter === "4+ Stars" && novel.rating < 4) return false;
            if (filter === "3+ Stars" && novel.rating < 3) return false;
        }
        return true;
    });

    // Sort novels
    const sortedNovels = [...filteredNovels].sort((a, b) => {
        switch (sortOption) {
            case 'popular':
                return b.views - a.views;
            case 'latest':
                return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
            case 'rating':
                return b.rating - a.rating;
            case 'bookmarks':
                return b.bookmarks - a.bookmarks;
            default:
                return 0;
        }
    });

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
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <h1 className="text-3xl md:text-4xl text-purple-300 font-medium tracking-wider drop-shadow-[0_0_8px_rgba(162,136,227,0.5)] flex items-center mb-4 md:mb-0">
                        <FaBookOpen className="mr-3 text-purple-400" />
                        Mystical Chronicles
                    </h1>

                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search novels..."
                            className="w-64 py-2 px-4 pl-10 bg-gray-800/70 border border-purple-900/50 focus:border-purple-700/50 rounded-md text-gray-300 outline-none transition-colors duration-300"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
                    </div>
                </div>

                {/* Main content with filters */}
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Filters sidebar */}
                    <div className="w-full lg:w-1/4">
                        <div className="bg-gray-900/70 backdrop-blur-sm border border-purple-900/50 rounded-lg p-6 shadow-[0_0_20px_rgba(79,42,173,0.2)] sticky top-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg text-purple-300 font-medium tracking-wide flex items-center">
                                    <FaFilter className="mr-2" /> Filters
                                </h2>

                                {activeFilters.length > 0 && (
                                    <button
                                        className="text-sm text-purple-400 hover:text-purple-300 transition-colors duration-300"
                                        onClick={() => setActiveFilters([])}
                                    >
                                        Clear All
                                    </button>
                                )}
                            </div>

                            {/* Active filters */}
                            {activeFilters.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-sm text-gray-400 mb-2">Active Filters:</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {activeFilters.map(filter => (
                                            <div
                                                key={filter}
                                                className="flex items-center bg-purple-900/40 text-purple-300 text-xs px-3 py-1 rounded-full border border-purple-700/30"
                                            >
                                                <span>{filter}</span>
                                                <button
                                                    className="ml-2 text-purple-300 hover:text-white"
                                                    onClick={() => toggleFilter(filter)}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Status filter */}
                            <div className="mb-4 border-b border-purple-900/30 pb-4">
                                <button
                                    className="w-full flex justify-between items-center text-purple-300 hover:text-purple-200 transition-colors duration-300"
                                    onClick={() => toggleFilterSection('status')}
                                >
                                    <span className="font-medium">Status</span>
                                    {expandedFilters.status ? <FaChevronUp /> : <FaChevronDown />}
                                </button>

                                {expandedFilters.status && (
                                    <div className="mt-3 space-y-2">
                                        {filterOptions.status.map(status => (
                                            <div key={status} className="flex items-center">
                                                <button
                                                    className={`flex items-center w-full px-2 py-1 rounded-md text-left text-sm transition-colors duration-300 ${activeFilters.includes(status)
                                                        ? 'bg-purple-900/50 text-purple-300 border border-purple-700/50'
                                                        : 'text-gray-400 hover:text-purple-300 hover:bg-gray-800/50'
                                                        }`}
                                                    onClick={() => toggleFilter(status)}
                                                >
                                                    {status}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Genre filter */}
                            <div className="mb-4 border-b border-purple-900/30 pb-4">
                                <button
                                    className="w-full flex justify-between items-center text-purple-300 hover:text-purple-200 transition-colors duration-300"
                                    onClick={() => toggleFilterSection('genre')}
                                >
                                    <span className="font-medium">Genre</span>
                                    {expandedFilters.genre ? <FaChevronUp /> : <FaChevronDown />}
                                </button>

                                {expandedFilters.genre && (
                                    <div className="mt-3 space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                                        {filterOptions.genre.map(genre => (
                                            <div key={genre} className="flex items-center">
                                                <button
                                                    className={`flex items-center w-full px-2 py-1 rounded-md text-left text-sm transition-colors duration-300 ${activeFilters.includes(genre)
                                                        ? 'bg-purple-900/50 text-purple-300 border border-purple-700/50'
                                                        : 'text-gray-400 hover:text-purple-300 hover:bg-gray-800/50'
                                                        }`}
                                                    onClick={() => toggleFilter(genre)}
                                                >
                                                    {genre}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Tags filter */}
                            <div className="mb-4 border-b border-purple-900/30 pb-4">
                                <button
                                    className="w-full flex justify-between items-center text-purple-300 hover:text-purple-200 transition-colors duration-300"
                                    onClick={() => toggleFilterSection('tags')}
                                >
                                    <span className="font-medium">Tags</span>
                                    {expandedFilters.tags ? <FaChevronUp /> : <FaChevronDown />}
                                </button>

                                {expandedFilters.tags && (
                                    <div className="mt-3 space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                                        {filterOptions.tags.map(tag => (
                                            <div key={tag} className="flex items-center">
                                                <button
                                                    className={`flex items-center w-full px-2 py-1 rounded-md text-left text-sm transition-colors duration-300 ${activeFilters.includes(tag)
                                                        ? 'bg-purple-900/50 text-purple-300 border border-purple-700/50'
                                                        : 'text-gray-400 hover:text-purple-300 hover:bg-gray-800/50'
                                                        }`}
                                                    onClick={() => toggleFilter(tag)}
                                                >
                                                    {tag}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Rating filter */}
                            <div className="mb-4">
                                <button
                                    className="w-full flex justify-between items-center text-purple-300 hover:text-purple-200 transition-colors duration-300"
                                    onClick={() => toggleFilterSection('rating')}
                                >
                                    <span className="font-medium">Rating</span>
                                    {expandedFilters.rating ? <FaChevronUp /> : <FaChevronDown />}
                                </button>

                                {expandedFilters.rating && (
                                    <div className="mt-3 space-y-2">
                                        {filterOptions.rating.map(rating => (
                                            <div key={rating} className="flex items-center">
                                                <button
                                                    className={`flex items-center w-full px-2 py-1 rounded-md text-left text-sm transition-colors duration-300 ${activeFilters.includes(rating)
                                                        ? 'bg-purple-900/50 text-purple-300 border border-purple-700/50'
                                                        : 'text-gray-400 hover:text-purple-300 hover:bg-gray-800/50'
                                                        }`}
                                                    onClick={() => toggleFilter(rating)}
                                                >
                                                    {rating}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Novels list */}
                    <div className="w-full lg:w-3/4">
                        <div className="bg-gray-900/70 backdrop-blur-sm border border-purple-900/50 rounded-lg p-6 shadow-[0_0_20px_rgba(79,42,173,0.2)]">
                            {/* Controls */}
                            <div className="flex justify-between items-center mb-6">
                                <div className="text-gray-300">
                                    <span>Showing </span>
                                    <span className="text-purple-300 font-medium">{sortedNovels.length}</span>
                                    <span> novels</span>
                                </div>

                                <div className="flex items-center text-gray-400">
                                    <FaSortAmountDown className="mr-2" />
                                    <select
                                        className="bg-gray-800 border border-purple-900/50 rounded px-2 py-1 text-sm focus:outline-none focus:border-purple-700/50"
                                        value={sortOption}
                                        onChange={(e) => setSortOption(e.target.value)}
                                    >
                                        <option value="popular">Most Popular</option>
                                        <option value="latest">Latest Updated</option>
                                        <option value="rating">Highest Rated</option>
                                        <option value="bookmarks">Most Bookmarked</option>
                                    </select>
                                </div>
                            </div>

                            {/* Novels grid */}
                            <div className="space-y-4">
                                {sortedNovels.map(novel => (
                                    <div
                                        key={novel.id}
                                        className="flex flex-col sm:flex-row bg-gray-800/40 rounded-lg overflow-hidden border border-purple-900/30 hover:border-purple-700/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(79,42,173,0.3)]"
                                    >
                                        {/* Cover */}
                                        <div className="sm:w-1/4 md:w-1/5 relative">
                                            <img
                                                src={novel.cover}
                                                alt={novel.title}
                                                className="w-full h-48 sm:h-full object-cover hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute top-2 right-2 bg-purple-900/80 text-purple-200 text-xs font-bold px-2 py-1 rounded">
                                                {novel.status}
                                            </div>
                                        </div>

                                        {/* Details */}
                                        <div className="p-4 flex-1 flex flex-col">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-medium text-xl text-purple-300 hover:text-purple-200 transition-colors duration-300 cursor-pointer">
                                                        {novel.title}
                                                    </h3>
                                                    <p className="text-gray-400 text-sm">by {novel.author}</p>
                                                </div>

                                                <div className="flex flex-col items-end">
                                                    <div className="flex items-center">
                                                        {renderStars(novel.rating)}
                                                        <span className="text-gray-400 text-xs ml-2">{novel.rating.toFixed(1)}</span>
                                                    </div>
                                                    <div className="text-gray-400 text-xs mt-1">
                                                        Updated: {new Date(novel.lastUpdated).toLocaleDateString()}
                                                    </div>
                                                </div>
                                            </div>

                                            <p className="text-gray-400 text-sm mt-3 line-clamp-2">
                                                {novel.description}
                                            </p>

                                            <div className="mt-3 flex flex-wrap gap-1">
                                                {novel.genres.map(genre => (
                                                    <span
                                                        key={genre}
                                                        className="px-2 py-1 bg-purple-900/40 text-purple-300 text-xs rounded border border-purple-700/30"
                                                    >
                                                        {genre}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="mt-auto pt-4 flex items-center justify-between">
                                                <div className="flex space-x-4 text-gray-400 text-sm">
                                                    <div className="flex items-center">
                                                        <FaEye className="mr-1 text-purple-400" />
                                                        <span>{novel.views.toLocaleString()}</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <FaBookmark className="mr-1 text-purple-400" />
                                                        <span>{novel.bookmarks.toLocaleString()}</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <FaBookOpen className="mr-1 text-purple-400" />
                                                        <span>{novel.chapters} chapters</span>
                                                    </div>
                                                </div>

                                                <div className="flex space-x-2">
                                                    <button className="px-3 py-1 bg-gray-800/80 hover:bg-gray-700/80 text-purple-300 hover:text-purple-200 rounded text-sm font-medium transition-colors duration-300 border border-purple-700/50 flex items-center">
                                                        <FaBookmark className="mr-1" /> Bookmark
                                                    </button>
                                                    <button className="px-3 py-1 bg-purple-800/80 hover:bg-purple-700/80 text-purple-100 rounded text-sm font-medium transition-colors duration-300 border border-purple-700/50 flex items-center">
                                                        Read <FaChevronRight className="ml-1" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Empty state */}
                            {sortedNovels.length === 0 && (
                                <div className="py-16 text-center">
                                    <div className="text-gray-400 mb-2">No mystical chronicles found matching your criteria.</div>
                                    <div className="text-gray-500 text-sm">Try adjusting your filters or search query.</div>
                                </div>
                            )}

                            {/* Pagination */}
                            {sortedNovels.length > 0 && (
                                <div className="mt-8 flex justify-center">
                                    <div className="flex space-x-1">
                                        <button className="w-10 h-10 flex items-center justify-center rounded bg-gray-800/50 border border-purple-900/50 text-gray-400 hover:text-purple-300 hover:border-purple-700/50 transition-colors duration-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </button>

                                        <button className="w-10 h-10 flex items-center justify-center rounded bg-purple-900/50 border border-purple-700/50 text-purple-300 transition-colors duration-300">
                                            1
                                        </button>

                                        <button className="w-10 h-10 flex items-center justify-center rounded bg-gray-800/50 border border-purple-900/50 text-gray-400 hover:text-purple-300 hover:border-purple-700/50 transition-colors duration-300">
                                            2
                                        </button>

                                        <button className="w-10 h-10 flex items-center justify-center rounded bg-gray-800/50 border border-purple-900/50 text-gray-400 hover:text-purple-300 hover:border-purple-700/50 transition-colors duration-300">
                                            3
                                        </button>

                                        <button className="w-10 h-10 flex items-center justify-center rounded bg-gray-800/50 border border-purple-900/50 text-gray-400 hover:text-purple-300 hover:border-purple-700/50 transition-colors duration-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Discover more section */}
                <div className="mt-10 bg-gray-900/70 backdrop-blur-sm border border-purple-900/50 rounded-lg p-6 shadow-[0_0_20px_rgba(79,42,173,0.2)]">
                    <h2 className="text-xl text-purple-300 mb-4 font-medium tracking-wide">Discover More Chronicles</h2>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                        {['Fantasy', 'Romance', 'Action', 'Horror', 'Sci-Fi', 'Mystery'].map((genre) => (
                            <button
                                key={genre}
                                className="bg-gray-800/40 hover:bg-purple-900/30 border border-purple-900/30 hover:border-purple-700/50 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-[0_0_15px_rgba(79,42,173,0.3)]"
                            >
                                <div className="text-purple-300 font-medium">{genre}</div>
                                <div className="text-gray-400 text-xs mt-1">Explore</div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Simple floating particles */}
            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-purple-300/20 rounded-full blur-sm animate-pulse"></div>
            <div className="absolute top-1/3 left-2/3 w-2 h-2 bg-purple-300/20 rounded-full blur-sm animate-pulse"></div>
            <div className="absolute top-2/3 left-1/2 w-1.5 h-1.5 bg-purple-300/20 rounded-full blur-sm animate-pulse"></div>
            <div className="absolute top-1/5 right-1/3 w-1 h-1 bg-purple-300/20 rounded-full blur-sm animate-pulse"></div>
            <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-purple-300/20 rounded-full blur-sm animate-pulse"></div>

            {/* Additional mystical elements */}
            <div className="absolute bottom-20 left-20 text-purple-500/10 text-5xl select-none rotate-45">✧</div>
            <div className="absolute top-40 right-40 text-purple-500/10 text-4xl select-none">⟐</div>
            <div className="absolute bottom-1/3 right-1/4 text-purple-500/10 text-5xl select-none">⧖</div>
            <div className="absolute top-1/4 left-1/3 text-purple-500/10 text-4xl select-none rotate-12">⧉</div>
        </div>
    );
};

export default NovelListPage;