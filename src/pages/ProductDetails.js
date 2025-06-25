import React, { useState } from "react";
import { useParams } from "react-router-dom";
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
import "./ProductDetails.css";
import { useCurrency } from "./CurrencyContext";
import { formatPrice } from "./utils/formatPrice";
import { useCart } from "./CartContext";

const productsByCategory = {
  WOMEN: [
    { id: 1, name: "Women Product 1", price: 50.00, image: women1, sizes: ["XS", "S", "M", "L"], description: "Description for Women Product 1" },
    { id: 2, name: "Women Product 2", price: 60.00, image: women2, sizes: ["XS", "S", "M", "L"], description: "Description for Women Product 2" },
    { id: 3, name: "Women Product 3", price: 70.00, image: women4, sizes: ["XS", "S", "M", "L"], description: "Description for Women Product 3" },
    { id: 4, name: "Women Product 4", price: 80.00, image: women3, sizes: ["XS", "S", "M", "L"], description: "Description for Women Product 4" },
    { id: 5, name: "Women Product 5", price: 80.00, image: women1, sizes: ["XS", "S", "M", "L"], description: "Description for Women Product 5" },
    { id: 6, name: "Women Product 6", price: 80.00, image: women4, sizes: ["XS", "S", "M", "L"], description: "Description for Women Product 6" },
  ],
  MEN: [
    { id: 1, name: "Men Product 1", price: 55.00, image: men1, sizes: ["XS", "S", "M", "L"], description: "Description for Men Product 1" },
    { id: 2, name: "Men Product 2", price: 65.00, image: men2, sizes: ["XS", "S", "M", "L"], description: "Description for Men Product 2" },
    { id: 3, name: "Men Product 3", price: 75.00, image: men3, sizes: ["XS", "S", "M", "L"], description: "Description for Men Product 3" },
    { id: 4, name: "Men Product 4", price: 85.00, image: men1, sizes: ["XS", "S", "M", "L"], description: "Description for Men Product 4" },
    { id: 5, name: "Men Product 5", price: 85.00, image: men4, sizes: ["XS", "S", "M", "L"], description: "Description for Men Product 5" },
    { id: 6, name: "Men Product 6", price: 85.00, image: men3, sizes: ["XS", "S", "M", "L"], description: "Description for Men Product 6" },
  ],
  KIDS: [
    { id: 1, name: "Kids Product 1", price: 40.00, image: kids1, sizes: ["XS", "S", "M", "L"], description: "Description for Kids Product 1" },
    { id: 2, name: "Kids Product 2", price: 45.00, image: kids2, sizes: ["XS", "S", "M", "L"], description: "Description for Kids Product 2" },
    { id: 3, name: "Kids Product 3", price: 50.00, image: kids3, sizes: ["XS", "S", "M", "L"], description: "Description for Kids Product 3" },
    { id: 4, name: "Kids Product 4", price: 55.00, image: kids1, sizes: ["XS", "S", "M", "L"], description: "Description for Kids Product 4" },
    { id: 5, name: "Kids Product 5", price: 50.00, image: kids4, sizes: ["XS", "S", "M", "L"], description: "Description for Kids Product 5" },
    { id: 6, name: "Kids Product 6", price: 55.00, image: kids3, sizes: ["XS", "S", "M", "L"], description: "Description for Kids Product 6" },
  ],
};

function ProductDetails() {
  const { category, id } = useParams();
  const productList = productsByCategory[category?.toUpperCase()];
  const product = productList?.find((p) => p.id === Number(id));
  const [selectedSize, setSelectedSize] = useState("S");
  const { currency } = useCurrency();
  const { addToCart } = useCart();

  if (!product) return <div>Product not found.</div>;

  return (
    <div className="pdp-container">
      <div className="pdp-gallery">
        <div className="pdp-thumbnails">
          <img src={product.image} alt={product.name} className="pdp-thumbnail selected" />
          <img src={product.image} alt={product.name} className="pdp-thumbnail selected" />
          <img src={product.image} alt={product.name} className="pdp-thumbnail selected" />
        </div>
        <div className="pdp-main-image">
          <img src={product.image} alt={product.name} />
        </div>
      </div>
      <div className="pdp-info">
        <h2 className="pdp-title">{product.name}</h2>
        <div className="pdp-label">SIZE:</div>
        <div className="pdp-sizes">
          {product.sizes.map((size) => (
            <button
              key={size}
              className={`pdp-size-btn${selectedSize === size ? " selected" : ""}`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
        <div className="pdp-label">PRICE:</div>
        <div className="pdp-price">
          {formatPrice(product.price, currency)}
        </div>
        <button
          className="pdp-add-to-cart"
          onClick={() =>
            addToCart(
              {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                sizes: product.sizes,
                category,
                description: product.description || "",
              },
              selectedSize
            )
          }
        >
          ADD TO CART
        </button>
        <div className="pdp-description">{product.description}</div>
      </div>
    </div>
  );
}

export default ProductDetails;