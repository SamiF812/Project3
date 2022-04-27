import './index.css'
import React from "react";

// import { useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  // const location = useLocation();
  // const navigate = useNavigate();
  return (
    <div className="col-12 bg-info align-self-end py-3">
      <div className="container text-center">
        {/* {location.pathname !== "/" && (
          <button className="btn btn-dark mb-3" onClick={() => navigate(-1)}>
            &larr; Go Back
          </button>
        )} */}
        <h4>
          Made with{" "}
          <span
            className="emoji"
            role="img"
            aria-label="heart"
            aria-hidden="false"
          >
            ❤️
          </span>{" "}
          by Sami, James & Andreas.
        </h4>
      </div>
    </div>
  );
};

export default Footer;
