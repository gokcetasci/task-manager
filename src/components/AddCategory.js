import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { BiSolidCategory } from "react-icons/bi";
import { FaExclamation } from "react-icons/fa6";

const AddCategory = ({ addCategory }) => {
  // Formun başlangıç değerleri
  const initialValues = {
    category: "",
  };

  // Formik'in doğrulama şeması
  const validationSchema = Yup.object({
    category: Yup.string().required("Category name is required"),
  });

  // Form gönderildiğinde çağrılan fonksiyon
  const handleSubmit = (values, { resetForm }) => {
    const { category } = values;
    addCategory(category); // Kategori ekleme işlemi
    resetForm(); // Formu sıfırlama
  };

  // İlk harfi büyük yapacak yardımcı fonksiyon
  const capitalizeFirstLetter = (string) => {
    if (typeof string !== "string") return "";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <div className="px-8">
      <div className="flex flex-row items-center gap-2 mb-5">
        <span>
          <BiSolidCategory className="fill-cyan-500 " />
        </span>
        <h1 className="text-[22px] font-bold text-cyan-500">Add Category</h1>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            {/* Kategori alanı */}
            <div className="flex flex-col gap-3">
              <div>
                <span className="text-[16px] text-gray-600 font-semibold  ">
                  Category Name:
                </span>
              </div>
              <Field
                type="text"
                name="category"
                placeholder="Category Name"
                className="rounded-lg px-4 border border-2 border-cyan-400 text-gray-700 outline-none hover:border-blue-400 p-1 relative transition-all ease-in-out duration-500 transform w-72"
                value={values.category}
                onChange={(e) => {
                  const formattedValue = capitalizeFirstLetter(e.target.value);
                  setFieldValue("category", formattedValue);
                }}
              />
              <ErrorMessage
                name="category"
                component={({ children }) => (
                  <div className=" text-red-500 flex flex-row items-center justify-center  ">
                    {children} <FaExclamation />
                  </div>
                )}
              />
            </div>
            {/* Ekleme butonu */}
            <div className="pt-6 text-end">
              <button
                type="submit"
                className="py-2 px-6 bg-cyan-700 rounded-full text-white font-bold text-[18px] hover:bg-blue-400 hover:scale-105 transition-all duration-500 ease-in-out transform"
                >
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddCategory;
