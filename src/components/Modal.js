import React from "react";
import { IoMdClose } from "react-icons/io";

const Modal = ({ children, onClose }) => {
  return (
    <div id="modal" className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-md p-5 relative text-center flex items-center justify-center w-[500px]">
        {children}
        <button onClick={onClose} className="absolute top-2 right-2">
          <IoMdClose />
        </button>
      </div>
    </div>
  );
};

export default Modal;
