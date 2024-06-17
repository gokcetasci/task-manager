import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";

function EditCategory({ category, editCategory, closeModal }) {
  const [newCategory, setNewCategory] = useState(category);

  // Kategori güncellemek için fonksiyon
  const handleSave = () => {
    editCategory(category, newCategory);
    closeModal();
  };

  return (
    <div className="px-5">
    {/* Modal başlığı ve ikon */}
    <div className="flex flex-row items-center gap-2 mb-6 border-b border-slate-100">
      <span>
        <AiFillEdit className="w-6 h-6 fill-cyan-600" />
      </span>
      <h1 className="text-[22px] font-bold text-cyan-500">Edit Category</h1>
    </div>

    {/* Kategori adı düzenleme formu */}
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <p className="text-[16px] text-gray-600 font-semibold">
          Category Name:
        </p>
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="rounded-lg px-4 border border-2 border-cyan-400 text-gray-700 outline-none hover:border-blue-400 p-1 relative transition-all ease-in-out duration-500 transform w-64"
        />
      </div>

      {/* Kaydet butonu */}
      <div className="flex justify-end mt-4">
        <button
          onClick={handleSave}
          className="py-2 px-6 bg-cyan-700 rounded-full text-white font-bold text-[18px] hover:bg-blue-400 hover:scale-105 transition-all duration-500 ease-in-out transform"
          >
          Save
        </button>
      </div>
    </div>
  </div>
);
}

export default EditCategory;