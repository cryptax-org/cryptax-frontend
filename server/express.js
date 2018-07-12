const express = require('express');
const path = require('path');

const rootPath = __dirname + '/..';

const configExpress = (app) => {
  app.use('/', express.static(`${rootPath}/dist`));

  app.get('*', (req, res) => {
    res.sendFile(path.normalize(`${rootPath}/dist/index.html`));
  });
}

module.exports = configExpress;
