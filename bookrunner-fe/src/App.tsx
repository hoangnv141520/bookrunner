import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout";
import Home from "./pages/Home";
import LoginPage from "./pages/Auth/Login";
import Novel from "./pages/Novel";
import Chapter from "./pages/Chapter";
import User from "./pages/User";
import Action from "./pages/Action";
import ActionLayout from "./pages/action.layout.";
import Test from "./pages/test";
import NotFound from "./pages/NotFound";
import Register from "./pages/Auth/Signup";
import Bookmark from "./pages/Bookmark";
import Cart from "./pages/Cart";
import Shop from "./pages/Shop";
import NovelListPage from "./pages/NovelList";
import Search from "./pages/Search/index.";
import { useEffect, useState } from "react";
import { checkLogin } from "./pages/Auth/utils/login.util";
import { AuthState } from "./types/auth";
import PrivateLogin from "./components/PrivateLogin";
import Book from "./pages/Book";
import ProfilePage from "./pages/Profile";

export default function App() {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    user: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await checkLogin();
        setAuth(data);
      } catch (error) {
        console.error("Failed to check login status:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/novel/:id" element={<Novel />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/test" element={<Test />} />
          <Route path="/bookmark" element={<Bookmark />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/book/:id" element={<Book />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/novel-list" element={<NovelListPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="/action" element={<ActionLayout />}>
          <Route index element={<Action />} />
        </Route>
        <Route path="/chapter/:id" element={<Chapter />} />
        <Route path="/login" element={
          <PrivateLogin auth={auth}>
            <LoginPage />
          </PrivateLogin>
        } />
        <Route path="/register" element={
          <PrivateLogin auth={auth}>
            <Register />
          </PrivateLogin>
        } />


        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
