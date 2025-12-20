import { useEffect } from "react";
import socket from "../../services/socket";

useEffect(() => {
  socket.on("order-status-updated", order => {
    alert("Order status: " + order.status);
  });

  return () => socket.off("order-status-updated");
}, []);
