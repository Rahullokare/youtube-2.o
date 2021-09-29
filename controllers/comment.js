const Comment = require("../models/comment");
const User = require("../models/user");

exports.postComment = (req, res) => {
  const comment = new Comment({
    user_id: req.auth._id,
    video_id: req.params.videoId,
    ...req.body,
  });
  comment.save((err, comment) => {
    if (err) {
      return res.status(400).json({
        err: "error in posting comment",
      });
    }

    res.json({ comment });
  });
};

exports.getCommentsById = (req, res, next, id) => {
  Comment.findById({ videoid: req.params.videoId }).exec((err, comment) => {
    if (err) {
      return res.status(400).json({
        err: "Comment not found!",
      });
    }

    req.comment = comment;
    next();
  });
};

exports.updateComment = (req, res) => {
  Comment.findByIdAndUpdate(
    { videoid: req.params.videoId },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, comment) => {
      if (err) {
        return res.status(400).json({
          err: "Comment not updated!",
        });
      }
      return res.status(200).json({ comment });
    }
  );
};

exports.deleteComment = (req, res) => {
  Comment.findByIdAndDelete({ _id: req.comment._id }, (err, user) => {
    if (err) {
      return res.status(400).json({
        err: "Not able to delete Comment",
      });
    }
  });
};
