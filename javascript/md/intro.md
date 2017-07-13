# 자바스크립트

[참조. FDS : JavaScript는 무엇인가?](https://github.com/yamoo9/FDS/blob/4th/LECTURE/DAY05/JavaScript.md) 

크로스-플랫폼, 객체지향 스크립트 언어, 작고 가볍다.

호스트 환경(가령, 웹브라우저) 내에서 자바스크립트는 프로그램을 제공하기 위해 _그 환경의 객체에 연결_ 될 수 있다.  

자바스크립트는 _Array, Date, Math와 같은 객체에 대한 표준 라이브러리_ 와  
_연산자(operator), 제어구조, 문과 같은 언어 요소의 코어 집합_ 을 포함한다.  
코어 자바스크립트는 추가 객체를 보충하여 다양한 목적으로 확장될 수 있다.

| 클라이언트 측 자바스크립트 | 서버 측 자바스크립트 |
| ------------------------ | ------------------ |
| 브라우저와 문서 객체 모델(DOM)을 제어하는 객체를 제공하여 코어 언어를 확장한다. (e.g. 애플리케이션이 element를 HTML 폼에 두고, 마우스 클릭, 폼 입력 및 페이지 탐색 같은 사용자 이벤트에 응답하게 해줌 | 서버에서 자바스크립트 실행에 관련된 객체를 제공하여 코어 언어를 확장한다. (e.g. 애플리케이션이 데이터베이스와 통신하고, 한 번의 호출 정보의 연속성을 애플리케이션의 다른 곳에 제공하거나, 서버에서 파일 조작을 수행할 수 있도록 한다. |
 
[참조. poiemaweb : js introduction](http://poiemaweb.com/js-introduction)

* 웹브라우저에서 동작하는 유일한 언어
* 클래스가 없지만 프로토타입 객체지향 방식의 객체 지향 언어  
[(가장 많은 오해를 받는 언어)](http://javascript.crockford.com/javascript.html)
* 인터프리터 언어로 컴파일이 필요없어 HTML파일 안에 직접 기술이 가능하다.
* **[jQuery](https://jquery.com/)** 의 등장은 다소 번거롭고 논란이 있던 DOM(Document Object Model)을 보다 쉽게 제어할 수 있게 되었다.
* **Node.js** (구글의 Chorme V8 Javascript 엔진으로 빌드된 JavaScript 런타임 환경)의 등장으로  
 자바스크립트는 서버 사이드 애플리케이션 개발에도 사용되는 풀스택 개발 언어가 되었다.
* 다양한 프레임워크와 라이브러리가 있다.
* ECMAScript 6(ES6)가 공개되어 Symbol type, let keyword, module system, Arrow Function, class 등이 추가되었다.

> 현재 ES6를 사용하고자 한다면 [babel](https://babeljs.io/) 같은 트랜스 파일러가 필요하다.

## 브라우저 동작 원리

사용자가 참고하고자 하는 웹페이지를 서버에 요청(Request)하고 응답(Response)을 받아 브라우저로 표시  
브라우저는 서버로부터 html, css, javascript 파일을 응답받는다.  
HTML 파서는 `script` 태그를 만나면 _DOM 생성 프로세스를 중지_ 하고 자바스크립트 엔진에 제어 권한을 넘긴다.  
자바스크립트 엔진 실행이 완료된 후 브라우저가 중지했던 시점부터 DOM 생성을 재개한다.  
→ _script 태그의 위치에 의해 DOM의 생성이 지연될 수 있다._

[js syntax basic](http://poiemaweb.com/js-syntax-basics)