import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaExclamation } from "react-icons/fa";
import { BiTask } from "react-icons/bi";
const AddTask = ({ addTask, categories }) => {
  // Formun başlangıç değerleri
  const initialValues = {
    title: "",
    description: "",
    category: "", 
  };

  // Formik'in doğrulama şeması
  const validationSchema = Yup.object({
    title: Yup.string().required("Task title is required"),
    category: Yup.string().nullable(),
  });

  // Form gönderildiğinde çağrılan fonksiyon
  const handleSubmit = (values, { resetForm }) => {
    const { title, description, category } = values;
    addTask(title, description, category); // Task ekleme işlemi
    resetForm(); // Formu sıfırlama
  };

  // İlk harfi büyük yapacak yardımcı fonksiyon
  const capitalizeFirstLetter = (string) => {
    if (typeof string !== "string") return "";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <div className="mx-10 flex flex-col gap-6">
      <div className="flex flex-row items-center gap-2">
        <span>
          <BiTask className="w-6 h-6 fill-cyan-600"/>
        </span>
        <h1 className="text-[22px] font-bold text-cyan-500">Add New Task</h1>
      </div>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form className="flex flex-col gap-4">
              {/* Başlık alanı */}
              <div className="flex flex-col gap-2">
                <span className="text-[18px] text-gray-600 font-semibold  ">
                  Title:
                </span>
                 <Field
                  type="text"
                  name="title"
                  placeholder="Task Title"
                  className="rounded-lg px-4 border border-2 border-cyan-400 text-gray-700 outline-none hover:border-blue-400 p-1 relative transition-all ease-in-out duration-500 transform"
                  value={values.title}
                  onChange={(e) => {
                    const formattedValue = capitalizeFirstLetter(e.target.value);
                    setFieldValue("title", formattedValue);
                  }}
                />
                <ErrorMessage
                  name="title"
                  component={({ children }) => (
                    <div className="z-10 text-red-500 flex flex-row items-center justify-center absolute right-16 ">
                      {children} <FaExclamation />
                    </div>
                  )}
                />
              </div>

              {/* Açıklama alanı */}
              <div className="flex flex-col gap-2">
                <span className="text-[18px] text-gray-600 font-semibold  ">
                  Description:
                </span>
                <Field
                  as="textarea"
                  name="description"
                  placeholder="Task Description"
                  className="w-96 resize-none min-h-24 max-h-24 rounded-md px-4 border border-2 border-cyan-400 text-gray-700 outline-none hover:border-blue-400 p-1 transition-all ease-in-out duration-500 transform"
                  value={values.description}
                  onChange={(e) => {
                    const formattedValue = capitalizeFirstLetter(e.target.value);
                    setFieldValue("description", formattedValue);
                  }}
                />
              </div>

              {/* Kategori seçme alanı */}
              <div className="flex flex-col gap-2">
                <span className="text-[18px] text-gray-600 font-semibold  ">
                  Category:
                </span>
                <Field
                  as="select"
                  name="category"
                  className="w-64 rounded-md px-4 border border-2 border-cyan-400 text-gray-700 outline-none hover:border-blue-600 p-1 transition-all ease-in-out duration-500 transform"
                >
                  <option value="" disabled>
                    Select Category (Optional)
                  </option>
                  {categories &&
                    categories.map((cat, index) => (
                      <option key={index} value={cat}>
                        {cat}
                      </option>
                    ))}
                </Field>
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
    </div>
  );
};

export default AddTask;
