import React from "react";
import { FaBalanceScale, FaGavel, FaUsers, FaUserShield } from "react-icons/fa";
import lawyerImage from '../../assets/lawyer2.jpeg'

const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "10,000+",
      subTitle: "Legal Cases Resolved",
      icon: <FaGavel />,
    },
    {
      id: 2,
      title: "5,000+",
      subTitle: "Verified Legal Advisors",
      icon: <FaBalanceScale />,
    },
    {
      id: 3,
      title: "50,000+",
      subTitle: "Users Seeking Legal Advice",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "98%",
      subTitle: "Success Rate in Case Guidance",
      icon: <FaUserShield />,
    },
  ];

  return (
    <>
      <div className="heroSection">
        <div className="container">
          <div className="title">
            <h1>Get AI-Powered Legal Assistance</h1>
            <h1>Instant Legal Help at Your Fingertips</h1>
            
            <p>
              Our AI-based legal advisor assists with legal queries, case analysis, and document preparation, ensuring you get the right guidance instantly.
            </p>
          </div>
          <div className="image">
            <img src={lawyerImage} alt="AI Legal Advisor" />
          </div>
        </div>
        <div className="details">
          {details.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="icon">{element.icon}</div>
                <div className="content">
                  <p>{element.title}</p>
                  <p>{element.subTitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HeroSection;
