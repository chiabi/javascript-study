module.exports = {
  entry: {
    'entry': './entry.js'
  },
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/, // .css 확장자로 끝나는 파일을 로드할 경우 
        use: [ // css-loader와 style-loader를 거치도록 하겠다는 의미
          // 같은 파일에 대해서 로더는 아래쪽부터 순서대로 동작한다.
          'style-loader',
          'css-loader' 
        ]
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [[
            'env', {
              targets: {
                borwsers: ['last 2 versions']
              }
            }
          ]]
        }
      }
    ]
  }
};
