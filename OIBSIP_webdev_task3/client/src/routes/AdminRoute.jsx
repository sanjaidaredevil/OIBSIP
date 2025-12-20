import { Navigate } from "react-router-dom";

export default ({ children }) =>
  localStorage.getItem("role") === "admin"
    ? children
    : <Navigate to="/" />;
