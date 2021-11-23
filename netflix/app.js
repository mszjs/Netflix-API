'use strict';

const SwaggerExpress = require('swagger-express-mw');
const cors = require('cors');
const app = require('express')();
const { myPort } = require('./config');

app.use(cors());

var config = {
  appRoot: __dirname
};

SwaggerExpress.create(config, function (err, swaggerExpress) {
  if (err) { throw err; }

  swaggerExpress.register(app);

  var port = myPort;
  let resolveAppStarted;

  app.appStarted = new Promise(function (resolve, reject) {
    resolveAppStarted = resolve;
  });

  app.listen(port, function () {
    resolveAppStarted();
  });
});

module.exports = {
  app
};

