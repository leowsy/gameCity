import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = ({ cartItems, removeFromCart }) => {
  const navigate = useNavigate();
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    paymentMethod: "Credit Card",
    cardType: "Visa",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  // Helper function to format card number
  const formatCardNumber = (value) => {
    const numericValue = value.replace(/\D/g, ""); // Remove non-digit characters
    return numericValue.replace(/(.{4})/g, "$1 ").trim(); // Format with spaces
  };

  // Helper function to format expiration date
  const formatExpirationDate = (value) => {
    const numericValue = value.replace(/\D/g, ""); // Remove non-digit characters
    return numericValue.length >= 2
      ? `${numericValue.slice(0, 2)}/${numericValue.slice(2)}`
      : numericValue; // Format as MM/YY
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format based on input name
    if (name === "cardNumber") {
      formattedValue = formatCardNumber(value);
    } else if (name === "expirationDate") {
      formattedValue = formatExpirationDate(value);
    }

    setCustomerInfo((prevInfo) => ({
      ...prevInfo,
      [name]: formattedValue,
    }));
  };

  const handlePaymentMethodChange = (e) => {
    const method = e.target.value;
    setCustomerInfo((prevInfo) => ({
      ...prevInfo,
      paymentMethod: method,
    }));
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleCheckout = (e) => {
    e.preventDefault();

    const method = customerInfo.paymentMethod;
    // Handle checkout process

    if (method === "Credit Card") {
      alert("Checkout successful! Thank you for your purchase!");
      // Calculate the total amount
      const totalAmount = calculateTotal();

      // Navigate to the receipt page with customer info and cart items
      navigate("/receipt", {
        state: {
          customerInfo,
          cartItems,
          totalAmount,
          method,
        },
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/QRCode", {
        state: { paymentMethod: method },
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. Add items to your cart before checking out.</p>
      ) : (
        <div>
          <div className="order-summary">
            <h3>Order Summary</h3>
            <ul>
              {cartItems.map((item, index) => (
                <li key={index}>
                  {item.name} : ${item.price * item.quantity} (Quantity :{" "}
                  {item.quantity})
                  <button
                    className="remove"
                    onClick={() => removeFromCart(index)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <h3>Total Price: ${calculateTotal()}</h3>
          </div>

          <div className="customer-info">
            <h4>Customer Information</h4>
            <form onSubmit={handleCheckout}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={customerInfo.name}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Phone Number:
                <input
                  type="text"
                  name="phone"
                  value={customerInfo.phone}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={customerInfo.email}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Address:
                <input
                  type="text"
                  name="address"
                  value={customerInfo.address}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Payment Method:
                <select
                  name="paymentMethod"
                  value={customerInfo.paymentMethod}
                  onChange={handlePaymentMethodChange}
                >
                  <option value="Credit Card">Credit Card</option>
                  <option value="WeChat Pay">WeChat Pay</option>
                  <option value="Alipay">Alipay</option>
                </select>
              </label>

              {/* Credit Card Inputs */}
              {customerInfo.paymentMethod === "Credit Card" && (
                <div>
                  <label>
                    Card Type:
                    <select
                      name="cardType"
                      value={customerInfo.cardType}
                      onChange={handleChange}
                    >
                      <option value="Visa">Visa</option>
                      <option value="MasterCard">MasterCard</option>
                      <option value="UnionPay">UnionPay</option>
                    </select>
                  </label>
                  <label>
                    Credit Card Number:
                    <input
                      type="text"
                      name="cardNumber"
                      value={customerInfo.cardNumber}
                      onChange={handleChange}
                      required
                      placeholder="1234 5678 9012 3456"
                      pattern="\d{4} \d{4} \d{4} \d{4}"
                      title="Please enter a valid credit card number in the format: 1234 5678 9012 3456"
                      maxLength="19"
                    />
                  </label>
                  <label>
                    Expiration Date:
                    <input
                      type="text"
                      name="expirationDate"
                      value={customerInfo.expirationDate}
                      onChange={handleChange}
                      required
                      placeholder="MM/YY"
                      pattern="(0[1-9]|1[0-2])\/?([0-9]{2})"
                      title="Please enter the expiration date in the format: MM/YY"
                      maxLength="5"
                    />
                  </label>
                  <label>
                    CVV:
                    <input
                      type="text"
                      name="cvv"
                      value={customerInfo.cvv}
                      onChange={handleChange}
                      required
                      placeholder="123"
                      pattern="\d{3,4}"
                      title="Please enter a valid CVV (3 or 4 digits)"
                      maxLength="4"
                    />
                  </label>
                </div>
              )}
              <button className="checkout-btn" type="submit">
                Checkout
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
