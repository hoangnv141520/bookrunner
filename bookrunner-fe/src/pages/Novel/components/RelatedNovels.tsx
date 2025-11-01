import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NovelData } from '../../../types/auth';


const RelatedNovels: React.FC = () => {
  const [relatedNovel, setRelatedNovel] = useState<NovelData[]>([]);
  const server = import.meta.env.VITE_SERVER
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${server}/api/novels`);
        const data = await response.json();
        // console.log(data);
        setRelatedNovel(data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };
    fetchData();

  }, [])
  return (
    <div className="w-full mt-8 relative z-10 max-w-7xl mx-auto">
      <div className="bg-gray-900/70 backdrop-blur-sm border border-purple-900/50 rounded-lg p-6 shadow-[0_0_20px_rgba(79,42,173,0.2)]">
        <h3 className="text-xl font-medium text-purple-300 tracking-wide mb-6">Truyện Liên Quan</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {relatedNovel.splice(0, 4).map((relatedNovel) => (
            <Link
              key={relatedNovel.id}
              to={`/novel/${relatedNovel.id}`}
              className="flex items-center space-x-4 p-3 rounded-lg bg-gray-800/40 border border-purple-900/30 hover:border-purple-500/50 transition-colors duration-300 group"
            >
              <img
                src={relatedNovel.image}
                alt={relatedNovel.title}
                className="w-16 h-24 object-cover rounded shadow flex-shrink-0 border border-purple-900/30"
              />
              <div>
                <h4 className="font-medium text-purple-200/80 group-hover:text-purple-200 transition-colors duration-300">
                  {relatedNovel.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedNovels;