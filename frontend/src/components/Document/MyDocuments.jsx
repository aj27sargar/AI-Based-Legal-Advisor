import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";

const MyDocuments = () => {
    const [myDocuments, setMyDocuments] = useState([]);
    const [editingMode, setEditingMode] = useState(null);
    const { isAuthorized, user } = useContext(Context);

    const navigateTo = useNavigate();
    // Fetching all documents
    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const { data } = await axios.get(
                    "http://localhost:4000/api/v1/document/getmydocuments",
                    { withCredentials: true }
                );
                setMyDocuments(data.myDocuments);
            } catch (error) {
                toast.error(error.response?.data?.message || "Error fetching documents.");
                setMyDocuments([]);
            }
        };
        fetchDocuments();
    }, []);

    if (!isAuthorized || (user && user.role !== "Employer")) {
        navigateTo("/");
    }

    // Function For Enabling Editing Mode
    const handleEnableEdit = (documentId) => {
        setEditingMode(documentId);
    };

    // Function For Disabling Editing Mode
    const handleDisableEdit = () => {
        setEditingMode(null);
    };

    // Function For Updating The Document
    const handleUpdateDocument = async (documentId) => {
        const updatedDocument = myDocuments.find((document) => document._id === documentId);
        try {
            await axios.put(
                `http://localhost:4000/api/v1/document/update/${documentId}`,
                updatedDocument,
                {
                    withCredentials: true,
                }
            );
            toast.success("Document updated successfully!");
            setEditingMode(null);
        } catch (error) {
            toast.error(error.response?.data?.message || "Error updating document.");
        }
    };

    // Function For Deleting Document
    const handleDeleteDocument = async (documentId) => {
        try {
            await axios.delete(
                `http://localhost:4000/api/v1/document/delete/${documentId}`,
                {
                    withCredentials: true,
                }
            );
            toast.success("Document deleted successfully!");
            setMyDocuments((prevDocuments) =>
                prevDocuments.filter((document) => document._id !== documentId)
            );
        } catch (error) {
            toast.error(error.response?.data?.message || "Error deleting document.");
        }
    };

    const handleInputChange = (documentId, field, value) => {
        setMyDocuments((prevDocuments) =>
            prevDocuments.map((document) =>
                document._id === documentId ? { ...document, [field]: value } : document
            )
        );
    };

    return (
        <div className="myDocuments page">
            <div className="container">
                <h1>Your Posted Documents</h1>
                {myDocuments.length > 0 ? (
                    <div className="banner">
                        {myDocuments.map((element) => (
                            <div className="card" key={element._id}>
                                <div className="content">
                                    <div className="short_fields">
                                        <div>
                                            <span>Title:</span>
                                            <input
                                                type="text"
                                                disabled={editingMode !== element._id}
                                                value={element.title}
                                                onChange={(e) =>
                                                    handleInputChange(element._id, "title", e.target.value)
                                                }
                                            />
                                        </div>
                                        <div>
                                            <span>Country:</span>
                                            <input
                                                type="text"
                                                disabled={editingMode !== element._id}
                                                value={element.country}
                                                onChange={(e) =>
                                                    handleInputChange(element._id, "country", e.target.value)
                                                }
                                            />
                                        </div>
                                        <div>
                                            <span>City:</span>
                                            <input
                                                type="text"
                                                disabled={editingMode !== element._id}
                                                value={element.city}
                                                onChange={(e) =>
                                                    handleInputChange(element._id, "city", e.target.value)
                                                }
                                            />
                                        </div>
                                        <div>
                                            <span>Category:</span>
                                            <select
                                                value={element.category}
                                                onChange={(e) =>
                                                    handleInputChange(element._id, "category", e.target.value)
                                                }
                                                disabled={editingMode !== element._id}
                                            >
                                                <option value="Rent Agreement">Rent Agreement</option>
                                                <option value="Sale Deed">Sale Deed</option>
                                                <option value="Power of Attorney">Power of Attorney</option>
                                                <option value="Partnership Agreement">Partnership Agreement</option>
                                                <option value="Non-Disclosure Agreement (NDA)">Non-Disclosure Agreement (NDA)</option>
                                                <option value="Employment Contract">Employment Contract</option>
                                                <option value="Legal Notice">Legal Notice</option>
                                                <option value="Will & Testament">Will & Testament</option>
                                                <option value="Affidavit">Affidavit</option>
                                                <option value="Divorce Agreement">Divorce Agreement</option>
                                                <option value="Loan Agreement">Loan Agreement</option>
                                                <option value="Vendor Agreement">Vendor Agreement</option>
                                                <option value="Franchise Agreement">Franchise Agreement</option>
                                                <option value="Service Agreement">Service Agreement</option>
                                                <option value="Lease Agreement">Lease Agreement</option>
                                                <option value="Memorandum of Understanding (MoU)">Memorandum of Understanding (MoU)</option>
                                                <option value="Shareholder Agreement">Shareholder Agreement</option>
                                                <option value="Consumer Complaint">Consumer Complaint</option>
                                                <option value="Intellectual Property Assignment">Intellectual Property Assignment</option>
                                            </select>
                                        </div>
                                        <div>
                                            <span>
                                                Validity:{" "}
                                                {element.fixedValidity ? (
                                                    <input
                                                        type="text"
                                                        disabled={editingMode !== element._id}
                                                        value={element.fixedValidity}
                                                        onChange={(e) =>
                                                            handleInputChange(element._id, "fixedValidity", e.target.value)
                                                        }
                                                    />
                                                ) : (
                                                    <div>
                                                        <input
                                                            type="text"
                                                            disabled={editingMode !== element._id}
                                                            value={element.validityFrom}
                                                            onChange={(e) =>
                                                                handleInputChange(element._id, "validityFrom", e.target.value)
                                                            }
                                                        />
                                                        <input
                                                            type="text"
                                                            disabled={editingMode !== element._id}
                                                            value={element.validityTo}
                                                            onChange={(e) =>
                                                                handleInputChange(element._id, "validityTo", e.target.value)
                                                            }
                                                        />
                                                    </div>
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="long_field">
                                        <span>Description:</span>
                                        <textarea
                                            disabled={editingMode !== element._id}
                                            value={element.description}
                                            onChange={(e) =>
                                                handleInputChange(element._id, "description", e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="buttons">
                                        {editingMode === element._id ? (
                                            <>
                                                <button
                                                    onClick={() => handleUpdateDocument(element._id)}
                                                    className="check_btn"
                                                >
                                                    <FaCheck />
                                                </button>
                                                <button
                                                    onClick={handleDisableEdit}
                                                    className="cross_btn"
                                                >
                                                    <RxCross2 />
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                onClick={() => handleEnableEdit(element._id)}
                                                className="edit_btn"
                                            >
                                                Edit
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDeleteDocument(element._id)}
                                            className="delete_btn"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>You've not posted any document or may be you deleted all of your documents!</p>
                )}
            </div>
        </div>
    );
};

export default MyDocuments; 