const router = require("express").Router();

const { createOrder } = require("../controllers/paymentController");

router.post("/create", (req, res) => {
  res.json({
    id: "mock_order_123",
    amount: req.body.amount,
    currency: "INR",
  });
});


module.exports = router;
