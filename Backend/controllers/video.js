const Video = require("../models/video");
const path = require("path");
const multer = require("multer");
const Channel = require("../models/channel");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

// for thumbnails
const storage2 = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/thumbnail/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage });

const multipleUpload = upload.fields([
  { name: "video", maxCount: 1 },
  { name: "thumbnail", maxCount: 1 },
]);

const upload2 = multer({
  storage: storage2,
  limit: { fileSize: 1000000 * 100 },
}).single("thumb");

// step 1: video save
// step 2: thumbnail path update save video

exports.createVideo = (req, res) => {
  multipleUpload(req, res, (err) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }
    console.log(req.files);

    const video = new Video({
      video_path: req.files.video[0].path,
      user_id: req.auth._id,
      thumbnail: req.files.thumbnail[0].path,

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

    // return res.status(200).json(channel);
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
//get user
exports.getVideo = (req, res) => {
  return res.json(req.videoinfo);
};

exports.getAllVideos = (req, res) => {
  Video.find().exec((err, videos) => {
    if (err) {
      return res.status(400).json({
        error: "Videos not found",
      });
    }
    res.json(videos);
  });
};

exports.likeVideo = async (req, res) => {
  const likeVideo = await Video.findById(req.params.videoId);

  if (!likeVideo.likes.includes(req.params.userId)) {
    await likeVideo.updateOne({
      $push: { likes: req.params.userId },
    });
    return res.status(200).json({
      success: "Video Liked",
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
