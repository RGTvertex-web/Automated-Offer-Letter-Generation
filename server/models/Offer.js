const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
  {
    candidateId: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    
    candidateName: {
      type: String,
      required: true,
      trim: true,
    },

    candidateEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    designation: {
      type: String,
      required: true,
      trim: true,
    },

    department: {
      type: String,
      required: true,
      trim: true,
    },

    dateOfJoining: {
      type: Date,
      required: true,
    },

    stipendOrCTC: {
      type: String,
      required: true,
    },

    reportingManager: {
      type: String,
      required: true,
      trim: true,
    },

    offerIssueDate: {
      type: Date,
      required: true,
    },

    pdfUrl: {
      type: String,
      default: "",
    },

    emailStatus: {
      type: String,
      enum: ["Pending", "Sent", "Failed"],
      default: "Pending",
    },

    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Offer = mongoose.model("Offer", offerSchema);

module.exports = Offer;