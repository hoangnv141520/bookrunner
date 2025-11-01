// components/ChapterList.tsx
import React from "react";
import { NovelData } from "../../../types/auth";

interface SidebarProps {
    novel: NovelData;
    currentChapterId: number;
}

const ChapterList: React.FC<SidebarProps> = ({ novel, currentChapterId }) => {

    return (
        <div className="space-y-2 max-h-[calc(100vh-150px)] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-purple-900/50 scrollbar-track-gray-800/20">
            <div className="bg-gray-800/40 rounded-md p-2.5 border border-purple-900/30 hover:border-purple-500/50 transition-colors duration-300 group">
                <a href={`/novel/${novel.id}`} className="flex justify-between items-center text-sm">
                    <span className="text-purple-200/80 group-hover:text-purple-200 transition-colors duration-300">{novel.title}</span>
                </a>
            </div>
            {novel.chapters.map((chapter, index) => (
                currentChapterId == chapter.id ?
                    (<div key={index} className="ml-2 bg-purple-500/60 rounded-md p-2.5 border transition-colors duration-300 group">
                        <a href={`http://localhost:5173/chapter/${chapter.id}`} className="flex justify-between items-center text-sm">
                            <span className="text-purple-200/80 group-hover:text-purple-200 transition-colors duration-300">Chương {chapter.name}</span>
                        </a>
                    </div>) :
                    (<div key={index} className="ml-2 bg-gray-800/40 rounded-md p-2.5 border border-purple-900/30 hover:border-purple-500/50 transition-colors duration-300 group">
                        <a href={`http://localhost:5173/chapter/${chapter.id}`} className="flex justify-between items-center text-sm">
                            <span className="text-purple-200/80 group-hover:text-purple-200 transition-colors duration-300">Chương {chapter.name}</span>
                        </a>
                    </div>)
            ))}
        </div>
    );
};

export default ChapterList;