import React from "react";
import Hero from "../components/Hero/Hero";
import ProductFormView from "../components/ProductFormView/ProductFormView";

const CreateProduct = () => (
  <>
    <Hero />
    <main>
      <ProductFormView mode="create" />
    </main>
  </>
);

export default CreateProduct;
