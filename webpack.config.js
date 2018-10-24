const path = require('path');

module.exports = {
  entry: './framework/src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'framework/dist')
  },
  devtool: 'eval-source-map',
};
