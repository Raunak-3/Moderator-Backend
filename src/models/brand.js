import mongoose from "mongoose";

const brandSchema = mongoose.Schema(
  {
    brandName: {
      type: String,
      required: true,
    },
    brandEmail: {
      type: String,
      required: true,
    },
    brandPassword: {
      type: String,
      required: true,
    },
    brandPhoneNumber: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
    },
    skillsRequired: [{ type: String }],
    profileStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    payment: [
      {
        method: { type: String },
        UPIId: { type: String },
        provider: { type: String },
        accountNumber: { type: String },
      },
    ],
    isReviewed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Brand = mongoose.model("Brand", brandSchema);
