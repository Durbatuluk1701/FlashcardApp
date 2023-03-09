import React, { createContext, useState } from "react";

interface ModalContextType {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalTitle: string | undefined;
  setModalTitle: React.Dispatch<React.SetStateAction<string | undefined>>;
  modalMessage: string | undefined;
  setModalMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const ModalContext = createContext<ModalContextType>({
  showModal: false,
  setShowModal: () => {},
  modalTitle: undefined,
  setModalTitle: () => {},
  modalMessage: undefined,
  setModalMessage: () => {},
});

export const ModalProvider = (props: React.PropsWithChildren) => {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState<string | undefined>(undefined);
  const [modalMessage, setModalMessage] = useState<string | undefined>(
    undefined
  );

  return (
    <ModalContext.Provider
      value={{
        showModal,
        setShowModal,
        modalTitle,
        setModalTitle,
        modalMessage,
        setModalMessage,
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};
