import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import SidebarToggle from "./components/SidebarToggle";
import Sidebar from "./components/Sidebar";
import ChapterContent from "./components/ChapterContent";
import Background from "./components/Background";
import { AuthState, ChapterData, NovelData } from "../../types/auth";
import { checkLogin } from "../Auth/utils/login.util";

const API_BASE_URL = "/api";

const Chapter: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [chapterData, setChapterData] = useState<ChapterData | null>(null);
    const [novel, setNovel] = useState<NovelData | null>();
    const { id } = useParams<{ id: string }>();
    const [auth, setAuth] = useState<AuthState>();
    const server = import.meta.env.VITE_SERVER


    const toggleSidebar = useCallback((): void => {
        setSidebarOpen(prevState => !prevState);
    }, []);

    const updateView = useCallback(async (novelId: number): Promise<Response> => {
        try {
            return await fetch(`${API_BASE_URL}/novels/updateView/${novelId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            console.error("Error updating view count:", error);
            throw error;
        }
    }, []);

    const getNovel = useCallback(async (novelId: number): Promise<NovelData> => {
        try {
            const response = await fetch(`${API_BASE_URL}/novels/${novelId}`);

            if (!response.ok) {
                throw new Error(`Failed to fetch novel: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Error fetching novel data:", error);
            throw error;
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;

            setIsLoading(true);
            setError(null);

            try {
                // Fetch chapter data
                const chapterResponse = await fetch(`${API_BASE_URL}/chapters/${id}`);

                if (!chapterResponse.ok) {
                    throw new Error(`Failed to fetch chapter: ${chapterResponse.status}`);
                }

                const chapterDataResult = await chapterResponse.json();

                if (!chapterDataResult || chapterDataResult.length === 0) {
                    throw new Error("Chapter not found");
                }

                const chapter = Array.isArray(chapterDataResult) ? chapterDataResult[0] : chapterDataResult;
                console.log(chapter);


                if (chapter.novel.id) {
                    const [_, novelData] = await Promise.all([
                        updateView(+chapter.novel.id),
                        getNovel(+chapter.novel.id)
                    ]);
                    setNovel(novelData);

                    const res10 = await checkLogin();
                    setAuth(res10);
                    auth ? auth : auth;
                    if (res10.isAuthenticated) {
                        await fetch(`${server}/api/novelrecent`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${res10.accessToken}`
                            },
                            body: JSON.stringify({
                                user: res10.user.id,
                                novel: novelData.id,
                                last_read_chapter_id: +id,
                                last_read_chapter_name: chapter.name,
                            })
                        })
                    }
                }
                setChapterData({ ...chapter, author: novel?.author, poster: novel?.user.username });
            } catch (error) {
                console.error("Error in data fetching:", error);
                setError(error instanceof Error ? error.message : "An unknown error occurred");
            } finally {
                setIsLoading(false);
            }

        };
        fetchData();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-950 flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-950 flex items-center justify-center">
                <div className="bg-red-800 text-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-2">Error</h2>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-950 p-6 flex relative">
            <SidebarToggle isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="w-full">
                <Background />
                {chapterData && novel && <ChapterContent chapterData={chapterData} novel={novel} />}
            </div>

            {novel && id && <Sidebar isOpen={sidebarOpen} novel={novel} currentChapterId={+id} />}
        </div>
    );
};

export default Chapter;