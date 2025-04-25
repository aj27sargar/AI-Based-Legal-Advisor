import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
// import { BASE_URL } from '../../utils/config'

const DocumentDetails = () => {
    const { id } = useParams();
    const [document, setDocument] = useState({});
    const navigateTo = useNavigate();

    const { isAuthorized, user } = useContext(Context);

    useEffect(() => {
        axios
            // .get(`http://be-project-axa3.onrender.com/api/v1/document/${id}`, {
            .get(`http://localhost:4000/api/v1/document/${id}`, {
                withCredentials: true,
            })
            .then((res) => {
                setDocument(res.data.document);
            })
            .catch((error) => {
                navigateTo("/notfound");
            });
    }, []);

    if (!isAuthorized) {
        navigateTo("/login");
    }

    return (
        <section className="documentDetail page">
            <div className="container">
                <h3>Document Details</h3>
                <div className="banner">
                    <p>
                        Lawyer: <span> {document.Lawyer}</span>
                    </p>
                    <p>
                        Title: <span> {document.title}</span>
                    </p>
                    <p>
                        Category: <span>{document.category}</span>
                    </p>
                    <p>
                        Country: <span>{document.country}</span>
                    </p>
                    <p>
                        City: <span>{document.city}</span>
                    </p>
                    <p>
                        Location: <span>{document.location}</span>
                    </p>
                    <p>
                        Description: <span>{document.description}</span>
                    </p>
                    <p>
                        Document Posted On: <span>{document.documentPostedOn}</span>
                    </p>
                    <p>
                        Validity:{" "}
                        {document.fixedValidity ? (
                            <span>{document.fixedValidity}</span>
                        ) : (
                            <span>
                                {document.validityFrom} - {document.validityTo}
                            </span>
                        )}
                    </p>
                    {user && user.role === "Lawyer" ? (
                        <></>
                    ) : (
                        <Link to={`/application/${document._id}`}>Apply Now</Link>
                    )}
                </div>
            </div>
        </section>
    );
};

export default DocumentDetails; 