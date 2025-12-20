const Inventory = require("../models/Inventory");

exports.getInventory = async (req, res) => {
  res.json(await Inventory.find());
};

exports.addItem = async (req, res) => {
  res.json(await Inventory.create(req.body));
};
