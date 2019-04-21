var path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'sourcemap',
  entry: './client/client.js',
  output: {
    path: path.resolve(__dirname, 'client'),
    filename: 'client-bundle.js'
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
