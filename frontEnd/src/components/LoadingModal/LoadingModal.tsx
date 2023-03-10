import React from "react";
import "./LoadingModal.css";

export const LoadingModal = (): JSX.Element => {
  return (
    <div className="loading-modal">
      <div className="loading-spinner"></div>
    </div>
  );
};
