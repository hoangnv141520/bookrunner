import React, { useState, useEffect } from 'react';
import {
    FaSearch, FaFilter, FaTimes, FaStar, FaStarHalfAlt, FaRegStar, FaChevronRight, FaChevronDown, FaChevronUp
} from 'react-icons/fa';

const Search: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeSearchType, setActiveSearchType] = useState('all');
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    // Sample data for search results
    const sampleResults = {
        novels: [
            {
                id: 1,
                title: "The Arcanum of Shadows",
                author: "E.M. Nightshade",
                cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1000",
                rating: 4.5,
                chapters: 154,
                status: "Ongoing",
                type: "Dark Fantasy",
                description: "In a world where shadows hold power, a disgraced mage discovers an ancient arcanum that could either save the realm or plunge it into eternal darkness."
            },
            {
                id: 2,
                title: "Ethereal Runes: The Lost Grimoire",
                author: "Selene Moonshadow",
                cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=1000",
                rating: 5.0,
                chapters: 212,
                status: "Completed",
                type: "High Fantasy",
                description: "When a young apprentice discovers a grimoire of forgotten runes, she must navigate a dangerous world of ancient magic and political intrigue."
            }
        ],
        authors: [
            {
                id: 1,
                name: "E.M. Nightshade",
                avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1000",
                works: 12,
                followers: 4567
            },
            {
                id: 2,
                name: "Selene Moonshadow",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000",
                works: 8,
                followers: 3298
            }
        ],
        tags: [
            { id: 1, name: "Shadow Magic", count: 47 },
            { id: 2, name: "Magical Academy", count: 124 },
            { id: 3, name: "Elemental Powers", count: 89 }
        ]
    };

    // Search types
    const searchTypes = [
        { id: 'all', name: 'All' },
        { id: 'novels', name: 'Novels' },
        { id: 'authors', name: 'Authors' },
        { id: 'tags', name: 'Tags' }
    ];

    // Advanced filter options
    const advancedFilters = {
        status: ["All", "Ongoing", "Completed", "Hiatus"],
        genre: ["All", "Dark Fantasy", "High Fantasy", "Cosmic Horror", "Psychological", "Sci-Fantasy", "Historical Fantasy"],
        rating: ["Any", "5 Stars", "4+ Stars", "3+ Stars"]
    };

    const handleSearch = (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        if (searchQuery.trim() === '') return;

        setIsSearching(true);

        // Simulate search delay
        setTimeout(() => {
            // Filter results based on search type
            let results;
            if (activeSearchType === 'all') {
                results = [
                    ...sampleResults.novels,
                    ...sampleResults.authors,
                    ...sampleResults.tags
                ];
            } else {
                results = sampleResults[activeSearchType as keyof typeof sampleResults];
            }

            setSearchResults(results);
            setIsSearching(false);
        }, 800);
    };

    const clearSearch = () => {
        setSearchQuery('');
        setSearchResults([]);
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

    // Auto-search when search type changes
    useEffect(() => {
        if (searchQuery.trim() !== '') {
            handleSearch();
        }
    }, [activeSearchType]);

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
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl text-purple-300 font-medium tracking-wider drop-shadow-[0_0_8px_rgba(162,136,227,0.5)] mb-4">
                        Arcane Search
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Explore the vast repository of mystical knowledge and uncover ancient secrets within our collection.
                    </p>
                </div>

                {/* Search form */}
                <div className="max-w-3xl mx-auto mb-8">
                    <form onSubmit={handleSearch} className="relative">
                        <div className="flex">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    placeholder="Search for novels, authors, or mystical knowledge..."
                                    className="w-full py-3 px-4 pl-12 bg-gray-800/70 border border-purple-900/50 focus:border-purple-700/50 rounded-l-lg text-gray-300 outline-none transition-colors duration-300 shadow-[0_0_15px_rgba(79,42,173,0.2)]"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400" size={18} />

                                {searchQuery && (
                                    <button
                                        type="button"
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-300 transition-colors duration-300"
                                        onClick={clearSearch}
                                    >
                                        <FaTimes />
                                    </button>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="px-6 bg-purple-800/80 hover:bg-purple-700/80 text-purple-100 rounded-r-lg font-medium transition-colors duration-300 border-y border-r border-purple-700/50 shadow-[0_0_15px_rgba(79,42,173,0.2)]"
                            >
                                Search
                            </button>
                        </div>

                        {/* Search types */}
                        <div className="flex justify-center mt-4 space-x-2">
                            {searchTypes.map(type => (
                                <button
                                    key={type.id}
                                    type="button"
                                    className={`px-4 py-1 rounded-full text-sm transition-colors duration-300 ${activeSearchType === type.id
                                        ? 'bg-purple-900/70 text-purple-300 border border-purple-700/50'
                                        : 'bg-gray-800/50 text-gray-400 hover:text-purple-300 border border-purple-900/30 hover:border-purple-700/50'
                                        }`}
                                    onClick={() => setActiveSearchType(type.id)}
                                >
                                    {type.name}
                                </button>
                            ))}
                        </div>

                        {/* Advanced filters toggle */}
                        <div className="flex justify-center mt-4">
                            <button
                                type="button"
                                className="flex items-center text-purple-400 hover:text-purple-300 text-sm transition-colors duration-300"
                                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                            >
                                <FaFilter className="mr-2" />
                                Advanced Filters
                                {showAdvancedFilters ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
                            </button>
                        </div>

                        {/* Advanced filters */}
                        {showAdvancedFilters && (
                            <div className="mt-4 p-4 bg-gray-900/70 backdrop-blur-sm border border-purple-900/50 rounded-lg shadow-[0_0_15px_rgba(79,42,173,0.2)] grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-purple-300 text-sm mb-2">Status</label>
                                    <select className="w-full bg-gray-800 border border-purple-900/50 rounded px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-purple-700/50">
                                        {advancedFilters.status.map(status => (
                                            <option key={status} value={status.toLowerCase()}>{status}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-purple-300 text-sm mb-2">Genre</label>
                                    <select className="w-full bg-gray-800 border border-purple-900/50 rounded px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-purple-700/50">
                                        {advancedFilters.genre.map(genre => (
                                            <option key={genre} value={genre.toLowerCase().replace(/\s+/g, '-')}>{genre}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-purple-300 text-sm mb-2">Rating</label>
                                    <select className="w-full bg-gray-800 border border-purple-900/50 rounded px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-purple-700/50">
                                        {advancedFilters.rating.map(rating => (
                                            <option key={rating} value={rating.toLowerCase().replace(/\s+/g, '-')}>{rating}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        )}
                    </form>
                </div>

                {/* Search results */}
                {isSearching ? (
                    <div className="text-center py-20">
                        <div className="w-16 h-16 border-4 border-purple-900/50 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-purple-300">Searching the arcane archives...</p>
                    </div>
                ) : (
                    <>
                        {searchResults.length > 0 && (
                            <div className="space-y-8">
                                {/* Results header */}
                                <div className="border-b border-purple-900/30 pb-2">
                                    <h2 className="text-xl text-purple-300 font-medium">
                                        Search Results for "{searchQuery}"
                                        <span className="text-gray-400 text-base ml-2">({searchResults.length} results)</span>
                                    </h2>
                                </div>

                                {/* Novel results */}
                                {searchResults.some(result => result.title) && (
                                    <div className="space-y-4">
                                        <h3 className="text-lg text-purple-400 font-medium">Novels</h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {searchResults.filter(result => result.title).map((novel) => (
                                                <div
                                                    key={novel.id}
                                                    className="flex bg-gray-800/40 rounded-lg overflow-hidden border border-purple-900/30 hover:border-purple-700/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(79,42,173,0.3)]"
                                                >
                                                    {/* Cover */}
                                                    <div className="w-1/4 relative">
                                                        <img
                                                            src={novel.cover}
                                                            alt={novel.title}
                                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                                            style={{ height: '100%', minHeight: '140px' }}
                                                        />
                                                        <div className="absolute top-2 right-2 bg-purple-900/80 text-purple-200 text-xs px-2 py-0.5 rounded">
                                                            {novel.status}
                                                        </div>
                                                    </div>

                                                    {/* Details */}
                                                    <div className="p-3 flex-1">
                                                        <h4 className="font-medium text-purple-300 hover:text-purple-200 transition-colors duration-300 cursor-pointer truncate">
                                                            {novel.title}
                                                        </h4>
                                                        <p className="text-gray-400 text-sm">by {novel.author}</p>

                                                        <div className="flex items-center mt-1">
                                                            {renderStars(novel.rating)}
                                                            <span className="text-gray-400 text-xs ml-2">{novel.rating.toFixed(1)}</span>
                                                        </div>

                                                        <p className="text-gray-400 text-xs mt-2 line-clamp-2">
                                                            {novel.description}
                                                        </p>

                                                        <div className="mt-2 flex justify-between items-center">
                                                            <span className="text-purple-400 text-xs">{novel.type} • {novel.chapters} chapters</span>
                                                            <button className="text-sm text-purple-300 hover:text-purple-200 transition-colors duration-300 flex items-center">
                                                                View <FaChevronRight className="ml-1" size={10} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Author results */}
                                {searchResults.some(result => result.name && result.works) && (
                                    <div className="space-y-4">
                                        <h3 className="text-lg text-purple-400 font-medium">Authors</h3>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                            {searchResults.filter(result => result.name && result.works).map((author) => (
                                                <div
                                                    key={author.id}
                                                    className="bg-gray-800/40 rounded-lg overflow-hidden border border-purple-900/30 hover:border-purple-700/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(79,42,173,0.3)] p-4 flex items-center"
                                                >
                                                    <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                                                        <img
                                                            src={author.avatar}
                                                            alt={author.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>

                                                    <div>
                                                        <h4 className="font-medium text-purple-300 hover:text-purple-200 transition-colors duration-300 cursor-pointer">
                                                            {author.name}
                                                        </h4>
                                                        <div className="text-gray-400 text-xs flex items-center space-x-2">
                                                            <span>{author.works} works</span>
                                                            <span>•</span>
                                                            <span>{author.followers.toLocaleString()} followers</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Tag results */}
                                {searchResults.some(result => result.count) && (
                                    <div className="space-y-4">
                                        <h3 className="text-lg text-purple-400 font-medium">Tags</h3>

                                        <div className="flex flex-wrap gap-3">
                                            {searchResults.filter(result => result.count).map((tag) => (
                                                <div
                                                    key={tag.id}
                                                    className="px-4 py-2 bg-gray-800/40 text-purple-300 hover:text-purple-200 rounded-full text-sm border border-purple-900/30 hover:border-purple-700/50 transition-all duration-300 flex items-center cursor-pointer"
                                                >
                                                    <span>{tag.name}</span>
                                                    <span className="ml-2 px-1.5 py-0.5 bg-purple-900/50 text-purple-200 text-xs rounded-full">{tag.count}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* No results state */}
                        {searchQuery && !isSearching && searchResults.length === 0 && (
                            <div className="text-center py-16 bg-gray-900/40 backdrop-blur-sm border border-purple-900/30 rounded-lg">
                                <div className="text-purple-300 text-6xl mb-4">✧</div>
                                <h3 className="text-xl text-purple-300 mb-2">No mystical tomes found</h3>
                                <p className="text-gray-400 mb-6">We couldn't find any results matching "{searchQuery}"</p>
                                <div className="max-w-md mx-auto text-sm text-gray-500">
                                    <p>Suggestions:</p>
                                    <ul className="mt-2 space-y-1">
                                        <li>• Check your spelling</li>
                                        <li>• Try more general keywords</li>
                                        <li>• Try different keywords</li>
                                        <li>• Explore our categories instead</li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </>
                )}

                {/* Popular searches section */}
                {!searchQuery && !isSearching && searchResults.length === 0 && (
                    <div className="mt-12 bg-gray-900/70 backdrop-blur-sm border border-purple-900/50 rounded-lg p-6 shadow-[0_0_20px_rgba(79,42,173,0.2)]">
                        <h2 className="text-xl text-purple-300 mb-6 font-medium tracking-wide">Popular Searches</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { name: "Elemental Magic", icon: "🔥" },
                                { name: "Arcane Academies", icon: "🏰" },
                                { name: "Forbidden Grimoires", icon: "📜" },
                                { name: "Astral Projection", icon: "✨" },
                                { name: "Necromancy", icon: "💀" },
                                { name: "Time Manipulation", icon: "⏳" },
                                { name: "Dimensional Travel", icon: "🌀" },
                                { name: "Ancient Runes", icon: "🔮" }
                            ].map((item, index) => (
                                <button
                                    key={index}
                                    className="bg-gray-800/40 hover:bg-purple-900/30 border border-purple-900/30 hover:border-purple-700/50 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-[0_0_15px_rgba(79,42,173,0.3)]"
                                    onClick={() => {
                                        setSearchQuery(item.name);
                                        handleSearch();
                                    }}
                                >
                                    <div className="text-2xl mb-2">{item.icon}</div>
                                    <div className="text-purple-300 font-medium">{item.name}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Browse categories */}
                {!searchQuery && !isSearching && searchResults.length === 0 && (
                    <div className="mt-8 bg-gray-900/70 backdrop-blur-sm border border-purple-900/50 rounded-lg p-6 shadow-[0_0_20px_rgba(79,42,173,0.2)]">
                        <h2 className="text-xl text-purple-300 mb-6 font-medium tracking-wide">Browse by Category</h2>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                            {[
                                'Fantasy', 'Romance', 'Action', 'Horror', 'Sci-Fi', 'Mystery',
                                'Adventure', 'Historical', 'Supernatural', 'Comedy', 'Drama', 'Tragedy'
                            ].map((genre, index) => (
                                <button
                                    key={index}
                                    className="bg-gray-800/40 hover:bg-purple-900/30 border border-purple-900/30 hover:border-purple-700/50 rounded-lg p-3 text-center transition-all duration-300 hover:shadow-[0_0_15px_rgba(79,42,173,0.3)]"
                                    onClick={() => {
                                        setSearchQuery(genre);
                                        handleSearch();
                                    }}
                                >
                                    <div className="text-purple-300 font-medium">{genre}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Search tips */}
                {!searchQuery && !isSearching && searchResults.length === 0 && (
                    <div className="mt-8 bg-gray-900/70 backdrop-blur-sm border border-purple-900/50 rounded-lg p-6 shadow-[0_0_20px_rgba(79,42,173,0.2)]">
                        <h2 className="text-xl text-purple-300 mb-4 font-medium tracking-wide">Search Tips</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-gray-800/40 p-4 rounded-lg border border-purple-900/30">
                                <h3 className="text-purple-400 font-medium mb-2">Advanced Search</h3>
                                <p className="text-gray-400 text-sm">Use quotation marks for exact phrases: "elemental magic"</p>
                            </div>

                            <div className="bg-gray-800/40 p-4 rounded-lg border border-purple-900/30">
                                <h3 className="text-purple-400 font-medium mb-2">Exclude Terms</h3>
                                <p className="text-gray-400 text-sm">Use minus sign to exclude words: magic -beginners</p>
                            </div>

                            <div className="bg-gray-800/40 p-4 rounded-lg border border-purple-900/30">
                                <h3 className="text-purple-400 font-medium mb-2">Filter by Author</h3>
                                <p className="text-gray-400 text-sm">Use "author:" prefix: author:nightshade</p>
                            </div>
                        </div>
                    </div>
                )}
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

export default Search;