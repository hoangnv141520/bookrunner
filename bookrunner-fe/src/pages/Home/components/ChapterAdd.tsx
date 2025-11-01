import { useEffect, useState } from 'react';
import CardItem from '../../../components/cardItem';
import ViewMore from './ViewMore';
import { ChapterData } from '../../../types/auth';

const ChapterAdd = () => {
  const [recentChapters, setRecentChapters] = useState<ChapterData[]>([]);
  const server = import.meta.env.VITE_SERVER
  useEffect(() => {
    const fetchRecentNovels = async () => {
      try {
        const response = await fetch(`${server}/chapters/recent`);
        if (!response.ok) {
          throw new Error(`Failed to fetch recent chapters: ${response.status}`);
        }
        const data = await response.json();
        setRecentChapters(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching recent novels:", error);
      }
    };
    fetchRecentNovels();
  }, []);

  return (
    <div className="h-full flex flex-col gap-6 bg-zinc-950 text-zinc-200 p-6">
      <div className="flex items-center gap-3">
        <div className="px-3 py-1.5 bg-zinc-900 text-zinc-300 font-medium rounded-sm border-l-2 border-indigo-600">
          Chương
        </div>
        <div className="font-medium text-indigo-400 relative">
          mới nhất
          <span className="absolute -bottom-1 left-0 w-full h-px bg-indigo-800/60"></span>
        </div>
        <div className="h-px flex-grow bg-gradient-to-r from-zinc-800 to-transparent ml-2"></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {recentChapters.slice(0, 20).map((chapter, index) => (
          <div
            key={index}
            className="transition-all duration-300 hover:scale-[1.02] group"
          >
            <div className="relative p-0.5 rounded-lg overflow-hidden group-hover:bg-gradient-to-br from-indigo-600/20 via-indigo-500/10 to-transparent">
              <CardItem chapterTitle={chapter.name} name={chapter.novel.title} image={chapter.novel.image} id={chapter.id} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-indigo-600/5 to-transparent transition-opacity duration-300 pointer-events-none"></div>
              <div className="absolute inset-0 rounded-lg border border-zinc-800 group-hover:border-indigo-800/40 transition-colors duration-300 pointer-events-none"></div>
            </div>
          </div>
        ))}

        <div className="transition-all duration-300 hover:scale-105">
          <ViewMore />
        </div>
      </div>
      <div className="h-px w-full bg-gradient-to-r from-zinc-800 via-zinc-800/50 to-transparent"></div>
      <div className="flex justify-end text-zinc-700 text-xs">
        <span>© 2025</span>
      </div>
    </div>
  );
};

export default ChapterAdd;