import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const AddCategory = ({ addCategory }) => {
  // Formun başlangıç değerleri
  const initialValues = {
    category: '',
  };

  // Formik'in doğrulama şeması
  const validationSchema = Yup.object({
    category: Yup.string().required('Category name is required'),
  });

  // Form gönderildiğinde çağrılan fonksiyon
  const handleSubmit = (values, { resetForm }) => {
    const { category } = values;
    addCategory(category); // Kategori ekleme işlemi
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
          {/* Kategori alanı */}
          <div>
            <Field
              type="text"
              name="category"
              placeholder="Category Name"
            />
            <ErrorMessage name="category" component="div" />
          </div>

          {/* Ekleme butonu */}
          <button type="submit">Add Category</button>
        </Form>
      )}
    </Formik>
  );
};

export default AddCategory;
