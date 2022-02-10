const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
var thumbnailSchema = new mongoose.Schema({
  video: {
    type: ObjectId,
    ref: "Video",
    required: true,
  },
  file_size: {
    type: String,
    required: true,
  },
  thumbnail_path: {
    type: String,
    required: true,
  },
  video_category: {
    type: ObjectId,
    ref: "Category",
  },
});

module.exports = mongoose.model("Thumbnail", thumbnailSchema);
