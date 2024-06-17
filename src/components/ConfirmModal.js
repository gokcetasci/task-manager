import React from "react";
import { GiCancel } from "react-icons/gi";

function ConfirmModal({ onConfirm, onCancel }) {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center z-[1000]`}
    >
      <div className="absolute w-full h-full bg-gray-900 opacity-50"></div>
      <div className="bg-white p-8 rounded-lg shadow-lg z-20 mx-5 sm:mx-0 flex flex-col items-center justify-center gap-3">
        <span>
          <GiCancel className="fill-red-500 w-12 h-12" />
        </span>
        <p className="text-lg font-semibold my-4 text-center text-CustomGray">
        Are you sure you want to delete this task?
        </p>
        <div className="flex justify-center items-center gap-12">
          <button
            className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-500 ease-in-out transform hover:scale-105"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="px-6 py-3 mr-2 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 transition duration-500 ease-in-out transform hover:scale-105"
            onClick={onCancel}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
