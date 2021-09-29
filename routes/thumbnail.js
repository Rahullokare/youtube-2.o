const express = require("express");
const router = express.Router();
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const { getVideoById } = require("../controllers/video");
const {
  postThumbnail,
  getThumbnailById,
  getAllThumbnails,
  updateThumbnails,
  deleteThumbnail,
} = require("../controllers/thumbnail");

//PARAMS
router.param(":userId", getUserById);

router.param(":videoId", getVideoById);

router.param("thumbnailId", getThumbnailById);

//POST
router.post(
  "thumbnail/:videoId/create/:userId",
  isSignedIn,
  isAuthenticated,
  postThumbnail
);

//READ
router.get("thumbnail/render/thumbnailId", getThumbnailById);

router.get("thumbnail/getAll", getAllThumbnails);

//UPDATE
router.put(
  "thumbnail/thumbnailId/update/:userId",
  isSignedIn,
  isAuthenticated,
  updateThumbnails
);

//DELETE
router.delete(
  "thumbnail/thumbnailId/remove/:userId",
  isSignedIn,
  isAuthenticated,
  deleteThumbnail
);

module.exports = router;
