const User = require("../models/user");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage: storage,
  limit: { fileSize: 1000000 * 100 },
}).single("profilePhoto");
exports.signup = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }
    console.log(req.body);
    const user = new User({
      profilePhoto: req.file.path,
      ...req.body,
    });

    user.save((err, user) => {
      if (err) {
        return res.status(400).json({
          err: err.message,
        });
      }
      res.json({
        name: user.name,
        email: user.email,
        profilePhoto: user.profilePhoto,
        id: user._id,
      });
    });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    //CHECK EMAIL
    if (err || !user) {
      return res.status(400).json({
        error: "user email not registered Please Signup!",
      });
    }

    //CHECK PASSWORD
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    //put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });
    //send response to frontend
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

//SIGNOUT
exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User Signout Sucessfully",
  });
};

//Protected routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
  algorithms: ["HS256"],
});

//custom middleware
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  // console.log(req.profile, "profile");
  // console.log(req.auth, "auth");
  // console.log(req.profile._id, "profile id");
  // console.log(req.auth._id, "auth Id");
  if (!checker) {
    return res.status(403).json({
      error: "Access denied",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.isAdmin === false) {
    return res.status(403).json({
      error: "You are not Admin, Access Denied",
    });
  }
  next();
};
