# 자바스크립트

[js introduction](http://poiemaweb.com/js-introduction)

* 웹브라우저에서 동작하는 유일한 언어
* 클래스가 없지만 프로토타입 객체지향 방식의 객체 지향 언어  
[(가장 많은 오해를 받는 언어)](http://javascript.crockford.com/javascript.html)
* 인터프리터 언어로 컴파일이 필요없어 HTML파일 안에 직접 기술이 가능하다.
* **[jQuery](https://jquery.com/)** 의 등장은 다소 번거롭고 논란이 있던 DOM(Document Object Model)을 보다 쉽게 제어할 수 있게 되었다.
* **Node.js** (구글의 Chorme V8 Javascript 엔진으로 빌드된 JavaScript 런타임 환경)의 등장으로  
 자바스크립트는 서버 사이드 어플리케이션 개발에도 사용되는 풀스택 개발 언어가 되었다.
* 다양한 프레임워크와 라이브러리가 있다.
* 현재 ECMAScript 6(ES6)가 공개되어 Symbol type, let keyword, module system, Arrow Function, class 등이 추가되었다.

> 현재 ES6를 사용하고자 한다면 [babel](https://babeljs.io/) 같은 트랜스 파일러가 필요하다.

## 브라우저 동작 원리

사용자가 참고하고자 하는 웹페이지를 서버에 요청(Request)하고 응답(Response)을 받아 브라우저로 표시  
브라우저는 서버로부터 html, css, javascript 파일을 응답받는다.  
HTML 파서는 `script` 태그를 만나면 _DOM 생성 프로세스를 중지_ 하고 자바스크립트 엔진에 제어 권한을 넘긴다.  
자바스크립트 엔진 실행이 완료된 후 브라우저가 중지했던 시점부터 DOM 생성을 재개한다.  
→ _script 태그의 위치에 의해 DOM의 생성이 지연될 수 있다._

[js syntax basic](http://poiemaweb.com/js-syntax-basics)