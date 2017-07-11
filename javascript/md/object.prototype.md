## 1. Stnadard built-in objects(표준 내장 객체)

Javascript는 프로그램 전체의 영역에서 공통적으로 필요한 기능을 개발자 각자가 일일히 작성하는 수고를 줄이기 위해 Standard Built-in Objects(표준 빌트인 객체)를 제공한다.  
일반적으로 String, Array와 같이 대문자로 시작한다.

Standard Built-in Objects를 Global Objects로 표현하기도 하는데 이것은 전역객체(Global Object)와 다른 의미로 사용되므로 혼동해서는 안된다.

[참조 : Stnadard built-in objects (poinweb)](http://poiemaweb.com/js-standard-built-in-objects#2-standard-built-in-objects-global-objects)

## 2. Object.prototype

Object 타입의 모든 객체에 속성(property)들을 추가할 수 있게 함

Object.prototype 속성(property)은 Object 프로토타입(원형) 객체를 나타낸다.

JavaScript에서 모든 객체는 `Object`의 후손이다.  
모든 객체는 `Object.prototype`으로부터 메소드 및 속성을 상속한다.

 + 속성
    - Object.prototype.constructor
 + 메소드
    - Object.prototype.hasOwnProperty()
    - Object.prototype.isPrototypeOf()
    - Object.prototype.toString()

[mdn: Object.prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype)

### 2.1. Object.prototype.constructor

인스턴스 객체를 생성한 객체의 생성자 함수에 대한 참조를 반환한다.  
프로퍼티의 값은 함수의 이름을 포함한 문자열이 아니라 함수 자체에 대한 참조이다.
이 값은 read-only이며 1, true, "test"와 같은 원시(primitive)값이다.

모든 객체는 `constructor` 속성을 가진다.
생성자 함수를 명시적으로 사용하지 않고 만든 객체 (예, 객체와 배열 리터럴)는 해당 객체의 기본 객체 생성자 유형을 가리키는 생성자 속성을 갖는다.

```javascript
var o = {};
o.constructor === Object; // true

var o = new Object;
o.constructor === Object; // true 

var a = [];
a.constructor === Array; // true

var a = new Array;
a.constructor === Array; // true

var n = new Number(3);
n.constructor === Number; // true
```

### 2.2. Object.prototype.hasOwnProperty

`hasOwnProperty()` 메서드는 객체가 특정 프로퍼티를 가지고 있는지를 나타내는 boolean 값을 반환한다.

Object에서 파생된 모든 객체는 hasOwnProperty 메서드를 상속받는다.  
`in` 연산과는 다르게, 이 메서드는 객체의 프로토타입 체인을 확인하지 않는다.

> * [`in`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/in)  
> * [Prototype chain](http://poiemaweb.com/js-prototype#3-prototype-chain)

'o' 라는 객체가 'prop'이라는 이름의 프로퍼티를 포함하는 지 학인하는 예제

```javascript
o = new Object();
o.prop = 'exists';

function changeO() {
    o.newprop = o.prop;
    delete o.prop;
}

o.hasOwnProperty('prop'); // true
changeO();
o.hasOwnProperty('prop'); // false
o.hasOwnProperty('newprop'); // true
```

### 2.3. Object.prototype.isPrototypeOf()


### 2.4. Object.prototype.toString()

`toString()` 메서드는 객체를 나타내는 문자열을 반환한다.  
기본적으로 Object에서 상속받은 모든 객체에 상속된다.  
만약 사용자 지정 객체로 재정의 되지 않으면 toString()은 "[object type]"을 반환한다.  
(type은 객체 유형이다.)

```javascript
var o = new Object();
o.toString(); // "[object Object]"
```

#### toString()을 사용하여 객체 클래스 검색

`toString()`은 모든 객체와 함께 사용할 수 있으며 클래스를 가져올 수 있다.  
모든 객체에 대해 `Object.prototype.toString()`을 사용하려면  
이 객체에 `Function.prototype.call()` 또는 `Function.prototype.apply()`를 호출하고  
검사 할 객체를 `thisArg`라는 첫 번째 매개 변수로 전달해야한다.

```javascript
var toString = Object.prototype.toString;

toString.call(new Date);  // "[object Date]"
toString.call(new String); // "[object String]"
toString.call(Math); // "[object Math]"

// Since Javascript 1.8.5
toString.call(undefined); // "[object Undefined]"
toString.call(null); // "[object Null]"
```

* [Function.prototype.call()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
* [Function.prototype.apply()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)