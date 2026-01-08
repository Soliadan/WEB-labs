import "./ProductDetailsView.css";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions";
import { useParams, useNavigate } from "react-router-dom";
import cardphoto from "../../img/cardphoto.png";
import { apiClient } from "../../api/client";

const ProductDetailsView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [perfume, setPerfume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [addedMessage, setAddedMessage] = useState("");

  useEffect(() => {
    async function fetchPerfume() {
      try {
        const res = await apiClient.get(`/perfumes/${id}`);
        const product = res.data;
        setPerfume(product);
        if (product.sizeOptions && product.sizeOptions.length) {
          setSelectedSize(product.sizeOptions[0]);
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to load perfume");
        setLoading(false);
      }
    }

    fetchPerfume();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleAddToCart = () => {
    if (!perfume) return;
    const qty = Number(quantity) || 1;
    dispatch(addToCart(perfume, selectedSize, qty));
    setAddedMessage(`Added ${qty} item(s) to cart`);
    setTimeout(() => {
      setAddedMessage("");
    }, 2000);
  };

  const decreaseQty = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const increaseQty = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleQtyChange = (e) => {
    const value = Number(e.target.value);
    if (!value || value < 1) {
      setQuantity(1);
    } else {
      setQuantity(value);
    }
  };

  if (loading) {
    return (
      <section className="details">
        <p>Loading...</p>
      </section>
    );
  }

  if (error || !perfume) {
    return (
      <section className="details">
        <p>{error || "Product not found"}</p>
      </section>
    );
  }

  return (
    <section className="details">
      <button type="button" className="btn" onClick={handleBack}>
        ⬅ Back
      </button>
      <div className="details-main">
        <div className="details-imgbox">
          <img src={cardphoto} alt={perfume.name} />
        </div>

        <div className="details-info">
          {addedMessage && (
            <div className="add-to-cart-notification">
              {addedMessage}
            </div>
          )}

          <h1>{perfume.name}</h1>

          <div className="details-text">{perfume.description}</div>

          <div className="details-volume">
            <b>Available volume:</b>{" "}
            {perfume.sizeOptions && perfume.sizeOptions.length
              ? perfume.sizeOptions.join(", ")
              : "-"}
          </div>

          {perfume.sizeOptions && perfume.sizeOptions.length > 0 && (
            <div className="details-volume">
              <b>Choose volume:</b>{" "}
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                {perfume.sizeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* НОВЕ: вибір кількості */}
          <div className="details-quantity">
            <b>Quantity:</b>
            <div className="details-quantity-controls">
              <button
                type="button"
                className="btn-dark qty-btn"
                onClick={decreaseQty}
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQtyChange}
              />
              <button
                type="button"
                className="btn-dark qty-btn"
                onClick={increaseQty}
              >
                +
              </button>
            </div>
          </div>

          <div className="details-price">
            <span className="details-price-main">${perfume.price}</span>
          </div>

          <div className="details-actions">
            <button type="button" className="btn">
              Add to wishlist
            </button>
            <button
              className="btn-dark"
              type="button"
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsView;
