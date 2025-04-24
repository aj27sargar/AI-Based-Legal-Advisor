import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import lawyerImage from "../../assets/lawyer3.jpeg";
// import { BASE_URL } from '../../utils/config'

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      // const response = await axios.get("http://be-project-axa3.onrender.com/api/v1/user/logout", {
        const response = await axios.get("http://localhost:4000/api/v1/user/logout", {
        withCredentials: true,
      });
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
      setIsAuthorized(true);
    }
  };

  return (
    <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
      <div className="container">
        {/* Logo Section */}
        <div className="logo">
          <img src={lawyerImage} alt="logo" />
        </div>

        {/* Navigation Menu */}
        <ul className={!show ? "menu" : "show-menu menu"}>
          <li>
            <Link to="/" onClick={() => setShow(false)}>
              HOME
            </Link>
          </li>

          {/* User-Specific Links */}
          {user && user.role === "User" && (
            <>
              <li>
                <Link to="/blogs" onClick={() => setShow(false)}>
                  BLOGS
                </Link>
              </li>
              <li>
                <Link to="/chatbot" onClick={() => setShow(false)}>
                  CHATBOT
                </Link>
              </li>
              <li>
                <Link to="/lawyers" onClick={() => setShow(false)}>
                  LAWYERS
                </Link>
              </li>
              <li>
                <Link to="/imp_links" onClick={() => setShow(false)}>
                  IMP LINKES
                </Link>
              </li>
            </>
          )}

          {/* Common Links */}
          <li>
            <Link to="/job/getall" onClick={() => setShow(false)}>
              ALL DOCUMENTS
            </Link>
          </li>
          <li>
            <Link to="/applications/me" onClick={() => setShow(false)}>
              {user && user.role === "Lawyer" ? "APPLICANT'S APPLICATIONS" : "MY APPLICATIONS"}
            </Link>
          </li>

          {/* Lawyer-Specific Links */}
          {user && user.role === "Lawyer" && (
            <>
              <li>
                <Link to="/job/post" onClick={() => setShow(false)}>
                  POST NEW DOCUMENTS
                </Link>
              </li>
              <li>
                <Link to="/job/me" onClick={() => setShow(false)}>
                  VIEW YOUR DOCUMENTS
                </Link>
              </li>
            </>
          )}

          {/* Logout Button */}
          {isAuthorized && (
            <li>
              <button onClick={handleLogout} className="logout-btn">
                LOGOUT
              </button>
            </li>
          )}
        </ul>

        {/* Hamburger Menu for Mobile */}
        <div className="hamburger">
          <GiHamburgerMenu onClick={() => setShow(!show)} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
