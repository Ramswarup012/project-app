import mongoose from "mongoose";

const withdrawRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    upiId: {
      type: String,
      required: true,
    },

    accountHolderName: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },

    remark: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const WithdrawRequest = mongoose.model(
  "WithdrawRequest",
  withdrawRequestSchema
);

export default WithdrawRequest;