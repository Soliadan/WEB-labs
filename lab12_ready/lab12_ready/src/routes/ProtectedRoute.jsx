// Новий файл

import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../redux/actions";

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const dispatch = useDispatch();

  const authEmail = (localStorage.getItem("authEmail") || "").trim().toLowerCase();
  const users = useSelector((s) => s.auth.users || {});

  const isValid = !!authEmail && !!users[authEmail];

  useEffect(() => {
    if (isValid) {
      dispatch(setCurrentUser(authEmail));
    }
  }, [isValid, authEmail, dispatch]);

  if (!isValid) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
