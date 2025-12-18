import React, { useState } from "react";
import axios from "axios";
import "../../styles/PizzaBuilder.css"; // CSS only for UI

const PizzaBuilder = () => {
  const [base, setBase] = useState("Thin");
  const [sauce, setSauce] = useState("Tomato");
  const price = 299;

  // 🔴 DO NOT CHANGE THIS FUNCTION LOGIC
  const pay = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/payment/create",
        {
          amount: price,
        }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: "INR",
        name: "Pizza App",
        description: "Pizza Order",
        order_id: data.id,
        handler: function (response) {
          alert("Payment Successful ✅");
          console.log(response);
        },
        theme: {
          color: "#f97316",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Something went wrong while placing order");
    }
  };

  return (
    <div className="pizza-builder">
      <div className="pizza-card">
        <h2>🍕 Build Your Pizza</h2>
        <p className="subtitle">Customize your favorite pizza</p>

        <div className="option-group">
          <label>Base</label>
          <select value={base} onChange={(e) => setBase(e.target.value)}>
            <option>Thin</option>
            <option>Cheese Burst</option>
            <option>Pan</option>
          </select>
        </div>

        <div className="option-group">
          <label>Sauce</label>
          <select value={sauce} onChange={(e) => setSauce(e.target.value)}>
            <option>Tomato</option>
            <option>BBQ</option>
            <option>Cheese</option>
          </select>
        </div>

        <div className="summary">
          <p><strong>Base:</strong> {base}</p>
          <p><strong>Sauce:</strong> {sauce}</p>
        </div>

        <div className="price-box">Total: ₹{price}</div>

        <button className="pay-btn" onClick={pay}>
          Pay & Order
        </button>
      </div>
    </div>
  );
};

export default PizzaBuilder;
