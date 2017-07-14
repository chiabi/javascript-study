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

* **웹브라우저에서 동작하는 유일한 언어** 이다.
* 자바스크립트는 멀티-패러다임 언어로 명령형<sup>imperative</sup>, 함수형<sup>functional</sup>, 프로토타입 기반<sup>prototype-based</sup> 객체 지향 언어다.  
클래스가 없지만 **프로토타입 객체지향 방식의 객체 지향 언어** 이다.  
[(가장 많은 오해를 받는 언어)](http://javascript.crockford.com/javascript.html)
* 인터프리터 언어로 컴파일<sup>Compile</sup>이 필요없어 HTML파일 안에 직접 기술이 가능하다.
* **[jQuery](https://jquery.com/)** 의 등장은 다소 번거롭고 논란이 있던 DOM(Document Object Model)을 보다 쉽게 제어할 수 있게 되었다.
* **Node.js** (구글의 Chorme V8 Javascript 엔진으로 빌드된 JavaScript 런타임 환경)의 등장으로  
 자바스크립트는 서버 사이드 애플리케이션 개발에도 사용되는 풀스택<sup>Full stack</sup> 개발 언어가 되었다.
* 다양한 프레임워크와 라이브러리가 있다.
* 세계에서 가장 인기있는 언어이다. - 크로스 플랫폼을 위한 모바일 웹/앱 개발 분야에서도 가장 중요 언어로 주목 받고 있다.  
웹, 모바일 하이브리드 앱(PhoneGap, Sencha Touch, Ionic), 서버사이드(Node JS), Desktop(Electron, AppJS), 로봇제어(Cylon.js, NodeBots) 언어
* SPA<sup>Single Page Application</sup> 웹 앱이 대중화 되면서 [Angular](https://angular.io/), [React](https://facebook.github.io/react/), [Vue.js](https://vuejs.org/) 등 다양한 SPA Framework / Library 들이 많은 사용층을 확보하고 있다.
* ECMAScript 6(ES6)가 공개되어 Symbol type, let keyword, module system, Arrow Function, class 등이 추가되었다.

> 현재 ES6를 사용하고자 한다면 [babel](https://babeljs.io/) 같은 트랜스 파일러가 필요하다.

## 1. 브라우저 동작 원리

사용자가 참고하고자 하는 웹페이지를 서버에 요청(Request)하고 응답(Response)을 받아 브라우저로 표시한다.
브라우저는 서버로부터 _html, css, javascript_ 파일을 응답받는다.  
html, css 파일은 렌더링 엔진의 HTML 파서와 CSS 파서에 의해 파싱<sup>Parsing</sup>되어 DOM, CSSOM 트리로 변환되고 렌더 트리로 결합된다.  
HTML 파서는 `script` 태그를 만나면 _DOM 생성 프로세스를 중지_ 하고 자바스크립트 엔진에 제어 권한을 넘긴다.  
자바스크립트 엔진 실행이 완료된 후 브라우저가 중지했던 시점부터 DOM 생성을 재개한다.  
→ **script 태그의 위치에 의해 DOM의 생성이 지연될 수 있다.**

+ [브라우저는 어떻게 동작하는 가](http://d2.naver.com/helloworld/59361)
+ [Render-tree Construction, Layout, and Paint](Render-tree Construction, Layout, and Paint)
+ [Adding interactivity with javascript](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript?hl=ko)

## 2. History

자바스크립트는 자바스크립트에 기반한 표준화된 국제 프로그래밍 언어를 제공하기 위해 [Ecma International](http://www.ecma-international.org/)에서 표준화 된다.

ECMAScript 표준은 ECMA-262 명세<sup>specification</sup>에서 문서화되었다. 

※ ECMAScript 문서는 스크립트 프로그래머를 돕기 위함이 아니므로 스크립트 작성을 위한 정보는 JavaScript 문서를 사용해야한다.  
JavaScript는 ECMAScript 명세에 서술된 모든 기능을 지원한다.

> **ECMAScript 3: ECMA-262 3rd edition(1999.12)**  
가장 범용적으로 지원되는 버전

> **ECMAScript 5: ECMA-262 5th edition(2009.12)**  
HTML5와 함께 출현한 표준안.  
JSON<sup>JavaScript Object Notation</sup>과 Strict Mode가 추가되었다.  
IE9 이상이나 그 외 브라우저에서만 작동한다.

> **ECMAScript 6: ECMA-262 6th edition(2015.06)**  
Symbol 타입, let, const 키워드, Arrow Function, class 등이 추가되었다.

[**New in JavaScript** :JavaScript와 ECMAScript 명세 판의 여러 버전에 대한 더 많은 것을 배우려면 참고](https://developer.mozilla.org/ko/docs/Web/JavaScript/New_in_JavaScript)

## 3. Browsers Support

[ES6 지원 현황](https://kangax.github.io/compat-table/es6/)

***

## Vanila JS

[http://vanilla-js.com/](http://vanilla-js.com/)  
(_사이트의 JS 다운로드는 페이크다._)

> _Vanilla JS_ is a fast, lightweight, cross-platform framework
for building incredible, powerful JavaScript applications.

바닐라처럼 순수한 자바스크립트를 말하는 것으로 당연히 어떤 프레임워크보다 나은 성능을 보이고 가장 일관된 성능을 보인다.  
[벤치마크 테스트 참고](http://www.stefankrause.net/js-frameworks-benchmark5/webdriver-ts/table.html)

하루가 멀다하고 등장하는 라이브러리와 프레임워크의 홍수를 풍자한 단어.

[You might not need jQuery](http://youmightnotneedjquery.com/) -  jQuery의 API에 대응하는 VanillaJS 코드를 확인할 수 있다.