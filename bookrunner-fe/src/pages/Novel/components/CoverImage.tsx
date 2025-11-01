import React, { useEffect, useState } from 'react';
import { FaEye, FaHeart } from 'react-icons/fa';
import { AuthState, NovelData } from '../../../types/auth';

interface Novel {
  novel: NovelData
  auth: AuthState
}

const CoverImage: React.FC<Novel> = ({ novel, auth }) => {
  // console.log(auth);
  const server = import.meta.env.VITE_SERVER
  const [isLiked, setIsLiked] = useState(false);
  const handlerLike = async () => {
    setIsLiked(!isLiked);
    if (isLiked) {
      novel.like -= 1;
    } else {
      novel.like += 1;
    }
    await fetch(`${server}/api/novel-like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        novel: novel.id,
        user: auth.user?.id
      })
    });
  }
  useEffect(() => {
    const checkLike = async () => {
      const res = await fetch(`${server}/api/novel-like/novel/${novel.id}`);
      const data = await res.json();
      console.log(data);

      data.forEach((item: any) => {
        if (item.user === auth.user?.id) {
          setIsLiked(true);
        }
      });
    }
    checkLike();
  }, [])
  return (
    <div className="flex-shrink-0 relative z-10">
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg blur opacity-30"></div>
        <img
          src={novel.image}
          alt={novel.title}
          className="relative rounded-lg shadow-[0_0_15px_rgba(79,42,173,0.4)] w-48 h-64 object-cover mx-auto border border-purple-900/50"
        />
      </div>

      <div className="flex justify-center mt-4 gap-4">
        <button
          onClick={() => handlerLike()}
          className={`flex justify-center items-center gap-2 p-2.5 rounded-full backdrop-blur-sm transition-all duration-300 shadow-sm ${isLiked
            ? 'bg-purple-500/30 text-purple-200 border border-purple-400/50'
            : 'bg-gray-800/50 text-purple-400/70 border border-purple-900/30 hover:bg-gray-800/70 hover:text-purple-300'
            }`}
          aria-label="Like"
        >
          <FaHeart />
          <p>{novel.like}</p>
        </button>
        <button
          className="p-2.5 rounded-full bg-gray-800/50 text-purple-400/70 border border-purple-900/30 backdrop-blur-sm transition-all duration-300 shadow-sm hover:bg-gray-800/70 hover:text-purple-300"
          aria-label="Share"
        >
          <span className="flex items-center">
            <FaEye className="mr-1" /> {novel.view.toLocaleString()}
          </span>
        </button>
      </div>
    </div>
  );
};

export default CoverImage;