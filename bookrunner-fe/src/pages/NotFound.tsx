import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-indigo-950 relative overflow-hidden font-serif">
      {/* Mysterious fog effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(79,42,173,0.15),rgba(15,15,26,0.6))] animate-pulse duration-[10s]"></div>
      
      {/* Simple particles */}
      <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-purple-300/20 rounded-full blur-sm"></div>
      <div className="absolute top-1/3 left-2/3 w-2 h-2 bg-purple-300/20 rounded-full blur-sm"></div>
      <div className="absolute top-2/3 left-1/2 w-1.5 h-1.5 bg-purple-300/20 rounded-full blur-sm"></div>
      <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-purple-300/20 rounded-full blur-sm"></div>
      <div className="absolute top-3/4 left-3/4 w-2 h-2 bg-purple-300/20 rounded-full blur-sm"></div>
      
      <div className="relative z-10 bg-gray-900/70 backdrop-blur-sm border border-purple-900/50 rounded-lg p-8 w-full max-w-md shadow-[0_0_20px_rgba(79,42,173,0.3),0_0_40px_rgba(79,42,173,0.1)]">
        <h1 className="text-3xl md:text-4xl text-red-400 text-center mb-4 font-medium tracking-wider drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]">
          404 - Không tìm thấy trang
        </h1>
        
        <p className="text-gray-300 text-center mb-6 italic">
          Trang bạn đang tìm không tồn tại.
        </p>
        
        <Link 
          to="/" 
          className="w-full bg-gradient-to-r from-blue-800 to-indigo-800 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-2.5 px-4 rounded shadow-lg shadow-blue-900/30 transition-all duration-300 relative overflow-hidden group flex items-center justify-center"
        >
          <span className="relative z-10 flex items-center justify-center">
            <svg className="h-5 w-5 mr-2 text-blue-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Quay lại trang chủ
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent w-1/3 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
        </Link>
      </div>
      
      {/* Mystical symbols floating in background */}
      <div className="absolute bottom-10 left-10 text-red-500/10 text-6xl select-none">⦿</div>
      <div className="absolute top-10 right-10 text-red-500/10 text-6xl select-none">⟡</div>
      <div className="absolute bottom-10 right-1/4 text-red-500/10 text-4xl select-none">⧗</div>
      <div className="absolute top-1/3 left-1/5 text-red-500/10 text-5xl select-none">⧉</div>
      
      {/* Mystical decorative elements */}
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-red-500/10 rounded-full animate-spin duration-15s"></div>
      <div className="absolute top-1/3 left-1/3 w-16 h-16 border border-purple-500/10 rounded-full animate-ping duration-4s"></div>
    </div>
  );
};

export default NotFound;