import React from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Style/Register.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function Register() {
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post("http://localhost:4000/register", {
        email: values.email,
        password: values.password,
      });

      if (response.data && response.data.message === "User already exists") {
        toast.info("User already exists.");
      } else if (
        response.data &&
        response.data.message === "User created successfully"
      ) {
        toast.success("User registered successfully.");
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
    <>
      <h2 className="title">
        Happy to Register ...<i className="fa-regular fa-face-grin"></i>
      </h2>
      <div className="container">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Email is Required !"),
            password: Yup.string()
              .min(6, "Password must be at least 6 characters")
              .required("Password is Required !"),
          })}
          onSubmit={handleSubmit}
        >
          <Form className="register-form">
            <label>
              <Field
                type="text"
                className="input"
                placeholder="enter your email-id"
                name="email"
              />
              <ErrorMessage name="email" component="div" className="error" />
            </label>
            <label>
              <Field
                type="password"
                className="input"
                placeholder="enter your password"
                name="password"
              />
              <ErrorMessage name="password" component="div" className="error" />
            </label>
            <br />
            <button type="submit" className="submit">
              Register
            </button>
            <Link to="/forgotpassword">
              <button className="submit" type="button">
                Forgot Password
              </button>
            </Link>
          </Form>
        </Formik>
        {/* Toast container to display the toast messages */}
        <ToastContainer position="top-right" />
      </div>
    </>
  );
}

export default Register;
