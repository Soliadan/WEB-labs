import "./AuthModal.css";
import React, { useMemo, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  loginUser,
  logoutUser,
  setCurrentUser,
} from "../../redux/actions";
import { GUEST_ID } from "../../redux/reducers";
import FormErrors from "../FormErrors/FormErrors";

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
  passportNumber: Yup.string()
    .trim()
    .matches(
      /^[A-Z]{2}\d{6}$|^\d{9}$/,
      "Passport number is incorrect (AA123456 or 123456789)"
    )
    .required("Passport number is a required field"),
});

const loginSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Email is incorrect")
    .required("Email is a required field"),
  password: Yup.string().required("Password is a required field"),
});

export default function AuthModal({ open, onClose }) {
  const dispatch = useDispatch();
  const currentUserId = useSelector((s) => s.auth.currentUserId);
  const users = useSelector((s) => s.auth.users || {});
  const isLoggedIn = currentUserId && currentUserId !== GUEST_ID;

  const [mode, setMode] = useState("login"); // 'login' | 'register'
  const [submitError, setSubmitError] = useState("");

  const existingUserEmails = useMemo(
    () => Object.keys(users).filter((id) => id !== GUEST_ID),
    [users]
  );

  if (!open) return null;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) onClose();
  };

  return (
    <div className="modal-overlay" onMouseDown={handleOverlayClick}>
      <div className="modal-card" role="dialog" aria-modal="true">
        <div className="modal-head">
          <h3>Account</h3>
          <button className="modal-close" type="button" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-tabs">
          <button
            type="button"
            className={mode === "login" ? "active" : ""}
            onClick={() => {
              setSubmitError("");
              setMode("login");
            }}
          >
            Login
          </button>
          <button
            type="button"
            className={mode === "register" ? "active" : ""}
            onClick={() => {
              setSubmitError("");
              setMode("register");
            }}
          >
            Register
          </button>
        </div>

        {isLoggedIn && (
          <div className="modal-info">
            <div>
              Logged in as: <b>{currentUserId}</b>
            </div>
            <div className="modal-info-actions">
              <button
                type="button"
                className="btn-light"
                onClick={() => dispatch(logoutUser())}
              >
                Logout
              </button>
            </div>
          </div>
        )}

        {existingUserEmails.length > 0 && (
          <div className="quick-switch">
            <div className="quick-title">Quick switch:</div>
            <div className="quick-list">
              {existingUserEmails.map((email) => (
                <button
                  key={email}
                  type="button"
                  className={
                    email === currentUserId ? "quick-btn active" : "quick-btn"
                  }
                  onClick={() => dispatch(setCurrentUser(email))}
                  title="Switch user"
                >
                  {email}
                </button>
              ))}
            </div>
          </div>
        )}

        {submitError ? <div className="submit-error">{submitError}</div> : null}

        {mode === "login" ? (
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={(values, helpers) => {
              setSubmitError("");
              const email = values.email.trim().toLowerCase();
              const user = users[email];
              const passOk = user && (user.password || "") === values.password;

              if (!user) {
                setSubmitError("User not found. Please register first.");
                helpers.setSubmitting(false);
                return;
              }

              if (!passOk) {
                setSubmitError("Password is incorrect.");
                helpers.setSubmitting(false);
                return;
              }

              dispatch(loginUser({ email, password: values.password }));
              helpers.setSubmitting(false);
              onClose();
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="auth-form">
                <FormErrors errors={errors} touched={touched} />

                <label>
                  Email
                  <Field name="email" type="email" placeholder="name@gmail.com" />
                </label>

                <label>
                  Password
                  <Field name="password" type="password" placeholder="********" />
                </label>

                <button className="btn-dark" type="submit" disabled={isSubmitting}>
                  Login
                </button>
              </Form>
            )}
          </Formik>
        ) : (
          <Formik
            initialValues={{
              email: "",
              gender: "",
              phone: "",
              password: "",
              passportNumber: "",
            }}
            validationSchema={registerSchema}
            onSubmit={(values, helpers) => {
              setSubmitError("");
              const email = values.email.trim().toLowerCase();
              if (users[email]) {
                setSubmitError("This email is already registered. Please login.");
                helpers.setSubmitting(false);
                return;
              }

              dispatch(
                registerUser({
                  email,
                  password: values.password,
                  profile: {
                    email,
                    gender: values.gender,
                    phone: values.phone,
                    passportNumber: values.passportNumber,
                  },
                })
              );

              helpers.setSubmitting(false);
              onClose();
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="auth-form">
                <FormErrors errors={errors} touched={touched} />

                <label>
                  Email
                  <Field name="email" type="email" placeholder="name@gmail.com" />
                </label>

                <label>
                  Gender
                  <Field as="select" name="gender">
                    <option value="">Select...</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                  </Field>
                </label>

                <label>
                  Phone (digits only)
                  <Field
                    name="phone"
                    type="text"
                    inputMode="numeric"
                    placeholder="380XXXXXXXXX"
                  />
                </label>

                <label>
                  Password
                  <Field
                    name="password"
                    type="password"
                    placeholder="Min 8 chars, A-Z, 0-9"
                  />
                </label>

                <label>
                  Passport number
                  <Field
                    name="passportNumber"
                    type="text"
                    placeholder="AA123456 or 123456789"
                  />
                </label>

                <button className="btn-dark" type="submit" disabled={isSubmitting}>
                  Register
                </button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
}
