'use strict';

const configExpress = require('./express');

const port = process.env.PORT || 8080;

start();

console.log(`Listening on port ${port}`);

function start() {
  process.env.NODE_ENV = process.env.NODE_ENV || 'local';

  const express = require('express'),
        app = express();


  // app.use('*', configExpress);
  configExpress(app);

  // START THE APP BY LISTENING ON <PORT>
  app.server = app.listen(port, (error) => {
    if (error) {
      console.error('error', error);
    }

    process.on('uncaughtException', (exception) => {
      console.error(exception.stack);
      process.exit(1);
    });
  });
};
