const path = require('path');
const rootPath = __dirname + '/..';

const configExpress = (app) => {
  app.get('*', function (req, res) {
    res.sendFile(path.normalize(rootPath + '/public/index.html'));
  });
}

module.exports = configExpress;
