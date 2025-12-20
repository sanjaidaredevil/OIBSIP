import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/auth.css";


export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        { email, password }
      );

      setMessage(res.data.message || "Registered successfully");
      navigate("/"); // go to login
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Registration failed"
      );
    }
  };

return (
  <div className="auth-container">
    <div className="auth-card">
      <h2>Register</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleRegister}>Register</button>

      {message && <p>{message}</p>}
    </div>
  </div>
);

}
