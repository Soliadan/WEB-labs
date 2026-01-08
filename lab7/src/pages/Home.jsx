import styles from "./Home.module.css";

import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import TileSection from "../components/TileSection";
import Footer from "../components/Footer";

const Home = () => (
  <>
    <Header />
    <Hero />
    <main className={`${styles["page-inner"]}`}>
      <TileSection />
    </main>
    <Footer />
  </>
);

export default Home;
