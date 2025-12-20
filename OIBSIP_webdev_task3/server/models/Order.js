const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    items: {
      // Custom pizza selections
      base: { type: String, required: true },
      sauce: { type: String, required: true },
      cheese: { type: String, required: true },
      veggies: [{ type: String }],
      meat: [{ type: String }]
    },

    total: {
      type: Number,
      required: true
    },

    payment: {
      razorpayOrderId: String,
      razorpayPaymentId: String,
      status: {
        type: String,
        enum: ["pending", "paid"],
        default: "pending"
      }
    },

    status: {
      type: String,
      enum: ["Order Received", "In Kitchen", "Out for Delivery", "Delivered"],
      default: "Order Received"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
