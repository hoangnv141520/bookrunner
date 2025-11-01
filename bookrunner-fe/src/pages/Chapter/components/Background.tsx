// components/Background.tsx
import React from "react";

const Background: React.FC = () => {
    return (
        <div className="relative">
            {/* Mysterious fog effect */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(79,42,173,0.15),rgba(15,15,26,0.6))] animate-pulse duration-[10s]"></div>

            {/* Decorative elements */}
            <div className="absolute top-10 left-10 text-purple-500/10 text-6xl select-none">⦿</div>
            <div className="absolute bottom-10 right-10 text-purple-500/10 text-6xl select-none">⟡</div>
            <div className="absolute top-1/2 right-1/4 text-purple-500/10 text-4xl select-none">⧗</div>
            
            {/* Floating particles */}
            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-purple-300/20 rounded-full blur-sm animate-pulse"></div>
            <div className="absolute top-1/3 left-2/3 w-2 h-2 bg-purple-300/20 rounded-full blur-sm animate-pulse"></div>
            <div className="absolute top-2/3 left-1/2 w-1.5 h-1.5 bg-purple-300/20 rounded-full blur-sm animate-pulse"></div>
        </div>
    );
};

export default Background;