// string is used in ts, and capital String is used for mongodb

import mongoose from "mongoose";

interface IUser {
  _id?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  mobile?: string;
  role: "user" | "deliveryBoy" | "admin";
}
const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "deliveryBoy", "admin", "shakti"],
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
 