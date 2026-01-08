import "./SortBar.css";
import React from "react";

const SortBar = () => (
  <div className="sort-bar">
    <div className="sort-bar-title">Sort products</div>
    <label className="sort-toggle">
      <input type="checkbox" />
      <span className="sort-slider"></span>
    </label>
  </div>
);

export default SortBar;
