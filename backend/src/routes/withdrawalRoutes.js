const express = require("express");

const router = express.Router();

const {
  createWithdrawalRequest,
  getAllWithdrawals,
} = require("../controllers/withdrawalController");

const authMiddleware = require("../middleware/authMiddleware");




// USER
router.post(
  "/request",
  authMiddleware,
  createWithdrawalRequest
);




// ADMIN
router.get(
  "/all",
  authMiddleware,
  getAllWithdrawals
);




module.exports = router;