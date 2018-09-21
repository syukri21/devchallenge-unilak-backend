import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    user: {
      type: String,
      required: true,
      unique: true
    },
    namalengkap: String,
    password: String,
    stream: String,
    level: String,
    rating: Number,
    pointburn: Number,
    pointremain: Number,
    pointqueue: Number,
    totalpoint: Number,
    uid: {
      type: Array,
      default: []
    }
  },
  { collection: "users", timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
