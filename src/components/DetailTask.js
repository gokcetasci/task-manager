import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { TbListDetails } from 'react-icons/tb';

const DetailTask = ({ task, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50 ">
      <div className="bg-white p-4 rounded-md shadow-md max-w-lg w-full relative">
        
      <div className="flex flex-row items-center gap-2 mb-4">
        <span>
          <TbListDetails className="w-6 h-6 text-cyan-600"/>
        </span>
        <h1 className="text-[16px] lg:text-[22px] font-bold text-cyan-500">Task Information</h1>
      </div>
        <p className="mb-2">
          <span className="font-semibold text-cyan-600">Title:</span> {task.title}
        </p>
        <p className="mb-2">
          <span className="font-semibold text-cyan-600">Description:</span> {task.description}
        </p>
        <p className="mb-2">
          <span className="font-semibold text-cyan-600">Category:</span> {task.category ? task.category : "-"}
        </p>
        <p className="mb-2">
          <span className="font-semibold text-cyan-600">Status:</span> {task.status}
        </p>
        {task.status === 'Completed' && (
          <p className="mb-2">
            <span className="font-semibold text-cyan-600">Completion Date:</span>{' '}
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
