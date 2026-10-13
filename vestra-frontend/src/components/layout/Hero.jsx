import "./Hero.css";
import heroImage from "../../assets/images/hero-image.jpg"; // put hero-image.jpg in src/assets/

export default function Hero() {
  return (
    <section className="vh-hero" id="home">
      <div className="container-xl">
        <div className="row align-items-center g-5 vh-row">
          {/* Text */}
          <div className="col-lg-6 order-2 order-lg-1 vh-copy">
            <h1 className="vh-title">Vestra</h1>
            <p className="vh-subtitle">Fashion House</p>

            <p className="vh-text">
              Explore our latest collections and timeless designs, crafted with
              precision and artistry.
            </p>

            <a href="#collections" className="vh-btn">
              <span>Explore More</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>

          {/* Image */}
          <div className="col-lg-6 order-1 order-lg-2">
            <div className="vh-media">
              <img
                src={heroImage}
                alt="Line-art silhouette of a gown beside spools of gold thread and a hanger"
                className="vh-img"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}