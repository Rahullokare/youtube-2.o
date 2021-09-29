const express = require("express");
const router = express.Router();
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const {
  createPlaylist,
  getAllPlaylists,
  getPlaylistById,
} = require("../controllers/playlist");

router.param(":userId", getUserById);

router.param(":playlistId", getPlaylistById);

router.post(
  "/playlist/create/:userId",
  isSignedIn,
  isAuthenticated,
  createPlaylist
);

router.get("/playlist/all", getAllPlaylists);

module.exports = router;
