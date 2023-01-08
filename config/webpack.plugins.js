const IForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = [new IForkTsCheckerWebpackPlugin({
  logger: 'webpack-infrastructure',
})];
