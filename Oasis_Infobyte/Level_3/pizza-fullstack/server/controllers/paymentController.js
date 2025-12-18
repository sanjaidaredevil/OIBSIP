const razorpay = require("../config/razorpay");

exports.createOrder = async (req, res) => {
  const order = await razorpay.orders.create({
    amount: req.body.amount * 100,
    currency: "INR"
  });
  res.json(order);
};
