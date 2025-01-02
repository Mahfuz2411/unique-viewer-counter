import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  collectionName: String,
  count: { type: Number, default: 1 },
});

const User = mongoose.model("User", userSchema);

export default User;
