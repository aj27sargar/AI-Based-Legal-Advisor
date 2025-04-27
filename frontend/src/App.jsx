import React, { useContext, useEffect } from "react";
import "./App.css";
import { Context } from "./main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Home/Footer";
import Home from "./components/Home/Home";
import Documents from "./components/Document/Documents";
import DocumentDetails from "./components/Document/DocumentDetails";
import Application from "./components/Application/Application";
import MyApplications from "./components/Application/MyApplications";
import PostDocument from "./components/Document/PostDocument";
import NotFound from "./components/NotFound/NotFound";
import MyDocuments from "./components/Document/MyDocuments";
import Blogs from "./components/Blogs/Blogs";
import BlogDetail from "./components/Blogs/BlogDetail";
import Chatbot from './components/ChatBot/Chatbot';
import Lawyers from './components/Lawyers/lawyers';
import LawyerDetail from "./components/Lawyers/lawyerDetail";
import Imp_Linkes from './components/Imp_Linkes/imp_links';
// import { BASE_URL } from '../../utils/config'

const App = () => {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          // "http://be-project-axa3.onrender.com/api/v1/user/getuser",
          "http://localhost:4000/api/v1/user/getuser",
          {
            withCredentials: true,
          }
        );
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized]);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/document/getall" element={<Documents />} />
          <Route path="/document/:id" element={<DocumentDetails />} />
          <Route path="/application/:id" element={<Application />} />
          <Route path="/applications/me" element={<MyApplications />} />
          <Route path="/document/post" element={<PostDocument />} />
          <Route path="/document/getmydocuments" element={<MyDocuments />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog-detail" element={<BlogDetail />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/lawyers" element={<Lawyers />} />
          <Route path="/lawyers/:id" element={<LawyerDetail />} />
          <Route path="/imp_links" element={<Imp_Linkes />} />
        </Routes>
        {/* <Footer /> */}
        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;
