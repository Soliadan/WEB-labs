import React from "react";
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import Footer from "../components/Footer/Footer";
import ProductFormView from "../components/ProductFormView/ProductFormView";

const EditProduct = () => (
  <>
    <Header />
    <Hero />
    <main className="page-inner">
      <ProductFormView mode="edit" />
    </main>
    <Footer />
  </>
);

export default EditProduct;
