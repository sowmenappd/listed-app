import mongoose from "mongoose";

const collectionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false,
    },
    userId: {
      type: String,
      required: true,
      unique: false,
    },
  },
  {
    timestamps: true,
  }
);

const Collection = mongoose.model("Collection", collectionSchema);

export default Collection;
