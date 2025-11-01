// components/ChapterContent.tsx (continued)
import React from "react";
import ChapterNavigation from "./ChapterNavigation";
import { ChapterData, NovelData } from "../../../types/auth";

interface ChapterContentProps {
    chapterData: ChapterData;
    novel: NovelData;
}

const ChapterContent: React.FC<ChapterContentProps> = ({ chapterData, novel }) => {
    return (
        <div className="relative z-10 w-full max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-purple-300 text-center mb-6 font-medium tracking-wider drop-shadow-[0_0_8px_rgba(162,136,227,0.5)]">
                {chapterData.name}
            </h2>
            <p className="text-purple-200/60 text-center mt-2 font-light tracking-wide">
                Tác giả: {novel.author.name} | Người đăng: {novel.user.username}
            </p>

            <div className="w-full my-8">
                <div className="bg-gray-900/70 backdrop-blur-sm border border-purple-900/50 rounded-lg p-6 shadow-[0_0_20px_rgba(79,42,173,0.2)]">
                    <ChapterNavigation />

                    <div dangerouslySetInnerHTML={{ __html: chapterData.content }} className="text-purple-100/80 leading-relaxed space-y-6 font-light">
                    </div>

                    <ChapterNavigation />
                </div>
            </div>
        </div>
    );
};

export default ChapterContent;