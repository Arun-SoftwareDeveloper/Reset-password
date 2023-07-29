import React from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../Style/ForgotPassword.css";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/forgot-password",
        {
          email: values.email,
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
    <div className="container">
      <div id="forgot-password-form">
        <h2 className="heading">Forgot Password</h2>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Email is Required !"),
          })}
          onSubmit={handleSubmit}
        >
          <Form>
            <Field
              type="email"
              name="email"
              placeholder="enter your email-id"
              required
            />
            <ErrorMessage name="email" component="div" className="error" />
            <button type="submit" className="submit-btn">
              Submit
            </button>
            <Link to="/resetpassword">
              <button type="submit" className="reset-btn">
                Reset Passsword
              </button>
            </Link>
          </Form>
        </Formik>
      </div>
      {/* Toast container to display the toast messages */}
      <ToastContainer position="top-right" />
    </div>
  );
}

export default ForgotPassword;
