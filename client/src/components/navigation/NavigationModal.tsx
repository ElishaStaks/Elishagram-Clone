import React from "react";
import { NavModalWrapper } from "../../styles/Navigation";

const NavigationModal: React.FC = ({ children }) => {
  return (
    <NavModalWrapper>
      <div className="modal-content">{children}</div>
    </NavModalWrapper>
  );
};

export default NavigationModal;