# Webpack: The Basics
https://hackernoon.com/webpack-the-basics-2712a7ad640b

## Add Webpack as a script

다음 스크립트를 `package.json`에 추가합니다.

```json
"scripts": {
  "build": "webpack",
  "start": "webpack --watch"
},
```
## File structure

1. 프로젝트 루트에 `src`라는 새 폴더를 만듭니다. 
1. `src` 안에 `app.js`라는 파일을 만듭니다. 여기서 우리의 모든 .js 및 .scss 파일을 가리 킵니다. 
1. 프로젝트 루트에 `index.html` 파일을 만듭니다. 
1. `index.html`의 `</body>` 앞에 JavaScript를 참조하십시오.

## Webpack config

+ 프로젝트의 루트에 `webpack.config.js`라는 파일을 만듭니다. 
+ Webpack의 사용 방법을 알려줄 다음 스니펫을 복사하여 붙여 넣습니다.

```javascript
const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};
```

### Entry and output

+ __Entry__ : 방금 작성한 파일 및 폴더와 마찬가지로 entry(항목) 파일은 `app.js`이며 `src` 폴더 내에 있습니다. 
+ __Output__ : Webpack에서 모든 준비 파일을 위치시킵니다. 파일 이름은 `bundle.js`이고 `dist`(배포판) 폴더 안에 나타납니다.

## Add JavaScript

이제 Webpack이 사용할 코드를 작성하십시오.

1. `src` 폴더로 이동하여 `js`라는 새 폴더를 만듭니다. 
1. `js` 안에 `rainbows.js`라는 자바 스크립트 파일을 만듭니다. 
1. `rainbows.js`에 몇 가지 JavaScript를 작성하십시오. 예를 들면 다음과 같습니다.
```javascript
console.log('This is rainbows.js')
```
4. `unicorns.js`라는 js 안에 다른 JavaScript 파일을 만듭니다. 
5. `unicorns.js`에 몇 가지 JavaScript를 작성하십시오. 예를 들면 다음과 같습니다.
```javascript
console.log('Hello, unicorns!')
```
6. `app.js`에 다음을 추가하여 `rainbows.js` 및 `unicorns.js`를 가져옵니다.
```javascript
import './js/rainbows.js';
import './js/unicorns.js';
```
7. 다음을 실행하여 터미널에서 webpack을 시작합니다.
```sh
$ npm run build
```

실행 결과 `dist` 폴더가 생성됩니다.

브라우저에서 `index.html`을 열어 개발자 도구를 열고 콘솔을 보면 
`rainbows.js`와 `unicorns.js`의 콘솔 메시지가 표시되어 있습니다.

## Add SCSS

1. `scss`라는 `src` 안에 새 폴더를 추가하십시오. 
1. `base.scss`라는 scss 파일을 추가하십시오. 
1. `base.scss` 안에 CSS를 작성하십시오. 예를 들면 다음과 같습니다.
```scss
$bg-color: pink;

body {
  background: $bg-color;
}
```
4. `src/app.js` 다음과 같이 `base.scss`를 import 시킵니다.
```javascript
// app.js
import './scss/base.scss'
```

※ webpack으로 이 sass 스타일을 읽으려면 추가 loader가 필요합니다.

## Add styling loaders

1. 터미널에서 다음을 실행하여 __style-loader__ , __css-loader__ , __sass-loader__ , __node-sass__ , __extract-text-webpack-plugin__ 을 설치하십시오.
```sh
npm install style-loader css-loader sass-loader node-sass extract-text-webpack-plugin -D
```
2. `webpack.config.js`의 맨 위에 __Extract Text Plugin__ 을 추가하십시오. 그러면 CSS가 별도의 파일로 이동합니다.
```javascript
// webpack.config.js
const ExtractTextPlugin = require('extract-text-webpack-plugin');
```
3. 이제 우리는 webpack에게 .scss 파일을 찾도록 할 것입니다.  
webpack은 Extract Text Plugin과 CSS, SASS-laoder를 통해 .scss 파일들을 실행합니다.  
`output` 다음에 붙여 넣으십시오, comma를 잊지마세요.
```javascript
// webpack.config.js
output: {
  
},
modules: {
  rules: [
    {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader']
      })
    }
  ]
}
```
4. 마지막 중괄호 앞에 Extract Text Plugin을 참조해야합니다.  
이렇게 하면 webpack은 `style.css`라는 별도의 파일에 모든 CSS를 압축합니다.
```javascript
// webpack.config.js
pulgins: [
  new ExtractTextPlugin('style.sss')
]
```

### wepack.config.js

지금까지의 과정을 따라했다면 지금 `webpakc.config.js` 다음과 같이 작성되었을 것입니다.
```javascript
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css')
  ]
};
```

## Let’s tell the HTML all about it!

1. CSS를 `<head>`안에 다음과 같이 참조시킵니다.
```html
<link rel="stylesheet" herf="dis/style.css">
```
2. 터미널에서 webpack을 실행합니다.
```sh
$ npm run build
```
3. 브라우저에서 `index.html` 파일을 연다. 핑크색 배경색이 지정되어있으면 css가 포함되어 있음을 의미합니다.
4. webpack watch 명령을 사용하여 처음에 npm 스크립트에 추가 했으므로 변경 작업을 할 때마다 실행할 필요가 없습니다. 에디터에 저장하면 Webpack이 자동으로 다시로드됩니다.
```sh
$ npm run start
```
5. 이제 `base.scss`를 변경하십시오. 예를 들면 다음과 같습니다.
```scss
$bg-color: orange
```
6. 브라우저 창을 새로 고칩니다. 이제 배경이 주황색이어야합니다.

## Adding and editing files
1. `src/sccs` 내에 `typography.scss`라는 파일을 만듭니다.
2. 다음과 같은 scss를 작성하십시오
```scss
@import url('https://fonts.googleapis.com/css?family=Roboto');

$base-font: 'Roboto';
$title-padding: 3em;

h1 {
  font-family: $base-font;
  padding: $title-padding;
}
```
3. `src/app.js`에 `typrography.scss`를 import 합니다.
```javascript
// app.js
import './scss/typography.scss';
```
4. 브라우저를 새로고침하여 폰트가 변경되었는지 확인합니다.