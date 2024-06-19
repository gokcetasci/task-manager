import React, { useState, useEffect, useRef } from "react";
import { FaPlus } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import Modal from "./Modal";
import ConfirmModal from "./ConfirmModal";
import EditCategory from "./EditCategory";
import { BiSolidCategory } from "react-icons/bi";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { BsChevronUp, BsDot } from "react-icons/bs";

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Mobil dropdown menüsünün açık/kapalı durumu
  const dropdownRef = useRef(null); // Dropdown menüsü için referans

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

  // Ekran boyutu etkisi
  useEffect(() => {
    // Ekran boyutu değiştiğinde çalışacak fonksiyon
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsDropdownOpen(false); // Orta ve daha büyük ekranlarda dropdown'ı kapat
      }
    };

    window.addEventListener("resize", handleResize); // Ekran boyutu değişikliklerini dinle ve fonksiyonu çağır

    // İlk yüklemede ekran boyutunu kontrol et
    handleResize();

    return () => window.removeEventListener("resize", handleResize); // Bileşen temizlendiğinde event listener'ı kaldır
  }, []);

  // Dropdown menüsünü dışarı tıklayınca kapatma
  useEffect(() => {
    // Dropdown dışında tıklama olduğunda çalışacak fonksiyon
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(null); // Dropdown'ı kapat
      }
    };

    document.addEventListener("mousedown", handleClickOutside); // Tıklama olayını dinle ve fonksiyonu çağır

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Bileşen temizlendiğinde event listener'ı kaldır
    };
  }, []);

  return (
    <div
      id="header"
      className="w-screen md:w-64 h-[64px] md:h-full bg-blue-50 flex flex-row md:flex-col px-5 md:px-0 "
    >
      <div className="flex flex-row items-center gap-2 md:my-3 md:border-b border-slate-300 md:pt-3 md:pb-5 md:px-5 text-[12px] lg:text-[16px]">
        <span className="bg-blue-300 px-3 py-1.5 rounded-full text-gray-800 font-bold">
          G
        </span>
        <p className="text-gray-600 font-bold hidden sm:flex">
          Gokce's Workspace
        </p>
      </div>

      {/* Kategori ekleme butonu */}
      <div
        className="flex flex-row md:flex-col ml-auto pr-8 md:pr-0"
        ref={dropdownRef}
      >
        <div
          id="addcategoriesbutton"
          className="md:mt-5 flex items-center md:px-5 text-[12px] lg:text-[18px]"
        >
          <button
            onClick={() => setIsCategoryModalOpen(true)}
            className=" flex flex-row text-gray-600 items-center gap-2 font-semibold hover:text-blue-400 hover:scale-105 transition-all duration-700 ease-out transform"
          >
            <FaPlus />
            <span className="mr-2 sm:mr-9">Add Category</span>
          </button>
        </div>

        {/* Kategori Listesi */}
        <div id="categories" className="mt-5" ref={dropdownRef}>
          <div className="flex flex-row items-center">
            <p className="text-blue-400 font-bold md:mb-2 md:text-[18px] md:border-b border-slate-300 md:py-3 md:px-5 flex flex-row items-center gap-2 ">
              <BiSolidCategory className="fill-blue-500 " />
              Categories
            </p>
            <button
              className="ml-2 text-gray-600 md:hidden"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {isDropdownOpen ? (
                <BsChevronUp className="text-blue-400 hover:scale-110 transition-all duration-500 ease-in-out " />
              ) : (
                <BsChevronUp className="text-blue-400 hover:scale-110 transition-all duration-500 ease-in-out " />
              )}
            </button>
          </div>

          <ul
            className={`ml-3 px-5 ${
              isDropdownOpen
                ? "absolute bg-white top-16 z-[1000] rounded-lg py-3 shadow-2xl block max-w-[200px] right-12"
                : "hidden"
            } md:block`}
          >
            {categories.map((category, index) => (
              <li
                key={index}
                className="text-gray-600 text-md py-1 md:pl-4 border-l-4 border-transparent hover:bg-blue-400 hover:border-blue-300 hover:text-white transition-all duration-500 ease-in-out cursor-pointer flex justify-between items-center relative text-[12px] lg:text-[18px]"
              >
                {/* Kategori adı */}
                <p className="flex flex-row items-center gap-1 max-w-[150px] text-ellipsis overflow-hidden">
                  <span>
                    <BsDot className="fill-blue-400" />
                  </span>
                  {category}
                </p>
                {/* Kategoriye ait silme ve editleme işlemleri */}
                <HiDotsVertical
                  className="ml-2 cursor-pointer"
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
                      <MdEdit className="fill-blue-500 md:w-5 md:h-5 hover:scale-110 transition-all duration-500 ease-in-out transform" />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category)}
                      className="text-gray-600 hover:text-red-700 ml-2"
                    >
                      <MdDeleteForever className="fill-red-500 md:w-5 md:h-5 hover:scale-110 transition-all duration-500 ease-in-out transform" />
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
