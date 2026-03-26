const express = require("express");
const { create, update, remove } = require("../controllers/cardController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
router.use(authMiddleware);

router.post("/:listId/cards", create);
router.put("/:listId/cards/:id", update);
router.delete("/:listId/cards/:id", remove);

module.exports = router;
