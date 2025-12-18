const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/roleMiddleware");
const { getInventory, addItem } = require("../controllers/inventoryController");

router.get("/", auth, getInventory);
router.post("/", auth, admin("admin"), addItem);

module.exports = router;
