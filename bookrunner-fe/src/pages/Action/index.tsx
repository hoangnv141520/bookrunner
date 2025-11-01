import { Link } from 'react-router-dom';

const Action = () => {
    return (
        <div className="min-h-screen bg-gray-100 ">
            <div className="mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Thể loại: Hành động</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((novel) => (
                        <div key={novel} className="bg-gray-100 p-4 rounded-lg shadow">
                            <img
                                src="https://via.placeholder.com/150"
                                alt="Novel Cover"
                                className="w-full h-56 object-cover rounded-lg"
                            />
                            <h3 className="text-xl font-semibold text-gray-800 mt-3">Tên truyện {novel}</h3>
                            <p className="text-gray-600 text-sm">Tác giả: Tác giả {novel}</p>
                            <p className="text-gray-500 text-sm">Chương mới nhất: {Math.floor(Math.random() * 100)}</p>
                            <Link to="/novel-detail" className="text-blue-500 hover:text-blue-700 mt-2 inline-block">Xem chi tiết</Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Action