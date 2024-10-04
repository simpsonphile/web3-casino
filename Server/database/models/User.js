import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    unique: true,
  },
  nickname: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  position: {
    x: { type: Number, required: true, default: 71 },
    y: { type: Number, required: true, default: 0 },
    z: { type: Number, required: true, default: -40 },
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
