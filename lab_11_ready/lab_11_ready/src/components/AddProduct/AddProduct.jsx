import React, { useState, useEffect } from "react";
import { addPerfume, updatePerfume } from "../../api/products";

const AddProduct = ({ initialData, onSaved, onCancel }) => {
  const isEdit = !!initialData;

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setBrand(initialData.brand || "");
      setPrice(initialData.price != null ? String(initialData.price) : "");
      setSizes(
        Array.isArray(initialData.sizeOptions)
          ? initialData.sizeOptions.join(", ")
          : ""
      );
      setDescription(initialData.description || "");
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

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
      if (isEdit && initialData?.id != null) {
        await updatePerfume(initialData.id, payload);
        setStatus("Perfume updated!");
      } else {
        await addPerfume(payload);
        setStatus("Perfume added!");
        setName("");
        setBrand("");
        setPrice("");
        setSizes("");
        setDescription("");
      }

      if (onSaved) {
        onSaved();
      }
    } catch (err) {
      console.error(err);
      setStatus("Error while saving perfume");
    }
  };

  return (
    <div className="add-product-box">
      <h3>{isEdit ? "Edit perfume" : "Create new perfume"}</h3>
      <form className="add-product-form" onSubmit={handleSubmit}>
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

        <div className="form-actions">
          <button type="submit" className="btn-dark">
            {isEdit ? "Save changes" : "Add perfume"}
          </button>
          {onCancel && (
            <button
              type="button"
              className="btn-outline"
              onClick={onCancel}
              style={{ marginLeft: "8px" }}
            >
              Cancel
            </button>
          )}
        </div>

        {status && <div className="form-status">{status}</div>}
      </form>
    </div>
  );
};

export default AddProduct;
