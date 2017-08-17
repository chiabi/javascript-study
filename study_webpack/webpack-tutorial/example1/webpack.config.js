const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index', // .js after index is optional
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    // UglifyJsPlugin : 자바스크립트 코드를 압축, console제거, 소스맵 보존 등을 하는 플러그인
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: true,
      },
    }),
    // OccurrenceOrderPlugin()는 webpack3에서는 기본적으로 추가되어있으므로 삭제했음
    // new webpack.optimize.OccurrenceOrderPlugin()
  ],
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        'style-loader', 
        'css-loader'
      ]
    }]
  }
}