const express = require("express");
const {
  addVideo,
  getVideo,
  addView,
  trend,
  random,
  sub,
  getByTag,
  search,
  view,
  getVideos,
  music,
  sports,
  gaming,
  news,
} = require("../controllers/video.js");
const { verifyToken } = require("../verifyToken.js");

const router = express.Router();

// router.post("/", verifyToken, addVideo);
router.post("/", addVideo);
router.put("/:id", verifyToken, addVideo);
router.delete("/:id", verifyToken, addVideo);
router.get("/find/:id", getVideo);
router.get("/userVideos/:id", getVideos);
router.put("/view/:id", addView);
router.get("/trend", trend);
router.get("/music", music);
router.get("/sports", sports);
router.get("/random", random);
router.get("/gaming", gaming);
router.get("/news", news);
router.get("/undefined", random); // when we intially sign in
router.get("/sub", sub);
router.get("/tags", getByTag);
router.get("/search", search);
router.put("/view/:id", view);
module.exports = router;
