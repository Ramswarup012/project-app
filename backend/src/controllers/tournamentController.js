// console.log({
//   deleteTournament,
//   getJoinedContests,
//   getTournaments,
//   createTournament,
//   getRoomDetails,
//   joinTournament,
//   getSingleTournament,
//   updateTournamentStatus,
//   uploadResult,
//   updateTournament,
//   addMoney,
//   getLeaderboard,
//   submitPaymentRequest,
//   getWallet,
// });

const {
  getUsersCollection,
} = require("../config/db");

exports.createTournament = async (
  req,
  res
) => {

  try {

    const db =
      getUsersCollection().db;

    const tournamentsCollection =
      db.collection("tournaments");

    const tournament = {
      ...req.body,
      createdAt: new Date(),
    };

    const result =
      await tournamentsCollection.insertOne(
        tournament
      );

    res.status(201).json({
      success: true,
      insertedId: result.insertedId,
      tournament,
    });

  } catch (error) {

    console.log(
      "Tournament Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};
exports.getTournaments = async (
  req,
  res
) => {

  try {

    const db =
      getUsersCollection().db;

    const tournamentsCollection =
      db.collection("tournaments");

    const tournaments =
      await tournamentsCollection
        .find({})
        .sort({ createdAt: -1 })
        .toArray();

    res.status(200).json({
      success: true,
      tournaments,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};
exports.deleteTournament = async (
  req,
  res
) => {

  try {

    const db =
      getUsersCollection().db;

    const tournamentsCollection =
      db.collection("tournaments");

    const { ObjectId } =
      require("mongodb");

    await tournamentsCollection.deleteOne({
      _id: new ObjectId(
        req.params.id
      ),
    });

    res.status(200).json({
      success: true,
      message:
        "Tournament deleted",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};


exports.joinTournament = async (
  req,
  res
) => {

  try {

    const db =
      getUsersCollection().db;

    const joinedCollection =
      db.collection(
        "joinedContests"
      );

    const tournamentsCollection =
      db.collection(
        "tournaments"
      );

    const usersCollection =
      db.collection("users");

    const { ObjectId } =
      require("mongodb");

    const joinData = {

      tournamentId:
        req.body.tournamentId,

      userName:
        req.body.userName,

      userUID:
        req.body.userUID,

      joinedAt: new Date(),

    };

    const tournament =
      await tournamentsCollection.findOne({

        _id: new ObjectId(
          req.body.tournamentId
        ),

      });

    if (!tournament) {

      return res.status(404).json({

        success: false,

        message:
          "Tournament not found",

      });

    }

    const user =
      await usersCollection.findOne({

        uid: req.body.userUID,

      });

    if (!user) {

      return res.status(404).json({

        success: false,

        message:
          "User not found",

      });

    }

    if (

      Number(user.wallet) <

      Number(tournament.entryFee)

    ) {

      return res.status(400).json({

        success: false,

        message:
          "Insufficient wallet balance",

      });

    }

    if (tournament.slots <= 0) {

      return res.status(400).json({

        success: false,

        message:
          "Tournament Full",

      });

    }

    const alreadyJoined =
      await joinedCollection.findOne({

        tournamentId:
          req.body.tournamentId,

        userUID:
          req.body.userUID,

      });

    if (alreadyJoined) {

      return res.status(400).json({

        success: false,

        message:
          "You already joined this tournament",

      });

    }

    await joinedCollection.insertOne(
      joinData
    );

    await usersCollection.updateOne(

      {
        uid: req.body.userUID,
      },

      {
        $inc: {

          wallet:
            -Number(
              tournament.entryFee
            ),

        },
      }

    );

    await tournamentsCollection.updateOne(

      {
        _id:
          new ObjectId(
            req.body.tournamentId
          ),
      },

      {
        $inc: {
          slots: -1,
        },
      }

    );

    res.status(201).json({

      success: true,

      message:
        "Tournament Joined",

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};
exports.getJoinedContests =
  async (req, res) => {

    try {

      const db =
        getUsersCollection().db;

      const joinedCollection =
        db.collection(
          "joinedContests"
        );

      const contests =
        await joinedCollection
          .find({})
          .sort({ joinedAt: -1 })
          .toArray();

      res.status(200).json({
        success: true,
        contests,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  };
exports.getRoomDetails =
  async (req, res) => {

    try {

      const db =
        getUsersCollection().db;

      const tournamentsCollection =
        db.collection(
          "tournaments"
        );

      const { ObjectId } =
        require("mongodb");

      const tournament =
        await tournamentsCollection.findOne({

          _id: new ObjectId(
            req.params.id
          ),

        });

      res.status(200).json({
        success: true,
        tournament,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  };
exports.getWallet =
  async (req, res) => {

    try {

      const walletData = {
        balance: 2500,
        bonus: 300,
        winnings: 1200,
      };

      res.status(200).json({
        success: true,
        walletData,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  };
exports.getSingleTournament =
  async (req, res) => {

    try {

      const db =
        getUsersCollection().db;

      const tournamentsCollection =
        db.collection(
          "tournaments"
        );

      const { ObjectId } =
        require("mongodb");

      const tournament =
        await tournamentsCollection.findOne({

          _id: new ObjectId(
            req.params.id
          ),

        });

      res.status(200).json({
        success: true,
        tournament,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  };
exports.updateTournamentStatus =
  async (req, res) => {

    try {

      const db =
        getUsersCollection().db;

      const tournamentsCollection =
        db.collection(
          "tournaments"
        );

      const { ObjectId } =
        require("mongodb");

      await tournamentsCollection.updateOne(

        {
          _id: new ObjectId(
            req.params.id
          ),
        },

        {
          $set: {
            status:
              req.body.status,
          },
        }

      );

      res.status(200).json({

        success: true,

        message:
          "Tournament status updated",

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message: error.message,

      });

    }

  };

exports.uploadResult =
  async (req, res) => {

    try {

      const db =
        getUsersCollection().db;

      const resultsCollection =
        db.collection("results");

      const resultData = {

        ...req.body,

        createdAt:
          new Date(),

      };

      await resultsCollection.insertOne(
        resultData
      );

      const tournamentsCollection =
        db.collection(
          "tournaments"
        );

      await tournamentsCollection.updateOne(

        {
          _id: require("mongodb")
            .ObjectId.createFromHexString(
              req.body.tournamentId
            ),
        },

        {
          $set: {
            status:
              "Completed",
          },
        }

      );

      const usersCollection =
        db.collection("users");

      await usersCollection.updateOne(

        {
          uid:
            req.body.winnerUID,
        },

        {
          $inc: {

            wallet:
              Number(
                req.body.winningAmount
              ),

          },
        }

      );

      res.status(201).json({

        success: true,

        message:
          "Result uploaded",

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message: error.message,

      });

    }

  };
exports.getLeaderboard =
  async (req, res) => {

    try {

      const db =
        getUsersCollection().db;

      const resultsCollection =
        db.collection("results");

      const leaderboard =
        await resultsCollection

          .find({})

          .sort({
            winningAmount: -1,
          })

          .toArray();

      res.status(200).json({

        success: true,

        leaderboard,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message: error.message,

      });

    }

  };

exports.updateTournament =
  async (req, res) => {

    try {

      const db =
        getUsersCollection().db;

      const tournamentsCollection =
        db.collection(
          "tournaments"
        );

      const { ObjectId } =
        require("mongodb");

      await tournamentsCollection.updateOne(

        {
          _id: new ObjectId(
            req.params.id
          ),
        },

        {
          $set: {

            ...req.body,

            updatedAt:
              new Date(),

          },
        }

      );

      res.status(200).json({

        success: true,

        message:
          "Tournament updated",

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message: error.message,

      });

    }

  };

exports.addMoney =
  async (req, res) => {

    try {

      const db =
        getUsersCollection().db;

      const usersCollection =
        db.collection("users");

      const transactionsCollection =
        db.collection(
          "transactions"
        );

      const {
        uid,
        amount,
      } = req.body;

      await usersCollection.updateOne(

        {
          uid,
        },

        {
          $inc: {

            wallet:
              Number(amount),

          },
        }

      );

      await transactionsCollection.insertOne({

        uid,

        amount,

        type: "Deposit",

        createdAt:
          new Date(),

      });

      res.status(200).json({

        success: true,

        message:
          "Money added successfully",

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message: error.message,

      });

    }

  };
  exports.submitPaymentRequest =
  async (req, res) => {

    try {

      res.status(200).json({
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

