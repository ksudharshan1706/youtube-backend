const { createError, deleteUser, getUser } = require("../error.js");
const Video = require("../models/Video.js");
const User = require("../models/users.js");
exports.update = async (req, res, next) => {
  console.log(req.body);

  if (req.params.id === req.body.currentUser._id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can update only your account!"));
  }
};

exports.deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted.");
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can delete only your account!"));
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

exports.subscribe = async (req, res, next) => {
  const id = req.body.currentUser._id || req.user.id;
  // console.log(req.body.currentUser._id);
  try {
    await User.findByIdAndUpdate(id, {
      $push: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });
    res.status(200).json("Subscription successfull.");
  } catch (err) {
    next(err);
  }
};
exports.unsubscribe = async (req, res, next) => {
  const id = req.body.currentUser._id || req.user.id;
  // console.log(req.body.currentUser._id);
  try {
    await User.findByIdAndUpdate(id, {
      $pull: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 },
    });
    res.status(200).json("UnSubscription successfull.");
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

exports.like = async (req, res, next) => {
  const id = req.body.currentUser._id || req.user.id;
  const videoId = req.params.videoId;
  console.log(videoId, id);
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: id },
      $pull: { dislikes: id },
    });
    res.status(200).json("The video has been liked.");
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};
exports.dislike = async (req, res, next) => {
  const id = req.body.currentUser._id || req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: id },
      $pull: { likes: id },
    });
    res.status(200).json("The video has been disliked.");
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

// exports.like = async (req, res, next) => {
//   const id = req.user.id;
//   const videoId = req.params.videoId;
//   console.log(videoId, id);
//   try {
//     await Video.findByIdAndUpdate(videoId, {
//       $addToSet: { likes: id },
//       $pull: { dislikes: id },
//     });
//     res.status(200).json("The video has been liked.");
//   } catch (err) {
//     console.log(err.message);
//     next(err);
//   }
// };
// exports.dislike = async (req, res, next) => {
//   const id = req.user.id;
//   const videoId = req.params.videoId;
//   try {
//     await Video.findByIdAndUpdate(videoId, {
//       $addToSet: { dislikes: id },
//       $pull: { likes: id },
//     });
//     res.status(200).json("The video has been disliked.");
//   } catch (err) {
//     console.log(err.message);
//     next(err);
//   }
// };
