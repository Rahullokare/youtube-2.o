const express = require("express");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const router = express.Router();
const {
  getUserById,
  updateUser,
  getUser,
  deleteUser,
} = require("../controllers/user");
const Channel = require("../models/channel");

//get user by id
router.param("userId", getUserById);

//GET
router.get("/user/userId", getUser);

// router.get("/user/");

//update
router.put("/user/userId", isSignedIn, isAuthenticated, updateUser);

//delete
router.delete("/user/userId", isSignedIn, isAuthenticated, deleteUser);

//create channel

router.post("/create/channel", isSignedIn, (req, res) => {
  const channel = new Channel({
    user_id: req.auth._id,
    ...req.body,
  });

  channel.save((err, chanal) => {
    if (err) {
      return res.status(400).json({
        error: err.message,
      });
    }
    return res.status(200).json(chanal);
  });
});

module.exports = router;
