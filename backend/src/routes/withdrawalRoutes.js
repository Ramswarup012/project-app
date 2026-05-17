const express = require("express");

const router = express.Router();

const {

  createWithdrawalRequest,

  getAllWithdrawals,

  approveWithdrawal,

  rejectWithdrawal,

} = require(
  "../controllers/withdrawalController"
);

const authMiddleware =
  require(
    "../middleware/authMiddleware"
  );





/* =========================
   USER
========================= */

router.post(
  "/request",
  authMiddleware,
  createWithdrawalRequest
);





/* =========================
   ADMIN
========================= */

router.get(
  "/all",
  authMiddleware,
  getAllWithdrawals
);




router.put(
  "/approve/:id",
  authMiddleware,
  approveWithdrawal
);




router.put(
  "/reject/:id",
  authMiddleware,
  rejectWithdrawal
);





module.exports = router;