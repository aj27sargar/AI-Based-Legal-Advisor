import React from "react";
import { FaUserPlus, FaFileContract, FaGavel } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdChatbubbles } from "react-icons/io";

const HowItWorks = () => {
  return (
    <>
      <div className="howitworks">
        <div className="container">
          <h3>How Our Legal Advisor Works</h3>
          <div className="banner">
            <div className="card">
              <FaUserPlus />
              <p>Create an Account</p>
              <p>
                Sign up to access AI-powered legal assistance and document generation.
              </p>
            </div>
            <div className="card">
              <MdFindInPage />
              <p>Ask a Legal Question</p>
              <p>
                Get instant answers to your legal queries from our AI chatbot.
              </p>
            </div>
            <div className="card">
              <IoMdChatbubbles />
              <p>Consult with Experts</p>
              <p>
                Connect with verified legal professionals for personalized guidance.
              </p>
            </div>
            <div className="card">
              <FaFileContract />
              <p>Generate Legal Documents</p>
              <p>
                Fill out forms and receive legally compliant documents instantly.
              </p>
            </div>
            <div className="card">
              <FaGavel />
              <p>Resolve Your Case</p>
              <p>
                Get step-by-step assistance in handling legal issues effectively.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
