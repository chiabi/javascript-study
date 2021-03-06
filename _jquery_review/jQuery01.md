## 1. 즉시실행함수 - IIFE(immediately-invoked function expression)

다른 코드와 충돌 방지 : document, location등은 함수 안에서만 유효한 scope를 가진다.

##### jquery.1.9.1

```javascript
(function( window, undefined ) {
//"use strict";
var
  document = window.document,
  location = window.location;
})( window );
```

##### jquery.2.1.1 상위 버전

```javascript
(function( global, factory ) {
  if ( /* code ...*/ ) {
    // more code
  }
  else {
    factory( global );
  }
// Pass this if window is not defined yet
})( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {
 // more code
}));
// jQuery End
```
#### 1-1. 즉시실행함수 사용방법

함수 표현식을 괄호`()`로 감싸서 런타임 시 즉시 호출되며 한번만 실행 됨  
초기화 코드에 유효범위 샌드박스(Sandbox)를 제공한다는 점에서 유용함  
즉시 실행 함수는 모든 코드를 지역 유효범위로 감싸고 어떤 변수도 전역 유효범위로 새어나가지 않게 함

- 함수를 함수 표현식으로 선언함. (함수 선언문은 정상 동작하지 않음)
- 함수가 즉시 실행될 수 있도록 마지막에 괄호`()`를 추가
- 전체 함수 구문을 괄호`()`로 감싼다.

```javascript
(function(){
  // 실행구문
}());
```

> `(function(){}());`, `(function(){})();` 둘 다 유효하나 **jsLint** 는 전자를 좋아한다.

#### 1-2. Arguments 

- 즉시실행 함수에 인자(arguments)를 전달할 수 있다.
- 너무 많은 인자 전달은 지양한다.  
 (코드의 동작을 이해하기 위해 코드 맨 위와 아래를 오가며 스크롤하기 부담스럽기 때문)

```javascript
(function (window){
  // code
})(window)
```

> 마지막 부분의 `(window);`를 통해 함수가 실행되며 이 시점에 _window_ 객체를 넘겨주게 됨  
넘겨 받은 객체는 함수 안에서도 _window_ 라는 이름으로 정의되어 있음

#### 1-3. undefined가 쓰이는 이유

```javascript
(function (window, undefined){
 // code
})(window);
```

IIFE를 위의 코드와 같이 사용하여 `undefined`가 `undefined = true;`처럼 값이 재할당 되는 것을 막는다.  
(함수 scope 안의 `undefined`는 실제 `undefined`의미로 동작하게 된다.)

> ECMAScript5의 _strict 모드_ (`use strict;`)를 활용하면 parser가 error를 뱉어준다.

### 1-4. UMD(Universal Module Definition : 범용 모듈 정의) 방식

Node.js같은 브라우저가 항상 전역객체가 아닌 환경까지 고려한 방식

* [UMD (Universal Module Definition)](https://github.com/umdjs/umd)

```javascript
( function( global, factory ) {
  "use strict";
  if ( typeof module === "object" && typeof module.exports === "object" ) {
      /*
        `window` 가 있는 CommonJS 및 유사 CommonJS 환경에서 factory를
        실행하고 jQuery를 가져옴 
      */
      /*
        (Node.js 등의) `document`가 있는 `window`가 없는 환경에서
        factory를 `module.exports`로 노출함 
      */
      module.exports = global.document ?
        factory( global, true ) :
        function( w ) {
            if ( !w.document ) {
              throw new Error( "jQuery requires a window with a document" );
            }
            return factory( w );
        };
  } else {
      factory( global );
	  /*
	    factory : jQuery의 실질적인 함수 객체
	    global : window의 전역 객체 참조
	    전달받은 익명함수에 global 전역객체를 참조를 인자로 넘겨 즉시 호출한다.
	  */
  }( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {
  /*
    function(window, noGlobal){ .... 실행할 구문 }
    위 익명함수를 IIFE는 factory라는 이름의 매개변수로 받는다.
  */
 // more code
}));
// jQuery End
```

* argument로 넘어온 함수가 factory함수로 호출되고 있음(환경에 따라 적절하게 외부로 할당할 수 있음)
* IIFE를 호출할때 인자로 window 전역객체 참조와 익명함수를 전달한다.
* 인자로 전달하는 익명함수가 jQuery의 실질적인 함수 객체이다.
* 익명함수를 factory라는 이름의 매개변수로 받는다.
* 실행할 함수는 호출문과 넘겨진 매개변수 뒤쪽에 있다.(=인자)

[참조 : What(function(window, document, undefined){})(window, document); really means](https://medium.com/@jungseobshin/%EB%B2%88%EC%97%AD-what-function-window-document-undefined-window-document-really-means-b92b0b40304a)  
[참조 : jQuery 소스 구조분석 1. IIFE(즉시 함수 호출 표현식)](http://boycoding.tistory.com/46)

## 2. jQuery라는 function 객체 생성

##### jquery.1.9.1

```javascript
// Define a local copy of jQuery
var jQuery = function( selector, context ) {
  // The jQuery object is actually just the init constructor 'enhanced'
    return new jQuery.fn.init( selector, context, rootjQuery );
}
```

##### jquery.2.1.1 상위 버전

```javascript
var jQuery = function( selector, context ) {
  // The jQuery object is actually just the init constructor 'enhanced'
  // Need init if jQuery is called (just allow error to be thrown if not included)
  return new jQuery.fn.init( selector, context );
},
```


```javascript
// Limit scope pollution from any deprecated API
// (function() {

// })();
// Expose jQuery to the global object
window.jQuery = window.$ = jQuery;   
if ( typeof define === "function" && define.amd && define.amd.jQuery ) {
	define( "jquery", [], function () { return jQuery; } );
}
```


***
http://blog.naver.com/jjoommnn/130141474121  
http://codefactory.kr/2011/12/05/jquery-sourcecode-analysis-javascript-study-1/  
http://limemilk.tistory.com/251
