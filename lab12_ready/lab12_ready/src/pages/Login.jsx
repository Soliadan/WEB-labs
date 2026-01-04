// Новий файл

import React, { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/actions";
import FormErrors from "../components/FormErrors/FormErrors";
import "./Auth.css";

const loginSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Email is incorrect")
    .max(60, "Email is too long (max 60 characters)")
    .required("Email is a required field"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(40, "Password is too long (max 40 characters)")
    .required("Password is a required field"),
});

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const users = useSelector((s) => s.auth.users || {});

  const [serverError, setServerError] = useState("");

  const authEmail = (localStorage.getItem("authEmail") || "").trim().toLowerCase();
  const isLoggedIn = !!authEmail && !!users[authEmail];

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  const from = location.state?.from?.pathname || "/";

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Login</h1>
        <p className="auth-subtitle">Use your email and password to continue.</p>

        {serverError ? <div className="auth-server-error">{serverError}</div> : null}

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={(values, { setSubmitting, setTouched }) => {
            setServerError("");
            setTouched({ email: true, password: true }, true);

            const safeEmail = values.email.trim().toLowerCase();
            const user = users[safeEmail];

            setTimeout(() => {
              if (!user || (user.password || "") !== values.password) {
                setServerError("Invalid email or password.");
                setSubmitting(false);
                return;
              }

              dispatch(loginUser({ email: safeEmail, password: values.password }));
              localStorage.setItem("authEmail", safeEmail);
              navigate(from, { replace: true });
            }, 350);
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="auth-form">
              <label className="field">
                <span>Email</span>
                <Field name="email" type="email" placeholder="name@gmail.com" />
              </label>

              <label className="field">
                <span>Password</span>
                <Field name="password" type="password" placeholder="********" />
              </label>

              <FormErrors errors={errors} touched={touched} />

              <button className="btn-dark" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Signing in..." : "Login"}
              </button>

              <p className="auth-footer">
                Don’t have an account? <Link to="/register">Register</Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
