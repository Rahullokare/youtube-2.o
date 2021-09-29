const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
var ChannelSchema = new mongoose.Schema(
  {
    user_id: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    channel_name: {
      type: String,
      maxlength: 12,
      required: true,
    },
    channel_description: {
      type: String,
      required: true,
    },
    subscribers: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Channel", ChannelSchema);
