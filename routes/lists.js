const express = require("express");
const { create, update, remove } = require("../controllers/listController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
router.use(authMiddleware);

router.post("/:boardId/lists", create);
router.put("/:boardId/lists/:id", update);
router.delete("/:boardId/lists/:id", remove);

module.exports = router;
