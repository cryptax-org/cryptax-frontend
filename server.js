'use strict';

const configExpress = require(__dirname + '/server/express');

start();

function start() {
  process.env.NODE_ENV = process.env.NODE_ENV || 'local';

  const express = require('express'),
        app = express();


  // app.use('*', configExpress);
  configExpress(app);

  // START THE APP BY LISTENING ON <PORT>
  app.server = app.listen(process.env.PORT || 8080, (error) => {
    if (error) {
      console.error('error', error);
    }

    process.on('uncaughtException', (exception) => {
      console.error(exception.stack);
      process.exit(1);
    });
  });
};
