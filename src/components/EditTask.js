import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const EditTask = ({ task, editTask, categories, closeModal }) => {
  // Formun başlangıç değerleri
  const initialValues = {
    title: task.title,
    description: task.description,
    category: task.category,
  };

  // Formik'in doğrulama şeması
  const validationSchema = Yup.object({
    title: Yup.string().required("Task title is required"),
    category: Yup.string().nullable(),
  });

  // Form gönderildiğinde çağrılan fonksiyon
  const handleSubmit = (values) => {
    editTask(task.id, values.title, values.description, values.category); // Task düzenleme işlemi
    closeModal(); // Modalı kapatma
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

          {/* Düzenleme butonu */}
          <button type="submit">Edit Task</button>
        </Form>
      )}
    </Formik>
  );
};

export default EditTask;
