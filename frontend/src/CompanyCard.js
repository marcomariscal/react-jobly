import React, { useState } from "react";
import "./CompanyCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import "./FontAwesome.css";

const CompanyCard = ({ item }) => {
  const [imgValid, setImgValid] = useState(true);

  return (
    <div className="CompanyCard card text-center">
      <div className="card-body">
        <h6 className="card-title d-flex justify-content-between mb-4">
          <span className="text-capitalize">{item.name}</span>
          {imgValid && (
            <img
              src={item.logo_url}
              alt={`${item.name}} Logo`}
              onError={setImgValid(false)}
            />
          )}
          {!imgValid && (
            <FontAwesomeIcon icon={faBuilding} size="2x" className="building" />
          )}
        </h6>
        <p className="card-text text-left">{item.description}</p>
      </div>
    </div>
  );
};
export default CompanyCard;
