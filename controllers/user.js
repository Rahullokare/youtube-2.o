const User = require("../models/user");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        err: "Not able to find user ",
      });
    }
    req.profile = user;
    next();
  });
};

//get user
exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;
  return res.json(req.profile);
};

//update user
exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id }, //find user
    { $set: req.body }, //what to update
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "you are not authorized to update this info",
        });
      }
      user.salt = undefined;
      user.encry_password = undefined;
      user.createdAt = undefined;
      user.updatedAt = undefined;
      res.json(user);
    }
  );
};

exports.deleteUser = (req, res) => {
  User.findByIdAndDelete({ _id: req.profile._id }, (err, user) => {
    if (err) {
      return res.status(400).json({
        err: "Not able to delete User",
      });
    }
  });
};
