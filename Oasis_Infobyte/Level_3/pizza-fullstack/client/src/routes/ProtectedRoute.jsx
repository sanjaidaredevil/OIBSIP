import { Navigate } from "react-router-dom";

export default ({ children }) =>
  localStorage.getItem("token") ? children : <Navigate to="/" />;
