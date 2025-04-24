import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import emailjs from "@emailjs/browser";
import sudhanshuImage from "../../assets/profile.png";
import abhishekImage from "../../assets/profile.png";
import RohanImage from "../../assets/profile.png";

const lawyers = [
  {
    id: 1,
    name: "Adv. Sudhanshu Mohite",
    phone: "+918149581039",
    experience: "10 Years",
    specialization: "Criminal Law",
    image: sudhanshuImage,
    bio: "Expert in criminal law with over a decade of experience in handling high-profile cases.",
  },
  {
    id: 2,
    name: "Adv. Abhishek Singh",
    phone: "+919324125321",
    experience: "8 Years",
    specialization: "Family Law",
    image: abhishekImage,
    bio: "Specialized in family disputes, divorce settlements, and child custody cases.",
  },
  {
    id: 3,
    name: "Adv. Rohan Surve",
    phone: "+919967051282",
    experience: "12 Years",
    specialization: "Corporate Law",
    image: RohanImage,
    bio: "Corporate law expert advising businesses on legal compliance and contracts.",
  },
];

const LawyerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const lawyer = lawyers.find((lawyer) => lawyer.id === parseInt(id));

  if (!lawyer) {
    return <p style={{ textAlign: "center", color: "red", fontSize: "18px" }}>Lawyer not found</p>;
  }

  const handleWhatsAppContact = () => {
    const message = `Hello ${lawyer.name}, I need legal assistance regarding ${lawyer.specialization}. Please let me know your availability.`;
    const whatsappURL = `https://api.whatsapp.com/send?phone=${lawyer.phone}&text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
  };

  // Email Contact Form
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await emailjs.send(
        "service_pty4mo3",
        "template_2jnw0fq",
        {
          to_name: lawyer.name,
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        "1HQ3bb3yMxGDjzsvS"
      );
      toast.success(`Your message has been sent to ${lawyer.name}`);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error("Error sending your message. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "900px", margin: "auto", padding: "20px", textAlign: "center" }}>
      <button
        onClick={() => navigate("/lawyers")}
        style={{ color: "", textDecoration: "underline", marginBottom: "20px", cursor: "pointer" }}
      >
        ← Back to Lawyers
      </button>

      {/* Lawyer Info */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <img
          src={lawyer.image}
          alt={lawyer.name}
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "3px solid #007BFF",
          }}
        />
        <h2 style={{ fontSize: "28px", fontWeight: "bold", marginTop: "15px" }}>{lawyer.name}</h2>
        <p style={{ fontSize: "18px", color: "#333" }}>{lawyer.specialization}</p>
        <p style={{ fontSize: "16px", color: "#666" }}>{lawyer.experience}</p>
        <p style={{ marginTop: "10px", fontSize: "16px", color: "#444", maxWidth: "600px" }}>{lawyer.bio}</p>

        <button
          onClick={handleWhatsAppContact}
          style={{
            marginTop: "20px",
            backgroundColor: "#25D366",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
            transition: "background 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#1EBE5D")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#25D366")}
        >
          Contact on WhatsApp
        </button><br />
        <button
  onClick={() => window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=lawyer@gmail.com&su=Legal Assistance&body=Hello, I need legal assistance regarding...`, "_blank")}
  className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-300"
>
  Contact via Gmail
</button>

      </div>

      {/* Contact Form */}
      <div
        style={{
          marginTop: "30px",
          backgroundColor: "#F0F8FF",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          border: "2px solid #007BFF",
        }}
      >
        <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#007BFF", marginBottom: "15px" }}>Send a Message</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "10px", textAlign: "left" }}>
            <label style={{ fontSize: "16px", fontWeight: "500", color: "#007BFF" }}>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #007BFF",
                borderRadius: "5px",
                marginTop: "5px",
              }}
            />
          </div>
          <div style={{ marginBottom: "10px", textAlign: "left" }}>
            <label style={{ fontSize: "16px", fontWeight: "500", color: "#007BFF" }}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #007BFF",
                borderRadius: "5px",
                marginTop: "5px",
              }}
            />
          </div>
          <div style={{ marginBottom: "10px", textAlign: "left" }}>
            <label style={{ fontSize: "16px", fontWeight: "500", color: "#007BFF" }}>Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #007BFF",
                borderRadius: "5px",
                marginTop: "5px",
                resize: "none",
              }}
              rows="4"
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              backgroundColor: "#007BFF",
              color: "white",
              padding: "10px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
              transition: "background 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#007BFF")}
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default LawyerDetail;
