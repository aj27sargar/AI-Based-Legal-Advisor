import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";
// import { BASE_URL } from '../../utils/config'

const MyApplications = () => {
  const { user, isAuthorized } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/");
      return;
    }

    const fetchApplications = async () => {
      try {
        const endpoint =
          user?.role === "Lawyer"
            // ? "http://be-project-axa3.onrender.com/api/v1/application/lawyer/getall"
            // : "http://be-project-axa3.onrender.com/api/v1/application/user/getall";
            ? "http://localhost:4000/api/v1/application/lawyer/getall"
            : "http://localhost:4000/api/v1/application/user/getall";

        const { data } = await axios.get(endpoint, { withCredentials: true });
        setApplications(data.applications);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch applications");
      }
    };

    fetchApplications();
  }, [isAuthorized, user?.role, navigateTo]);

  const deleteApplication = async (id) => {
    try {
      // const { data } = await axios.delete(`http://be-project-axa3.onrender.com/api/v1/application/delete/${id}`, {
        const { data } = await axios.delete(`http://localhost:4000/api/v1/application/delete/${id}`, {
        withCredentials: true,
      });

      toast.success(data.message);
      setApplications((prev) => prev.filter((app) => app._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete application");
    }
  };

  const updateApplicationStatus = async (id, status) => {
    try {
      const { data } = await axios.put(
        // `http://be-project-axa3.onrender.com/api/v1/application/approve/${id}`,
        `http://localhost:4000/api/v1/application/approve/${id}`,
        { status },
        { withCredentials: true }
      );

      toast.success(`Application marked as ${status}`);
      fetchApplications();
      
      // 🔥 Instantly update the state to reflect changes without refreshing
      setApplications((prev) =>
        prev.map((app) => (app._id === id ? { ...app, status } : app))
      );
    } catch (error) {
      toast.error(error.response?.data?.message || `Failed to update status to ${status}`);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  return (
    <section className="my_applications page">
      <div className="container">
        <h1>{user?.role === "User" ? "My Applications" : "Applications From Users"}</h1>
        {applications.length === 0 ? (
          <h4>No Applications Found</h4>
        ) : (
          applications.map((element) =>
            user?.role === "User" ? (
              <UserCard
                key={element._id}
                element={element}
                deleteApplication={deleteApplication}
                openModal={openModal}
              />
            ) : (
              <LawyerCard
                key={element._id}
                element={element}
                openModal={openModal}
                onAccept={() => updateApplicationStatus(element._id, "Completed")}
                onReject={() => updateApplicationStatus(element._id, "Rejected")}
              />
            )
          )
        )}
      </div>
      {modalOpen && <ResumeModal imageUrl={resumeImageUrl} onClose={() => setModalOpen(false)} />}
    </section>
  );
};

export default MyApplications;

const UserCard = ({ element, deleteApplication, openModal }) => (
  <div className="user_card">
    <div className="detail">
      <p><span>Name:</span> {element.name}</p>
      <p><span>Email:</span> {element.email}</p>
      <p><span>Phone:</span> {element.phone}</p>
      <p><span>Address:</span> {element.address}</p>
      <p><span>Cover Letter:</span> {element.coverLetter}</p>
    </div>

    <div className="resume" style={{ textAlign: "center" }}>
      <img
        src={element.resume.url}
        alt="resume"
        style={{ width: "480px", height: "250px", objectFit: "cover", cursor: "pointer" }}
        onClick={() => openModal(element.resume.url)}
      />
    </div>

    {/* ✅ STATUS BUTTON (Changes Color Dynamically) */}
    <div className="status_area">
      <button
        style={{
          padding: "8px 12px",
          border: "none",
          borderRadius: "5px",
          fontWeight: "bold",
          backgroundColor: element.status === "Completed" ? "#4CAF50" : "#FF9800",
          color: "white",
          width: "120px",
          height: "40px",
        }}
        disabled
      >
        {element.status}
      </button>
    </div>

    <div className="btn_area">
      <button
        onClick={() => deleteApplication(element._id)}
        style={{
          padding: "8px 12px",
          border: "none",
          borderRadius: "5px",
          fontWeight: "bold",
          backgroundColor: "#FF4D4D",
          color: "white",
          width: "120px",
          height: "40px",
          cursor: "pointer",
        }}
      >
        Delete
      </button>
    </div>
  </div>
);

const LawyerCard = ({ element, openModal, onAccept, onReject }) => (
  <div className="user_card">
    <div className="detail">
      <p><span>Name:</span> {element.name}</p>
      <p><span>Email:</span> {element.email}</p>
      <p><span>Phone:</span> {element.phone}</p>
      <p><span>Address:</span> {element.address}</p>
      <p><span>Cover Letter:</span> {element.coverLetter}</p>
    </div>

    <div className="resume" style={{ textAlign: "center" }}>
      <img
        src={element.resume.url}
        alt="resume"
        style={{ width: "480px", height: "250px", objectFit: "cover", cursor: "pointer" }}
        onClick={() => openModal(element.resume.url)}
      />
    </div>

    <div className="btn_area" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <button
        onClick={onAccept}
        style={{ padding: "8px 12px", backgroundColor: "#4CAF50", color: "white", width: "120px", height: "40px", borderRadius: "5px" }}
      >
        Accept
      </button>
      <button
        onClick={onReject}
        style={{ padding: "8px 12px", backgroundColor: "#FF4D4D", color: "white", width: "120px", height: "40px", borderRadius: "5px" }}
      >
        Reject
      </button>
    </div>
  </div>
);
