import "./SortBar.css";
import React from "react";

const SortBar = () => (
  <div className="sort-bar">
    <div className="sort-bar-title">Search products</div>
    <div className="sort-bar-right">
      <div className="sort-search-placeholder" />
      <label className="sort-toggle">
        <input type="checkbox" />
        <span className="sort-slider"></span>
      </label>
    </div>
  </div>
);

export default SortBar;
