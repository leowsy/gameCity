import React from "react";
import { Link } from "react-router-dom";

const Cart = ({ cartItems, removeFromCart, updateQuantity, loginStatus }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const checkCart = () => {
    // If the cart is empty
    if (cartItems.length === 0) {
      return <p>Your cart is empty.</p>;
    } else {
      return cartItems.map((item, index) => (
        <li key={index}>
          {item.name} : $ {item.price * item.quantity}
          <div className="quantity-controls">
            <button
              onClick={() => updateQuantity(index, item.quantity - 1)}
              disabled={item.quantity <= 1}
              aria-label={`Decrease quantity of ${item.name}`}
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() => updateQuantity(index, item.quantity + 1)}
              aria-label={`Increase quantity of ${item.name}`}
            >
              +
            </button>
            <button
              className="remove"
              onClick={() => removeFromCart(index)}
              aria-label={`Remove ${item.name} from cart`}
            >
              Remove
            </button>
          </div>
        </li>
      ));
    }
  };

  // Calculate total price
  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="cart-container">
      <div className="cart">
        <h2>Your Cart</h2>
        <ul>{checkCart()}</ul>
        {cartItems.length > 0 && (
          <div>
            <h3>Total Price: ${calculateTotal()}</h3>
            {loginStatus ? (
              <Link to="/checkout" onClick={scrollToTop}>
                <button className="checkout-btn">Proceed to Checkout</button>
              </Link>
            ) : (
              <p className="login-prompt">
                Please login to proceed to checkout.
              </p>
            )}
            <Link to="/all">
              <button className="continue-shopping">Continue Shopping</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
