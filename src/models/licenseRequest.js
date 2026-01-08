const mongoose = require("mongoose");

const licenseRequestSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    placeOfBirth: { type: String, required: true, trim: true },
    yearOfBirth: { type: Number, required: true },
    vehicleType: { type: String, default: "A1" },

    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },

    licenseId: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LicenseRequest", licenseRequestSchema);
