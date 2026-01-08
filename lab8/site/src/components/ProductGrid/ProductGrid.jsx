import "./ProductGrid.css";
import React from "react";
import { Link } from "react-router-dom";
import cardphoto from "../../img/cardphoto.png";

const ProductGrid = ({ items }) => (
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
          <button className="small-btn">Edit</button>
          <button className="small-btn delete">Delete</button>
        </div>
      </li>
    ))}
  </ul>
);

export default ProductGrid;
