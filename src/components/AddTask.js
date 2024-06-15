import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const AddTask = ({ addTask }) => {
  // Formun başlangıç değerleri
  const initialValues = {
    title: "",
    description: "",
  };

  // Formik'in doğrulama şeması
  const validationSchema = Yup.object({
    title: Yup.string().required("Task title is required"),
  });

  // Form gönderildiğinde çağrılan fonksiyon
  const handleSubmit = (values, { resetForm }) => {
    const { title, description } = values;
    addTask(title, description); // task ekleme işlemi
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

          {/* Ekleme butonu */}
          <button type="submit">Add Task</button>
        </Form>
      )}
    </Formik>
  );
};

export default AddTask;
