import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
// import { BASE_URL } from '../../utils/config'

const Documents = () => {
    const [documents, setDocuments] = useState([]);
    const { isAuthorized } = useContext(Context);
    const navigateTo = useNavigate();
    useEffect(() => {

        try {
            axios
                // .get("http://be-project-axa3.onrender.com/api/v1/document/getall", {
                .get("http://localhost:4000/api/v1/document/getall", {
                    withCredentials: true,
                })
                .then((res) => {
                    setDocuments(res.data);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);
    if (!isAuthorized) {
        navigateTo("/");
    }

    return (
        <section className="documents page">
            <div className="container">
                <h1>ALL AVAILABLE DOCUMENTS</h1>
                <div className="banner">
                    {documents.documents &&
                        documents.documents.map((element) => {
                            return (
                                <div className="card" key={element._id}>
                                    <p>{element.title}</p>
                                    <p>{element.category}</p>
                                    <p><p>By</p>{element.Lawyer}</p>
                                    <Link to={`/document/${element._id}`}>DOCUMENT Details</Link>
                                </div>
                            );
                        })}
                </div>
            </div>
        </section>
    );
};

export default Documents; 