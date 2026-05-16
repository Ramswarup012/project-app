const { getUsersCollection } =
  require("../config/db");

exports.submitPaymentRequest =
  async (req, res) => {

    try {

      const db =
        getUsersCollection().db;

      const paymentCollection =
        db.collection(
          "paymentRequests"
        );

      const paymentData = {

        ...req.body,

        status: "Pending",

        createdAt:
          new Date(),

      };

      await paymentCollection.insertOne(
        paymentData
      );

      res.status(201).json({

        success: true,

        message:
          "Payment request submitted",

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message: error.message,

      });

    }

  };

exports.getPaymentRequests =
  async (req, res) => {

    try {

      const db =
        getUsersCollection().db;

      const paymentCollection =
        db.collection(
          "paymentRequests"
        );

      const requests =
        await paymentCollection

          .find({})

          .sort({
            createdAt: -1,
          })

          .toArray();

      res.status(200).json({

        success: true,

        requests,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message: error.message,

      });

    }

  };
exports.approvePayment =
  async (req, res) => {

    try {

      const db =
        getUsersCollection().db;

      const paymentCollection =
        db.collection(
          "paymentRequests"
        );

      const usersCollection =
        db.collection("users");

      const { ObjectId } =
        require("mongodb");

      const request =
        await paymentCollection.findOne({

          _id:
            new ObjectId(
              req.params.id
            ),

        });

      if (!request) {

        return res.status(404).json({

          success: false,

          message:
            "Request not found",

        });

      }

      await usersCollection.updateOne(

        {
          uid: request.uid,
        },

        {
          $inc: {

            wallet:
              Number(
                request.amount
              ),

          },
        }

      );

      await paymentCollection.updateOne(

        {
          _id:
            new ObjectId(
              req.params.id
            ),
        },

        {
          $set: {
            status:
              "Approved",
          },
        }

      );

      res.status(200).json({

        success: true,

        message:
          "Payment approved",

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message: error.message,

      });

    }

  };
exports.rejectPayment =
  async (req, res) => {

    try {

      const db =
        getUsersCollection().db;

      const paymentCollection =
        db.collection(
          "paymentRequests"
        );

      const { ObjectId } =
        require("mongodb");

      await paymentCollection.updateOne(

        {
          _id:
            new ObjectId(
              req.params.id
            ),
        },

        {
          $set: {
            status:
              "Rejected",
          },
        }

      );

      res.status(200).json({

        success: true,

        message:
          "Payment rejected",

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message: error.message,

      });

    }

  };

exports.getTransactions =
  async (req, res) => {

    try {

      const db =
        getUsersCollection().db;

      const transactionsCollection =
        db.collection(
          "transactions"
        );

      const transactions =
        await transactionsCollection

          .find({
            uid:
              req.params.uid,
          })

          .sort({
            createdAt: -1,
          })

          .toArray();

      res.status(200).json({

        success: true,

        transactions,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message: error.message,

      });

    }

  };