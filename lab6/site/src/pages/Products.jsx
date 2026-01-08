
import React from "react";
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import SortBar from "../components/SortBar/SortBar";
import ProductGrid from "../components/ProductGrid/ProductGrid";
import Footer from "../components/Footer/Footer";

const Products = () => (
  <>
    <Header />
    <Hero />
    <main className="page-inner">
      <SortBar />
      <ProductGrid />
    </main>
    <Footer />
  </>
);

export default Products;
