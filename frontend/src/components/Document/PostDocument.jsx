import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const PostDocument = () => {
    const [Lawyer, setLawyer] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [validityFrom, setValidityFrom] = useState("");
    const [validityTo, setValidityTo] = useState("");
    const [fixedValidity, setFixedValidity] = useState("");
    const [validityType, setValidityType] = useState("default");
    const [loading, setLoading] = useState(false);

    const { isAuthorized, user } = useContext(Context);
    const navigateTo = useNavigate();

    useEffect(() => {
        if (!isAuthorized || (user && user.role !== "Lawyer")) {
            navigateTo("/"); // Redirect user to homepage if not authorized
        }
    }, [isAuthorized, user, navigateTo]);

    const validateFields = () => {
        if (!Lawyer || !title || !description || !category || !country || !city) {
            toast.error("Please fill in all required fields.");
            return false;
        }

        if (validityType === "Fixed Validity" && !fixedValidity) {
            toast.error("Please enter a fixed validity period.");
            return false;
        }

        if (validityType === "Ranged Validity" && (!validityFrom || !validityTo)) {
            toast.error("Please enter both validity from and validity to.");
            return false;
        }

        return true;
    };

    const handleDocumentPost = async (e) => {
        e.preventDefault();

        if (!validateFields()) return; // Only proceed if validation is successful

        setLoading(true);

        // Reset validity-related fields based on the selected validity type
        const documentData = {
            Lawyer,
            title,
            description,
            category,
            country,
            city,
            validityType,
            ...(validityType === "Fixed Validity" && { fixedValidity }),
            ...(validityType === "Ranged Validity" && { validityFrom, validityTo }),
        };

        try {
            const response = await axios.post(
                "http://localhost:4000/api/v1/document/post",
                documentData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            toast.success(response.data.message);
            // Reset form fields after successful submission
            setLawyer("");
            setTitle("");
            setDescription("");
            setCategory("");
            setCountry("");
            setCity("");
            setValidityFrom("");
            setValidityTo("");
            setFixedValidity("");
            setValidityType("default");
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="document_post page">
            <div className="container">
                <h3>UPLOAD NEW DOCUMENT</h3>
                <form onSubmit={handleDocumentPost}>
                    <div className="wrapper">
                        <input
                            type="text"
                            value={Lawyer}
                            onChange={(e) => setLawyer(e.target.value)}
                            placeholder="Lawyer Name"
                        />
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Document Title"
                        />
                    </div>
                    <div className="wrapper">
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">Select Category</option>
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
                    <div className="wrapper">
                        <input
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            placeholder="Country"
                        />
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="City"
                        />
                    </div>
                    <div className="validity_wrapper">
                        <select
                            value={validityType}
                            onChange={(e) => setValidityType(e.target.value)}
                        >
                            <option value="default">Select Validity Type</option>
                            <option value="Fixed Validity">Fixed Validity</option>
                            <option value="Ranged Validity">Ranged Validity</option>
                        </select>
                        <div>
                            {validityType === "default" ? (
                                <p>Please provide Validity Type *</p>
                            ) : validityType === "Fixed Validity" ? (
                                <input
                                    type="text"
                                    placeholder="Enter Fixed Validity"
                                    value={fixedValidity}
                                    onChange={(e) => setFixedValidity(e.target.value)}
                                />
                            ) : (
                                <div className="ranged_validity">
                                    <input
                                        type="text"
                                        placeholder="Validity From"
                                        value={validityFrom}
                                        onChange={(e) => setValidityFrom(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Validity To"
                                        value={validityTo}
                                        onChange={(e) => setValidityTo(e.target.value)}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <textarea
                        rows="10"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Document Description"
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? "Uploading..." : "Upload Document"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PostDocument; 