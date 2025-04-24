  import React, { useContext, useEffect, useState } from "react";
  import axios from "axios";
  import toast from "react-hot-toast";
  import { useNavigate } from "react-router-dom";
  import { Context } from "../../main";
  // import { BASE_URL } from '../../utils/config'

  const PostJob = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [location, setLocation] = useState("");
    const [salaryFrom, setSalaryFrom] = useState("");
    const [salaryTo, setSalaryTo] = useState("");
    const [fixedSalary, setFixedSalary] = useState("");
    const [salaryType, setSalaryType] = useState("default");

    const { isAuthorized, user } = useContext(Context);

    const handleJobPost = async (e) => {
      e.preventDefault();
      if (salaryType === "Fixed Salary") {
        setSalaryFrom("");
        setSalaryFrom("");
      } else if (salaryType === "Ranged Salary") {
        setFixedSalary("");
      } else {
        setSalaryFrom("");
        setSalaryTo("");
        setFixedSalary("");
      }
      await axios
        .post(
          // "http://be-project-axa3.onrender.com/api/v1/job/post",
          "http://localhost:4000/api/v1/job/post",
          fixedSalary.length >= 4
            ? {
                title,
                description,
                category,
                country,
                city,
                location,
                fixedSalary,
              }
            : {
                title,
                description,
                category,
                country,
                city,
                location,
                salaryFrom,
                salaryTo,
              },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    };

    const navigateTo = useNavigate();
    if (!isAuthorized || (user && user.role !== "Lawyer")) {
      navigateTo("/");
    }

    return (
      <>
        <div className="job_post page">
          <div className="container">
            <h3>POST NEW DOCUMENTS</h3>
            <form onSubmit={handleJobPost}>
              <div className="wrapper">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Application Title"
                />
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
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
              />
              <div className="salary_wrapper">
                <select
                  value={salaryType}
                  onChange={(e) => setSalaryType(e.target.value)}
                >
                  <option value="default">Select Document validity Type</option>
                  <option value="Fixed Salary">Fixed validity</option>
                  <option value="Ranged Salary">Ranged validity</option>
                </select>
                <div>
                  {salaryType === "default" ? (
                    <p>Please provide Valedity Type *</p>
                  ) : salaryType === "Fixed Salary" ? (
                    <input
                      type="number"
                      placeholder="Enter Fixed validity"
                      value={fixedSalary}
                      onChange={(e) => setFixedSalary(e.target.value)}
                    />
                  ) : (
                    <div className="ranged_salary">
                      <input
                        type="number"
                        placeholder="validity From"
                        value={salaryFrom}
                        onChange={(e) => setSalaryFrom(e.target.value)}
                      />
                      <input
                        type="number"
                        placeholder="validity To"
                        value={salaryTo}
                        onChange={(e) => setSalaryTo(e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </div>
              <textarea
                rows="10"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Application Description"
              />
              <button type="submit">Create Application</button>
            </form>
          </div>
        </div>
      </>
    );
  };

  export default PostJob;
