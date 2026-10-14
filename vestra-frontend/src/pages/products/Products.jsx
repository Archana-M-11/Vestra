import {
  useDeferredValue,
  useMemo,
  useOptimistic,
  useState,
  useTransition,
} from "react";
import ProductCard from "../../components/products/ProductCard";
import "./products.css";

/* ---------- Sample data: replace image / hoverImage with your own files ---------- */
const PRODUCTS = [
  { id: 1,  brand: "Aurelle",      name: "Silk slip dress",          category: "Dresses",     price: 12900, tone: "#d8bfae", isNew: true },
  { id: 2,  brand: "Maison Noor",  name: "Pleated midi dress",       category: "Dresses",     price: 15800, salePrice: 11900, tone: "#c9b79c" },
  { id: 3,  brand: "Ivory & Oak",  name: "Linen wrap top",           category: "Tops",        price: 4200,  tone: "#e4d9c3", isNew: true },
  { id: 4,  brand: "Sable",        name: "Ribbed knit cardigan",     category: "Knitwear",    price: 7600,  tone: "#b9a58b" },
  { id: 5,  brand: "Celeste",      name: "Tailored wool coat",       category: "Outerwear",   price: 24900, tone: "#8f7a63", isNew: true },
  { id: 6,  brand: "Aurelle",      name: "Satin block-heel pumps",   category: "Shoes",       price: 9800,  salePrice: 7400, tone: "#d6c2a4" },
  { id: 7,  brand: "Maison Noor",  name: "Leather structured tote",  category: "Accessories", price: 18500, tone: "#a8825f" },
  { id: 8,  brand: "Sable",        name: "Merino turtleneck",        category: "Knitwear",    price: 6400,  tone: "#cdbba0" },
  { id: 9,  brand: "Celeste",      name: "Ruffled cocktail dress",   category: "Dresses",     price: 21500, tone: "#b86f5c", isNew: true },
  { id: 10, brand: "Ivory & Oak",  name: "Cropped denim jacket",     category: "Outerwear",   price: 8900,  tone: "#b5b9b6" },
  { id: 11, brand: "Aurelle",      name: "Gold hoop earrings",       category: "Accessories", price: 3200,  tone: "#e0cd9d" },
  { id: 12, brand: "Sable",        name: "Suede ankle boots",        category: "Shoes",       price: 13400, salePrice: 9900, tone: "#8a6b52" },
];

const CATEGORIES = ["Dresses", "Tops", "Knitwear", "Outerwear", "Shoes", "Accessories"];

const PRICE_RANGES = [
  { key: "all", label: "Any price", test: () => true },
  { key: "u5", label: "Under ₹5,000", test: (p) => p < 5000 },
  { key: "5-10", label: "₹5,000 – ₹10,000", test: (p) => p >= 5000 && p < 10000 },
  { key: "10-20", label: "₹10,000 – ₹20,000", test: (p) => p >= 10000 && p < 20000 },
  { key: "20+", label: "₹20,000 & above", test: (p) => p >= 20000 },
];

const SORTS = {
  featured: { label: "Featured", fn: () => 0 },
  newest: { label: "Newest", fn: (a, b) => Number(!!b.isNew) - Number(!!a.isNew) },
  low: { label: "Price: low to high", fn: (a, b) => eff(a) - eff(b) },
  high: { label: "Price: high to low", fn: (a, b) => eff(b) - eff(a) },
};

const eff = (p) => p.salePrice ?? p.price;

/* Pretend server call so the heart feels instant (replace with your API) */
const saveWishlist = () => new Promise((r) => setTimeout(r, 500));

