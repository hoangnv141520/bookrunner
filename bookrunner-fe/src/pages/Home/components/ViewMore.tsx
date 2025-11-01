import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

const ViewMore = () => {
    return (
        <div className="w-full">
            <Link 
                to={"/danh-sach?sapxep=capnhat"} 
                className="flex flex-col items-center justify-center h-full bg-gray-800 rounded-lg p-6 transition-all duration-300 hover:bg-gray-700"
            >
                <div className="flex flex-col items-center gap-3">
                    <div className="bg-gray-700 rounded-full p-3">
                        <IoIosArrowForward className="text-2xl text-gray-300" />
                    </div>
                    <p className="text-gray-300 font-medium">Xem Thêm</p>
                </div>
            </Link>
        </div>
    );
};

export default ViewMore;