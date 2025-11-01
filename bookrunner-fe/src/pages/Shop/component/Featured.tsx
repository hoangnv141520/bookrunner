import React from 'react'
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { BookData } from '../../../types/auth';

interface BookListProps {
    books: BookData[];
}
const Featured: React.FC<BookListProps> = ({ books }) => {

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
    return (
        <div className="bg-gray-900/70 backdrop-blur-sm border border-purple-900/50 rounded-lg p-6 shadow-[0_0_20px_rgba(79,42,173,0.2)] mb-8">
            <h2 className="text-xl text-purple-300 mb-6 font-medium tracking-wide">Featured Grimoires</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {books.splice(0, 3).map((book) => (
                    <div key={book.id} className="bg-gray-800/40 rounded-lg overflow-hidden border border-purple-900/30 hover:border-purple-700/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(79,42,173,0.3)] group">
                        <div className="relative h-60 overflow-hidden">
                            <img
                                src={book.image}
                                alt={book.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-2 right-2 bg-purple-600/90 text-white text-xs font-bold px-2 py-1 rounded">
                                FEATURED
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-medium text-purple-300 text-lg truncate">{book.title}</h3>
                            <p className="text-gray-400 text-sm mb-2">by {book.author.name}</p>
                            <div className="flex items-center mb-3">
                                {renderStars(book.votes.length > 0
                                    ? book.votes.reduce((sum, vote) => sum + vote.value, 0) / book.votes.length
                                    : 0)}
                                <span className="text-gray-400 text-xs ml-2">{(book.votes.length > 0
                                    ? book.votes.reduce((sum, vote) => sum + vote.value, 0) / book.votes.length
                                    : 0).toFixed(1)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-purple-300 font-bold">${book.price.toFixed(2)}</span>
                                <button className="bg-purple-800/80 hover:bg-purple-700/80 text-purple-100 px-3 py-1 rounded text-sm font-medium transition-colors duration-300 border border-purple-700/50">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Featured