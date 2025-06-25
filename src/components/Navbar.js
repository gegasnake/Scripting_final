import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import logo from "../assets/logo.png";
import cartIcon from "../assets/cart.png";
import { useCurrency, currencyRates } from "../pages/CurrencyContext"; // path may vary
import { useCart } from "../pages/CartContext"; // adjust the path
const currencies = [
  { symbol: "$", label: "USD" },
  { symbol: "€", label: "EUR" },
  { symbol: "¥", label: "JPY" },
];

const categories = [
  { label: "WOMEN", path: "/women" },
  { label: "MEN", path: "/men" },
  { label: "KIDS", path: "/kids" },
];


function Navbar() {
  
  const location = useLocation();
  const history = useHistory();
  const [showCart, setShowCart] = useState(false);
  const [showCurrency, setShowCurrency] = useState(false);
  const { currency, setCurrency } = useCurrency();
  const cartRef = useRef();
  const currencyRef = useRef();
  // Example cart data (replace with your real cart state)
  const { cartItems, increment, decrement, updateSize } = useCart();

  const total = cartItems.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
);

  

  // Close overlays on outside click
  useEffect(() => {
    function handleClick(e) {
      if (cartRef.current && !cartRef.current.contains(e.target)) setShowCart(false);
      if (currencyRef.current && !currencyRef.current.contains(e.target)) setShowCurrency(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <nav className="navbar" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px", height: 80, background: "#fff" }}>
      {/* Categories */}
      <div className="navbar-categories" style={{ display: "flex", alignItems: "center", gap: 32 }}>
        {categories.map((cat) => (
          <button
            key={cat.label}
            className={location.pathname === cat.path ? "active" : ""}
            style={{
              background: "none",
              border: "none",
              color: location.pathname === cat.path ? "#5ECE7B" : "#1D1F22",
              fontWeight: location.pathname === cat.path ? 600 : 400,
              fontSize: 16,
              padding: "0 8px 16px 8px",
              margin: 0,
              cursor: "pointer",
              outline: "none",
              position: "relative",
              letterSpacing: 0.5,
              borderBottom: location.pathname === cat.path ? "2px solid #5ECE7B" : "2px solid transparent",
              transition: "color 0.2s, border-bottom 0.2s",
            }}
            onClick={() => history.push(cat.path)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Logo */}
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="logo" style={{ width: 41, height: 41, cursor: "pointer", marginRight: 150 }} />
        </Link>
      </div>

      {/* Actions: Currency and Cart */}
      <div className="navbar-actions" style={{ display: "flex", alignItems: "center" }}>
        {/* Currency Switcher */}
        <div ref={currencyRef} style={{ position: "relative" }}>
          <div
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={() => setShowCurrency((v) => !v)}
          >
            <span>
  {currencies.find(cur => cur.label === currency)?.symbol || "$"}
</span>
            <span style={{ marginLeft: 4 }}>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path
                  d={showCurrency ? "M1 5L5 1L9 5" : "M1 1L5 5L9 1"}
                  stroke="#1D1F22"
                  strokeWidth="1.5"
                />
              </svg>
            </span>
          </div>
          {showCurrency && (
            <div
              style={{
                position: "absolute",
                top: "120%",
                left: 0,
                background: "#fff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                borderRadius: 4,
                zIndex: 10,
                minWidth: 80,
              }}
            >
              {currencies.map((cur) => (
                <div
                  key={cur.label}
                  style={{
                    padding: "10px 16px",
                    cursor: "pointer",
                    background: currency.label === cur.label ? "#f5f5f5" : "#fff",
                  }}
                  onClick={() => {
                    setCurrency(cur.label);
                    setShowCurrency(false);
                  }}
                >
                  {cur.symbol} {cur.label}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Icon */}
        <div ref={cartRef} style={{ position: "relative", marginLeft: 20 }}>
          <img
            src={cartIcon}
            alt="cart"
            style={{ width: 24, height: 24, cursor: "pointer" }}
            onClick={() => setShowCart((v) => !v)}
          />
          {/* Cart badge */}
          {cartItems.length > 0 && (
            <span
              style={{
                position: "absolute",
                top: -8,
                right: -8,
                background: "#1D1F22",
                color: "#fff",
                borderRadius: "50%",
                fontSize: 12,
                width: 20,
                height: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
          {/* Cart Overlay */}
          {showCart && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "120%",
                width: 340,
                background: "#fff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                borderRadius: 8,
                zIndex: 20,
                padding: 24,
              }}
            >
              <div style={{ fontWeight: 600, marginBottom: 16 }}>
                My Bag, {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items
              </div>
              <div>
                {cartItems.map((item) => (
                  // Inside your cart overlay map
<div
  key={item.id}
  style={{
    display: "flex",
    alignItems: "center",
    marginBottom: 24,
    borderBottom: "1px solid #eee",
    paddingBottom: 16,
    gap: 16,
  }}
>
  {/* Product Info */}
  <div style={{ flex: 2 }}>
    <div style={{ fontWeight: 500 }}>{item.name}</div>
    <div style={{ margin: "8px 0" }}>
      {currencyRates[currency].symbol}
      {(item.price * currencyRates[currency].rate).toFixed(2)}
    </div>
    <div style={{ marginBottom: 8 }}>
  Size:
   {item.sizes.map((size) => (
    <span
      key={size}
      onClick={() => updateSize(item.id, item.size, size, item.category)}
      style={{
        display: "inline-block",
        margin: "0 4px",
        padding: "2px 8px",
        border: "1px solid #1D1F22",
        background: size === item.size ? "#1D1F22" : "#fff",
        color: size === item.size ? "#fff" : "#1D1F22",
        borderRadius: 2,
        fontSize: 12,
        cursor: "pointer",
        transition: "background 0.2s, color 0.2s",
      }}
    >
      {size}
    </span>
  ))}
</div>
  </div>
  {/* Quantity Controls */}
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
  <button onClick={() => increment(item.id, item.size, item.category)}>+</button>
  <span style={{ margin: "4px 0" }}>{item.quantity}</span>
  <button onClick={() => decrement(item.id, item.size, item.category)}>-</button>
</div>
  {/* Product Image */}
  <img
    src={item.image}
    alt={item.name}
    style={{ width: 120, height: 120, objectFit: "cover", borderRadius: 4, marginLeft: 8 }}
  />
</div>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", margin: "16px 0" }}>
                <span style={{ fontWeight: 600 }}>Total</span>
                <span style={{ fontWeight: 600 }}>
                  {currencyRates[currency]?.symbol}
                  {(total * currencyRates[currency]?.rate).toFixed(2)}

                </span>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <button style={{ flex: 1, border: "1px solid #1D1F22", background: "#fff", padding: 10 }}
                    onClick={() => history.push("/cart")}>
                     VIEW BAG
                </button>
                <button style={{ flex: 1, background: "#5ECE7B", color: "#fff", border: "none", padding: 10 }}>
                  CHECK OUT
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;