import React from "react";

// Định nghĩa kiểu dữ liệu cho truyện
interface BookProps {
  title: string;
  link: string;
  imgSrc: string;
  translator: string;
  chapter?: string; // Có thể không có
}

// Component hiển thị từng truyện
const BookItem: React.FC<BookProps> = ({ title, link, imgSrc, translator, chapter }) => {
  return (
    <li className="w-full sm:w-1/2 p-2">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div 
          className="h-48 bg-cover bg-center" 
          style={{ backgroundImage: `url(${imgSrc})` }}
        ></div>
        <div className="p-4">
          <h5 className="text-lg font-semibold">
            <a href={link} className="text-blue-500 hover:underline">{title}</a>
          </h5>
          <p className="text-sm text-gray-500">Nhóm dịch: {translator}</p>
          {chapter && <p className="text-sm text-gray-500">{chapter}</p>}
        </div>
      </div>
    </li>
  );
};

// Component chính
const Test: React.FC = () => {
  const books: BookProps[] = [
    {
      title: "Danshida to Omotteita Osananajimi to no Shinkon Seikatsu...",
      link: "/truyen/15002",
      imgSrc: "https://i.docln.net/lightnovel/covers/s15002-39d4fbd1.jpg",
      translator: "79Springs",
      chapter: "Minh hoạ màu Full HD 4K",
    },
    {
      title: "Cô gái chuyển trường xinh đẹp tự nhận mình là vợ tương lai...",
      link: "/truyen/18927",
      imgSrc: "https://ln.hako.vn/img/nocover.jpg",
      translator: "No Haremm",
      chapter: "Chương 10",
    },
    {
      title: "Little Tyrant Doesn’t Want to Meet with a Bad End",
      link: "/truyen/11085",
      imgSrc: "https://i.docln.net/lightnovel/covers/s11085-648b2647.jpg",
      translator: "Wontbu",
      chapter: "Chương 111: Đó là số phận mà cậu đã hỏi",
    },
  ];

  return (
    <section className="bg-gray-100 p-6">
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Có thể bạn quan tâm</h2>
        <span className="text-gray-500 text-sm cursor-pointer hover:text-blue-500">
          <i className="fas fa-chevron-down"></i>
        </span>
      </header>
      <main>
        <ul className="flex flex-col -m-2">
          {books.map((book, index) => (
            <BookItem key={index} {...book} />
          ))}
        </ul>
        <div className="text-center mt-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Xem thêm
          </button>
        </div>
      </main>
    </section>
  );
};

export default Test;