export default function Products() {
  const [category, setCategory] = useState("All");
  const [priceKey, setPriceKey] = useState("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  /* React 19: keep the typing responsive while the grid re-filters */
  const deferredQuery = useDeferredValue(query);

  /* React 19: optimistic wishlist hearts */
  const [wishlist, setWishlist] = useState([]);
  const [optimisticWishlist, flipOptimistic] = useOptimistic(wishlist, (state, id) =>
    state.includes(id) ? state.filter((x) => x !== id) : [...state, id]
  );
  const [, startTransition] = useTransition();

  const toggleWishlist = (id) => {
    startTransition(async () => {
      flipOptimistic(id);
      await saveWishlist(id);
      setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));
    });
  };

  const counts = useMemo(() => {
    const c = { All: PRODUCTS.length };
    CATEGORIES.forEach((cat) => (c[cat] = PRODUCTS.filter((p) => p.category === cat).length));
    return c;
  }, []);

  const visible = useMemo(() => {
    const range = PRICE_RANGES.find((r) => r.key === priceKey);
    const q = deferredQuery.trim().toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        range.test(eff(p)) &&
        (!q || p.brand.toLowerCase().includes(q))
    ).sort(SORTS[sort].fn);
  }, [category, priceKey, deferredQuery, sort]);

  const filtersActive = category !== "All" || priceKey !== "all" || query !== "";
  const clearAll = () => {
    setCategory("All");
    setPriceKey("all");
    setQuery("");
  };

  return (
    <main className="vpg">
      <div className="vpg-wrap">
        {/* Page header */}
        <header className="vpg-head">
          <h1 className="vpg-title">
            Women's <br />
            Clothing
          </h1>
          <nav className="vpg-crumbs" aria-label="Breadcrumb">
            <a href="/">Home</a> / <a href="/shop">Shop</a> /{" "}
            <span>{category === "All" ? "All" : category}</span>
          </nav>
        </header>

        <div className="vpg-layout">
          {/* Sidebar / mobile sheet */}
          <div className={`vpg-backdrop ${filtersOpen ? "show" : ""}`} onClick={() => setFiltersOpen(false)} />
          <aside className={`vpg-side ${filtersOpen ? "show" : ""}`} aria-label="Filters">
            <div className="vpg-side-head">
              <span>Filters</span>
              <button className="vpg-close" onClick={() => setFiltersOpen(false)} aria-label="Close filters">×</button>
            </div>

            <section className="vpg-block">
              <h2>Category</h2>
              <ul className="list-unstyled mb-0">
                {["All", ...CATEGORIES].map((c) => (
                  <li key={c}>
                    <button
                      className={`vpg-cat ${category === c ? "is-active" : ""}`}
                      onClick={() => setCategory(c)}
                    >
                      <i aria-hidden="true" />
                      <span>{c}</span>
                      <small>{counts[c]}</small>
                    </button>
                  </li>
                ))}
              </ul>
            </section>

            <section className="vpg-block">
              <h2>Price</h2>
              {PRICE_RANGES.map((r) => (
                <label key={r.key} className="vpg-radio">
                  <input
                    type="radio"
                    name="price"
                    checked={priceKey === r.key}
                    onChange={() => setPriceKey(r.key)}
                  />
                  <span>{r.label}</span>
                </label>
              ))}
            </section>

            <section className="vpg-block">
              <h2>Filter by designer</h2>
              <div className="vpg-search">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. Aurelle"
                  aria-label="Search designers"
                />
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-3.500-3.500" />
                </svg>
              </div>
            </section>

            <div className="vpg-side-foot">
              <button className="vpg-clear" onClick={clearAll} disabled={!filtersActive}>
                Clear all
              </button>
              <button className="vpg-apply" onClick={() => setFiltersOpen(false)}>
                Show {visible.length} items
              </button>
            </div>
          </aside>

          {/* Results */}
          <section className="vpg-results">
            <div className="vpg-toolbar">
              <button className="vpg-filter-btn" onClick={() => setFiltersOpen(true)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                  <path d="M4 7h16M7 12h10M10 17h4" />
                </svg>
                Filters
              </button>

              <label className="vpg-sort">
                <span>Sort by</span>
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                  {Object.entries(SORTS).map(([k, s]) => (
                    <option key={k} value={k}>{s.label}</option>
                  ))}
                </select>
              </label>

              <p className="vpg-count" aria-live="polite">{visible.length} items</p>
            </div>

            {visible.length ? (
              <div className="vpg-grid">
                {visible.map((p, i) => (
                  <ProductCard
                    key={p.id}
                    index={i}
                    product={p}
                    wished={optimisticWishlist.includes(p.id)}
                    onToggleWishlist={toggleWishlist}
                  />
                ))}
              </div>
            ) : (
              <div className="vpg-empty">
                <h2>Nothing matches yet</h2>
                <p>Try a different category, price range or designer.</p>
                <button className="vpg-apply" onClick={clearAll}>Clear filters</button>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}