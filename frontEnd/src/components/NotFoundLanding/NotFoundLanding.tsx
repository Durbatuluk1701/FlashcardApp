import React from "react";
import { Link } from "react-router-dom";
import "./NotFoundLanding.css";

export const NotFoundLanding = () => {
  return (
    <div className="not-found-page-container">
      <div className="not-found-mini-wrapper">
        <h1 className="not-found-error-title">404 Error: Page Not Found</h1>
        <p className="not-found-error-message">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link to="/" className="not-found-home-link">
          Back to Home
        </Link>
      </div>
    </div>
  );
};
