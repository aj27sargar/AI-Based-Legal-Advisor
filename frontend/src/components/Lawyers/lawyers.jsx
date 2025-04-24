import React from "react";
import { useNavigate } from "react-router-dom";
import sudhanshuImage from "../../assets/profile.png";
import abhishekImage from "../../assets/profile.png";
import RohanImage from "../../assets/profile.png";

const Lawyers = () => {
  const navigate = useNavigate();

  const lawyers = [
    {
      id: 1,
      name: "Adv. Sudhanshu Mohite",
      phone: "+919876543210",
      experience: "10 Years",
      specialization: "Criminal Law",
      image: sudhanshuImage,
      bio: "Expert in criminal law with over a decade of experience in handling high-profile cases.",
    },
    {
      id: 2,
      name: "Adv. Abhishek Singh",
      phone: "+919123456789",
      experience: "8 Years",
      specialization: "Family Law",
      image: abhishekImage,
      bio: "Specialized in family disputes, divorce settlements, and child custody cases.",
    },
    {
      id: 3,
      name: "Adv. Rohan Surve",
      phone: "+919112233445",
      experience: "12 Years",
      specialization: "Corporate Law",
      image: RohanImage,
      bio: "Corporate law expert advising businesses on legal compliance and contracts.",
    },
  ];

  return (
    <div style={{ maxWidth: "1200px", margin: "auto", padding: "20px", textAlign: "center" }}>
      <h1 style={{ fontSize: "36px", fontWeight: "bold", color: "#1a202c", marginBottom: "20px" }}>
        Meet Our Legal Experts
      </h1>

      {/* Lawyer Cards Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
        {lawyers.map((lawyer) => (
          <div
            key={lawyer.id}
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              overflow: "hidden",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "pointer",
            }}
            onClick={() => navigate(`/lawyers/${lawyer.id}`)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 10px 15px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
            }}
          >
            <img src={lawyer.image} alt={lawyer.name} style={{ width: "60%", height: "250px", objectFit: "cover" }} />
            <div style={{ padding: "20px", textAlign: "left" }}>
              <h2 style={{ fontSize: "22px", fontWeight: "600", color: "#2d3748", marginBottom: "10px" }}>
                {lawyer.name}
              </h2>
              <p style={{ fontSize: "14px", color: "#4a5568", marginBottom: "5px" }}>
                <strong>Specialization:</strong> {lawyer.specialization}
              </p>
              <p style={{ fontSize: "14px", color: "#4a5568", marginBottom: "5px" }}>
                <strong>Experience:</strong> {lawyer.experience}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lawyers;
