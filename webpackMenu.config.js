var path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'sourcemap',
  entry: './menu/menu.js',
  output: {
    path: path.resolve(__dirname, 'menu'),
    filename: 'menu-bundle.js',
    library: 'menu',
    libraryTarget: 'umd'
  },
  target: 'electron-main'
};