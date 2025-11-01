import React, { useState } from 'react';
import { BookData } from '../../../types/auth';
import { FaStar } from 'react-icons/fa';

interface BookDetailsProps {
    book: BookData;
}

const BookDetails: React.FC<BookDetailsProps> = ({ book }) => {

    const [userRating, setUserRating] = useState<number | null>(null);
    const [hoverRating, setHoverRating] = useState<number | null>(null);
    const getRatingStars = () => {
        let rating = 0;
        if (book.votes.length > 0) {
            rating = book.votes.reduce((a, b) => a + b.value, 0) / book.votes.length;
        }
        return rating;
    }
    const userRated = async (star: number) => {
        setUserRating(star);
        
    }
    return (
        <div>
            <div className="flex flex-col gap-6 bg-gray-900 p-10 rounded-sm">
                <div className='w-full flex justify-between'>
                    <div className='flex gap-4'>
                        <div className='min-w-50'>
                            <img src={book.image} alt={book.title} className="w-50 aspect-[9/13]  object-cover rounded shadow-md" />
                        </div>
                        <div className="flex flex-col space-y-4">
                            <h1 className="text-2xl font-bold">{book.title}</h1>
                            <div className='flex gap-6'>
                                <p className="text-sm ">Tác giả: {book.author?.name}</p>
                                <p className="text-sm ">Nhà sản xuất: {book.publisher}</p>
                            </div>
                            <div className="flex items-center mb-4">
                                <div className="flex text-purple-400 text-xl">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} className={i < Math.floor(getRatingStars()) ? 'text-purple-400' : 'text-gray-700'} />
                                    ))}
                                </div>
                                <span className="ml-2 text-purple-300/90 font-medium">{getRatingStars()}/5.0</span>
                                <span className="ml-2 text-sm text-purple-400/70">({book.votes.length} đánh giá)</span>
                            </div>
                            <hr className='mr-6' />
                            <div className="flex flex-col">
                                <h2 className="text-xl font-semibold mb-2">Mô tả</h2>
                                <p className="text-gray-700 leading-relaxed">{book.novel_desc}</p>
                            </div>
                        </div>
                    </div>
                    <div className='min-w-70 flex flex-col gap-6 '>
                        <div className='flex flex-col gap-3 p-4 border-1 border-gray-400'>
                            <div className='flex items-center justify-between'>
                                <p>Giá gốc:</p>
                                <p className=''>{book.price.toLocaleString('vi-VN')} VND</p>
                            </div>
                            <div className='flex items-center justify-between'>
                                <p>Thuế:</p>
                                <p className=''>{(book.price * 0.08).toLocaleString('vi-VN')} VND(8%)</p>
                            </div>
                            <div className='flex items-center justify-between'>
                                <p>Tổng:</p>
                                <p className='text-red-600'>{(book.price * 1.08).toLocaleString('vi-VN')} VND</p>
                            </div>
                            <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition">Thêm vào giỏ hàng</button>
                        </div>

                        <div className='flex flex-col items-center gap-3 p-4 border-1 border-gray-400'>
                            <div className='flex items-center justify-between'>
                                <p>Đánh giá sách này:</p>
                            </div>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-2'>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            className="p-1 hover:scale-110 transition-transform"
                                            title={`${star} sao`}
                                            onClick={() => userRated(star)}
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(null)}
                                        >
                                            <FaStar
                                                className={`h-6 w-6 ${(hoverRating !== null && star <= hoverRating) || (hoverRating === null && userRating !== null && star <= userRating)
                                                    ? 'text-purple-400'
                                                    : 'text-gray-700 hover:text-purple-500/70'
                                                    }`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full'>

                </div>
            </div>
            <div className="mt-8 bg-gray-900 p-10">
                <h2 className="text-2xl font-semibold mb-2">Thông tin sách</h2>
                <div className="font-light text-white space-y-1">
                    <p><strong>Tên:</strong> {book.title}</p>
                    <p><strong>Tác giả:</strong> {book.author?.name}</p>
                    <p><strong>Nhà sản xuất:</strong> {book.publisher}</p>
                    <p><strong>Ngày sản xuất:</strong> {(() => {
                        const date = new Date(book.releasedate);
                        const day = String(date.getDate()).padStart(2, '0');
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const year = date.getFullYear();
                        return `${day}-${month}-${year}`;
                    })()}</p>
                    <p><strong>Số trang:</strong> {book.pages}</p>
                </div>
                <hr className='mt-3' />
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-2">Tags</h2>
                    <div className="flex flex-wrap gap-2">
                        {book.categories.map((tag, index) => (
                            <span
                                key={index}
                                className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                            >
                                {tag.name}
                            </span>
                        ))}
                    </div>
                </div>
                <hr className='mt-3' />
                <div className='mt-3'>
                    <h2 className='text-2xl font-bold'>Chia sẻ:</h2>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;