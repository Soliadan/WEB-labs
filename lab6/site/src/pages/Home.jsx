
import React from "react";
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import TileSection from "../components/TileSection/TileSection";
import Footer from "../components/Footer/Footer";

const Home = () => (
  <>
    <Header />
    <Hero />
    <main className="page-inner">
      <TileSection />
    </main>
    <Footer />
  </>
);

export default Home;
