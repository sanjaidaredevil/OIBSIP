const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  category: String,
  name: String,
  quantity: Number,
  threshold: Number
});

module.exports = mongoose.model("Inventory", inventorySchema);
