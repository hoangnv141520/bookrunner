import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthState, NovelData } from '../../../types/auth';

interface PosterProps {
  novel: NovelData
  auth: AuthState
}

const Poster: React.FC<PosterProps> = ({ novel, auth }) => {
  const [userRating, setUserRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  // console.log(novel);



  return (
    <div className="w-full mt-8 relative z-10 max-w-7xl mx-auto">
      <div className="bg-gray-900/70 backdrop-blur-sm border border-purple-900/50 rounded-lg p-6 shadow-[0_0_20px_rgba(79,42,173,0.2)]">
        <div className="flex items-center space-x-4 mb-3">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full blur opacity-30"></div>
            <img
              src="https://ui-avatars.com/api/?name=Hyougetsu&background=4F2AAD&color=fff"
              alt="Author Avatar"
              className="relative w-12 h-12 rounded-full border border-purple-500/30"
            />
          </div>
          <div>
            <Link to={`/user/${novel.user.id}`} className="font-medium text-purple-200">{novel.user.username}</Link>
            <p className="text-xs text-purple-400/70">Người đăng</p>
          </div>
        </div>
        <div className="border-t border-purple-900/30 my-4"></div>

        <h3 className="text-xl font-medium text-purple-300 tracking-wide mb-4">Đánh Giá Truyện Này</h3>

        <div className="flex items-center mb-4">
          <div className="flex text-purple-400 text-xl">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={i < Math.floor(4.5) ? 'text-purple-400' : 'text-gray-700'} />
            ))}
          </div>
          <span className="ml-2 text-purple-300/90 font-medium">{novel.numberofvote}/5.0</span>
          <span className="ml-2 text-sm text-purple-400/70">({novel.numberofvote} đánh giá)</span>
        </div>

        {auth.isAuthenticated ? (
          <div className="mb-4">
            <p className="text-sm text-purple-200/80 mb-2">Đánh giá của bạn:</p>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className="p-1 hover:scale-110 transition-transform"
                  title={`${star} sao`}
                  onClick={() => setUserRating(star)}
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
        ) : (
          <div></div>
        )}

        <div className="mt-4 pt-4 border-t border-purple-900/30">
          <h4 className="text-sm font-medium text-purple-300 mb-2">Phân Bố Đánh Giá</h4>

          {[5, 4, 3, 2, 1].map((num) => (
            <div key={num} className="flex items-center text-sm mb-1">
              <span className="w-2 text-purple-200">{num}</span>
              <FaStar className="h-3 w-3 text-purple-400 ml-1 mr-2" />
              <div className="w-full bg-gray-800/80 rounded-full h-2">
                <div
                  className="bg-purple-500/80 h-2 rounded-full"
                  style={{ width: `${num === 5 ? 75 : num === 4 ? 15 : num === 3 ? 7 : num === 2 ? 2 : 1}%` }}
                ></div>
              </div>
              <span className="ml-2 text-xs text-purple-400/70">
                {num === 5 ? '75%' : num === 4 ? '15%' : num === 3 ? '7%' : num === 2 ? '2%' : '1%'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Poster;