import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    header: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Blog", BlogSchema);
