import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./Home.css";
import { FaShoppingCart } from "react-icons/fa";
import { useCurrency } from "./CurrencyContext";
import { formatPrice } from "./utils/formatPrice";
import { useCart } from "../pages/CartContext";
import women1 from "../assets/women/image1.png";
import women2 from "../assets/women/image2.png";
import women3 from "../assets/women/image3.png";
import women4 from "../assets/women/image4.png";
import men1 from "../assets/men/image5.png";
import men2 from "../assets/men/image6.png";
import men3 from "../assets/men/image7.png";
import men4 from "../assets/men/image8.png";
import kids1 from "../assets/kids/image9.png";
import kids2 from "../assets/kids/image10.png";
import kids3 from "../assets/kids/image11.png";
import kids4 from "../assets/kids/image12.png";

const productsByCategory = {
  WOMEN: [
    { id: 1, name: "Women Product 1", price: 50.0, image: women1, inStock: true, sizes: ["XS", "S", "M", "L"], description: "Description for Women Product 1" },
    { id: 2, name: "Women Product 2", price: 60.0, image: women2, inStock: true, sizes: ["XS", "S", "M", "L"], description: "Description for Women Product 2" },
    { id: 3, name: "Women Product 3", price: 70.0, image: women4, inStock: false, sizes: ["XS", "S", "M", "L"], description: "Description for Women Product 3" },
    { id: 4, name: "Women Product 4", price: 80.0, image: women3, inStock: true, sizes: ["XS", "S", "M", "L"], description: "Description for Women Product 4" },
    { id: 5, name: "Women Product 5", price: 80.0, image: women1, inStock: true, sizes: ["XS", "S", "M", "L"], description: "Description for Women Product 5" },
    { id: 6, name: "Women Product 6", price: 80.0, image: women4, inStock: true, sizes: ["XS", "S", "M", "L"], description: "Description for Women Product 6" },
  ],
  MEN: [
    { id: 1, name: "Men Product 1", price: 55.0, image: men1, inStock: true, sizes: ["XS", "S", "M", "L"], description: "Description for Men Product 1" },
    { id: 2, name: "Men Product 2", price: 65.0, image: men2, inStock: true, sizes: ["XS", "S", "M", "L"], description: "Description for Men Product 2" },
    { id: 3, name: "Men Product 3", price: 75.0, image: men3, inStock: false, sizes: ["XS", "S", "M", "L"], description: "Description for Men Product 3" },
    { id: 4, name: "Men Product 4", price: 85.0, image: men1, inStock: true, sizes: ["XS", "S", "M", "L"], description: "Description for Men Product 4" },
    { id: 5, name: "Men Product 5", price: 85.0, image: men4, inStock: true, sizes: ["XS", "S", "M", "L"], description: "Description for Men Product 5" },
    { id: 6, name: "Men Product 6", price: 85.0, image: men3, inStock: true, sizes: ["XS", "S", "M", "L"], description: "Description for Men Product 6" },
  ],
  KIDS: [
    { id: 1, name: "Kids Product 1", price: 40.0, image: kids1, inStock: true, sizes: ["XS", "S", "M", "L"], description: "Description for Kids Product 1" },
    { id: 2, name: "Kids Product 2", price: 45.0, image: kids2, inStock: true, sizes: ["XS", "S", "M", "L"], description: "Description for Kids Product 2" },
    { id: 3, name: "Kids Product 3", price: 50.0, image: kids3, inStock: false, sizes: ["XS", "S", "M", "L"], description: "Description for Kids Product 3" },
    { id: 4, name: "Kids Product 4", price: 55.0, image: kids1, inStock: true, sizes: ["XS", "S", "M", "L"], description: "Description for Kids Product 4" },
    { id: 5, name: "Kids Product 5", price: 50.0, image: kids4, inStock: true, sizes: ["XS", "S", "M", "L"], description: "Description for Kids Product 5" },
    { id: 6, name: "Kids Product 6", price: 55.0, image: kids3, inStock: true, sizes: ["XS", "S", "M", "L"], description: "Description for Kids Product 6" },
  ],
};

function getCategoryFromPath(pathname) {
  if (pathname === "/men") return "MEN";
  if (pathname === "/kids") return "KIDS";
  return "WOMEN";
}

function Home() {
  const { addToCart } = useCart();
  const location = useLocation();
  const activeCategory = getCategoryFromPath(location.pathname);
  const products = productsByCategory[activeCategory];
  const { currency } = useCurrency();

  return (
    <div className="home-container">
      <h1 className="category-title">{activeCategory}</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div className={`product-card${!product.inStock ? " out-of-stock" : ""}`} key={product.id} style={{ position: "relative" }}>
            {product.inStock ? (
              <Link to={`/product/${activeCategory.toLowerCase()}/${product.id}`} className="product-link">
                <img src={product.image} alt={product.name} />
                <div className="product-info">
                  <div className="product-name">{product.name}</div>
                  <div className="product-price">{formatPrice(product.price, currency)}</div>
                </div>
              </Link>
            ) : (
              <>
                <img src={product.image} alt={product.name} />
                <div className="out-of-stock-label">OUT OF STOCK</div>
                <div className="product-info">
                  <div className="product-name">{product.name}</div>
                  <div className="product-price">{formatPrice(product.price, currency)}</div>
                </div>
              </>
            )}
            {product.inStock && (
              <button
                className="add-to-cart-btn"
                onClick={() =>
                  addToCart(
                    {
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      sizes: product.sizes,
                      category: activeCategory,
                      description: product.description || "",
                    },
                    product.sizes[0]
                  )
                }
              >
                <FaShoppingCart color="#fff" size={24} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;