import React from 'react';
import { AuthState, BookData } from '../../../types/auth';
import { Link } from 'react-router-dom';

interface BookCardProps {
    book: BookData;
    renderStars: (rating: number) => React.ReactElement;
    calculateAverageRating: (votes: { value: number }[]) => number;
    auth: AuthState;
}

const BookCard: React.FC<BookCardProps> = ({ book, renderStars, calculateAverageRating, auth }) => {
    const server = import.meta.env.VITE_SERVER
    const addToCart = async () => {
        if (auth.isAuthenticated) {
            try {
                const res = await fetch(`${server}/api/cart-detail`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        bookId: book.id,
                        quantity: 1,
                        userId: auth.user?.id,
                    }),
                });

                if (res.ok) {
                    alert('Đã thêm vào giỏ hàng');
                } else {
                    alert('Không thể thêm vào giỏ hàng. Vui lòng thử lại.');
                }
            } catch (err) {
                console.error("Lỗi khi thêm vào giỏ hàng:", err);
                alert('Đã xảy ra lỗi. Vui lòng thử lại.');
            }
        } else {
            alert('Vui lòng đăng nhập để thêm vào giỏ hàng');
        }
    };

    return (
        <div className="bg-gray-800/40 rounded-lg overflow-hidden border border-purple-900/30 hover:border-purple-700/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(79,42,173,0.3)] group">
            <div className="relative h-56 overflow-hidden">
                <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>
            <div className="p-4">
                <Link to={`/book/${book.id}`} className="font-medium text-purple-300 text-lg truncate">{book.title}</Link>
                <p className="text-gray-400 text-sm mb-2">by {book.author.name}</p>
                <div className="flex items-center mb-3">
                    {renderStars(calculateAverageRating(book.votes))}
                    <span className="text-gray-400 text-xs ml-2">
                        {calculateAverageRating(book.votes).toFixed(1)}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-purple-300 font-bold">
                        {book.price.toLocaleString('vi-VN')} VND
                    </span>
                    <button
                        className="bg-purple-800/80 hover:bg-purple-700/80 text-purple-100 px-3 py-1 rounded text-sm font-medium transition-colors duration-300 border border-purple-700/50"
                        aria-label={`Add ${book.title} to cart`}
                        onClick={addToCart}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookCard;
