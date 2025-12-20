const Order = require("../models/Order");
const Inventory = require("../models/Inventory");

// USER places order
exports.placeOrder = async (req, res) => {
  try {
    const { items, total } = req.body;

    const order = await Order.create({
      userId: req.user.id,
      items,
      total
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: "Order failed" });
  }
};

// USER order history
exports.getMyOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user.id });
  res.json(orders);
};

// ADMIN all orders
exports.getAllOrders = async (req, res) => {
  const orders = await Order.find().populate("userId", "name email");
  res.json(orders);
};

// ADMIN update order status
exports.updateOrderStatus = async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(order);
};
