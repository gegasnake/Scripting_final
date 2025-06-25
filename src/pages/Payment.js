import React, { useState } from "react";
import { useLocation, useHistory, Link, Redirect } from "react-router-dom";
import { useCart } from "./CartContext";
import { useCurrency } from "./CurrencyContext";
import { formatPrice } from "./utils/formatPrice";
import { FaCreditCard, FaLock, FaInfoCircle } from "react-icons/fa";

const SHIPPING_METHODS = [
  { label: "Standard Shipping", value: "standard", price: 0, display: "Free" },
  { label: "Express Shipping", value: "express", price: 4.99, display: "4.99$" },
];

function Payment() {
  const { cartItems } = useCart();
  const { currency } = useCurrency();
  const location = useLocation();
  const history = useHistory();

  const [card, setCard] = useState({
    number: "",
    name: "",
    exp: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Get info from previous step
  const form = location.state?.form;
  const shippingMethod = location.state?.shippingMethod || "standard";
  const shippingObj = SHIPPING_METHODS.find(m => m.value === shippingMethod) || SHIPPING_METHODS[0];
  const shippingLabel = `${shippingObj.label} - ${shippingObj.display}`;
  const shippingCost = shippingObj.price;

  if (!form) return <Redirect to="/checkout" />;

  const contact = form.contact || "";
  const address = form.address
    ? `${form.address}${form.city ? `, ${form.city}` : ""}${form.postal ? `, ${form.postal}` : ""}${form.province && form.province !== "Province" ? `, ${form.province}` : ""}${form.country ? `, ${form.country}` : ""}`
    : "";

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Validation logic
  function validate() {
    const errs = {};
    if (!/^\d{16}$/.test(card.number.replace(/\s/g, ""))) {
      errs.number = "Card number must be 16 digits";
    }
    if (!card.name.trim()) {
      errs.name = "Name is required";
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(card.exp)) {
      errs.exp = "Expiration must be MM/YY";
    }
    if (!/^\d{3}$/.test(card.cvv)) {
      errs.cvv = "CVV must be 3 digits";
    }
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitting(true);
      setTimeout(() => {
        // Simulate payment success and redirect
        history.push("/confirmation/2039", { form, shippingMethod });
      }, 1200);
    }
  }

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
            Cart &nbsp; &gt; Details &nbsp; &gt; Shipping &nbsp; <b>&gt; Payment</b>
          </div>
          {/* Info box */}
          <div style={{
            border: "1px solid #e5e5e5",
            borderRadius: 8,
            marginBottom: 48,
            padding: "18px 24px",
            background: "#fafafa",
            fontSize: 16,
          }}>
            <div style={{ marginBottom: 8 }}>
              <span style={{ color: "#888" }}>Contact</span>
              <span style={{ marginLeft: 16 }}>{contact}</span>
            </div>
            <div style={{ marginBottom: 8 }}>
              <span style={{ color: "#888" }}>Ship to</span>
              <span style={{ marginLeft: 16 }}>{address}</span>
            </div>
            <div>
              <span style={{ color: "#888" }}>Method</span>
              <span style={{ marginLeft: 16 }}>{shippingLabel}</span>
            </div>
          </div>
          {/* Payment method */}
          <div style={{ fontWeight: 600, fontSize: 20, marginBottom: 24 }}>Payment method</div>
          <div style={{
            border: "2px solid #e5733a",
            borderRadius: 8,
            background: "#c6e3d0",
            display: "flex",
            alignItems: "center",
            padding: "16px 24px",
            marginBottom: 16,
            gap: 16,
            fontWeight: 600,
            fontSize: 18,
          }}>
            <FaCreditCard size={28} color="#388e3c" />
            <span style={{ color: "#388e3c" }}>Credit Card</span>
          </div>
          <form
            onSubmit={handleSubmit}
            style={{
              border: "1px solid #e5e5e5",
              borderRadius: 8,
              background: "#fff",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
              marginBottom: 32,
            }}
            autoComplete="off"
          >
            <div style={{ position: "relative" }}>
              <input
                type="text"
                placeholder="Card Number"
                value={card.number}
                onChange={e => setCard(c => ({ ...c, number: e.target.value.replace(/\D/g, "") }))}
                maxLength={16}
                style={{
                  width: "100%",
                  padding: "12px 40px 12px 12px",
                  fontSize: 16,
                  border: errors.number ? "1.5px solid #e5733a" : "1px solid #ccc",
                  borderRadius: 4,
                  boxSizing: "border-box",
                }}
              />
              <FaLock style={{ position: "absolute", right: 12, top: 14, color: "#888" }} />
              {errors.number && <div style={{ color: "#e5733a", fontSize: 13, marginTop: 2 }}>{errors.number}</div>}
            </div>
            <div>
              <input
                type="text"
                placeholder="Holder Name"
                value={card.name}
                onChange={e => setCard(c => ({ ...c, name: e.target.value }))}
                style={{
                  width: "100%",
                  padding: "12px",
                  fontSize: 16,
                  border: errors.name ? "1.5px solid #e5733a" : "1px solid #ccc",
                  borderRadius: 4,
                  boxSizing: "border-box",
                }}
              />
              {errors.name && <div style={{ color: "#e5733a", fontSize: 13, marginTop: 2 }}>{errors.name}</div>}
            </div>
            <div style={{ display: "flex", gap: 16 }}>
              <div style={{ flex: 1 }}>
                <input
                  type="text"
                  placeholder="Expiration (MM/YY)"
                  value={card.exp}
                  onChange={e => setCard(c => ({ ...c, exp: e.target.value }))}
                  maxLength={5}
                  style={{
                    width: "100%",
                    padding: "12px",
                    fontSize: 16,
                    border: errors.exp ? "1.5px solid #e5733a" : "1px solid #ccc",
                    borderRadius: 4,
                    boxSizing: "border-box",
                  }}
                />
                {errors.exp && <div style={{ color: "#e5733a", fontSize: 13, marginTop: 2 }}>{errors.exp}</div>}
              </div>
              <div style={{ position: "relative", flex: 1 }}>
                <input
                  type="text"
                  placeholder="CVV"
                  value={card.cvv}
                  onChange={e => setCard(c => ({ ...c, cvv: e.target.value.replace(/\D/g, "") }))}
                  maxLength={3}
                  style={{
                    width: "100%",
                    padding: "12px 40px 12px 12px",
                    fontSize: 16,
                    border: errors.cvv ? "1.5px solid #e5733a" : "1px solid #ccc",
                    borderRadius: 4,
                    boxSizing: "border-box",
                  }}
                />
                <FaInfoCircle style={{ position: "absolute", right: 12, top: 14, color: "#888" }} />
                {errors.cvv && <div style={{ color: "#e5733a", fontSize: 13, marginTop: 2 }}>{errors.cvv}</div>}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 32, marginTop: 16 }}>
              <Link to={{
                pathname: "/shipping",
                state: { form, shippingMethod }
              }} style={{ color: "#5ECE7B", fontSize: 16 }}>Back to shipping</Link>
              <button
                type="submit"
                disabled={submitting}
                style={{
                  background: "#5ECE7B",
                  color: "#fff",
                  border: "none",
                  borderRadius: 4,
                  padding: "12px 48px",
                  fontWeight: 600,
                  fontSize: 18,
                  cursor: submitting ? "not-allowed" : "pointer",
                  opacity: submitting ? 0.7 : 1
                }}
              >
                {submitting ? "Processing..." : "Pay now"}
              </button>
            </div>
          </form>
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
              {shippingObj.display}
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

export default Payment;