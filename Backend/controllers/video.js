const Video = require("../models/video");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/"));
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage: storage,
  limit: { fileSize: 1000000 * 100 },
}).single("video");
exports.createVideo = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }
    const video = new Video({
      file_name: req.file.filename,
      video_path: req.file.path,
      user_id: req.auth._id,
      file_size: req.file.size,
      ...req.body,
    });
    video.save((err, vid) => {
      if (err) {
        return res.status(500).json({
          error: err.message,
        });
      }
      return res.status(200).json({ vid });
    });
  });
};

exports.getVideoById = (req, res) => {
  Video.findById(req.params.videoId).exec((err, video) => {
    if (err) {
      return res.status(200).json({
        error: "Wrong Video URL",
      });
    }
    req.videoinfo = video;
    return res.status(200).json({
      video,
    });
  });
};

exports.likeVideo = async (req, res) => {
  const likeVideo = await Video.findById(req.params.videoId);
  if (!likeVideo.likes.includes(req.auth._id)) {
    await likeVideo.updateOne({ $push: { likes: req.auth._id } });
    return res.status(200).json({
      success: "Video Like",
    });
  } else {
    return res.status(500).json({
      message: "You Already Like The Video",
    });
  }
};

exports.dislikeVideo = async (req, res) => {
  const dislikeVideo = await Video.findById(req.params.videoId);
  if (!dislikeVideo.dislikes.includes(req.auth._id)) {
    await dislikeVideo.updateOne({ $push: { dislikes: req.auth._id } });
    return res.status(200).json({
      success: "Video Dislikes",
    });
  } else {
    return res.status(500).json({
      message: "You Already Dislikes Video",
    });
  }
};

exports.updateVideo = (req, res) => {
  Video.findByIdAndUpdate(
    { _id: req.videoinfo._id },
    { $set: req.videoinfo.description },
    { new: true, useFindAndModify: false },
    (err, video) => {
      if (err) {
        return res.status(400).json({
          error: "Error While updating video...",
        });
      }
      res.json({ video });
    }
  );
};

exports.deleteVideo = (req, res) => {
  const video = Video.findById(req.params.videoId);
  video.remove((err, deletedVideo) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete the product",
      });
    }
    return res.status(200).json({
      message: "Delete was a success",
      deletedVideo,
    });
  });
};