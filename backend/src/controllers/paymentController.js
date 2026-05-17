const razorpay = require("../config/razorpay");

const { getUsersCollection } = require("../config/db");

exports.submitPaymentRequest = async (req, res) => {
  try {
    const db = getUsersCollection().db;

    const paymentCollection = db.collection("paymentRequests");

    const usersCollection = db.collection("users");

    const transactionsCollection = db.collection("transactions");

    const paymentData = {
      ...req.body,

      status: "Completed",

      createdAt: new Date(),
    };

    /* =====================
         SAVE REQUEST
      ===================== */

    await paymentCollection.insertOne(paymentData);

    /* =====================
         UPDATE WALLET
      ===================== */

    await usersCollection.updateOne(
      {
        uid: req.body.uid,
      },

      {
        $inc: {
          wallet: Number(req.body.amount),
        },
      },
    );

    /* =====================
         ADD TRANSACTION
      ===================== */

    await transactionsCollection.insertOne({
      uid: req.body.uid,

      type: "deposit",

      amount: Number(req.body.amount),

      status: "completed",

      message: "Money added successfully",

      createdAt: new Date(),
    });

    res.status(201).json({
      success: true,

      message: "Payment successful",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

exports.getPaymentRequests = async (req, res) => {
  try {
    const db = getUsersCollection().db;

    const paymentCollection = db.collection("paymentRequests");

    const requests = await paymentCollection

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
exports.approvePayment = async (req, res) => {
  try {
    const db = getUsersCollection().db;

    const paymentCollection = db.collection("paymentRequests");

    const usersCollection = db.collection("users");

    const transactionsCollection = db.collection("transactions");

    const { ObjectId } = require("mongodb");

    const request = await paymentCollection.findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!request) {
      return res.status(404).json({
        success: false,

        message: "Request not found",
      });
    }

    if (request.status === "Approved") {
      return res.status(400).json({
        success: false,

        message: "Already approved",
      });
    }

    /* =========================
         WALLET UPDATE
      ========================= */

    await usersCollection.updateOne(
      {
        uid: request.uid,
      },

      {
        $inc: {
          wallet: Number(request.amount),
        },
      },
    );

    /* =========================
         REQUEST STATUS UPDATE
      ========================= */

    await paymentCollection.updateOne(
      {
        _id: new ObjectId(req.params.id),
      },

      {
        $set: {
          status: "Approved",

          approvedAt: new Date(),
        },
      },
    );

    /* =========================
         TRANSACTION INSERT
      ========================= */

    await transactionsCollection.insertOne({
      uid: request.uid,

      type: "deposit",

      amount: Number(request.amount),

      status: "success",

      message: "Money added to wallet",

      createdAt: new Date(),
    });

    res.status(200).json({
      success: true,

      message: "Payment approved successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
exports.rejectPayment = async (req, res) => {
  try {
    const db = getUsersCollection().db;

    const paymentCollection = db.collection("paymentRequests");

    const { ObjectId } = require("mongodb");

    await paymentCollection.updateOne(
      {
        _id: new ObjectId(req.params.id),
      },

      {
        $set: {
          status: "Rejected",
        },
      },
    );

    res.status(200).json({
      success: true,

      message: "Payment rejected",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const db = getUsersCollection().db;

    const transactionsCollection = db.collection("transactions");

    const transactions = await transactionsCollection

      .find({
        uid: req.params.uid,
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
exports.createOrder =
  async (req, res) => {

    try {

      const {
        amount,
      } = req.body;

      const options = {

        amount:
          Number(amount) * 100,

        currency: "INR",

        receipt:
          `receipt_${Date.now()}`,
      };

      const order =
        await razorpay.orders.create(
          options
        );
      res.status(200).json({

        success: true,

        order,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Order creation failed",

      });

    }

  };
