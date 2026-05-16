const express = require("express");

console.log("PAYMENT ROUTES LOADED");

const router = express.Router();

const {
  getWithdrawalsCollection,
} = require("../config/db");




// TEST ROUTE
router.get(
  "/test",
  (req, res) => {

    res.json({
      success: true,
      message: "Payment route working",
    });

  }
);




// TRANSACTIONS
router.get(
  "/transactions/:uid",

  async (req, res) => {

    try {

      const withdrawalsCollection =
        getWithdrawalsCollection();




      const withdrawals =
        await withdrawalsCollection

          .find({})

          .sort({ createdAt: -1 })

          .toArray();




      const transactions =
        withdrawals.map((item) => ({

          _id:
            item._id.toString(),

          type:
            "Withdrawal",
            status: item.status,

          amount:
            item.amount,

          createdAt:
            item.createdAt,


        }));




      return res.json({

        success: true,

        transactions,

      });

    } catch (error) {

      console.log(error);

      return res.status(500).json({

        success: false,

        message: "Server Error",

      });
    }
  }
);




module.exports = router;