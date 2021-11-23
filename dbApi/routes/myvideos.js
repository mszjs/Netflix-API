const User = require('../models/user');
const { Video } = require('../models/video');
const Session = require('../models/session_id');
const mongoose = require('mongoose');

module.exports.get = async (req, res) => {
  const sessionID = req.get('sessionID');
  const currentUser = await Session.find({
    'sessionID': sessionID,
  });
  console.log(currentUser);
  if (currentUser.length == 0) {
    res.status(400).json({
      message: "User not found"
    })
  } else {
    const user = await User.findById({
      '_id': currentUser[0]['userId']
    });
    res.status(200).json(user.myVideos);
  }
};

module.exports.post = async (req, res) => {
  const sessionID = req.get('sessionID');
  const videoForPush = req.body;
  console.log(videoForPush);
  const currentUser = await Session.find({
    'sessionID': sessionID,
  });
  if (currentUser.length == 0) {
    res.status(400).json({
      message: "User not found"
    })
  } else {
    const user = await User.findById({
      '_id': currentUser[0]['userId']
    });

    let checkVideoInQueue = false;
    for (let i = 0; i < user.myVideos.length; i++) {
      if (user.myVideos[i].title == videoForPush.title) {
        checkVideoInQueue = true;
        break;
      }
    }
    if (checkVideoInQueue == false) {
      user.myVideos.push(videoForPush);
      user.save();
      res.status(200).json({
        message: "added to queue"
      });
    } else {
      res.status(400).json({
        message: "video is already in queue"
      })
    }
  }
};