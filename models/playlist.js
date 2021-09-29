const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

var playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  thumbnails: {
    type: ObjectId,
    ref: "Thumbnail",
  },
  channel_id: {
    type: ObjectId,
    ref: "Channel",
  },
  user_id: {
    type: ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Playlist", playlistSchema);
