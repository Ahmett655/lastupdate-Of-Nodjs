const express = require("express");
const router = express.Router();

const requestController = require("../controllers/requestController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, requestController.createRequest);
router.get("/my", authMiddleware, requestController.getMyRequests);
router.get("/:id", authMiddleware, requestController.getRequestById);
router.put("/:id", authMiddleware, requestController.updateRequest);
router.delete("/:id", authMiddleware, requestController.deleteRequest);

module.exports = router;
