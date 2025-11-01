import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { BookData } from '../../../types/auth'; // Điều chỉnh đường dẫn nếu cần

interface BookListItemProps {
    book: BookData;
    calculateAverageRating: (votes: { value: number }[]) => number;
}

const BookListItem: React.FC<BookListItemProps> = ({ book, calculateAverageRating }) => {
    const rating = calculateAverageRating(book.votes);
    
    return (
        <div className="bg-gray-800/40 rounded-lg overflow-hidden border border-purple-900/30 hover:border-purple-700/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(79,42,173,0.3)] flex">
            <div className="w-1/4 max-w-[180px] relative overflow-hidden">
                <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    style={{ height: '100%', minHeight: '180px' }}
                />
            </div>
            <div className="p-4 flex-1">
                <div className="flex justify-between">
                    <div>
                        <h3 className="font-medium text-purple-300 text-lg">{book.title}</h3>
                        <p className="text-gray-400 text-sm">by {book.author.name}</p>
                    </div>
                    <div className="text-purple-300 font-bold">{book.price.toLocaleString('vi-VN')} VND</div>
                </div>

                <div className="flex items-center mt-2">
                    <div className="flex">
                        {Array.from({ length: Math.floor(rating) }).map((_, i) => (
                            <FaStar key={i} className="text-yellow-400" />
                        ))}
                        {rating % 1 !== 0 && <FaStarHalfAlt className="text-yellow-400" />}
                        {Array.from({ length: 5 - Math.ceil(rating) }).map((_, i) => (
                            <FaRegStar key={i} className="text-gray-500" />
                        ))}
                    </div>
                    <span className="text-gray-400 text-xs ml-2">{rating.toFixed(1)}</span>
                </div>

                <p className="text-gray-400 mt-3 text-sm">{book.novel_desc}</p>

                <div className="flex items-center justify-between mt-4">
                    <div className="flex flex-wrap gap-2">
                        {book.categories.map((category) => (
                            <span key={category.id} className="px-2 py-1 bg-purple-600/40 text-purple-200 text-xs rounded border border-purple-500/30">
                                {category.name}
                            </span>
                        ))}
                    </div>

                    <div className="flex space-x-2 min-w-30">
                        <button 
                            className="bg-purple-800/80 hover:bg-purple-700/80 text-purple-100 px-4 py-2 rounded text-sm font-medium transition-colors duration-300 border border-purple-700/50"
                            aria-label={`Add ${book.title} to cart`}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookListItem;