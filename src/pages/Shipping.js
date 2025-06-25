import React, { useState } from "react";
import { useHistory, Link, useLocation } from "react-router-dom";
import { useCart } from "./CartContext";
import { useCurrency } from "./CurrencyContext";
import { formatPrice } from "./utils/formatPrice";

const SHIPPING_METHODS = [
  { label: "Standard Shipping", value: "standard", price: 0, display: "Free" },
  { label: "Express Shipping", value: "express", price: 4.99, display: "4.99$" },
];

function Shipping() {
  const { cartItems } = useCart();
  const { currency } = useCurrency();
  const history = useHistory();
  const location = useLocation();

  // Get contact/address from location.state (sent from checkout form)
  const form = location.state?.form || {};
  const contact = form.contact || "";
  const address = form.address
    ? `${form.address}${form.city ? `, ${form.city}` : ""}${form.postal ? `, ${form.postal}` : ""}${form.province && form.province !== "Province" ? `, ${form.province}` : ""}${form.country ? `, ${form.country}` : ""}`
    : "";

  const [shipping, setShipping] = useState("standard");

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = SHIPPING_METHODS.find(m => m.value === shipping)?.price || 0;

  return (
    <div style={{
      background: "#222",
      minHeight: "100vh",
      width: "100vw",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 0,
    }}>
      <div style={{
        background: "#fff",
        maxWidth: 1100,
        width: "100%",
        borderRadius: 4,
        display: "flex",
        flexWrap: "wrap",
        padding: 40,
        gap: 40,
        alignItems: "flex-start",
        justifyContent: "center",
      }}>
        {/* Left */}
        <div style={{ flex: 2, minWidth: 320, maxWidth: 600 }}>
          <div style={{ color: "#888", marginBottom: 24 }}>
            Cart &nbsp; &gt; Details &nbsp; <b>&gt; Shipping</b> &nbsp; &gt; Payment
          </div>
          <div style={{
            border: "1px solid #e5e5e5",
            borderRadius: 8,
            marginBottom: 48, // increased gap here
            padding: "18px 24px",
            background: "#fafafa",
            fontSize: 16,
          }}>
            <div style={{ marginBottom: 8 }}>
              <span style={{ color: "#888" }}>Contact</span>
              <span style={{ marginLeft: 16 }}>{contact}</span>
            </div>
            <div>
              <span style={{ color: "#888" }}>Ship to</span>
              <span style={{ marginLeft: 16 }}>{address}</span>
            </div>
          </div>
          <div style={{ fontWeight: 600, fontSize: 20, marginBottom: 24 }}>Shipping method</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18, marginBottom: 40 }}>
            {SHIPPING_METHODS.map(method => (
              <label
                key={method.value}
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #e5e5e5",
                  borderRadius: 8,
                  padding: "16px 24px",
                  background: "#fff",
                  cursor: "pointer",
                  fontWeight: 500,
                  fontSize: 16,
                  justifyContent: "space-between",
                }}
              >
                <span>
                  <input
                    type="radio"
                    name="shipping"
                    value={method.value}
                    checked={shipping === method.value}
                    onChange={() => setShipping(method.value)}
                    style={{ marginRight: 16 }}
                  />
                  {method.label}
                </span>
                <span style={{ color: method.price === 0 ? "#5ECE7B" : "#222", fontWeight: 600 }}>
                  {method.display}
                </span>
              </label>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <Link to="/checkout" style={{ color: "#5ECE7B", fontSize: 16 }}>Back to details</Link>
            <button
              type="button"
              style={{
                background: "#5ECE7B",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                padding: "12px 48px",
                fontWeight: 600,
                fontSize: 18,
                cursor: "pointer"
              }}
              onClick={() => history.push("/payment", { form, shippingMethod: shipping })}
            >
              Go to payment
            </button>
          </div>
        </div>
        {/* Right: Order summary */}
        <div style={{
          flex: 1,
          background: "#fafafa",
          borderRadius: 4,
          minWidth: 260,
          width: "100%",
          maxWidth: 350,
          padding: "24px 24px 0 24px"
        }}>
          {cartItems.map((item, idx) => (
            <div key={item.id + item.size} style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
              <div style={{ position: "relative" }}>
                <img src={item.image} alt={item.name} style={{ width: 90, height: 90, borderRadius: 4, objectFit: "cover" }} />
                <span style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  background: "#5ECE7B",
                  color: "#fff",
                  borderRadius: "50%",
                  width: 22,
                  height: 22,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 600,
                  fontSize: 15,
                  border: "2px solid #fff"
                }}>{item.quantity}</span>
              </div>
              <div style={{ marginLeft: 18 }}>
                <div style={{ fontSize: 24, fontWeight: 400 }}>{item.name}</div>
                <div style={{ color: "#5ECE7B", fontWeight: 600, fontSize: 20, margin: "8px 0" }}>
                  {formatPrice(item.price, currency)}
                </div>
              </div>
            </div>
          ))}
          <hr style={{ margin: "24px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span>Subtotal</span>
            <span>{formatPrice(subtotal, currency)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span>Shipping</span>
            <span style={{ color: "#5ECE7B" }}>
              {shipping === "standard" ? "Free Shipping" : "Express Shipping"}
            </span>
          </div>
          <hr style={{ margin: "24px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 22 }}>
            <span>Total</span>
            <span>{formatPrice(subtotal + shippingCost, currency)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shipping;