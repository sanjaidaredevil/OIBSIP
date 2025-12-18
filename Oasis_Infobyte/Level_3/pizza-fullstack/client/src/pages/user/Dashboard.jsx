import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Dashboard.css"; // CSS only for UI

const UserDashboard = () => {
  const navigate = useNavigate();

  const pizzas = [
 
    {
      id: 2,
      name: "Farmhouse",
      desc: "Veggies loaded",
      img: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e",
    },
    {
      id: 3,
      name: "Pepperoni",
      desc: "Loaded with pepperoni",
      img: "https://images.unsplash.com/photo-1628840042765-356cda07504e",
    },
    
    {
      id: 7,
      name: "Cheese Burst",
      desc: "Extra cheesy inside",
      img: "https://images.unsplash.com/photo-1594007654729-407eedc4be65",
    },
    {
      id: 8,
      name: "Paneer Tikka",
      desc: "Indian spicy paneer",
      img: "https://images.unsplash.com/photo-1618213837799-25d5552820d3",
    },
  ];

  return (
    <div className="dashboard">
      <h1 className="title">🍕 Explore Pizzas</h1>
      <p className="subtitle">Freshly baked, delivered hot</p>

      <div className="pizza-grid">
        {pizzas.map((pizza) => (
          <div className="pizza-card" key={pizza.id}>
            <img src={pizza.img} alt={pizza.name} />
            <h3>{pizza.name}</h3>
            <p>{pizza.desc}</p>

            {/* 🔴 DO NOT REMOVE THIS LINE */}
            <button onClick={() => navigate("/pizza")}>Order</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
