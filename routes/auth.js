const express = require("express");
var router = express.Router();
const {
  signup,
  isSignedIn,
  isAdmin,
  isAuthenticateda,
  signin,
  signout,
} = require("../controllers/auth");

router.post("/signup", signup);

router.post("/signin", signin);

router.get("/signout", signout);

module.exports = router;
