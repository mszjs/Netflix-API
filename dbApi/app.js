const express = require('express');
const mongoose = require('mongoose');
const restify = require('express-restify-mongoose');
const router = express.Router();
const port = 10011;
const app = express();
const User = require('./models/user');
const { Video } = require('./models/video');
const Session = require('./models/session_id');
const userVideos = require('./routes/myvideos.js');
const login = require('./routes/login.js');
const logout = require('./routes/logout.js');

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

mongoose.connect('mongodb://mongo_compose:27017/netflix');

app.use(router);

let resolveAppStarted;

app.appStarted = new Promise(function (resolve, reject) {
  resolveAppStarted = resolve;
});

app.listen(port, function () {
  console.log(`Express server listening on port ${port}`);
  resolveAppStarted();
});

router.route('/listVideos').post(userVideos.post);
router.route('/listVideos').get(userVideos.get);
router.route('/login').post(login.post);
router.route('/logout').get(logout.get);

restify.serve(router, User);
restify.serve(router, Video);
restify.serve(router, Session);

module.exports = {
  app
};