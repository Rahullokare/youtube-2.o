const Thumbnail = require("../models/thumbnail");
const multer = require("multer");
const path = require("path");

let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/thumbnails"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

let upload = multer({
  storage: storage,
  limit: { fileSize: 1000000 * 50 },
}).single("thumbnail");

exports.postThumbnail = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }
    const thumbnailVideo = await Video.findById(req.params.videoId);
    const thumbnail = new Thumbnail({
      video: thumbnailVideo,
      userId: req.auth._id,
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
    });
    thumbnail.save((err, thumb) => {
      if (err) {
        return res.status(500).json({
          error: err.message,
        });
      }
      return res.status(200).json({ thumb });
    });
  });
};

exports.getThumbnailById = (req, res, id, next) => {
  Thumbnail.findById(id).exec((err, thumbnail) => {
    if (err) {
      return res.status(400).json({
        error: "Err in uploading Thumbnail",
      });
    }
    req.thumbnail = thumbnail;
    next();
  });
};

exports.getAllThumbnails = (req, res) => {
  Thumbnail.find().exec((err, thumbnails) => {
    if (err) {
      return res.status(400).json({
        error: "Thumbnails not found",
      });
    }
    res.json(thumbnails);
  });
};

exports.updateThumbnails = (req, res) => {
  Thumbnail.findByIdAndUpdate(
    { _id: req.thumbnail_id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, thumbnail) => {
      if (err) {
        return res.status(400).json({
          error: "Not able to update thumbnails",
        });
      }
      res.json({ thumbnail });
    }
  );
};

exports.getThumbnailByCategory = async (req, res, id) => {
  //TODO:
};

exports.deleteThumbnail = (req, res) => {
  Thumbnail.findByIdAndDelete({ _id: req.thumbnail_id }, (err, thumbnail) => {
    if (err) {
      return res.status(400).json({
        error: "Not able to delete thumbnails",
      });
    }
  });
};
