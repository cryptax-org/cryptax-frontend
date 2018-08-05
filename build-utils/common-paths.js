const path = require('path');
const PROJECT_ROOT = path.resolve(__dirname, '../');

module.exports = {
  projectRoot: PROJECT_ROOT,
  outputPath: path.join(PROJECT_ROOT, 'dist'),
  appEntry: path.join(PROJECT_ROOT, 'src/client'),
  components: path.join(PROJECT_ROOT, 'src/app/views/components'),
  layouts: path.join(PROJECT_ROOT, 'src/app/views/layouts'),
  pages: path.join(PROJECT_ROOT, 'src/app/views/pages'),
  enhancers: path.join(PROJECT_ROOT, 'src/app/views/enhancers'),
  routes: path.join(PROJECT_ROOT, 'src/app/routes'),
  state: path.join(PROJECT_ROOT, 'src/app/state')
};
