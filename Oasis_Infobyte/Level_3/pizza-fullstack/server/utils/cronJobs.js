const cron = require("node-cron");
const Inventory = require("../models/Inventory");
const sendEmail = require("./sendEmail");

cron.schedule("*/5 * * * *", async () => {
  const lowStock = await Inventory.find({
    quantity: { $lt: 20 }
  });

  if (lowStock.length > 0) {
    await sendEmail(
      process.env.ADMIN_EMAIL,
      "Low Stock Alert",
      "Some pizza items are running low"
    );
  }
});
