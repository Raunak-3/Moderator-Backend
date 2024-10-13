import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter Name"],
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
  },
  password: {
    type: String,
    required: [true, "Password Required"],    
  },
});

export const Admin = mongoose.model("Admin", adminSchema);