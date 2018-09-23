import mongoose from "mongoose";

const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    project: {
      type: String,
      required: true,
      unique: true
    },
    projectnama: String,
    unit: String,
    stakeholder: String,
    sprint: Number,
    status: String,
    rating: Number,
    description: String,
    stardate: String,
    enddate: String,
    uid: {
      type: Array,
      default: []
    }
  },
  { collection: "projects", timestamps: true }
);

module.exports = mongoose.model("projects", projectSchema);
