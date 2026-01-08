const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.get("/requests", authMiddleware, adminMiddleware, adminController.getAllRequests);
router.put("/requests/:id/approve", authMiddleware, adminMiddleware, adminController.approveRequest);
router.put("/requests/:id/status", authMiddleware, adminMiddleware, adminController.updateRequestStatus);
router.delete("/requests/:id", authMiddleware, adminMiddleware, adminController.deleteRequest);

module.exports = router;
