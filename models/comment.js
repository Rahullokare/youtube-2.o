const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
var CommentSchema = new mongoose.Schema({
  video_id: {
    type: ObjectId,
    ref: "Video",
    required: true,
  },
  user_id: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    maxlength: 200,
    required: true,
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
