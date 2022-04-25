const Channel = require("../models/channel");

exports.createChannel = (req, res) => {
  const channel = new Channel(req.body);
  channel.save((err, newChannel) => {
    if (err) {
      return res.status(400).json({
        err: "Failed to create channel",
      });
    }
    res.json({
      id: newChannel._id,
      name: newChannel.channel_name,
      description: newChannel.channel_description,
    });
  });
};

exports.getChannelById = (req, res, next, id) => {
  Channel.findById(id).exec((err, channel) => {
    if (err) {
      console.log("====================================");
      console.log(err);
      console.log("====================================");
      return res.status(400).json({
        err: "Channel Not Found",
      });
    }
    req.channel = channel;
    next();
  });
};
exports.getUserChannelById = (req, res, next, id) => {
  console.log(id, "id");
  Channel.find({ user_id: id }).exec((err, channel) => {
    if (err) {
      console.log("====================================");
      console.log(err);
      console.log("====================================");
      return res.status(400).json({
        err: "Channel Not Found",
      });
    }

    req.channel = channel;
    next();
  });
};

exports.getUserChannel = (req, res) => {
  return res.json(req.channel);
};

exports.getAllChannels = (req, res) => {
  Channel.find().exec((err, channels) => {
    if (err) {
      return res.status(400).json({
        err: "Channels not found",
      });
    }
    res.json(channels);
  });
};

exports.deleteChannel = (req, res) => {
  Channel.findByIdAndDelete({ _id: req.channel._id }, (err, channel) => {
    if (err) {
      return res.status(400).json({
        err: "Not able to delete channel",
      });
    }
  });
};
