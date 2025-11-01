import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-[#0A0A14] text-gray-100 relative overflow-hidden">
            {/* Dark fantasy background effect */}
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(20,10,40,0.3),rgba(5,2,15,0.95))] pointer-events-none"></div>
            
            {/* Dark mist effect */}
            <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0A0614]/60 to-transparent pointer-events-none"></div>
            
            {/* Subtle particles */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-[#D4B8FF]/10 rounded-full blur-sm"></div>
                <div className="absolute top-1/3 left-2/3 w-2 h-2 bg-[#D4B8FF]/10 rounded-full blur-sm"></div>
                <div className="absolute top-2/3 left-1/2 w-1.5 h-1.5 bg-[#D4B8FF]/10 rounded-full blur-sm"></div>
                <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-[#D4B8FF]/10 rounded-full blur-sm"></div>
                <div className="absolute top-3/4 left-3/4 w-2 h-2 bg-[#D4B8FF]/10 rounded-full blur-sm"></div>
            </div>
            
            {/* Ancient runes */}
            <div className="fixed top-10 left-10 text-[#321B4A]/20 text-7xl font-serif select-none pointer-events-none">𐂊</div>
            <div className="fixed bottom-10 right-10 text-[#321B4A]/20 text-7xl font-serif select-none pointer-events-none">𐂥</div>
            <div className="fixed top-1/2 right-1/4 text-[#321B4A]/20 text-5xl font-serif select-none pointer-events-none">𐂷</div>
            
            {/* Subtle dark orbs */}
            <div className="fixed top-1/4 left-1/4 w-40 h-40 rounded-full bg-[#1A0E30]/20 blur-3xl pointer-events-none"></div>
            <div className="fixed bottom-1/4 right-1/4 w-60 h-60 rounded-full bg-[#1A0E30]/15 blur-3xl pointer-events-none"></div>
            
            <Navbar />
            
            {/* Add a spacer div to account for the fixed navbar */}
            <div className="h-16"></div>
            
            <main className="flex-grow container mx-auto p-4 px-4 md:px-8 lg:px-20 relative z-10">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-[#4A2080]/30 to-transparent"></div>
                <Outlet />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-[#4A2080]/30 to-transparent"></div>
            </main>
            
            <Footer />
            
            {/* Vertical glowing lines */}
            <div className="fixed top-1/2 -translate-y-1/2 left-0 h-1/3 w-px bg-gradient-to-b from-transparent via-[#4A2080]/20 to-transparent pointer-events-none"></div>
            <div className="fixed top-1/2 -translate-y-1/2 right-0 h-1/3 w-px bg-gradient-to-b from-transparent via-[#4A2080]/20 to-transparent pointer-events-none"></div>
            
            {/* Subtle pentagram in background */}
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-[#321B4A]/5 rounded-full rotate-45 pointer-events-none"></div>
        </div>
    );
};

export default Layout;