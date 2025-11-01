import React, { useEffect, useState } from 'react'
import { FaBook, FaBookOpen, FaChevronDown, FaChevronRight, FaFilter, FaFolder, FaFolderOpen, FaRegStar, FaStar } from 'react-icons/fa'
import { Category } from '../../../types/auth';

interface FilterProps {
    selectedCategory: number | string;
    setSelectedCategory: (categoryId: number | string) => void;
    onPriceChange?: (price: number) => void;
    onRatingChange?: (ratings: number[]) => void;
}

const Filter: React.FC<FilterProps> = ({
    selectedCategory,
    setSelectedCategory,
    onPriceChange,
    onRatingChange
}) => {
    const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
        'cate': true, // Default to expanded
    });

    const [categoryTree, setCategoryTree] = useState<Category[]>([]);

    const [price, setPrice] = useState(0);
    const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
    const server = import.meta.env.VITE_SERVER

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${server}/api/categories`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();

                if (Array.isArray(data) && data.length > 0) {
                    setCategoryTree([{
                        id: 'cate',
                        name: 'Tags',
                        children: data
                    }]);
                }
            }
            catch (error) {
                console.error('Error fetching categories:', error);
                // Keep fallback data on error
            }
        };

        fetchCategories();
    }, []);

    const toggleCategory = (categoryId: string | number, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent triggering selection
        setExpandedCategories(prev => ({
            ...prev,
            [String(categoryId)]: !prev[String(categoryId)]
        }));
    };

    const handleCategorySelect = (categoryId: string | number) => {
        setSelectedCategory(categoryId);
    };

    const isParentOfSelected = (category: Category): boolean => {
        if (!category.children) return false;

        return category.children.some((child: Category) =>
            child.id === selectedCategory ||
            (child.children && isParentOfSelected(child))
        );
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPrice = Number(e.target.value);
        setPrice(newPrice);
        if (onPriceChange) {
            onPriceChange(newPrice);
        }
    };

    const handleRatingChange = (rating: number) => {
        setSelectedRatings(prev => {
            const newRatings = prev.includes(rating)
                ? prev.filter(r => r !== rating)
                : [...prev, rating];

            if (onRatingChange) {
                onRatingChange(newRatings);
            }

            return newRatings;
        });
    };

    const handleApplyFilters = () => {
        if (onPriceChange) {
            onPriceChange(price);
        }
        if (onRatingChange) {
            onRatingChange(selectedRatings);
        }
    };

    const renderCategoryTree = (categories: Category[], level = 0) => {
        return categories.map(category => {
            const hasChildren = category.children && category.children.length > 0;
            const isExpanded = expandedCategories[String(category.id)];
            const isSelected = selectedCategory === category.id;
            const isParent = isParentOfSelected(category);

            return (
                <div key={category.id} className="ml-0" style={{ marginLeft: `${level * 12}px` }}>
                    <div
                        className={`w-full text-left py-2 px-2 rounded-md transition-colors duration-300 flex items-center ${isSelected
                            ? 'bg-purple-900/50 text-purple-300 border border-purple-700/50'
                            : isParent
                                ? 'bg-gray-800/70 text-purple-200 border border-purple-900/50'
                                : 'text-gray-400 hover:text-purple-300 hover:bg-gray-800/50'
                            }`}
                        onClick={() => !hasChildren && handleCategorySelect(category.id)}
                    >
                        {hasChildren ? (
                            <div
                                onClick={(e) => toggleCategory(category.id, e)}
                                className="flex items-center cursor-pointer"
                            >
                                {isExpanded ?
                                    <FaChevronDown className="mr-2 text-xs" /> :
                                    <FaChevronRight className="mr-2 text-xs" />
                                }
                            </div>
                        ) : (
                            <div className="w-4 mr-2" />
                        )}

                        {hasChildren ? (
                            <div onClick={(e) => toggleCategory(category.id, e)} className="cursor-pointer">
                                {isExpanded ?
                                    <FaFolderOpen className="mr-2 text-purple-400" /> :
                                    <FaFolder className="mr-2 text-purple-500/70" />
                                }
                            </div>
                        ) : (
                            <FaBook className="mr-2 text-purple-400/70" />
                        )}

                        <span className="truncate" onClick={() => handleCategorySelect(category.id)}>{category.name}</span>
                    </div>

                    {hasChildren && isExpanded && (
                        <div className="mt-1 mb-1 border-l-2 border-purple-900/30 pl-2">
                            {renderCategoryTree(category.children || [], level + 1)}
                        </div>
                    )}
                </div>
            );
        });
    };

    return (
        <div className="w-full lg:w-1/4">
            <div className="bg-gray-900/70 backdrop-blur-sm border border-purple-900/50 rounded-lg p-6 shadow-[0_0_20px_rgba(79,42,173,0.2)] sticky top-6">
                <h2 className="text-lg text-purple-300 mb-4 font-medium tracking-wide flex items-center">
                    <FaFilter className="mr-2" /> Categories
                </h2>

                {/* All books option */}
                <div className="mb-3">
                    <div
                        className={`w-full text-left py-2 px-2 rounded-md transition-colors duration-300 flex items-center cursor-pointer ${selectedCategory === 'all'
                            ? 'bg-purple-900/50 text-purple-300 border border-purple-700/50'
                            : 'text-gray-400 hover:text-purple-300 hover:bg-gray-800/50'
                            }`}
                        onClick={() => handleCategorySelect('all')}
                    >
                        <div className="w-4 mr-2" />
                        <FaBookOpen className="mr-2 text-purple-400" />
                        <span>All Books</span>
                    </div>
                </div>

                {/* Tree navigation */}
                <div className="space-y-1 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    {renderCategoryTree(categoryTree)}
                </div>

                {/* Price range filter */}
                <div className="mt-8">
                    <h2 className="text-lg text-purple-300 mb-4 font-medium tracking-wide">
                        Price Range
                    </h2>

                    <input
                        type="range"
                        min="0"
                        max="1000000"
                        value={price}
                        onChange={handlePriceChange}
                        className="w-full accent-purple-500"
                    />

                    <div className="flex justify-between text-sm text-gray-400 mt-2">
                        <span>0</span>
                        <span>1,000,000</span>
                    </div>

                    <div className="text-center text-purple-400 mt-2 font-semibold">
                        Selected Price: {price.toLocaleString()}₫
                    </div>
                </div>

                {/* Rating filter */}
                <div className="mt-8">
                    <h2 className="text-lg text-purple-300 mb-4 font-medium tracking-wide">Rating</h2>
                    <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((rating) => (
                            <div key={rating} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={`rating-${rating}`}
                                    checked={selectedRatings.includes(rating)}
                                    onChange={() => handleRatingChange(rating)}
                                    className="w-4 h-4 accent-purple-500 mr-2"
                                />
                                <label
                                    htmlFor={`rating-${rating}`}
                                    className="flex items-center text-gray-400 cursor-pointer"
                                >
                                    {Array.from({ length: rating }).map((_, i) => (
                                        <FaStar key={i} className="text-yellow-400" />
                                    ))}
                                    {Array.from({ length: 5 - rating }).map((_, i) => (
                                        <FaRegStar key={i} className="text-gray-500" />
                                    ))}
                                    <span className="ml-2">& Up</span>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Apply filters button */}
                <div className="mt-8">
                    <button
                        onClick={handleApplyFilters}
                        className="w-full py-2 bg-purple-800/80 hover:bg-purple-700/80 text-purple-100 rounded-md font-medium tracking-wide transition-colors duration-300 border border-purple-700/50"
                    >
                        Apply Filters
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Filter;