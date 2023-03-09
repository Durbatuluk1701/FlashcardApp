import React from "react";
import { ModalContext } from "../../contexts";
import "./Modal.css";

export const Modal = () => {
  const modalCont = React.useContext(ModalContext);

  const handleCloseModal = () => {
    modalCont.setShowModal(false);
  };

  return (
    <div
      className={`modal ${modalCont.showModal ? "is-active" : ""}`}
      onClick={handleCloseModal}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h1>{modalCont.modalTitle}</h1>
        <p>{modalCont.modalMessage}</p>
      </div>
    </div>
  );
};
