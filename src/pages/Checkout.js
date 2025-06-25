import React, { useState } from "react";
import { useCart } from "../pages/CartContext";
import { useCurrency } from "../pages/CurrencyContext";
import { formatPrice } from "../pages/utils/formatPrice";
import { Link, useHistory } from "react-router-dom";

const provinces = ["Province", "Rome", "Milan", "Naples", "Turin"];
const countries = ["Italy", "France", "Germany", "Spain"];

function Checkout() {
  const { cartItems } = useCart();
  const { currency } = useCurrency();
  const history = useHistory();

  const [form, setForm] = useState({
    contact: "",
    name: "",
    secondName: "",
    address: "",
    note: "",
    city: "",
    postal: "",
    province: "Province",
    country: "Italy",
    saveInfo: false,
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div
  style={{
    background: "#222",
    minHeight: "100vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
  }}
>
  <div
    style={{
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
        {/* Left: Form */}
        <form
  style={{
    flex: 2,
    minWidth: 320,
    maxWidth: 600,
    width: "100%",
    display: "flex",
    flexDirection: "column"
  }}
  onSubmit={e => {
    e.preventDefault();
    history.push("/shipping", { form });
  }}
>
  <div style={{ color: "#888", marginBottom: 24 }}>Cart &nbsp; <b>&gt; Details</b> &nbsp; &gt; Shipping &nbsp; &gt; Payment</div>
  <h3 style={{ margin: "0 0 24px 0" }}>Contact</h3>
  <input
    type="text"
    placeholder="Email or mobile phone number"
    value={form.contact}
    onChange={e => setForm(f => ({ ...f, contact: e.target.value }))}
    style={{
      width: "100%",
      padding: 10,
      border: "1px solid #b7eacb",
      borderRadius: 2,
      marginBottom: 32,
      fontSize: 16,
      boxSizing: "border-box"
    }}
    required
  />
  <h3 style={{ margin: "0 0 16px 0" }}>Shipping Address</h3>
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 16,
      marginBottom: 16,
    }}
  >
    <input
      type="text"
      placeholder="Name"
      value={form.name}
      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
      style={{ width: "100%", padding: 10, fontSize: 16, boxSizing: "border-box" }}
      required
    />
    <input
      type="text"
      placeholder="Second Name"
      value={form.secondName}
      onChange={e => setForm(f => ({ ...f, secondName: e.target.value }))}
      style={{ width: "100%", padding: 10, fontSize: 16, boxSizing: "border-box" }}
      required
    />
  </div>
  <input
    type="text"
    placeholder="Address and number"
    value={form.address}
    onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
    style={{ width: "100%", padding: 10, fontSize: 16, marginBottom: 16, boxSizing: "border-box" }}
    required
  />
  <input
    type="text"
    placeholder="Shipping note (optional)"
    value={form.note}
    onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
    style={{ width: "100%", padding: 10, fontSize: 16, marginBottom: 16, boxSizing: "border-box" }}
  />
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 16,
      marginBottom: 16,
    }}
  >
    <input
      type="text"
      placeholder="City"
      value={form.city}
      onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
      style={{ width: "100%", padding: 10, fontSize: 16, boxSizing: "border-box" }}
      required
    />
    <input
      type="text"
      placeholder="Postal Code"
      value={form.postal}
      onChange={e => setForm(f => ({ ...f, postal: e.target.value }))}
      style={{ width: "100%", padding: 10, fontSize: 16, boxSizing: "border-box" }}
      required
    />
    <select
      value={form.province}
      onChange={e => setForm(f => ({ ...f, province: e.target.value }))}
      style={{ width: "100%", padding: 10, fontSize: 16, boxSizing: "border-box" }}
      required
    >
      {provinces.map(p => <option key={p}>{p}</option>)}
    </select>
  </div>
  <select
    value={form.country}
    onChange={e => setForm(f => ({ ...f, country: e.target.value }))}
    style={{ width: "100%", padding: 10, fontSize: 16, marginBottom: 16, boxSizing: "border-box" }}
    required
  >
    {countries.map(c => <option key={c}>{c}</option>)}
  </select>
  <div style={{ marginBottom: 32 }}>
    <label style={{ fontSize: 15 }}>
      <input
        type="checkbox"
        checked={form.saveInfo}
        onChange={e => setForm(f => ({ ...f, saveInfo: e.target.checked }))}
        style={{ marginRight: 8 }}
      />
      Save this informations for a future fast checkout
    </label>
  </div>
  <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
    <Link to="/cart" style={{ color: "#5ECE7B", fontSize: 16 }}>Back to cart</Link>
    <button
      type="submit"
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
    >
      Go to shipping
    </button>
  </div>
</form>
        {/* Right: Order summary */}
        <div style={{
          flex: 1,
          background: "#fff",
          borderRadius: 4,
          minWidth: 260,
          width: "100%",
          maxWidth: 350
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
            <span style={{ color: "#888" }}>Calculated at the next step</span>
          </div>
          <hr style={{ margin: "24px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 22 }}>
            <span>Total</span>
            <span>{formatPrice(subtotal, currency)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;