import "./productcard.css";

const money = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

function Placeholder({ tone }) {
  return (
    <div className="vp-placeholder" style={{ "--tone": tone }} aria-hidden="true">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 6a2 2 0 10-2-2" />
        <path d="M12 6v2M3 17l9-9 9 9a1 1 0 01-.7 1.700H3.700A1 1 0 013 17z" />
      </svg>
    </div>
  );
}

export default function ProductCard({ product, wished = false, onToggleWishlist, index = 0 }) {
  const { id, brand, name, price, salePrice, image, hoverImage, tone, isNew } = product;
  const href = `/product/${id}`; // swap for <Link to=...> if you use react-router
  const onSale = salePrice != null && salePrice < price;

  return (
    <article className="vp-card" style={{ "--i": Math.min(index, 12) }}>
      <div className="vp-media">
        <a href={href} className="vp-media-link" aria-label={`${brand} ${name}`}>
          {image ? (
            <>
              <img src={image} alt={`${brand} ${name}`} className="vp-img vp-img--main" loading="lazy" />
              {hoverImage && (
                <img src={hoverImage} alt="" className="vp-img vp-img--hover" loading="lazy" />
              )}
            </>
          ) : (
            <Placeholder tone={tone} />
          )}
          <span className="vp-view">View item</span>
        </a>

        {(isNew || onSale) && (
          <span className={`vp-badge ${onSale ? "is-sale" : ""}`}>{onSale ? "Sale" : "New"}</span>
        )}

        <button
          type="button"
          className={`vp-heart ${wished ? "is-on" : ""}`}
          onClick={() => onToggleWishlist?.(id)}
          aria-pressed={wished}
          aria-label={wished ? `Remove ${name} from wishlist` : `Add ${name} to wishlist`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={wished ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 20s-7-4.4-7-10a4 4 0 017-2.600A4 4 0 0119 10c0 5.600-7 10-7 10z" />
          </svg>
        </button>
      </div>

      <a href={href} className="vp-info">
        <div className="vp-text">
          <span className="vp-brand">{brand}</span>
          <span className="vp-name">{name}</span>
        </div>
        <div className="vp-price">
          {onSale && <s>{money.format(price)}</s>}
          <strong>{money.format(onSale ? salePrice : price)}</strong>
        </div>
      </a>
    </article>
  );
}