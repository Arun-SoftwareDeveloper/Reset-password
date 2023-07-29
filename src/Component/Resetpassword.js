import React from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../Style/Resetpassword.css";

function Resetpassword() {
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/reset-password",
        {
          token: values.resetToken,
          password: values.password,
        }
      );
      if (response.data && response.data.message) {
        toast.success(response.data.message);
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error ||
          "An error occurred. Please try again later."
      );
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-form">
        <h2 className="header">Reset Password</h2>
        <Formik
          initialValues={{ password: "", resetToken: "" }}
          validationSchema={Yup.object({
            password: Yup.string()
              .min(6, "Password must be at least 6 characters")
              .required("Required"),
            resetToken: Yup.string().required(" Token is Required !"),
          })}
          onSubmit={handleSubmit}
        >
          <Form>
            <Field
              type="password"
              name="password"
              placeholder="New Password"
              required
              className="password-input"
            />
            <ErrorMessage name="password" component="div" className="error" />
            <Field
              type="text"
              name="resetToken"
              placeholder="Reset Token"
              required
              className="token-input"
            />
            <ErrorMessage name="resetToken" component="div" className="error" />
            <button type="submit" className="submit-button">
              Submit
            </button>
          </Form>
        </Formik>
      </div>

      {/* Toast container to display the toast messages */}
      <ToastContainer position="top-right" />
    </div>
  );
}

export default Resetpassword;
