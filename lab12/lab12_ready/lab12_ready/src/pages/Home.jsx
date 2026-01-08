import React, { useState } from "react";
import Hero from "../components/Hero/Hero";
import TileSection from "../components/TileSection/TileSection";

const Home = () => {
  const [visibleTiles, setVisibleTiles] = useState(3);

  const handleViewMore = () => {
    setVisibleTiles((prev) => (prev === 3 ? 6 : 3));
  };

  return (
    <>
      <Hero />
      <main>
        <TileSection visibleCount={visibleTiles} />
        <div className="view-more-wrapper">
          <button type="button" className="btn-dark" onClick={handleViewMore}>
            {visibleTiles === 3 ? "View more" : "Show less"}
          </button>
        </div>
      </main>
    </>
  );
};

export default Home;
