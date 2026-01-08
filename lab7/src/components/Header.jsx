import styles from "./Header.module.css";

import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <header className={`${styles["app-header"]}`}>
    <div className={`${styles["app-header-top"]}`}>
      <Link className={`${styles["brand-link"]}`} to="/">
        <span className={`${styles["brand-icon"]}`}>🧴</span>
        <span>Solomia’s</span>
        <span className={`${styles["brand-small"]}`}>Perfume</span>
      </Link>

      <nav className={`${styles["nav-links"]}`}>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <a href="#">Create</a>
      </nav>

      <div className={`${styles["header-icons"]}`}>
        <button>📍</button>
        <button>🤍</button>
        <button>👤</button>
        <button className={`${styles.cart}`}>$1,689.00</button>
      </div>
    </div>

    <div className={`${styles["search-bar-wrap"]}`}>
      <input placeholder="Search anything..." />
      <button className={`${styles.btn}`}>Search</button>
      <button className={`${styles.btn} ${styles["btn-cancel"]}`}>Cancel</button>
    </div>
  </header>
);

export default Header;
