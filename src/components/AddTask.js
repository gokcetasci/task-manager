import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

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

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          {/* Başlık alanı */}
          <div>
            <Field type="text" name="title" placeholder="Task Title" />
            <ErrorMessage name="title" component="div" />
          </div>

          {/* Açıklama alanı */}
          <div>
            <Field
              as="textarea"
              name="description"
              placeholder="Task Description"
            />
          </div>

          {/* Kategori seçme alanı */}
          <div>
            <Field as="select" name="category">
              <option value="" disabled>
                Select Category (Optional)
              </option>
              {categories && categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </Field>
          </div>

          {/* Ekleme butonu */}
          <button type="submit">Add Task</button>
        </Form>
      )}
    </Formik>
  );
};

export default AddTask;
