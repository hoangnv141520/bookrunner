// components/CommentSection.tsx
import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  replies?: Comment[];
}

const CommentSection: React.FC = () => {
  const [comment, setComment] = useState<string>("");

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setComment(e.target.value);
  };

  const handleSubmit = (): void => {
    if (comment.trim()) {
      console.log("Submitting comment:", comment);
      setComment("");
    }
  };

  // Mock comments data
  const comments: Comment[] = [
    {
      id: "1",
      author: "Alice",
      avatar: "https://ui-avatars.com/api/?name=Alice&background=6366f1",
      content: "This novel has been amazing so far! The character development is fantastic and the world-building is so immersive. I can't wait to see what happens in the next chapters.",
      timestamp: "2 days ago",
      likes: 24,
    },
    {
      id: "2",
      author: "Bob",
      avatar: "https://ui-avatars.com/api/?name=Bob&background=22c55e",
      content: "I'm a bit disappointed with the recent arc. The pacing feels off and some plot points don't make sense. Hoping it gets better in the upcoming chapters.",
      timestamp: "1 week ago",
      likes: 7,
      replies: [
        {
          id: "2-1",
          author: "Carol",
          avatar: "https://ui-avatars.com/api/?name=Carol&background=ec4899",
          content: "I actually enjoyed that arc! It was setting up for the big reveal in chapter 15. Give it another chance!",
          timestamp: "5 days ago",
          likes: 12,
        }
      ]
    },
    {
      id: "3",
      author: "Dave",
      avatar: "https://ui-avatars.com/api/?name=Dave&background=f59e0b",
      content: "Does anyone know if the author is planning to release chapters more frequently? The monthly release schedule is killing me with these cliffhangers!",
      timestamp: "Just now",
      likes: 3,
    }
  ];

  return (
    <div className="w-full mt-8 relative z-10 max-w-7xl mx-auto">
      <div className="bg-gray-900/70 backdrop-blur-sm border border-purple-900/50 rounded-lg p-6 shadow-[0_0_20px_rgba(79,42,173,0.2)]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-medium text-purple-300 tracking-wide">Thì thầm vào màn đêm</h3>
          <span className="text-sm text-purple-400/70">{comments.length} comments</span>
        </div>

        {/* Add Comment Form */}
        <div className="mb-8">
          <div className="flex space-x-4">
            <img
              src="https://ui-avatars.com/api/?name=User&background=4F2AAD"
              alt="User Avatar"
              className="w-10 h-10 rounded-full flex-shrink-0 border border-purple-500/30"
            />
            <div className="flex-grow">
              <textarea
                value={comment}
                onChange={handleCommentChange}
                className="w-full p-3 bg-gray-800/80 border border-purple-900/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 min-h-[100px] text-purple-100 placeholder-purple-300/30"
                placeholder="Để lại dấu ấn của bạn trong dòng thời gian..."
              ></textarea>
              <div className="flex justify-end mt-2">
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-purple-800/80 text-purple-100 font-medium rounded-md hover:bg-purple-700/80 transition-colors duration-300 backdrop-blur-sm"
                >
                  Gửi thì thầm
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b border-purple-900/20 pb-6">
              <div className="flex space-x-4">
                <img
                  src={comment.avatar}
                  alt={`${comment.author}'s Avatar`}
                  className="w-10 h-10 rounded-full flex-shrink-0 border border-purple-500/30"
                />
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <h4 className="font-medium text-purple-200">{comment.author}</h4>
                    <span className="text-xs text-purple-400/50 ml-2">{comment.timestamp}</span>
                  </div>
                  <p className="text-purple-100/80">{comment.content}</p>
                  <div className="flex items-center mt-3 space-x-4 text-sm">
                    <button className="flex items-center text-purple-400/70 hover:text-purple-300 transition-colors">
                      <FaHeart className="mr-1" /> {comment.likes}
                    </button>
                    <button className="text-purple-400/70 hover:text-purple-300 transition-colors">Reply</button>
                  </div>

                  {/* Replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-4 ml-6 pt-4 border-t border-purple-900/10">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex space-x-3 mb-3">
                          <img
                            src={reply.avatar}
                            alt={`${reply.author}'s Avatar`}
                            className="w-8 h-8 rounded-full flex-shrink-0 border border-purple-500/30"
                          />
                          <div>
                            <div className="flex items-center mb-1">
                              <h4 className="font-medium text-purple-200">{reply.author}</h4>
                              <span className="text-xs text-purple-400/50 ml-2">{reply.timestamp}</span>
                            </div>
                            <p className="text-purple-100/80">{reply.content}</p>
                            <div className="flex items-center mt-2 space-x-4 text-sm">
                              <button className="flex items-center text-purple-400/70 hover:text-purple-300 transition-colors">
                                <FaHeart className="mr-1" /> {reply.likes}
                              </button>
                              <button className="text-purple-400/70 hover:text-purple-300 transition-colors">Reply</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Comments Button */}
        <div className="mt-8 text-center">
          <button className="px-6 py-2 bg-gray-800/60 text-purple-300 font-medium rounded-lg hover:bg-gray-700/60 border border-purple-900/30 transition-colors duration-300 backdrop-blur-sm">
            Load More Comments
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;