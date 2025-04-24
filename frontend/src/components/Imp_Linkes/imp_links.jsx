import React from "react";
import "./imp_links.css";
import Supreme from "../../assets/lawyer17.jpg";
import Gujrat from "../../assets/lawyer16.jpg";
import BCI from "../../assets/lawyer18.jpg";
import IT from "../../assets/lawyer19.jpg";
import GST from "../../assets/lawyer20.jpg";
import CC from "../../assets/lawyer21.jpg";
import RTI from "../../assets/lawyer22.jpg";
import MLJ from "../../assets/lawyer23.jpg";
import NJD from "../../assets/lawyer24.jpg";



const ImportantLinks = () => {
  const links = [
    { name: "Supreme Court of India", url: "https://main.sci.gov.in/", img: Supreme },
    { name: "High Court of Gujarat", url: "https://gujarathighcourt.nic.in/", img: Gujrat },
    { name: "Bar Council of India", url: "http://www.barcouncilofindia.org/", img: BCI },
    { name: "Income Tax Department", url: "https://www.incometaxindia.gov.in/", img: IT },
    { name: "GST Portal", url: "https://www.gst.gov.in/", img: GST },
    { name: "Consumer Court", url: "https://ncdrc.nic.in/", img: CC },
    { name: "RTI Online", url: "https://rtionline.gov.in/", img: RTI },
    { name: "Ministry of Law and Justice", url: "https://lawmin.gov.in/", img: MLJ },
    { name: "National Judicial Data Grid", url: "https://njdg.ecourts.gov.in/", img: NJD },
  ];

  return (
    <div className="important-links-container">
      <h2 className="section-title">Important Links</h2>
      
      <ul className="links-list">
        {links.map((link, index) => (
          <li key={index} className="link-item">
            <img src={link.img} alt={link.name} className="link-image" />
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-text"
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
      
    </div>
  );
};

export default ImportantLinks;
