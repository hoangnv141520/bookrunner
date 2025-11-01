import React from 'react';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { NovelData } from '../../../types/auth';

interface Novel {
  novel: NovelData
}

const NovelDetail: React.FC<Novel> = ({ novel }) => {

  return (
    <div className="flex-grow relative z-10">
      <h1 className="text-3xl font-medium text-purple-200 tracking-wider drop-shadow-[0_0_8px_rgba(162,136,227,0.5)]">
        {novel.title}
      </h1>

      <div className="flex items-center mt-2">
        <div className="flex text-purple-400">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className={i < Math.floor(novel.numberofvote) ? 'text-purple-400' : 'text-gray-700'} />
          ))}
        </div>
        <span className="ml-2 text-purple-300/80">{novel.numberofvote}/5.0</span>
      </div>

      <div className="mt-4 space-y-2 text-purple-200/80">
        <p><span className="font-medium text-purple-300">Tác giả:</span> {novel.author.name}</p>
        <p><span className="font-medium text-purple-300">Họa sĩ:</span> {novel.artist.name}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {novel.categories.map(genre => (
            <span
              key={genre.id}
              className="px-3 py-1 bg-purple-900/40 text-purple-200 text-sm rounded-full border border-purple-500/30 backdrop-blur-sm"
            >
              {genre.name}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          to={`/chapter/${novel.chapters[0].id}`}
          className="px-6 py-2.5 bg-purple-800/80 text-purple-100 font-medium rounded-md hover:bg-purple-700/80 transition-colors duration-300 backdrop-blur-sm border border-purple-500/30 shadow-[0_0_10px_rgba(79,42,173,0.2)]"
        >
          Đọc Chương Đầu Tiên
        </Link>
        <Link
          to={`/chapter/${novel.chapters[novel.chapters.length - 1].id}`}
          className="px-6 py-2.5 bg-gray-800/60 text-purple-200 font-medium rounded-md hover:bg-gray-700/60 transition-colors duration-300 backdrop-blur-sm border border-purple-900/30 shadow-[0_0_10px_rgba(79,42,173,0.1)]"
        >
          Chương Mới Nhất
        </Link>
      </div>
    </div>
  );
};

export default NovelDetail;