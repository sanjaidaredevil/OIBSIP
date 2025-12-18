const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/roleMiddleware");

const {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus
} = require("../controllers/orderController");

// user
router.post("/", auth, placeOrder);

router.get("/my-orders", auth, getMyOrders);

// admin
router.get("/", auth, admin("admin"), getAllOrders);
router.put("/:id/status", auth, admin("admin"), updateOrderStatus);

module.exports = router;
