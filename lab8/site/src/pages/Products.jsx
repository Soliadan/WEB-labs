import React, { useMemo, useState } from "react";
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import SortBar from "../components/SortBar/SortBar";
import ProductGrid from "../components/ProductGrid/ProductGrid";
import Footer from "../components/Footer/Footer";
import { perfumes as initialPerfumes } from "../data/perfumes";

const Products = () => {
  // items in state
  const [items] = useState(initialPerfumes);
  const [search, setSearch] = useState("");
  const [brandFilter, setBrandFilter] = useState("all");
  const [sizeFilter, setSizeFilter] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [visibleCount, setVisibleCount] = useState(4);

  const brands = useMemo(
    () => Array.from(new Set(items.map((p) => p.brand))),
    [items]
  );

  const sizes = useMemo(
    () =>
      Array.from(
        new Set(
          items.reduce(
            (acc, p) => acc.concat(p.sizeOptions || []),
            []
          )
        )
      ),
    [items]
  );

  const filteredItems = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return items.filter((p) => {
      if (searchValue) {
        const searchable = [
          p.name,
          p.brand,
          p.description,
          String(p.price),
          ...(p.sizeOptions || []),
        ]
          .join(" ")
          .toLowerCase();

        if (!searchable.includes(searchValue)) {
          return false;
        }
      }

      if (brandFilter !== "all" && p.brand !== brandFilter) {
        return false;
      }

      if (sizeFilter !== "all" && !(p.sizeOptions || []).includes(sizeFilter)) {
        return false;
      }

      if (minPrice !== "" && p.price < Number(minPrice)) {
        return false;
      }

      if (maxPrice !== "" && p.price > Number(maxPrice)) {
        return false;
      }

      return true;
    });
  }, [items, search, brandFilter, sizeFilter, minPrice, maxPrice]);

  const visibleItems = filteredItems.slice(0, visibleCount);

  const handleViewMore = () => {
    setVisibleCount(filteredItems.length);
  };

  const handleResetFilters = () => {
    setBrandFilter("all");
    setSizeFilter("all");
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <>
      <Header searchValue={search} onSearchChange={setSearch} />
      <Hero />
      <main className="page-inner">
        <SortBar />
        <div className="products-layout">
          <aside className="filters-box">
            <h3 className="filters-title">Filters</h3>

            <div className="filter-group">
              <label className="filter-label">Brand</label>
              <select
                value={brandFilter}
                onChange={(e) => setBrandFilter(e.target.value)}
              >
                <option value="all">All</option>
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Volume</label>
              <select
                value={sizeFilter}
                onChange={(e) => setSizeFilter(e.target.value)}
              >
                <option value="all">All</option>
                {sizes.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Price from</label>
              <input
                type="number"
                min="0"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">Price to</label>
              <input
                type="number"
                min="0"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>

            <button
              type="button"
              className="btn-outline filters-reset"
              onClick={handleResetFilters}
            >
              Reset filters
            </button>
          </aside>

          <section className="products-content">
            <ProductGrid items={visibleItems} />
            {visibleItems.length < filteredItems.length && (
              <div className="view-more-wrapper">
                <button
                  type="button"
                  className="btn-dark"
                  onClick={handleViewMore}
                >
                  View more
                </button>
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Products;
