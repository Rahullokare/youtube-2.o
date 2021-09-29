const express = require("express");
const { getCommentById } = require("../controllers/comment");
const { getUserById } = require("../controllers/user");
const { getVideoById } = require("../controllers/video");
const router = express.Router();

// router.param(":commentId", getCommentById);

router.param(":videoId", getVideoById);

router.param(":userId", getUserById);
router.post("/:videoId");

module.exports = router;
