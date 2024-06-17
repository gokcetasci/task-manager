import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import Modal from "./Modal";
import ConfirmModal from "./ConfirmModal";
import EditCategory from "./EditCategory";
import { BiSolidCategory } from "react-icons/bi";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { BsDot } from "react-icons/bs";

function Header({
  setIsCategoryModalOpen,
  categories,
  deleteCategory,
  editCategory,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(null); // Dropdown menünün açık/kapalı durumu
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // Kategori silme onay modalının açık/kapalı durumu
  const [categoryToDelete, setCategoryToDelete] = useState(null); // Silinecek kategori
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false); // Kategori düzenleme modalının açık/kapalı durumu
  const [categoryToEdit, setCategoryToEdit] = useState(null); // Düzenlenecek kategori

  // Kategori silme işlemi başlatma
  const handleDeleteCategory = (category) => {
    setCategoryToDelete(category); // Silinecek kategoriyi state'e ata
    setIsConfirmModalOpen(true); // Onay modalını aç
  };

  // Kategori silme işlemi onaylama
  const confirmDeleteCategory = () => {
    if (categoryToDelete) {
      deleteCategory(categoryToDelete); // Kategori silme fonksiyonunu çağır
      setCategoryToDelete(null); // Silinecek kategoriyi state'ten temizle
    }
    setIsConfirmModalOpen(false); // Onay modalını kapat
  };

  // Kategori düzenleme işlemi başlatma
  const handleEditCategory = (category) => {
    setCategoryToEdit(category); // Düzenlenecek kategoriyi state'e ata
    setIsEditCategoryModalOpen(true); // Düzenleme modalını aç
  };

  return (
    <div id="header" className="w-64 h-screen bg-blue-50  flex flex-col ">
      <div className="flex flex-row items-center gap-2 my-3 border-b border-slate-300 pt-3 pb-5 px-5">
        <span className="bg-blue-300 px-3 py-1.5 rounded-full text-gray-800 font-bold">
          G
        </span>
        <p className="text-gray-600 font-bold ">Gokce's Workspace</p>
      </div>

      {/* Kategori ekleme butonu */}
      <div>
        <div id="addcategoriesbutton" className="mt-5 flex items-center px-5 ">
          <button
            onClick={() => setIsCategoryModalOpen(true)}
            className=" flex flex-row text-gray-600 items-center gap-2 font-semibold hover:text-blue-400 hover:scale-105 transition-all duration-700 ease-out transform"
          >
            <FaPlus />

            <span className="mr-9">Add Category</span>
          </button>
        </div>

        {/* Kategori Listesi */}
        <div id="categories" className="mt-5">
          <p className="text-blue-400 font-bold mb-2 text-[18px] border-b border-slate-300 py-3 px-5 flex flex-row items-center gap-2">
            <BiSolidCategory className="fill-blue-500 " />
            Categories
          </p>
          <ul className="ml-3 px-5">
            {categories.map((category, index) => (
              <li
                key={index}
                className="text-gray-600 text-md py-1 pl-4 border-l-4 border-transparent hover:bg-blue-400 hover:border-blue-300 hover:text-white transition-all duration-500 ease-in-out cursor-pointer flex justify-between items-center relative"
              >
                {/* Kategori adı */}
                <p className="flex flex-row items-center gap-1">
                  <BsDot className="fill-blue-400" />
                  {category}
                </p>
                {/* Kategoriye ait silme ve editleme işlemleri */}
                <HiDotsVertical
                  className="ml-2 cursor-pointer "
                  onClick={() =>
                    setDropdownOpen(dropdownOpen === index ? null : index)
                  }
                />
                {dropdownOpen === index && (
                  <div className="absolute top-0 -right-16 bg-slate-50 border border-slate-200 shadow-md rounded-md p-2 z-50">
                    <button
                      onClick={() => handleEditCategory(category)}
                      className="text-gray-600 hover:text-blue-700"
                    >
                      <MdEdit className="fill-blue-500 w-5 h-5 hover:scale-110 transition-all duration-500 ease-in-out transform" />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category)}
                      className="text-gray-600 hover:text-red-700 ml-2"
                    >
                      <MdDeleteForever className="fill-red-500 w-5 h-5 hover:scale-110 transition-all duration-500 ease-in-out transform" />
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Confirm Modal */}
      {isConfirmModalOpen && (
        <ConfirmModal
          onConfirm={confirmDeleteCategory}
          onCancel={() => setIsConfirmModalOpen(false)}
        />
      )}

      {/* Edit Modal */}
      {isEditCategoryModalOpen && (
        <Modal onClose={() => setIsEditCategoryModalOpen(false)}>
          <EditCategory
            category={categoryToEdit}
            editCategory={editCategory}
            closeModal={() => setIsEditCategoryModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}

export default Header;
