// Новий файл

import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/actions";
import FormErrors from "../components/FormErrors/FormErrors";
import "./Auth.css";

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
    </div>
  );
}
