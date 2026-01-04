import React from "react";
import "./FormErrors.css";

export default function FormErrors({ errors, touched }) {
  const entries = Object.entries(errors || {});
  const visible = touched ? entries.filter(([key]) => touched[key]) : entries;

  if (!visible.length) return null;

  return (
    <div className="form-errors" role="alert">
      <div className="form-errors-title">Please fix the following:</div>
      <ul>
        {visible.map(([field, message]) => (
          <li key={field}>
            <b>{field}</b>: {message}
          </li>
        ))}
      </ul>
    </div>
  );
}
