const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
var VideoSchema = new mongoose.Schema(
  {
    user_id: {
      type: ObjectId,
      ref: "User",
    },
    channel: {
      type: ObjectId,
      ref: "Channel",
    },
    title: {
      type: String,
      maxlength: 40,
      required: true,
    },
    description: {
      type: String,
      maxlength: 10000,
      required: true,
    },
    category: {
      type: String,
    },
    video_path: {
      type: String,
    },
    thumbnails: {
      type: Array,
      default: [],
    },
    file_name: {
      type: String,
    },
    file_size: {
      type: Buffer,
    },
    likes: {
      type: Array,
      default: [],
    },
    dislikes: {
      type: Array,
      default: [],
    },

    channel_name: {
      type: String,
      default: "",
    },

    // category: {
    //   type: ObjectId,
    //   ref: "Category",
    //   required: true,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", VideoSchema);
