import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NovelCard from "./NovelCard";
import { FaRegHandPointRight, FaSpinner } from "react-icons/fa6";
import { NovelDataNoUser } from "../../../types/auth";


const RecentAdd: React.FC = () => {
  const [recentNovels, setRecentNovels] = useState<NovelDataNoUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const server = import.meta.env.VITE_SERVER
  useEffect(() => {
    const fetchRecentNovels = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${server}/novels/recent-add`);
        if (!response.ok) {
          throw new Error(`Failed to fetch recent novels: ${response.status}`);
        }
        const data = await response.json();
        setRecentNovels(data);
      } catch (error) {
        console.error("Error fetching recent novels:", error);
        setError(error instanceof Error ? error.message : "Failed to load recent novels");
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecentNovels();
  }, []);

  return (
    <section className="w-full bg-zinc-950 rounded-xl p-6 shadow-lg flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <div className="px-3 py-1.5 bg-zinc-900 text-zinc-300 font-medium rounded-sm border-l-2 border-indigo-600">
          Sách
        </div>
        <div className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-300 relative">
          Mới đăng
          <span className="absolute -bottom-1 left-0 w-full h-px bg-indigo-800/60"></span>
        </div>
        <div className="h-px flex-grow bg-zinc-800 ml-2"></div>
      </div>
      {isLoading ? (
        <div className="flex-grow flex items-center justify-center">
          <FaSpinner className="text-indigo-400 text-3xl animate-spin" />
        </div>
      ) : error ? (
        <div className="flex-grow flex items-center justify-center">
          <div className="text-red-400 bg-zinc-900/80 p-4 rounded-lg text-center">
            {error}
            <button
              onClick={() => window.location.reload()}
              className="block mx-auto mt-3 px-4 py-2 bg-red-900/30 hover:bg-red-900/50 rounded text-white text-sm transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-5">
          {recentNovels.map((novel, index) => (
            <div
              key={novel.id || index}
              className="relative group transition-all duration-300 hover:bg-zinc-800/20 rounded"
            >
              <div className="p-3 rounded border border-zinc-800 group-hover:border-indigo-800/30 transition-all duration-200">
                <NovelCard
                  data={novel}
                />
              </div>
              <div className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 border border-indigo-800/30 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
      )}
      <Link
        to="/novels"
        className="text-center text-indigo-400 hover:text-indigo-300 transition-colors duration-300 py-2"
      >
        <span className="flex items-center justify-center gap-3">
          <FaRegHandPointRight className="group-hover:animate-pulse" />
          <span>View More</span>
        </span>
      </Link>
      <div className="h-px w-full bg-gradient-to-r from-zinc-800 via-zinc-800/50 to-transparent"></div>
    </section>
  );
};

export default RecentAdd;