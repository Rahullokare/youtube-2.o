const express = require("express");
const router = express.Router();
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const {
  createChannel,
  getAllChannels,
  getChannelById,
  deleteChannel,
} = require("../controllers/channel");

router.param(":userId", getUserById);
router.param(":channelId", getChannelById);

//read
router.get("/channels", getAllChannels);

//delete
router.delete(
  "/channel/:userId/:channelId/deleteChannel",
  isSignedIn,
  isAuthenticated,
  deleteChannel
);

module.exports = router;
