const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
var VideoSchema = new mongoose.Schema({
  user_id: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    maxlength: 20,
    required: true,
  },
  description: {
    type: String,
    maxlength: 500,
    required: true,
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
    default: ""
  }
  // category: {
  //   type: ObjectId,
  //   ref: "Category",
  //   required: true,
  // },
});

module.exports = mongoose.model("Video", VideoSchema);
