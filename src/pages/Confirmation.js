import React from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { useCart } from "./CartContext";
import { useCurrency } from "./CurrencyContext";
import { formatPrice } from "./utils/formatPrice";

const SHIPPING_METHODS = [
  { label: "Standard Shipping", value: "standard", price: 0, display: "Free" },
  { label: "Express Shipping", value: "express", price: 4.99, display: "4.99$" },
];

function Confirmation() {
  const history = useHistory();
  const { orderId } = useParams();
  const location = useLocation();
  const { cartItems } = useCart();
  const { currency } = useCurrency();

  // For order summary
  const shippingMethod = location.state?.shippingMethod || "standard";
  const shippingObj = SHIPPING_METHODS.find(m => m.value === shippingMethod) || SHIPPING_METHODS[0];
  const shippingCost = shippingObj.price;

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
        {/* Left: Confirmation */}
        <div style={{
          flex: 2,
          minWidth: 320,
          maxWidth: 600,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 40
        }}>
          <div style={{ color: "#5ECE7B", marginBottom: 24, width: "100%", textAlign: "left" }}>
            Cart &nbsp; &gt; Details &nbsp; &gt; Shipping &nbsp; <b>&gt; Payment</b>
          </div>
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 24,
            marginBottom: 24
          }}>
            <div style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              border: "6px solid #a5d6b5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 24
            }}>
              <svg width="80" height="80" viewBox="0 0 60 60">
                <circle cx="30" cy="30" r="28" fill="none" stroke="#a5d6b5" strokeWidth="3" />
                <polyline points="18,32 28,42 44,22" fill="none" stroke="#8bc79a" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div style={{ fontSize: 28, fontWeight: 600, marginBottom: 8, textAlign: "center" }}>
              Payment Confirmed
            </div>
            <div style={{ color: "#5ECE7B", fontSize: 15, marginBottom: 32 }}>
              ORDER #{orderId || "2039"}
            </div>
            <button
              style={{
                background: "#7ac18b",
                color: "#fff",
                border: "none",
                borderRadius: 5,
                padding: "12px 48px",
                fontWeight: 600,
                fontSize: 18,
                cursor: "pointer"
              }}
              onClick={() => history.push("/women")}
            >
              Back to shopping
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
            <span style={{ color: "#5ECE7B" }}>{shippingObj.display}</span>
          </div>
          <hr style={{ margin: "24px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ color: "#5ECE7B" }}>Paid</span>
            <span style={{ color: "#5ECE7B", fontWeight: 600, fontSize: 22 }}>
              {formatPrice(subtotal + shippingCost, currency)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;