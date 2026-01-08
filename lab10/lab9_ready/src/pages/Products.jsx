import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import SortBar from "../components/SortBar/SortBar";
import ProductGrid from "../components/ProductGrid/ProductGrid";
import Footer from "../components/Footer/Footer";
import { getPerfumes, deletePerfume } from "../api/products";
import Loader from "../components/Loader/Loader";

const Products = () => {
  // items from backend
  const [items, setItems] = useState([]);

  // search + filters
  const [search, setSearch] = useState("");
  const [brandFilter, setBrandFilter] = useState("all");
  const [sizeFilter, setSizeFilter] = useState("all"); // (поки тільки на фронті)
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [visibleCount, setVisibleCount] = useState(4);

  // loading + error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // бренди і розміри з поточних items
  const brands = useMemo(
    () => Array.from(new Set(items.map((p) => p.brand))),
    [items]
  );

  const sizes = useMemo(
    () =>
      Array.from(
        new Set(
          items.reduce((acc, p) => acc.concat(p.sizeOptions || []), [])
        )
      ),
    [items]
  );

  // завантаження з бекенду (з урахуванням пошуку + фільтрів)
  const fetchPerfumes = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getPerfumes({
        search,                        // 🔥 пошук тепер на бекенді (q=...)
        brand: brandFilter,
        minPrice,
        maxPrice,
      });
      setItems(data);
      setVisibleCount(4);
    } catch (err) {
      console.error(err);
      setError("Failed to load perfumes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // викликаємо бекенд при зміні фільтрів / пошуку
  useEffect(() => {
    fetchPerfumes();
  }, [search, brandFilter, minPrice, maxPrice]);

  // фільтр за розміром (size) — json-server не вміє по масиву,
  // тому фільтруємо тільки по цій умові на фронті
  const filteredItems = useMemo(() => {
    if (sizeFilter === "all") return items;
    return items.filter((p) =>
      (p.sizeOptions || []).includes(sizeFilter)
    );
  }, [items, sizeFilter]);

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

  const handleDeleteItem = async (item) => {
    try {
      await deletePerfume(item.id);
      fetchPerfumes();
    } catch (err) {
      console.error(err);
      setError("Failed to delete perfume. Please try again.");
    }
  };

  return (
    <>
      <Header
        searchValue={search}
        onSearchChange={setSearch}
      />
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
            {loading && <Loader />}

            {!loading && error && (
              <div className="error-message">{error}</div>
            )}

            {!loading && !error && (
              <>
                <ProductGrid
                  items={visibleItems}
                  onDelete={handleDeleteItem}
                  // onEdit у тебе вже веде на /products/:id/edit
                />
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
              </>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Products;
