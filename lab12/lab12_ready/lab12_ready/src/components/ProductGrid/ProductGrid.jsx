import "./ProductGrid.css";
import React from "react";
import { Link } from "react-router-dom";
import cardphoto from "../../img/cardphoto.png";

const ProductGrid = ({ items, onEdit, onDelete }) => (
  <ul className="product-grid">
    {items.map((p) => (
      <li className="product-card" key={p.id}>
        <Link to={`/products/${p.id}`} className="product-card-link">
          <img src={cardphoto} alt={p.name} />
          <h4>{p.name}</h4>
          <div className="meta">
            <b>Brand:</b> {p.brand}
          </div>
          <div className="meta">
            <b>Volume:</b>{" "}
            {p.sizeOptions && p.sizeOptions.length
              ? p.sizeOptions.join(", ")
              : "-"}
          </div>
          <div className="price">
            <b>Price:</b> ${p.price}
          </div>
        </Link>

        <div className="row-btns">
          <Link className="small-btn" to={`/products/${p.id}/edit`}>
            Edit
          </Link>
          <button
            className="small-btn delete"
            onClick={() => onDelete && onDelete(p)}
          >
            Delete
          </button>
        </div>
      </li>
    ))}
  </ul>
);

export default ProductGrid;
