const express = require("express");
const router = express.Router();
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const { getVideoById, createVideo ,getAllVideos} = require("../controllers/video");
const {
  createPlaylist,
  getAllPlaylists,
  getPlaylistById,
} = require("../controllers/playlist");

const Channel = require("../models/channel");

router.param(":videoId", getVideoById);

router.param(":userId", getUserById);


router.get("/videos/getAll", getAllVideos);

router.post(
  "/video/create/:userId",
  isSignedIn,
  isAuthenticated,
  createVideo,
  (req, res) => {
    Channel.findById(req.auth._id).exec((err, user) => {
      if (err) {
        return res.status(400).json({
          err: "You Haven't Created Channel",
        });
      }
    });
  }
);

router.get("/video/render/:videoId");

module.exports = router;
