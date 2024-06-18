import React from 'react';
import { IoMdClose } from 'react-icons/io';

const DetailTask = ({ task, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-md shadow-md max-w-lg w-full relative">
        
        <h2 className="text-[20px] text-blue-400 font-bold mb-4">{task.title}</h2>
        <p className="mb-2">
          <span className="font-semibold">Description:</span> {task.description}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Category:</span> {task.category ? task.category : "-"}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Status:</span> {task.status}
        </p>
        {task.status === 'Completed' && (
          <p className="mb-2">
            <span className="font-semibold">Completion Date:</span>{' '}
            {new Date(task.completionDate).toLocaleDateString()}
          </p>
        )}
         <button onClick={onClose} className="absolute top-4 right-4">
          <IoMdClose className="fill-red-500 hover:scale-110 transition-all duration-500 ease-in-out transform w-6 h-6"/>
        </button>
      </div>
    </div>
  );
};

export default DetailTask;
