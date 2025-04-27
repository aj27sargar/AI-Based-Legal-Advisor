import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";
import { BASE_URL } from "../utils/config";

const MyApplications = () => {
  const { user, isAuthorized } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
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
            ? `${BASE_URL}/application/lawyer/getall`
            : `${BASE_URL}/application/user/getall`;

        const { data } = await axios.get(endpoint, { withCredentials: true });
        setApplications(data.applications);
        setLoading(false);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch applications");
        setLoading(false);
      }
    };

    fetchApplications();
  }, [isAuthorized, user?.role, navigateTo]);

  const deleteApplication = async (id) => {
    try {
      const { data } = await axios.delete(`${BASE_URL}/application/delete/${id}`, {
        withCredentials: true,
      });

      toast.success(data.message);
      setApplications((prev) => prev.filter((app) => app._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete application");
    }
  };

  const updateApplication = async (id) => {
    try {
      const { data } = await axios.put(
        `${BASE_URL}/application/update/${id}`,
        { withCredentials: true }
      );

      toast.success(data.message);
      navigateTo("/application/update");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update application");
    }
  };

  const updateApplicationStatus = async (id, status) => {
    try {
      const { data } = await axios.put(
        `${BASE_URL}/application/approve/${id}`,
        { status },
        { withCredentials: true }
      );

      toast.success(`Application marked as ${status}`);
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

  if (loading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      }}>
        <div style={{
          width: "50px",
          height: "50px",
          border: "5px solid #f3f3f3",
          borderTop: "5px solid #3498db",
          borderRadius: "50%",
          animation: "spin 1s linear infinite"
        }}></div>
      </div>
    );
  }

  return (
    <section style={{
      padding: "2rem",
      backgroundColor: "#f5f5f5",
      minHeight: "100vh"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        <h1 style={{
          textAlign: "center",
          color: "#2c3e50",
          marginBottom: "2rem",
          fontSize: "2rem"
        }}>{user?.role === "Lawyer" ? "Applications From Users" : "My Applications"}</h1>

        {applications.length === 0 ? (
          <div style={{
            textAlign: "center",
            padding: "2rem",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
          }}>
            <p style={{ color: "#7f8c8d", fontSize: "1.2rem" }}>No applications found!</p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gap: "1.5rem"
          }}>
            {applications.map((element) => (
              <div key={element._id} style={{
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                padding: "1.5rem",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-2px)"
                }
              }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "1rem"
                }}>
                  <div>
                    <h3 style={{
                      color: "#2c3e50",
                      marginBottom: "0.5rem",
                      fontSize: "1.2rem"
                    }}>Application Details</h3>
                    <p style={{
                      color: "#7f8c8d",
                      marginBottom: "0.5rem"
                    }}>Status: <span style={{
                      color: element.status === "Completed" ? "#27ae60" :
                        element.status === "Rejected" ? "#e74c3c" : "#f39c12",
                      fontWeight: "bold"
                    }}>{element.status}</span></p>
                  </div>
                  <div style={{
                    display: "flex",
                    gap: "0.5rem"
                  }}>
                    {user?.role === "Lawyer" ? (
                      <>
                        <button
                          onClick={() => updateApplicationStatus(element._id, "Completed")}
                          disabled={element.status === "Completed" || element.status === "Rejected"}
                          style={{
                            backgroundColor: "#27ae60",
                            color: "white",
                            padding: "0.5rem 1rem",
                            border: "none",
                            borderRadius: "4px",
                            cursor: (element.status === "Completed" || element.status === "Rejected") ? "not-allowed" : "pointer",
                            opacity: (element.status === "Completed" || element.status === "Rejected") ? 0.5 : 1,
                            fontSize: "0.9rem"
                          }}
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => updateApplicationStatus(element._id, "Rejected")}
                          disabled={element.status === "Completed" || element.status === "Rejected"}
                          style={{
                            backgroundColor: "#e74c3c",
                            color: "white",
                            padding: "0.5rem 1rem",
                            border: "none",
                            borderRadius: "4px",
                            cursor: (element.status === "Completed" || element.status === "Rejected") ? "not-allowed" : "pointer",
                            opacity: (element.status === "Completed" || element.status === "Rejected") ? 0.5 : 1,
                            fontSize: "0.9rem"
                          }}
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <>
                        {element.status === "Pending" && (
                          <button
                            onClick={() => updateApplication(element._id)}
                            style={{
                              backgroundColor: "#3498db",
                              color: "white",
                              padding: "0.5rem 1rem",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                              fontSize: "0.9rem"
                            }}
                          >
                            Edit
                          </button>
                        )}
                        <button
                          onClick={() => deleteApplication(element._id)}
                          style={{
                            backgroundColor: "#e74c3c",
                            color: "white",
                            padding: "0.5rem 1rem",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "0.9rem"
                          }}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "1rem",
                  marginBottom: "1rem"
                }}>
                  <div>
                    <h4 style={{
                      color: "#2c3e50",
                      marginBottom: "0.5rem",
                      fontSize: "1rem"
                    }}>Personal Information</h4>
                    <p style={{ color: "#7f8c8d", marginBottom: "0.3rem" }}>
                      <strong>Name:</strong> {element.name}
                    </p>
                    <p style={{ color: "#7f8c8d", marginBottom: "0.3rem" }}>
                      <strong>Email:</strong> {element.email}
                    </p>
                    <p style={{ color: "#7f8c8d", marginBottom: "0.3rem" }}>
                      <strong>Phone:</strong> {element.phone}
                    </p>
                    <p style={{ color: "#7f8c8d", marginBottom: "0.3rem" }}>
                      <strong>Gender:</strong> {element.gender}
                    </p>
                    <p style={{ color: "#7f8c8d", marginBottom: "0.3rem" }}>
                      <strong>Birth Date:</strong> {new Date(element.birthDate).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <h4 style={{
                      color: "#2c3e50",
                      marginBottom: "0.5rem",
                      fontSize: "1rem"
                    }}>Document Details</h4>
                    <p style={{ color: "#7f8c8d", marginBottom: "0.3rem" }}>
                      <strong>Aadhar Number:</strong> {element.aadharNumber}
                    </p>
                    <p style={{ color: "#7f8c8d", marginBottom: "0.3rem" }}>
                      <strong>PAN Number:</strong> {element.panNumber}
                    </p>
                    {element.drivingLicense && (
                      <p style={{ color: "#7f8c8d", marginBottom: "0.3rem" }}>
                        <strong>Driving License:</strong> {element.drivingLicense}
                      </p>
                    )}
                  </div>

                  <div>
                    <h4 style={{
                      color: "#2c3e50",
                      marginBottom: "0.5rem",
                      fontSize: "1rem"
                    }}>Additional Information</h4>
                    <p style={{ color: "#7f8c8d", marginBottom: "0.3rem" }}>
                      <strong>Address:</strong> {element.address}
                    </p>
                    <p style={{ color: "#7f8c8d", marginBottom: "0.3rem" }}>
                      <strong>Document Purpose:</strong> {element.documentPurpose}
                    </p>
                    <p style={{ color: "#7f8c8d", marginBottom: "0.3rem" }}>
                      <strong>Applied On:</strong> {new Date(element.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {element.resume && (
                  <div style={{
                    marginTop: "1rem",
                    paddingTop: "1rem",
                    borderTop: "1px solid #eee"
                  }}>
                    <h4 style={{
                      color: "#2c3e50",
                      marginBottom: "0.5rem",
                      fontSize: "1rem"
                    }}>Uploaded Document</h4>
                    <a
                      href={element.resume.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#3498db",
                        textDecoration: "none",
                        display: "inline-block",
                        padding: "0.5rem 1rem",
                        backgroundColor: "#f8f9fa",
                        borderRadius: "4px",
                        "&:hover": {
                          textDecoration: "underline"
                        }
                      }}
                    >
                      View Document
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {modalOpen && <ResumeModal imageUrl={resumeImageUrl} onClose={() => setModalOpen(false)} />}
    </section>
  );
};

export default MyApplications;
