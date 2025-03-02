import mongoose from "mongoose";

const User = mongoose.model("User", new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["organizer", "user"], default: "user" },
  createdAt: { type: Date, default: Date.now },
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }] // Reference to events posted by the organizer
}));

export default User;
