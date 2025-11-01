// components/Sidebar.tsx
import React from "react";
import ChapterList from "./ChapterList";
import { NovelData } from "../../../types/auth";

interface SidebarProps {
    isOpen: boolean;
    novel: NovelData;
    currentChapterId: number;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen , novel, currentChapterId}) => {
    return (
        <div className={`fixed top-0 left-0 h-full z-10 pt-16 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}`}>
            <div className="h-[calc(100vh-2rem)] ml-6 w-72 lg:w-80 bg-gray-900/70 backdrop-blur-sm border border-purple-900/50 rounded-lg p-4 shadow-[0_0_20px_rgba(79,42,173,0.2)]">
                <h3 className="text-lg text-purple-300 mb-4 font-medium tracking-wide flex items-center gap-2">
                    <span className="text-sm">⧉</span> Bảng Chương
                </h3>
                <ChapterList novel={novel} currentChapterId={currentChapterId}/>
            </div>
        </div>
    );
};

export default Sidebar;