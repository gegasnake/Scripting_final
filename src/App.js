import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import Confirmation from "./pages/Confirmation";
import { CurrencyProvider } from "./pages/CurrencyContext";

function App() {
  const [activeCategory, setActiveCategory] = useState("WOMEN");

  return (
  <CurrencyProvider>
    <Router>
      <Navbar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      <Switch>
        <Route exact path="/">
          <Redirect to="/women" />
        </Route>
        <Route path="/women" component={Home} />
        <Route path="/men" component={Home} />
        <Route path="/kids" component={Home} />
        <Route path="/product/:category/:id" component={ProductDetails} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/payment" component={Payment} />
        <Route path="/confirmation/:orderId" component={Confirmation} />
      </Switch>
    </Router>
  </CurrencyProvider>
  );
}

export default App;