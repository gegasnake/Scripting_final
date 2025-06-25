import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Add item to cart (or increment quantity if already exists)
  function addToCart(product, selectedSize) {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) =>
          item.id === product.id &&
          item.category === product.category &&
          item.size === selectedSize
      );
      if (existing) {
        return prev.map((item) =>
          item.id === product.id &&
          item.category === product.category &&
          item.size === selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          ...product,
          size: selectedSize,
          quantity: 1,
        },
      ];
    });
  }

  // Increment quantity
  function increment(id, size, category) {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.size === size && item.category === category
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  // Decrement quantity or remove item if quantity is 1
  function decrement(id, size, category) {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id && item.size === size && item.category === category
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  // Remove item completely
  function removeFromCart(id, size, category) {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(item.id === id && item.size === size && item.category === category)
      )
    );
  }

  // Update size for a cart item
  function updateSize(id, oldSize, newSize, category) {
    setCartItems((prev) => {
      // If the new size already exists for this product+category, increment its quantity and remove the old one
      const existing = prev.find(
        (item) =>
          item.id === id &&
          item.size === newSize &&
          item.category === category
      );
      if (existing) {
        return prev
          .map((item) =>
            item.id === id &&
            item.size === newSize &&
            item.category === category
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
          .filter(
            (item) =>
              !(item.id === id && item.size === oldSize && item.category === category)
          );
      }
      // Otherwise, just update the size
      return prev.map((item) =>
        item.id === id && item.size === oldSize && item.category === category
          ? { ...item, size: newSize }
          : item
      );
    });
  }

  // Clear cart
  function clearCart() {
    setCartItems([]);
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increment,
        decrement,
        removeFromCart,
        clearCart,
        updateSize,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}