# Node.js


> + Chrome V8 JavaScript 엔진으로 빌드된 JavaScript 런타임이다.
> + 이벤트 기반, 논 블로킹 I/O 모델을 사용해 가볍고 효율적이다.
> + Node.js의 패키지 생태계인 npm은 세계에서 가장 큰 오픈 소스 라이브러리 생태계이다.

주로 서버사이드 어플리케이션 개발에 사용되는 소프트웨어 플랫폼이다.
## 설치

[nodejs.org](https://nodejs.org/ko/)
LTS 버전을 다운로드 한다. `npm`도 동시에 설치된다.

> __LTS(Long Term Support)__  
장기적으로 지원되도록 고안된 소프트웨어의 특수 버전 또는 에디션 유형 (안정적)

+ Windows : C:\Program Files\nodejs\node.exe
+ Mac     : /usr/local/bin/node

node.js와 npm 버전을 출력해 제대로 설치되었는지 확인한다.

```sh
$ node -v
v6.10.0
$ npm -v
5.3.0
```

__npm 최신 버전 업데이트__
```sh
$ npm install npm@latest -g
$ npm -v
```
## Node.js의 특징

+ __비동기 I/O 처리(Non-blocking I/O) / 이벤트 위주__  
Node.js 라이브러리의 모든 API는 비동기식이다. (Non-blocking)  
Node.js 기반 서버는 API가 실행되었을 때, 데이터를 반환할때까지 기다리지 않고 다음 API를 실행한다.  
이전에 실행했던 API가 결과값을 반환할 시, NodeJS의 이벤트 알림 메커니즘을 통해 결과값을 받아온다.
+ __빠른속도__  
Google Chrome V8 JavaScript 엔진을 사용해 빠른 코드 실행을 제공한다.
+ __단일 스레드 / 뛰어난 확장성__  
Node.js는 이벤트 루프와 함께 단일 스레드 모델을 사용한다.  
이벤트 메커니즘은 서버가 멈추지 않고 반응하도록 해주어 서버의 확장성을 키워준다.
반면,  일반적인 웹서버는 (Apache) 요청을 처리하기 위하여 제한된 스레드를 생성한다. Node.js 는 스레드를 한개만 사용하고  Apache 같은 웹서버보다 훨씬 많은 요청을 처리할 수 있다.
+ __노 버퍼링__  
Node.js 어플리케이션에는 데이터 버퍼링이 없고, 데이터를 chunk로 출력한다.

> __스레드(thread)__   
스레드(thread)는 어떠한 프로그램 내에서, 특히 프로세스 내에서 실행되는 흐름의 단위를 말한다.  
일반적으로 한 프로그램은 하나의 스레드를 가지고 있지만, 프로그램 환경에 따라 둘 이상의 스레드를 동시에 실행할 수 있다.(멀티스레드)

※ Node는 웹서버가 아니다. 코드를 실행할 수 있는 하나의 방법에 불과한 자바스크립트 런타임일 뿐이다. 단, http 서버 모듈을 내장하고 있어 HTTP Server를 작성하면 아피치와 같은 별도의 웹서버를 설치할 필요가 없다.

'Hello World'로 응답하는 Node.js 로 작성된 웹서버의 예 : 
```javascript
// example.js
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) = > {
  res.statusCode = 200;
  res.setHeader('Content-Type', text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log('Server running at http://${hostname}:${port}/');
});
```
```sh
$ node example.js
Server running at http://127.0.0.1:3000/
```

## 모듈 로딩 시스템

[참조 : poiemaweb](http://poiemaweb.com/nodejs-module)
Node.js는 CommonJS 방식의 module loading system으로 디펜던시를 로드할 수 있다.  
모듈은 자신만의 __독립적인 실행 영역(Scope)__ 가 있어야 하며 모듈 정의는 __exports 객체__ , 모듈 사용은 __require 함수__ 를 사용한다.

(※ Node.js는 파일마다 독립적인 파일 Scope가 있기 때문에 클라이언트 사이드 JavaScript와는 달리 전역변수의 중복 문제가 발생하지 않는다.)

모듈은 객체 또는 함수를 통해 정의한다.

### exports에 함수를 할당하는 방식

함수를 외부에 공개하는 경우. (1개의 모듈에 1개의 함수를 제공)
```javascript
// foo.js
// module 정의
module.exports = function(a, b) {
  return a + b;
};
```
```javascript
// app.js
// module 로드
var add = require('./foo.js'); // 확장자를 생략할 수 있다. require('./foo')

var result = add(1, 2);
console.log(result); // => 3
```

### exports에 객체를 할당하는 방식

객체를 외부에 공개하는 경우
```javascript
// foo.js
// module 정의
module.exports = {
  add: function(v1, v2) {
    return v1 + v2;
  },
  minus: function(v1, v2) {
    return v1 - v2;
  }
};
```
```javascript
// app.js
// module 로드
var calc = require('./foo');

var result1 = calc.add(1, 2);
console.log(result1); // => 3

var result2 = calc.minus(1, 2);
console.log(result2); // => -1
```

또는 module.exports에 다음과 같이 할당할 수도 있다.
```javascript
// foo.js
module.exports.add = function(v1, v2) {
  return v1 + v2;
};
module.exports.minus = function(v1, v2) {
  return v1 - v2;
};
```

### require

require 메서드의 인수에는 파일뿐만 아니라 디렉터리를 지정할 수도 있다.  
require는 modules.exports에 할당된 객체를 반환한다.

> project/
>    ├─ app.js
>    └─ module/ 
>         ├─ index.js
>         ├─ calc.js
>         └─ print.js

파일을 명시하지 않고 require 메서드를 호출하면 해당 디렉터리의 index.js를 로드한다.

```javascript
var myModule = require('./module')'
```
이때 로드되는 index.js내에 calc.js와 print.js를 require하면 한번의 require로 calc.js와 print.js의 모든 기능을 사용할 수 있다.

```javascript
// module/index.js
module.exports = {
  calc: require('./calc'),
  print: require('./print')
};
```
```javascript
// module/calc.js
module.exports = {
  add: function(v1, v2) {
    return v1 + v2;
  },
  minus: function(v1, v2) {
    return v1 - v2;
  }
};
```
```javascript
// module/print.js
module.exports = {
  sayHello: function() {
    console.log('Hi!');
  }
};
```
```javascript
// module/app.js
var myModule = require('./module');

// module/calc.js의 기능
var result = myModule.calc.add(1, 2);
console.log(result);

// module/print.js의 기능
myModule.print.sayHi();
```

### 코어 모듈

Node.js가 기본으로 포함하고 있는 모듈, 로딩할 때 패스를 명시하지 않아도 무방하다.
```javascript
var http = require('http');
```

코어 모듈 이외는 모두 파일 모듈이다. 파일 모듈을 로딩할 때 패스를 명시해야 한다.
***

[참고 : 생활코딩 JavaScript (nodejs)](https://opentutorials.org/course/2136/11850)
[참고 : [Node.JS] 강좌 01편: 소개](https://velopert.com/133)
[참고 : 빠르게 서비스를 개발할 수 있는 Node.js](http://d2.naver.com/helloworld/4994500)