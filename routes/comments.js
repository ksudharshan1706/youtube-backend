const {
  addComment,
  deleteComment,
  getComments,
} = require("../controllers/comment.js");
const { verifyToken } = require("../verifyToken.js");
const express = require("express");

const router = express.Router();
// router.post("/", verifyToken, addComment);
router.post("/", addComment);
// router.delete("/:id", verifyToken, deleteComment);
router.delete("/:id", deleteComment);
router.get("/:videoId", getComments);
module.exports = router;
