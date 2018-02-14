# this

+ [참조 : MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/this)
+ [참조 : poiemaweb](http://poiemaweb.com/js-this)

자바스크립트에서 함수의 `this` 키워드는 다른 언어들과 비교해 조금 다르게 동작한다.  
`strict mode`와 `non-strict mode` 사이에서도 조금 다르다.

대부분의 경우, **`this`의 값은 함수를 호출하는 방법에 의해 결정된다.**  
(실행되는 동안 할당에 의해서가 아니라, 함수 호출시마다 다를 수 있다.)

> **[Function.prototype.bind()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)** :   
ES5에서 추가된 `Function.prototype.bind()`는 함수가 어떻게 호출되었는지 관계없이 함수의 `this`값을 설정할 수 있다.

> __요약__  
> + 전역 컨텍스트에서 `this`는 `strict mode` 여부와 상관없이 전역객체를 가리킨다. (웹 브라우저에서 전역객체는 `window`)
> + 메소드 호출 패턴으로 함수 호출 시 메소드 내부의 `this`는 해당 메소드를 소유한 객체(해당 메소드를 호출한 객체)에 바인딩된다.
> + 함수 호출 패턴으로 함수 호출 시 `this`는 전역 객체에 바인딩 된다.  내부 함수일 경우, (메소드, 콜백함수의 내부함수일 경우에도) `this`는 전역 객체에 바인딩된다.
> + 

## 1. 전역 컨텍스트(Global context)

전역 실행 컨텍스트에서 `this`는 `strict mode`여부와 상관없이 전역객체를 가리킨다.

전역객체는 웹 브라우저에서는 `window`이고 node.js에서는 `global`이다.

```javascript
console.log(this.document === document); // true

// 웹 브라우저에서, window 객체는 전역객체이다.
console.log(this === window); // true

this.a = 37;
console.log(window.a); // 37
```

## 2. 함수 컨텍스트(Function context)

자바스크립트의 함수는 호출될 때, 매개변수로 전달되는 인자값 이외에,  
arguments 객체와 `this`를 암묵적으로 전달 받는다.

```javascript
function square(number) {
  console.log(arguments);
  console.log(this);

  return number * number;
}
var result = square();
// [callee: function, Symbol(Symbol.iterator): function]
// Window {stop: function, open: function, alert: function, confirm: function, prompt: function…}
```

자바스크립트의 경우 _함수 호출 패턴에 따라 어떤 객체를 this에 바인딩할 지_ 가 결정된다.  
(즉, 함수 호출 패턴에 따라 this의 참조값이 달라진다.)

> **binding(바인딩)** :  
특정 객체에서 실행되게끔 고정시키는 역할. (특정 객체에 연결)

**함수 호출 패턴**
+ 2.1. [메서드 호출 패턴(Method Invocation Pattern)](#21-메서드-호출-패턴)
+ 2.2. [함수 호출 패턴(Function Invocation Pattern)](#22-함수-호출-패턴)
+ 2.3 [생성자 호출 패턴(Constructor Invocation Pattern)](#23-생성자-호출-패턴)
+ 3.4 [간접 호출 패턴(Indirect Invocation : call(), apply())](#24-간접-호출-패턴)

각 호출은 자체 컨텍스트를 정의하므로 예상한 것과 다르게 동작한다.

### 2.1. 메서드 호출 패턴

함수가 한 객체의 프로퍼티(메서드)일 때,  
메서드 내부의 `this`는 해당 메서드를 소유한 객체(해당 메서드를 호출한) 객체에 바인딩(할당, 연결) 된다.

```javascript
var car = {
  brand: 'Honda',
  getBrand: function(){
    return this.brand;
  }
}

console.log(car.getBrand()); // Honda
// `getBrand()` 메서드가 `car` 객체를 참조한다.
```

메서드는 객체의 프로퍼티이므로 변수에 저장할 수 있다.
```javascript
var hondaCar = car.getBrand;

console.log(hondaCar()); // undefined
```

특정 객체를 지정하지 않고 메서드를 호출하면 'Honda' 대신 `undefined`가 출력된다.

자바스크립트는 `strict mode`에서 `this`를 전역객체로 설정하고 `non-strict mode`에서는 `undefined`로 설정한다. 

이 문제를 해결하기 위해선 Function.prototype 객체의 `bind()` 메서드를 사용해야한다.  
bind()메서드는 this 키워드가 지정된 값으로 설정된 새 함수를 만든다.

```javascript
var hondaCar = car.getBrand.bind(car);
console.log(hondaCar());   // Honda
/*
 * hondaCar() 가 호출되면 this 키워드는 car 객체에 바인딩된다.
 */
```

#### 2.1.1 객체의 prototype 체인에서의 `this`

메서드가 한 객체의 prototype 체인에 있다면, 메서드가 객체에 있는 것처럼 `this`는 메서드가 호출된 객체를 가리킨다.  
(프로토타입 객체도 메서드를 가질 수 있다.)

```javascript
function Person(name) {
  this.name = name;
}

// Person.prototype 객체(Person 함수의 익명 객체를 가리킨다)에 getName() 라는 새 메서드를 추가한다.
Person.prototype.getName = function() {
  return this.name;
}

// me라는 Person객체의 새로운 instance를 생성한다.
// me는 Person.prototype 객체에 연결된다.(프로토타입 체인)
var me = new Person('chi');
console.log(me);           // Person{name: 'chi'}
console.log(me.getName()); // chi

Person.prototype.name = 'seon';
// 프로토타입 객체 변경 시점 이전에 생성된 객체는 변경 이전의 기존 객체에 [[Prototype]]링크를 연결한다.
console.log(me);                         // Person{name: 'chi'} 
console.log(me.getName());               // chi
console.log(Person.prototype.getName()); // seon
```

```javascript
var o = {
  f: function() {
    return this.a + this.b
  }
};

// **Object.create(proto[, propertiesObject]) : 지정된 프로토타입 객체 및 속성(property)을 갖는 새 객체를 만든다.
var p =  Object.create(o);

p.a = 1;
p.b = 4;

console.log(p.f());  // 5
```

#### 2.1.2 getter와 setter에서의 this

getter와 setter로 사용되는 함수의 `this`는  
`set`또는 `get`되는 프로퍼티의 객체로 연결된다.

```javascript
function moduls() {
  return Math.sqrt(this.re * this.re + this.im * this.im);
}

var o = {
  re: 1,
  im: -1,
  get phase() {
    return Math.atan2(this.im, this,re);
  }
};

// **Object.defineProperty(obj, prop, descriptor) : 이미 존재하는 객체에 getter를 추가할 때 사용
Object.defineProperty(o, 'moduls', {
  get: moduls, enumerable: true, configurable: true
});
console.dir(o); // Obect {im: -1, re: 1, moduls: {...}, phase: {...}}
console.log(o.phase, o.moduls); // -0.78 1.4142
```

> **getter** :  
> 객체의 프로퍼티를 가져오는 함수  
> [MDN : getter](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/get)  
> [참조 : [자바스크립트] getter, setter](http://beomy.tistory.com/14)

> **setter** :  
> 객체의 프로퍼티를 설정하는 함수  
> [MDN : setter](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/set)  

### 2.2. 함수 호출 패턴

#### 2.2.1 non-strict mode

기본적으로 `this`는 전역객체에 바인딩된다. 
`non-strict mode`에서 함수가 호출될 때 `this`는 전역 객체를 가리킨다
.
```javascript
function add(a, b) {
  console.log(this === window);   // true
  return a + b;
}
add(10,20);                       // 30
```

`non-strict mode`에서 자바스크립트가 이 객체를 웹 브라우저의 `window`를 전역 객체로 설정한다.

```javascript
var ga = 'Global variable';

console.log(ga);        // Global variable
console.log(window.ga); // Global variable

function foo() {
  console.log('invoked');
}
window.foo();           // invoked
```

##### 내부함수

전역함수는 물론이고 내부함수의 경우도 `this`는 외부함수가 아닌 전역객체에 바인딩 된다.

```javascript
function foo() {
  console.log("foo's this: ", this);   // foo's this:  Window
  function bar() {
    console.log("bar's this: ", this); // bar's this:  Window 
  }
  bar();
}
foo();
```

##### 내부함수의 `this`가 전역객체를 참조하는 것을 회피하는 방법

내부함수를 호출했을때 `this`는 외부함수의 this 변수에 바인딩되어야 하지만 전역객체로 바인딩 된다.  
더글라스 크락포드는 이런 특성이 자바스크립트라는 언어의 설계상 오류라고 지적한다.

자바스크립트에서는 내부 함수 호출 패턴을 별도로 정의해 놓지 않았다.  
내부 함수도 결국 함수이므로 호출시에 함수 호출로 취급되며,  
함수 호출 패턴 규칙에 따라 내부 함수의 `this`는 전역객체에 바인딩된다. 

내부함수의 `this`가 전역객체를 참조하는 것을 회피하는 방법은  
**부모 함수의 `this`를 내부 함수가 접근 가능한 다른 변수에 저장하는 방법이다.**

```javascript
var value = 1;

var obj = {
  value: 100,
  foo: function() {
    // 부모함수에서 다른 변수에 this를 저장한다.
    var that = this;
    // 메서드 호출 패턴
    console.log("foo's this: ", this);               // foo's this:  Object {value: 100, foo: function}
    console.log("foo's this.value: ", this.value);   // foo's this.value:  100
    function bar() {
      // 함수 호출 패턴
      console.log("bar's this: ", this);             // bar's this:  Window {…}
      console.log("bar's this.value: ", this.value); // bar's this.value:  1

      console.log("bar's that: ", that);             // bar's that:  Object {value: 100, foo: function}
      console.log("bar's that.value: ", that.value); // bar's that.value:  100
    }
    bar();
  }
};

obj.foo();
```

##### 콜백함수

콜백함수의 경우에도 `this`는 전역객체에 바인딩된다.

```javascript
var vaule = 1;

var obj = {
  vaule: 100,
  foo: function() {
    setTimeout(function() {
      console.log("callback's this: ", this);            // obj 
      console.log("callback's this.value: ", this.value) // 100
    }, 100);
  }
};

obj.foo();
```

#### 2.2.2 strict mode 

`this`의 값이 `null` 또는 `undefined` 인 경우 전역객체(`window`)로 변환하지 않는다.

```javascript
function add(a, b) {
  "use strict";
  console.log(this === undefined);   // true
  function logResult(msg) {
    console.log(this === undefined); // true
    console.log(msg);                // 30
  }

  var result = a + b;
  logResult(result);
  return result;                      // 30
}

add(10, 20);
```
> **strict mode** :  
ES5에서 등장, 자바스크립트가 묵인했던 에러에 대해 에러를 던진다.  
파일 시작 부분이나 특정함수에 적용할 경우 함수 본문의 맨 위에 "use strict" 지시문을 사용한다.  
(지시문이 사용된 함수의 내부함수에도 적용된다.)
> 
> + [참조 : MDN - Strict mode](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Strict_mode)
> + [참조 : [자바스크립트] 엄격 모드(strict mode)](http://beomy.tistory.com/13)

### 2.3. 생성자 호출 패턴

> **생성자 함수** :  
객체를 생성하는 역할을 하며, 기존 함수에 `new` 연산자를 붙여 호출하면 해당 함수는 생성자 함수로 동작한다.  
(일반적으로 생성자 함수명은 첫문자를 대문자로 기술하여 혼란을 미연에 방지하자.)

new 연산자와 함께 생성자 함수를 호출하면 `this` 바인딩이 메서드나 함수 호출때와는 다르게 동작한다.

#### 2.3.1. 생성자 함수 동작 방식

new 연산자와 함께 생성자 함수를 호출하면 다음과 같은 순서로 동작한다.

1. __빈 객체 생성 및 this.바인딩__  
생성자 함수의 코드가 실행되기 전 빈 객체가 생성된다. 이 빈 객체가 생성자 함수가 새로 생성하는 객체이다.  
이후 생성자 함수 내에서 사용되는 this는 이 빈 객체를 가리킨다.  
생성된 객체는 생성자 함수의 prototype 프로퍼티가 가리키는 객체를 자신의 프로토타입 객체로 설정한다.
1. __this를 통한 프로퍼티 생성__  
생성된 빈 객체에 this를 사용해 동적으로 프로퍼티나 메서드를 생성할 수 있다.  
this는 새로 생성된 객체를 가리키므로 this를 통해 생성한 프로퍼티와 메서드는 새로 생성된 객체에 추가된다.
1. __생성된 객체 반환__  
    + __반환문이 없는 경우__ : this에 바인딩된 새로 생성한 객체가 반환된다. 명시적으로 this를 반환하여도 결과는 같다.
    + __반환문이 this가 아닌 다른 객체를 반환하는 경우__ : this가 아닌 해당 객체가 반환된다.
<<<<<<< HEAD

```javascript
var Person = function(name) {
  // ① 생성자 함수 코드 실행 전
  this.name = name; // ② this를 통한 프로퍼티 생성
  // ③ 생성된 함수(객체) 반환
}

var me  = new Person('Lee');
console.log(me.name);
```

#### 2.3.2 객체 리터럴 방식과 생성자 함수 방식의 차이

차이는 __프로토타입 객체([[Prototype]])__ 에 있다.
+ 객체 리터럴 방식의 경우, 생성된 객체의 프로토타입 객체는 Object.prototype이다.
+ 생성자 함수 방식의 경우, 생성된 객체의 프로토타입 객체는 Person.prototype이다.
```javascript
// 객체 리터럴 방식
var foo = {
  name: 'foo',
  gender: 'male'
}
console.dir(foo);

// 생성자 함수 방식
var Person = function(name, gender) {
  this.name = name;
  this.gender = gender;
}

var me = new Person('Park', 'female');
console.dir(me);

var you = new Person('Kim', 'male');
console.dir(you);
```

#### 2.3.3 생성자 함수에 new 연산자를 붙이지 않고 호출할 경우

객체 생성 목적으로 작성한 생성자 함수를 new 없이 호출하거나 일반 함수에 new를 붙여 호출하면  
일반함수와 생성자 함수의 호출 시 this 바인딩 방식이 다르기 때문에 오류가 발생할 수 있다.

+ 일반 함수 호출 시 this : 전역 객체에 바인딩  
+ 생성자 함수 호출 시 this :  생성자 함수가 새롭게 생성한 객체에 바인딩

```javascript
var Person = function(name) {
  // 전역객체에 name 프로퍼티를 추가
  this.name = name;
};
=======

```javascript
var Person = function(name) {
  // ① 생성자 함수 코드 실행 전
  this.name = name; // ② this를 통한 프로퍼티 생성
  // ③ 생성된 함수(객체) 반환
}

var me  = new Person('Lee');
console.log(me.name);
```

#### 2.3.2 객체 리터럴 방식과 생성자 함수 방식의 차이

차이는 __프로토타입 객체([[Prototype]])__ 에 있다.
+ 객체 리터럴 방식의 경우, 생성된 객체의 프로토타입 객체는 Object.prototype이다.
+ 생성자 함수 방식의 경우, 생성된 객체의 프로토타입 객체는 Person.prototype이다.
```javascript
// 객체 리터럴 방식
var foo = {
  name: 'foo',
  gender: 'male'
}
console.dir(foo);

// 생성자 함수 방식
var Person = function(name, gender) {
  this.name = name;
  this.gender = gender;
}

var me = new Person('Park', 'female');
console.dir(me);

var you = new Person('Kim', 'male');
console.dir(you);
```

#### 2.3.3 생성자 함수에 new 연산자를 붙이지 않고 호출할 경우

객체 생성 목적으로 작성한 생성자 함수를 new 없이 호출하거나 일반 함수에 new를 붙여 호출하면  
일반함수와 생성자 함수의 호출 시 this 바인딩 방식이 다르기 때문에 오류가 발생할 수 있다.

+ 일반 함수 호출 시 this : 전역 객체에 바인딩  
+ 생성자 함수 호출 시 this :  생성자 함수가 새롭게 생성한 객체에 바인딩

```javascript
var Person = function(name) {
  // 전역객체에 name 프로퍼티를 추가
  this.name = name;
};

// 일반 함수로 호출되어 객체를 생성하여 반환하지 않음
// 일반 함수의 this는 전역객체를 가리킴(name은 window에 바인딩 됨)
var me = Person('Park');

console.log(me);          // undefined : 암묵적으로 반환하던 this도 반환하지 않는다.
console.log(window.name); // Park
```

##### Scope-Safe Constructor 패턴

위와 같은 위험성을 회피하기 위해 대부분의 라이브러리에서 광범위하게 사용된다.  
대부분의 빌트인 생성자(Object, Regex, Array 등)는 new 연산자와 함께 호출되었는지를 확인한 수 적절한 값을 반환한다.

```javascript
// Scope-Safe Constructor 패턴
function A(arg) {
  // 생성자 함수가 new 연산자와 함께 호출되면 함수의 선두에서 빈객체를 생성하고 this에 바인딩한다.
  if(!(this instanceof arguments.callee)) {
    return new arguments.callee(arg);
  }
  this.value = arg ? arg : 0;
}

var a = new A(100);
var b = A(10);

console.log(a.value);
console.log(b.value);
```

> __[instanceof 연산자](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/instanceof)__  
객체의 프로토타입 체인에 있는 `constructor.prototype`의 존재 여부를 테스트한다.  
`object instanceof constructor`

> __[arguments.callee](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/arguments/callee)__  
callee는 arguments 객체의 속성이다.   
이 함수의 함수 본문 내에서 현재 실행중인 함수를 참조하는 데 사용할 수 있다.
※ argument.callee 는 ES5의 `strice mode`에서는 허용되지 않는다.
향후의 사용은 제한하는 것이 좋고, 기존 코드(레거시코드)에서 발견되는 경우에는 제거해야 한다.

```javascript
function A(arg) {
  if(!(this instanceof A)) {
    return new A(arg);
  }
  this.value = arg ? arg : 0;
}

var a = new A(100);
var b = A(10);

console.log(a.value);
console.log(b.value);
```

## 2.4. apply 호출 패턴(Apply Invoctaion Pattern)

```
func.apply(thisArg, [argsArray])
```
> __thisArg__ : 함수 내부의 this에 바인딩할 객체 
> __argsArray__ : 함수에 전달할 인자 배열
>>>>>>> d9bc8956327c34006e3e58eebb5526d44854de17

// 일반 함수로 호출되어 객체를 생성하여 반환하지 않음
// 일반 함수의 this는 전역객체를 가리킴(name은 window에 바인딩 됨)
var me = Person('Park');

console.log(me);          // undefined : 암묵적으로 반환하던 this도 반환하지 않는다.
console.log(window.name); // Park
```

##### Scope-Safe Constructor 패턴

위와 같은 위험성을 회피하기 위해 대부분의 라이브러리에서 광범위하게 사용된다.  
대부분의 빌트인 생성자(Object, Regex, Array 등)는 new 연산자와 함께 호출되었는지를 확인한 수 적절한 값을 반환한다.

```javascript
// Scope-Safe Constructor 패턴
function A(arg) {
  // 생성자 함수가 new 연산자와 함께 호출되면 함수의 선두에서 빈객체를 생성하고 this에 바인딩한다.
  if(!(this instanceof arguments.callee)) {
    return new arguments.callee(arg);
  }
  this.value = arg ? arg : 0;
}

var a = new A(100);
var b = A(10);

console.log(a.value);
console.log(b.value);
```

> __[instanceof 연산자](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/instanceof)__  
객체의 프로토타입 체인에 있는 `constructor.prototype`의 존재 여부를 테스트한다.  
`object instanceof constructor`

> __[arguments.callee](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/arguments/callee)__  
callee는 arguments 객체의 속성이다.   
이 함수의 함수 본문 내에서 현재 실행중인 함수를 참조하는 데 사용할 수 있다.
※ argument.callee 는 ES5의 `strice mode`에서는 허용되지 않는다.
향후의 사용은 제한하는 것이 좋고, 기존 코드(레거시코드)에서 발견되는 경우에는 제거해야 한다.

```javascript
function A(arg) {
  if(!(this instanceof A)) {
    return new A(arg);
  }
  this.value = arg ? arg : 0;
}

var a = new A(100);
var b = A(10);

console.log(a.value);
console.log(b.value);
```
***

+ [참고 : 15.함수 호출과 this](http://programmer-seva.tistory.com/28)
+ [참고 : Demystifying JavaScript this Keyword with Practical Examples](http://www.javascripttutorial.net/javascript-this/)