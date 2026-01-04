import "../ProductDetailsView/ProductDetailsView.css";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import cardphoto from "../../img/cardphoto.png";
import { addPerfume, updatePerfume } from "../../api/products";
import { apiClient } from "../../api/client";

const ProductFormView = ({ mode }) => {
  const isEdit = mode === "edit";
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // якщо edit — підтягуємо існуючий парфум
  useEffect(() => {
    if (!isEdit || !id) return;

    async function load() {
      try {
        setLoading(true);
        const res = await apiClient.get(`/perfumes/${id}`);
        const p = res.data;
        setName(p.name || "");
        setBrand(p.brand || "");
        setPrice(p.price != null ? String(p.price) : "");
        setSizes(
          Array.isArray(p.sizeOptions) ? p.sizeOptions.join(", ") : ""
        );
        setDescription(p.description || "");
      } catch (err) {
        console.error(err);
        setError("Failed to load product for editing");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [isEdit, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const sizeOptions = sizes
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      name,
      brand,
      price: Number(price),
      sizeOptions,
      description,
    };

    try {
      if (isEdit && id) {
        await updatePerfume(id, payload);
      } else {
        await addPerfume(payload);
      }
      navigate("/products");
    } catch (err) {
      console.error(err);
      setError("Failed to save perfume");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <section className="details">
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section className="details">
      <div className="details-main">
        <div className="details-imgbox">
          <img src={cardphoto} alt={name || "New perfume"} />
        </div>

        <div className="details-info">
          <h1>{isEdit ? "Edit perfume" : "Create new perfume"}</h1>

          {error && <div className="error-message">{error}</div>}

          <form className="details-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-row">
              <label>Brand</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
              />
            </div>

            <div className="form-row">
              <label>Price ($)</label>
              <input
                type="number"
                min="0"
                step="1"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div className="form-row">
              <label>Sizes (comma separated)</label>
              <input
                type="text"
                placeholder="30 ml, 50 ml, 100 ml"
                value={sizes}
                onChange={(e) => setSizes(e.target.value)}
                required
              />
            </div>

            <div className="form-row">
              <label>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="details-actions">
              <button
                type="button"
                className="btn-outline"
                onClick={() => navigate("/products")}
              >
                Cancel
              </button>
              <button type="submit" className="btn-dark" disabled={saving}>
                {saving
                  ? "Saving..."
                  : isEdit
                  ? "Save changes"
                  : "Create perfume"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProductFormView;
