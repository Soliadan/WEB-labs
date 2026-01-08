import React, { useState } from "react";
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import TileSection from "../components/TileSection/TileSection";
import Footer from "../components/Footer/Footer";

const Home = () => {
  const [visibleTiles, setVisibleTiles] = useState(3);

  const handleViewMore = () => {
    setVisibleTiles((prev) => (prev === 3 ? 6 : 3));
  };

  return (
    <>
      <Header />
      <Hero />
      <main className="page-inner">
        <TileSection visibleCount={visibleTiles} />
        <div className="view-more-wrapper">
          <button type="button" className="btn-dark" onClick={handleViewMore}>
            {visibleTiles === 3 ? "View more" : "Show less"}
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
