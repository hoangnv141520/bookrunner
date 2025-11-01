import React, { useEffect, useState } from 'react';
import { FaCalendarAlt, FaBook, FaBirthdayCake } from 'react-icons/fa';
import { User } from '../../types/auth';
import { useParams } from 'react-router-dom';
import NovelCard from '../Home/components/NovelCard';

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User>();
  const { id } = useParams();
  const server = import.meta.env.VITE_SERVER

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${server}/api/users/${id}`);
        const data = await response.json();
        setUser(data);
        console.log(data);
      }
      catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  // Format date function
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="w-full max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl text-white text-center mb-10 font-medium">
          User Profile
        </h1>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-64 bg-gray-800 p-6 rounded-lg">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-700 mb-4">
                <img
                  src={user?.image}
                  alt={user?.username}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-xl font-bold text-white">{user?.username}</h2>
              <div className="text-gray-400 text-sm mt-1">{user?.role.name}</div>

              <div className="w-full mt-6 space-y-3 text-sm">
                <div className="flex items-center text-gray-300">
                  <FaCalendarAlt className="mr-2 text-gray-500" />
                  <span>Tham gia: {user?.joinDate ? formatDate(user.joinDate) : ''}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="mb-8 bg-gray-800 p-6 rounded-lg">
              <div className="border-b border-gray-700 pb-2 mb-4">
                <h3 className="text-lg font-semibold text-white">Thông tin thành viên</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-900 flex items-center justify-center mr-3">
                    <FaBook className="text-purple-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Truyện đã đăng</div>
                    <div className="font-semibold text-white">{user?.novels.length}</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-900 flex items-center justify-center mr-3">
                    <FaBirthdayCake className="text-purple-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Ngày sinh</div>
                    <div className="font-semibold text-white">{user?.dateOfBirth ? formatDate(user.dateOfBirth) : '--/--/----'}</div>
                  </div>
                </div>

                <div className="flex items-center md:col-span-2">
                  <div>
                    <div className="text-sm text-gray-400">Mô tả</div>
                    <div className="font-semibold text-gray-200">{user?.desc ? user?.desc : "Người dùng này không có miêu tả gì"}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="border-b border-gray-700 pb-2 mb-4">
                <h3 className="text-lg font-semibold text-white">Truyện đã đăng</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {
                  user?.novels.map((novel) => (
                    <div
                      key={novel.id}
                      className="relative group transition-all duration-300 hover:bg-gray-700/50 rounded"
                    >
                      <div className="p-3 rounded border border-gray-700 group-hover:border-indigo-500/50 transition-all duration-200">
                        <NovelCard data={novel} />
                      </div>
                      <div className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 border border-indigo-500/50 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;