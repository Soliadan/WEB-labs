import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/actions";
import FormErrors from "../components/FormErrors/FormErrors";
import "./Auth.css";

const registerSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Email is incorrect (example: name@gmail.com)")
    .max(60, "Email is too long (max 60 characters)")
    .required("Email is a required field"),
  gender: Yup.string()
    .oneOf(["male", "female", "other"], "Gender must be selected")
    .required("Gender is a required field"),
  phone: Yup.string()
    .matches(/^\d+$/, "Phone must contain only digits")
    .min(9, "Phone is too short (min 9 digits)")
    .max(15, "Phone is too long (max 15 digits)")
    .required("Phone is a required field"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(40, "Password is too long (max 40 characters)")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password is a required field"),
});

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((s) => s.auth.users || {});

  const [serverError, setServerError] = useState("");

  const authEmail = (localStorage.getItem("authEmail") || "").trim().toLowerCase();
  const isLoggedIn = !!authEmail && !!users[authEmail];

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Register</h1>
        <p className="auth-subtitle">Create your account to continue.</p>

        {serverError ? <div className="auth-server-error">{serverError}</div> : null}

        <Formik
          initialValues={{ email: "", gender: "", phone: "", password: "" }}
          validationSchema={registerSchema}
          onSubmit={(values, { setSubmitting }) => {
            setServerError("");
            const safeEmail = values.email.trim().toLowerCase();

            if (users[safeEmail]) {
              setServerError("This email is already registered. Please login.");
              setSubmitting(false);
              return;
            }

            dispatch(registerUser({
              email: safeEmail,
              password: values.password,
              profile: {
                email: safeEmail,
                gender: values.gender,
                phone: values.phone,
              },
            }));
            localStorage.setItem("authEmail", safeEmail);
            navigate("/");
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="auth-form">
              <label className="field">
                <span>Email</span>
                <Field name="email" type="email" placeholder="name@gmail.com" />
              </label>

              <label className="field">
                <span>Gender</span>
                <Field as="select" name="gender">
                  <option value="">Select...</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </Field>
              </label>

              <label className="field">
                <span>Phone number (digits only)</span>
                <Field name="phone" type="text" inputMode="numeric" placeholder="380XXXXXXXXX" />
              </label>

              <label className="field">
                <span>Password</span>
                <Field name="password" type="password" placeholder="Min 8 chars, A-Z, 0-9" />
              </label>

              <FormErrors errors={errors} touched={touched} />

              <button className="btn-dark" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Registering..." : "Register"}
              </button>

              <p className="auth-footer">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

