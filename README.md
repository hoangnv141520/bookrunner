# BookRunner

BookRunner là một ứng dụng quản lý sách (Book Management) được xây dựng bằng **ReactJS + TypeScript** cho frontend và **ExpressJS + TypeScript** cho backend.

---

## 📂 Cấu trúc dự án
```
bookrunner/
├─ bookrunner-fe/ # Frontend (ReactJS + TypeScript)
├─ bookrunner-be/ # Backend (ExpressJS + TypeScript)
├─ package.json
└─ README.md
```
---

## ⚡️ Công nghệ sử dụng

- **Frontend**: ReactJS, TypeScript, TailwindCSS/Material UI, Axios, React Router
- **Backend**: ExpressJS, TypeScript, Node.js, MySQL/MongoDB, JWT cho authentication
- **Khác**: dotenv cho quản lý biến môi trường, FFmpeg nếu xử lý video

---

## 🚀 Hướng dẫn chạy dự án

### 1. Backend

```bash
cd bookrunner-be
npm install
cp .env.example .env   # tạo file .env và điền cấu hình
npm run dev            # chạy server ở mode development

```

## Frontend
```
cd bookrunner-fe
npm install
npm start              # chạy frontend trên localhost:3000
```
## Kết nối

Backend: http://localhost:5000 (có thể thay đổi trong .env)

Frontend sẽ gọi API backend qua URL trên.

## 📝 Tính năng chính

Quản lý sách: thêm/sửa/xóa sách

Tìm kiếm sách theo tiêu đề/tác giả

Quản lý người dùng và phân quyền

Upload hình ảnh bìa sách

Hiển thị danh sách sách với phân trang

## 🔧 Cấu hình môi trường

Backend (bookrunner-be/.env):
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=password
DB_NAME=bookrunner
JWT_SECRET=your_jwt_secret
```

Frontend (bookrunner-fe/.env):
```
REACT_APP_API_URL=http://localhost:5000
```
