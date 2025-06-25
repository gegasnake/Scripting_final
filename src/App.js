import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Shipping from "./pages/Shipping";
import Payment from "./pages/Payment";
import Confirmation from "./pages/Confirmation";
import { CurrencyProvider } from "./pages/CurrencyContext";
import { CartProvider } from './pages/CartContext';

function AppContent({ activeCategory, setActiveCategory }) {
  const location = useLocation();
  // Hide navbar on checkout and shipping pages
  const hideNavbar = location.pathname === "/checkout" || location.pathname === "/shipping";

  return (
    <>
      {!hideNavbar && (
        <Navbar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      )}
      <Switch>
        <Route exact path="/">
          <Redirect to="/women" />
        </Route>
        <Route path="/women" component={Home} />
        <Route path="/men" component={Home} />
        <Route path="/kids" component={Home} />
        <Route path="/product/:category/:id" component={ProductDetails} />
        <Route path="/cart" component={CartPage} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/shipping" component={Shipping} />
        <Route path="/payment" component={Payment} />
        <Route path="/confirmation/:orderId" component={Confirmation} />
      </Switch>
    </>
  );
}

function App() {
  const [activeCategory, setActiveCategory] = useState("WOMEN");

  return (
    <CartProvider>
      <CurrencyProvider>
        <Router>
          <AppContent
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </Router>
      </CurrencyProvider>
    </CartProvider>
  );
}

export default App;