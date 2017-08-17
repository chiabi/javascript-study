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