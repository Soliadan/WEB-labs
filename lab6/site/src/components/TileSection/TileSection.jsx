import "./TileSection.css";
import React from "react";
import cardphoto from "../../img/cardphoto.png";

const TileSection = () => (
  <section className="tile-grid">
    {[1, 2, 3].map((i) => (
      <article className="tile-card" key={i}>
        <img src={cardphoto} alt={`Tile ${i}`} />
        <h4>Tile {i} heading</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel nisl
          nunc.
        </p>
      </article>
    ))}
  </section>
);

export default TileSection;
