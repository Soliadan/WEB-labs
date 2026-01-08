
import React from "react";
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import ProductDetailsView from "../components/ProductDetailsView/ProductDetailsView";
import Footer from "../components/Footer/Footer";

const ProductDetails = () => (
  <>
    <Header />
    <Hero />
    <main className="page-inner">
      <ProductDetailsView />
    </main>
    <Footer />
  </>
);

export default ProductDetails;
