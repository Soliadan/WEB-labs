import React from "react";
import Hero from "../components/Hero/Hero";
import ProductFormView from "../components/ProductFormView/ProductFormView";

const EditProduct = () => (
  <>
    <Hero />
    <main>
      <ProductFormView mode="edit" />
    </main>
  </>
);

export default EditProduct;
