import React from "react";
import { useLocation } from "react-router-dom";

const Receipt = () => {
  const location = useLocation();
  const { customerInfo, cartItems, totalAmount } = location.state || {};
  const lastFourDigits =
    `**** **** **** ${customerInfo.cardNumber?.slice(-4)}` || null;

  return (
    <div className="receipt">
      <h2>Receipt</h2>
      <h3>Customer Information</h3>
      <p>Name: {customerInfo.name}</p>
      <p>Phone Number : {customerInfo.phone}</p>
      <p>Email: {customerInfo.email}</p>
      <p>Address: {customerInfo.address}</p>
      <p>
        Payment Method: {customerInfo.paymentMethod} (
        {customerInfo.cardType || null})
      </p>
      {lastFourDigits && <p>Card Number: {lastFourDigits}</p>}

      <h3>Purchase Summary</h3>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            {item.name} : ${item.price * item.quantity} (Quantity :{" "}
            {item.quantity})
          </li>
        ))}
      </ul>
      <h3>Total Amount: ${totalAmount}</h3>
      <div className="thank">
        <h3>Thank you for your purchase!</h3>
      </div>
    </div>
  );
};

export default Receipt;
