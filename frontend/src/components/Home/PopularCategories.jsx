import React from "react";
import {
  MdOutlineDesignServices,
  MdOutlineWebhook,
  MdAccountBalance,
  MdOutlineAnimation,
} from "react-icons/md";
import { TbAppsFilled } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";

// Replacing the categories with legal topics
const PopularCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Legal Agreements",
      subTitle: "100+ Templates Available",
      icon: <MdOutlineDesignServices />,
    },
    {
      id: 2,
      title: "Non-Creamy Layer Certificate",
      subTitle: "50+ Templates Available",
      icon: <TbAppsFilled />,
    },
    {
      id: 3,
      title: "Property Agreements",
      subTitle: "200+ Templates Available",
      icon: <MdOutlineWebhook />,
    },
    {
      id: 4,
      title: "Legal Document Verification",
      subTitle: "1000+ Documents Verified",
      icon: <FaReact />,
    },
    {
      id: 5,
      title: "Corporate Law",
      subTitle: "150+ Open Positions",
      icon: <MdAccountBalance />,
    },
    {
      id: 6,
      title: "Artificial Intelligence in Law",
      subTitle: "867 Legal AI Solutions",
      icon: <GiArtificialIntelligence />,
    },
    {
      id: 7,
      title: "Legal Counseling",
      subTitle: "50+ Experts Available",
      icon: <MdOutlineAnimation />,
    },
    {
      id: 8,
      title: "Case Study Analysis",
      subTitle: "80+ Cases Available",
      icon: <IoGameController />,
    },
  ];

  return (
    <div className="categories">
      <h3>POPULAR LEGAL CATEGORIES</h3>
      <div className="banner">
        {categories.map((element) => {
          return (
            <div className="card" key={element.id}>
              <div className="icon">{element.icon}</div>
              <div className="text">
                <p>{element.title}</p>
                <p>{element.subTitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopularCategories;
