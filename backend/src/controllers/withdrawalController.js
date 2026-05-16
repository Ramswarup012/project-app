const {
  getWithdrawalsCollection,
  getUsersCollection,
} = require("../config/db");

const { ObjectId } =
  require("mongodb");





// USER CREATE WITHDRAWAL REQUEST
const createWithdrawalRequest =
  async (req, res) => {

    console.log(
      "Withdrawal API HIT"
    );

    try {

      const withdrawalsCollection =
        getWithdrawalsCollection();

      const usersCollection =
        getUsersCollection();




      const userId =
        req.user.id;

      const {
        amount,
        upiId,
      } = req.body;





      if (!amount || !upiId) {

        return res.status(400).json({

          success: false,

          message:
            "Amount and UPI ID required",

        });
      }






      const user =
        await usersCollection.findOne({

          _id:
            new ObjectId(userId),

        });






      if (!user) {

        return res.status(404).json({

          success: false,

          message:
            "User not found",

        });
      }






      console.log(
        "USER DATA =",
        user
      );






      const currentBalance =
        Number(user.wallet) || 0;






      if (currentBalance < amount) {

        return res.status(400).json({

          success: false,

          message:
            "Insufficient balance",

        });
      }






      // CREATE ONLY REQUEST
      // NO WALLET DEDUCTION HERE
      const withdrawal =
        await withdrawalsCollection.insertOne({

          userId,

          amount,

          upiId,

          status: "pending",

          createdAt:
            new Date(),

        });






      res.status(201).json({

        success: true,

        message:
          "Withdrawal request submitted",

        withdrawalId:
          withdrawal.insertedId,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Server Error",

      });
    }
};









// ADMIN GET ALL WITHDRAWALS
const getAllWithdrawals =
  async (req, res) => {

    try {

      const withdrawalsCollection =
        getWithdrawalsCollection();






      const withdrawals =
        await withdrawalsCollection

          .find({})

          .sort({
            createdAt: -1,
          })

          .toArray();






      res.status(200).json({

        success: true,

        withdrawals,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Server Error",

      });
    }
};








module.exports = {
  createWithdrawalRequest,
  getAllWithdrawals,
};