import React from "react";
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import Footer from "../components/Footer/Footer";
import ProductFormView from "../components/ProductFormView/ProductFormView";

const CreateProduct = () => (
  <>
    <Header />
    <Hero />
    <main className="page-inner">
      <ProductFormView mode="create" />
    </main>
    <Footer />
  </>
);

export default CreateProduct;
