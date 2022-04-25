const express = require("express");
const router = express.Router();
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const {
  createChannel,
  getAllChannels,
  getUserChannelById,
  getChannelById,
  deleteChannel,
  getUserChannel,
} = require("../controllers/channel");

router.param(":userId", getUserById);
router.param(":channelId", getChannelById);
router.param(":getUserChannelById", getUserChannelById);

//read
router.get("/channels", getAllChannels);

router.get("/finduserchannels/:getUserChannelById", getUserChannel);

//delete
router.delete(
  "/channel/:userId/:channelId/deleteChannel",
  isSignedIn,
  isAuthenticated,
  deleteChannel
);

module.exports = router;
