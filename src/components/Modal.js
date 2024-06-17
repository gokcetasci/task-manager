import React from "react";
import { IoMdClose } from "react-icons/io";

const Modal = ({ children, onClose }) => {
  return (
    <div id="modal" className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-md p-5 relative ">
        <div className="my-12">
        {children}
        </div>
        <button onClick={onClose} className="absolute top-4 right-4">
          <IoMdClose className="fill-red-500 hover:scale-110 transition-all duration-500 ease-in-out transform w-6 h-6"/>
        </button>
      </div>
    </div>
  );
};

export default Modal;
