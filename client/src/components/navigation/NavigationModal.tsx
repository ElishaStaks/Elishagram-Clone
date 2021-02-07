import React from "react";
import { NavModalWrapper } from "../../styles/Navigation";

const NavigationModal = ({ children }: any) => {
  return (
    <NavModalWrapper>
      <div className="modal-content">{children}</div>
    </NavModalWrapper>
  );
};

export default NavigationModal;