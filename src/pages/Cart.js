import React from "react";
import { useCart } from "./CartContext";
import { useCurrency } from "./CurrencyContext";
import { formatPrice } from "./utils/formatPrice";
import { useHistory } from "react-router-dom";

function CartPage() {
  const { cartItems, increment, decrement, updateSize } = useCart();
  const { currency } = useCurrency();
  const history = useHistory();

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 32 }}>
      <h2 style={{ fontWeight: 700, fontSize: 28, marginBottom: 32 }}>CART</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={`${item.id}-${item.size}`}
              style={{
                display: "flex",
                alignItems: "center",
                borderBottom: "1px solid #eee",
                padding: "32px 0",
              }}
            >
              {/* Product Info */}
              <div style={{ flex: 2 }}>
                <div style={{ fontWeight: 600, fontSize: 20 }}>{item.name}</div>
                {item.description && (
                  <div style={{ color: "#555", marginBottom: 8 }}>{item.description}</div>
                )}
                <div style={{ fontWeight: 700, marginBottom: 8 }}>
                  {formatPrice(item.price, currency)}
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>SIZE:</div>
                <div>
                  {item.sizes.map((size) => (
                    <button
                      key={size}
                      style={{
                        padding: "6px 16px",
                        marginRight: 8,
                        border: "1px solid #222",
                        background: item.size === size ? "#222" : "#fff",
                        color: item.size === size ? "#fff" : "#222",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                      onClick={() => updateSize && updateSize(item.id, item.size, size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              {/* Quantity Controls */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: 24 }}>
                <button
                  style={{
                    width: 32,
                    height: 32,
                    border: "1px solid #222",
                    background: "#fff",
                    fontSize: 20,
                    cursor: "pointer",
                  }}
                  onClick={() => increment(item.id, item.size)}
                >
                  +
                </button>
                <div style={{ margin: "12px 0", fontWeight: 600 }}>{item.quantity}</div>
                <button
                  style={{
                    width: 32,
                    height: 32,
                    border: "1px solid #222",
                    background: "#fff",
                    fontSize: 20,
                    cursor: "pointer",
                  }}
                  onClick={() => decrement(item.id, item.size)}
                >
                  –
                </button>
              </div>
              {/* Product Image */}
              <div>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: 120, height: 120, objectFit: "cover", borderRadius: 8 }}
                />
              </div>
            </div>
          ))}
          {/* Cart Summary */}
          <div style={{ marginTop: 32, fontSize: 18 }}>
            <div style={{ marginBottom: 8 }}>
              Quantity: <span style={{ fontWeight: 600 }}>{totalQuantity}</span>
            </div>
            <div style={{ marginBottom: 24 }}>
              Total: <span style={{ fontWeight: 700 }}>{formatPrice(totalPrice, currency)}</span>
            </div>
            <button
  style={{
    background: "#5ECE7B",
    color: "#fff",
    border: "none",
    padding: "12px 36px",
    fontWeight: 600,
    borderRadius: 4,
    fontSize: 16,
    cursor: "pointer",
  }}
  onClick={() => history.push("/checkout")}
>
  CONTINUE
</button>
          
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;