import "./ProductDetailsView.css";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { perfumes } from "../../data/perfumes";
import cardphoto from "../../img/cardphoto.png";

const ProductDetailsView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const perfume = perfumes.find((p) => String(p.id) === String(id));

  if (!perfume) {
    return (
      <section className="details">
        <p>Product not found.</p>
        <button className="btn-outline" onClick={() => navigate("/products")}>
          Go back
        </button>
      </section>
    );
  }

  return (
    <section className="details">
      <div className="details-main">
        <div className="details-imgbox">
          <img src={cardphoto} alt={perfume.name} />
        </div>

        <div className="details-info">
          <h1>{perfume.name}</h1>

          <div className="details-text">{perfume.description}</div>

          <div className="details-form">
            <div className="details-form-group">
              <label>Count</label>
              <input type="number" min="1" defaultValue="1" />
            </div>

            <div className="details-form-group">
              <label>Size</label>
              <select defaultValue="">
                <option value="" disabled>
                  Select
                </option>
                {perfume.sizeOptions.map((size) => (
                  <option key={size}>{size}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="details-bottom">
            <div className="details-price">
              Price:{" "}
              <span className="details-price-value">
                ${perfume.price.toFixed(2)}
              </span>
            </div>

            <div className="details-action-row">
              <button
                className="btn-outline"
                onClick={() => navigate("/products")}
              >
                Go back
              </button>
              <button
                className="btn-dark"
                onClick={() => alert(`Added ${perfume.name} to cart`)}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsView;
