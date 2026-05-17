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

const approveWithdrawal =
  async (req, res) => {

    try {

      const withdrawalsCollection =
        getWithdrawalsCollection();

      const usersCollection =
        getUsersCollection();

      const db =
        usersCollection.db;

      const transactionsCollection =
        db.collection(
          "transactions"
        );

      const withdrawal =
        await withdrawalsCollection.findOne({

          _id:
            new ObjectId(
              req.params.id
            ),

        });

      if (!withdrawal) {

        return res.status(404).json({

          success: false,

          message:
            "Withdrawal request not found",

        });

      }

      if (
        withdrawal.status ===
        "approved"
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Already approved",

        });

      }

      const user =
        await usersCollection.findOne({

          _id:
            new ObjectId(
              withdrawal.userId
            ),

        });

      if (!user) {

        return res.status(404).json({

          success: false,

          message:
            "User not found",

        });

      }

      const currentBalance =
        Number(user.wallet) || 0;

      if (
        currentBalance <
        withdrawal.amount
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Insufficient balance",

        });

      }



      /* =========================
         WALLET DEDUCT
      ========================= */

      await usersCollection.updateOne(

        {
          _id:
            new ObjectId(
              withdrawal.userId
            ),
        },

        {
          $inc: {

            wallet:
              -Number(
                withdrawal.amount
              ),

          },
        }

      );



      /* =========================
         UPDATE REQUEST STATUS
      ========================= */

      await withdrawalsCollection.updateOne(

        {
          _id:
            new ObjectId(
              req.params.id
            ),
        },

        {
          $set: {

            status:
              "approved",

            approvedAt:
              new Date(),

          },
        }

      );



      /* =========================
         ADD TRANSACTION
      ========================= */

      await transactionsCollection.insertOne({

        uid:
          withdrawal.userId,

        type: "withdraw",

        amount:
          Number(
            withdrawal.amount
          ),

        status: "success",

        message:
          "Withdrawal approved",

        createdAt:
          new Date(),

      });





      res.status(200).json({

        success: true,

        message:
          "Withdrawal approved successfully",

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
  const rejectWithdrawal =
  async (req, res) => {

    try {

      const withdrawalsCollection =
        getWithdrawalsCollection();

      await withdrawalsCollection.updateOne(

        {
          _id:
            new ObjectId(
              req.params.id
            ),
        },

        {
          $set: {

            status:
              "rejected",

            rejectedAt:
              new Date(),

          },
        }

      );

      res.status(200).json({

        success: true,

        message:
          "Withdrawal rejected",

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

  approveWithdrawal,

  rejectWithdrawal,

};