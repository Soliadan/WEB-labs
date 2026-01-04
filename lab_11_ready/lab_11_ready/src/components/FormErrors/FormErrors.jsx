// Новий файл

import React from "react";
import "./FormErrors.css";

// Separate component for showing ALL form errors with reasons
export default function FormErrors({ errors, touched }) {
  const entries = Object.entries(errors || {});
  const visible = entries.filter(([key]) => !touched || touched[key]);

  if (!visible.length) return null;

  return (
    <div className="form-errors" role="alert">
      <div className="form-errors-title">Please fix these errors:</div>
      <ul>
        {visible.map(([field, message]) => (
          <li key={field}>
            <b>{field}:</b> {message}
          </li>
        ))}
      </ul>
    </div>
  );
}
