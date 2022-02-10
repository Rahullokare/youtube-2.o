const express = require("express");
const router = express.Router();
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
} = require("../controllers/category");
const { getUserById } = require("../controllers/user");

router.param(":userId", getUserById);

router.param(":categoryId", getCategoryById);

router.post(
  "/category/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);

router.put(
  "/category/update/:categoryId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCategory
);

router.delete(
  "/category/delete/:categoryId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteCategory
);
// router.get("/playlist/all", getAllPlaylists);

module.exports = router;
