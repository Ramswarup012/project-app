import mongoose from "mongoose";

const addMoneyRequestSchema = new mongoose.Schema(
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

    transactionId: {
      type: String,
      required: true,
    },

    screenshot: {
      type: String,
      default: "",
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

const AddMoneyRequest = mongoose.model(
  "AddMoneyRequest",
  addMoneyRequestSchema
);

export default AddMoneyRequest;