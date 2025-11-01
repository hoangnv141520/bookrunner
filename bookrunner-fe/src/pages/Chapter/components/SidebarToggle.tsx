// components/SidebarToggle.tsx
import React from "react";

interface SidebarToggleProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

const SidebarToggle: React.FC<SidebarToggleProps> = ({ isOpen, toggleSidebar }) => {
    return (
        <button
            onClick={toggleSidebar}
            className="w-10 h-10 fixed top-6 left-6 z-20 bg-gray-900/70 backdrop-blur-sm border border-purple-900/50 rounded-full p-2 shadow-[0_0_20px_rgba(79,42,173,0.2)] text-purple-300 hover:text-purple-200 transition-colors duration-300"
        >
            {isOpen ? '✕' : '☰'}
        </button>
    );
};

export default SidebarToggle;