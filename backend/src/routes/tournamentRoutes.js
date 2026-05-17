const express = require("express");

const router = express.Router();

const authMiddleware =
  require(
    "../middleware/authMiddleware"
  );

const {
  deleteTournament,
  getJoinedContests,
  getTournaments,
  createTournament,
  getRoomDetails,
  joinTournament,
  getSingleTournament,
  updateTournamentStatus,
  uploadResult,
  updateTournament,
  addMoney, 
  getLeaderboard,
  submitPaymentRequest,
  getWallet,
  getBookedSlots,
} = require(
  "../controllers/tournamentController"
);

router.post(
  "/create",
  createTournament
);

router.post(
  "/join",
  authMiddleware,
  joinTournament
);

router.get(
  "/all",
  getTournaments
);

router.get(
  "/wallet",
  getWallet
);

router.get(
  "/joined",
  getJoinedContests
);

router.delete(
  "/delete/:id",
  deleteTournament
);

router.get(
  "/booked-slots/:id",
  getBookedSlots
);

router.get(
  "/room/:id",
  getRoomDetails
);

router.get(
  "/single/:id",
  getSingleTournament
);

router.put(
  "/status/:id",
  updateTournamentStatus
);
router.post(
  "/submit-payment",
  submitPaymentRequest
);
router.post(
  "/upload-result",
  uploadResult
);

router.get(
  "/leaderboard",
  getLeaderboard
);
router.put(
  "/update/:id",
  updateTournament
);
router.post(
  "/add-money",
  addMoney
);
module.exports = router;