import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import PC from "./Games/PC";
import PlayStation from "./Games/PlayStation";
import Xbox from "./Games/Xbox";
import Switch from "./Games/Switch";
import All from "./Games/All";
import Cart from "./Cart/Cart";
import Contact from "./Contact/Contact";
import Footer from "./Footer";
import Account from "./Account/Account";
import gameInfo from "./Games/gameInfo";
import GameDetail from "./Games/GameDetail";
import CreateAccount from "./Account/CreateAccount";
import Home from "./Home/Home";
import news from "./Home/news";
import Checkout from "./Cart/Checkout";
import QRCode from "./Cart/QRCode";
import Receipt from "./Cart/Receipt";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [loginStatus, setLoginStatus] = useState(false);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        // If the item already exists
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      // Add the new item with quantity 1
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (index) => {
    const newCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newCartItems);
  };

  const updateQuantity = (index, newQuantity) => {
    setCartItems((prevItems) => {
      // Create a new array with the updated quantity
      const updatedItems = [...prevItems];
      updatedItems[index] = {
        ...updatedItems[index],
        quantity: newQuantity,
      };
      return updatedItems;
    });
  };

  return (
    <Router>
      <div>
        <NavBar />

        <main>
          <Routes>
            <Route path="/" element={<Home news={news} />} />
            <Route
              path="/PC"
              element={<PC gameInfo={gameInfo} addToCart={addToCart} />}
            />
            <Route
              path="/PlayStation"
              element={
                <PlayStation gameInfo={gameInfo} addToCart={addToCart} />
              }
            />
            <Route
              path="/Xbox"
              element={<Xbox gameInfo={gameInfo} addToCart={addToCart} />}
            />
            <Route
              path="/Switch"
              element={<Switch gameInfo={gameInfo} addToCart={addToCart} />}
            />
            <Route
              path="/all"
              element={<All gameInfo={gameInfo} addToCart={addToCart} />}
            />
            <Route
              path="/game/:slug"
              element={<GameDetail gameInfo={gameInfo} addToCart={addToCart} />}
            />
            <Route
              path="/Cart"
              element={
                <Cart
                  addToCart={addToCart}
                  removeFromCart={removeFromCart}
                  cartItems={cartItems}
                  updateQuantity={updateQuantity}
                  loginStatus={loginStatus}
                />
              }
            />
            <Route
              path="/Checkout"
              element={
                <Checkout
                  cartItems={cartItems}
                  removeFromCart={removeFromCart}
                />
              }
            />
            <Route path="/QRCode" element={<QRCode />} />
            <Route path="/Receipt" element={<Receipt />} />
            <Route path="/Contact" element={<Contact />} />
            <Route
              path="/Account"
              element={
                <Account
                  loginStatus={loginStatus}
                  setLoginStatus={setLoginStatus}
                />
              }
            />
            <Route path="/CreateAccount" element={<CreateAccount />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
