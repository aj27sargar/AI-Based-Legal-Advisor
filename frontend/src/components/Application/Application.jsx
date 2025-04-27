import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";
import { BASE_URL } from "../utils/config";

const Application = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [documentPurpose, setDocumentPurpose] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [drivingLicense, setDrivingLicense] = useState("");
  const [resume, setResume] = useState(null);
  const [aadharNumber, setAadharNumber] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const { id } = useParams();

  const handleFileChange = (event) => {
    const resume = event.target.files[0];
    setResume(resume);
  };

  const handleApplication = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("documentPurpose", documentPurpose);
    formData.append("drivingLicense", drivingLicense);
    formData.append("resume", resume);
    formData.append("documentId", id);
    formData.append("aadharNumber", aadharNumber);
    formData.append("panNumber", panNumber);
    formData.append("gender", gender);
    formData.append("birthDate", birthDate);

    try {
      const { data } = await axios.post(
        `${BASE_URL}/application/post`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Reset all fields
      setName("");
      setEmail("");
      setDocumentPurpose("");
      setPhone("");
      setAddress("");
      setDrivingLicense("");
      setResume("");
      setAadharNumber("");
      setPanNumber("");
      setGender("");
      setBirthDate("");
      toast.success(data.message);
      navigateTo("/document/getall");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  if (!isAuthorized || (user && user.role === "Lawyer")) {
    navigateTo("/");
  }

  return (
    <section className="application" style={{
      minHeight: "100vh",
      backgroundColor: "#f5f5f5",
      padding: "2rem 0"
    }}>
      <div className="container" style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "0 1rem"
      }}>
        <div style={{
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          padding: "2rem"
        }}>
          <h3 style={{
            textAlign: "center",
            color: "#2c3e50",
            marginBottom: "2rem",
            fontSize: "1.8rem"
          }}>Application Form</h3>
          <form onSubmit={handleApplication} style={{
            display: "grid",
            gap: "1rem"
          }}>
            <div style={{ display: "grid", gap: "0.5rem" }}>
              <label style={{ color: "#2c3e50", fontWeight: "bold" }}>Full Name</label>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  padding: "0.8rem",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "1rem"
                }}
              />
            </div>

            <div style={{ display: "grid", gap: "0.5rem" }}>
              <label style={{ color: "#2c3e50", fontWeight: "bold" }}>Email Address</label>
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  padding: "0.8rem",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "1rem"
                }}
              />
            </div>

            <div style={{ display: "grid", gap: "0.5rem" }}>
              <label style={{ color: "#2c3e50", fontWeight: "bold" }}>Phone Number</label>
              <input
                type="number"
                placeholder="Your Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{
                  padding: "0.8rem",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "1rem"
                }}
              />
            </div>

            <div style={{ display: "grid", gap: "0.5rem" }}>
              <label style={{ color: "#2c3e50", fontWeight: "bold" }}>Address</label>
              <input
                type="text"
                placeholder="Your Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{
                  padding: "0.8rem",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "1rem"
                }}
              />
            </div>

            <div style={{ display: "grid", gap: "0.5rem" }}>
              <label style={{ color: "#2c3e50", fontWeight: "bold" }}>Aadhar Card Number</label>
              <input
                type="text"
                placeholder="Enter 12-digit Aadhar number"
                value={aadharNumber}
                onChange={(e) => setAadharNumber(e.target.value)}
                maxLength="12"
                style={{
                  padding: "0.8rem",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "1rem"
                }}
              />
            </div>

            <div style={{ display: "grid", gap: "0.5rem" }}>
              <label style={{ color: "#2c3e50", fontWeight: "bold" }}>PAN Card Number</label>
              <input
                type="text"
                placeholder="Enter PAN number"
                value={panNumber}
                onChange={(e) => setPanNumber(e.target.value)}
                maxLength="10"
                style={{
                  padding: "0.8rem",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "1rem"
                }}
              />
            </div>

            <div style={{ display: "grid", gap: "0.5rem" }}>
              <label style={{ color: "#2c3e50", fontWeight: "bold" }}>Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                style={{
                  padding: "0.8rem",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "1rem"
                }}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div style={{ display: "grid", gap: "0.5rem" }}>
              <label style={{ color: "#2c3e50", fontWeight: "bold" }}>Birth Date</label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                style={{
                  padding: "0.8rem",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "1rem"
                }}
              />
            </div>

            <div style={{ display: "grid", gap: "0.5rem" }}>
              <label style={{ color: "#2c3e50", fontWeight: "bold" }}>Driving License Number (Optional)</label>
              <input
                type="text"
                placeholder="Enter driving license number if available"
                value={drivingLicense}
                onChange={(e) => setDrivingLicense(e.target.value)}
                style={{
                  padding: "0.8rem",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "1rem"
                }}
              />
            </div>

            <div style={{ display: "grid", gap: "0.5rem" }}>
              <label style={{ color: "#2c3e50", fontWeight: "bold" }}>Document Purpose</label>
              <textarea
                placeholder="Explain the purpose of your document..."
                value={documentPurpose}
                onChange={(e) => setDocumentPurpose(e.target.value)}
                style={{
                  padding: "0.8rem",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "1rem",
                  minHeight: "120px",
                  resize: "vertical"
                }}
              />
            </div>

            <div style={{ display: "grid", gap: "0.5rem" }}>
              <label style={{ color: "#2c3e50", fontWeight: "bold" }}>Upload Document</label>
              <input
                type="file"
                accept=".pdf, .jpg, .png"
                onChange={handleFileChange}
                style={{
                  padding: "0.8rem",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "1rem"
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: "#3498db",
                color: "white",
                padding: "1rem",
                border: "none",
                borderRadius: "4px",
                fontSize: "1rem",
                fontWeight: "bold",
                cursor: "pointer",
                marginTop: "1rem"
              }}
            >
              Send Application
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Application;
