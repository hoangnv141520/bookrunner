// components/ChapterNavigation.tsx
import React from "react";

const ChapterNavigation: React.FC = () => {
    return (
        <div className="flex justify-between mb-6 text-purple-400">
            <a href="#" className="hover:text-purple-300 transition-colors duration-300 flex items-center gap-2">
                <span className="text-sm">⟨</span> Chương trước
            </a>
            <a href="#" className="hover:text-purple-300 transition-colors duration-300 flex items-center gap-2">
                Chương tiếp theo <span className="text-sm">⟩</span>
            </a>
        </div>
    );
};

export default ChapterNavigation;