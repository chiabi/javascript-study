## 패턴

+ __디자인패턴__  
    싱글톤, 감시자, 장식자, 팩토리...  
    엄격한 자료형 언어들(C++, 자바)이 가지는 특성과 클래스 기반의 상속을 다루기 위한 차선책이 될 수 있다.
+ __코딩패턴__  
    자바스크립트 특유의 패턴  
    함수의 다양한 활용과 같은 자바스크립트의 독특한 기능과 연관
+ __안티패턴__  
    버그나 코딩에러가 아닌, 문제를 해결하기보다는 오류를 더 많이 일으키는 잘못된 접근법

## 자바스크립트 개념

+ __객체지향__ 
    - 네이티브 객체 : 내장 객체(Array, Date), 사용자 정의 객체(`var o = {};`)
    - 호스트 객체 : window객체, 모든 DOM객체
> 객체는 언제든지 수정할 수 있다. ES5에서는 이런 변경을 방지하는 API를 도입했다.(메서드 추가)  
> + 확산방지(Prevent Extension) : 
>    - [`Object.preventExtensions(obj)`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions) - 새로운 속성이 객체에 추가되는 것을 방지
>    - [`Object.isExtensible(obj)`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible) - 객체가 확장 가능한지(새 속성을 추가할 수 있는지 여부)를 결정
> + 봉인(Seal) : [`Object.seal(obj)`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/seal) - 객체를 밀봉한다(쓰기 가능한 속성의 값은 밀봉 수 에도 변경가능)   
> + 불변(immutable) : [`Object.freeze(obj)`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) - 불변화 된 객체를 반환한다.
+ __클래스가 없다__  
    자바스크립트는 클래스가 없어 객체를 합성해야 한다.
+ __프로토타입__  
    코드를 재사용하는 하나의 방법으로 상속을 구현할 때 주로 프로토타입(prototype)을 사용, 객체. 모든 함수가 prototype 프로퍼티를 가진다.
+ __실행환경__  
    브라우저만이 자바스크립트 프로그램의 유일한 실행환경이 아니다.

## ECMAScript 5
+ __strict mode__ : `use strict`  
    - 구형 브라우저에서는 어떤 변수에도 할당되지 않은 그냥 문자열일 뿐

> [`argument.callee`는 ES5 엄격 모드에서 제거되었다.](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/arguments/callee)   
function 식(expression)에 이름을 주거나 함수 자체를 호출해야 하는 곳에서는 function 선언을 사용해 `arguments.callee()`사용을 피할 것

> `Object.creat()`  
지정된 프로토타입 객체 및 속성(property)을 갖는 새 객체를 만든다.

고전적인 상속방법, 단일 상속 용
```javascript
// 상위클래스 Shape
// 하위클래스 Rectangle
function Shape() {
    this.x = 0;
    this.y = 0;
}
Shape.prototype.move = function(x, y) {
    this.x += x;
    this.y += y;
    console.info('Shape moved');
};

function Rectangle() {
    Shape.call(this);
}

// Console.log(Rectangle.prototype.constructor) // Rectangle

// 하위 클래스는 상위 클래스를 확장
Rectangle.prototype = Object.create(Shape.prototype); // constructor가 Shape로 변경됨
// ※ 모든 객체는 자신의 `prototype`으로부터 `constructor` 속성을 상속한다.
// 다시 constructor에 자기 자신을 넣어줌
Rectangle.prototype.constructor = Rectangle;

var rect = new Rectangle;
// instanceof 연산자
// obj instanceof constructor 
// (객체의 프로토타입 체인에 있는 `constructor.prototype` 의 존재를 테스트 한다. )
console.log('Is rect an instance of Rectangle?', rect instanceof Rectangle);
console.log('Is rect an instance of Shape?', rect instanceof Shape); 
rect.move(1, 1);
```

## [JSLint](http://jslint.com/), [JSHint](http://jshint.com/)

[JSHint install - Node.js, plugin for text editors....](http://jshint.com/install/)

## 콘솔(Console)

[MDN : Console API](https://developer.mozilla.org/ko/docs/Web/API/Console)

콘솔 객체는 자바스크립트에 포함되어 있지는 않지만 개발 환경의 일부분이고 대부분의 최신 브라우저에서 지원한다.

`alert()`으로 결과를 출력하여 현재의 페이지를 변경하는 것보다 더 쉽고 덜 간섭적인 방법이다. 

+ __Console.clear()__ : 콘솔에 기록된 내용들을 지운다.
+ __Console.dir()__ :  메서드나 전달된 객체를 열거하고 모든 프로퍼티를 출력한다.
+ __Console.log()__ : 전달된 모든 매개변수를 출력한다.
+ __Console.info__ : 정보 메시지를 웹 콘솔에 출력한다. 이 메서드에서는 문자열 대체 및 추가 인수를 사용할 수 있습니다.


