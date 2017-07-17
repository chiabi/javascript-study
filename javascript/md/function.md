# 함수

[참조 : poiemaweb](http://poiemaweb.com/js-function)
[참조 : FDS](https://github.com/owl423/FDS04_Summary/blob/master/README/0605.md)

+ 어떤 특정 작업을 수행하기 위해 필요한 일련의 구문들을 그룹화하기 위한 개념
+ 동일한 작업을 반복적으로 수행 시 미리 작성된 함수를 재사용( **코드의 재사용** )
+ 일반적 기능(코드의 재사용)외에 객체 생성, 객체의 행위 지정(메서드), 정보의 구성 및 은닉, 클로저, 모듈화 등의 기능 수행
+ 구문<sup>statment</sup>의 집합으로 모듈화의 근간이 된다.
+ 함수도 객체, 다른 객체와 달리 호출할 수 있다.
+ 함수도 객체(일급객체<sup>First-class object</sup>이므로 다른 값들처럼 사용할 수 있다.  
  - 변수나 객체, 배열 등에 저장될 수 있다.
  - 다른 함수에 전달되는 인수로 사용될 수 있다.
  - 함수의 반환값이 될 수 있다.

## 1. 함수 정의

+ 함수 선언식<sup>Function declaration</sup>
+ 함수 표현식<sup>Function expression</sup>
+ Function() 생성자 함수

### 1.1. 함수 선언식<sup>Function declaration</sup>

`function` 키워드와 이하 내용으로 구성 ( 함수에 이름을 붙여서 선언 )

+ **함수명**  
함수 선언식에서 생략할 수 없다. 함수 몸체에서 자신을 재귀적<sup>recursive</sup> 호출하거나 자바스크립트 디버거가 해당 함수를 구분할 수 있는 식별자 역할을 한다.
+ **매개변수 목록**  
0개 이상의 목록. 괄호로 감싸고 콤마로 분리한다. 매개변수의 자료형을 기술하지 않는다.(다른 언어와 차이점, 이 때문에 함수 몸체 내에서 매개변수의 자료형 체크가 필요할 수 있다.)
+ **함수 몸체**  
실제 함수가 호출되었을 때 실행되는 구문 집합. 중괄호({})로 구문들을 감싸고 `return`문으로 결과값을 반환할 수 있다.(반환값<sup>return value</sup>)
```javascript
function square(number) {
  return number * number
}

function getUserInfo() {
  console.log('getUserInfo 함수 실행');
}
```

### 1.2. 함수 표현식<sup>Function expression</sup>

함수의 일급객체 특성을 이용하여 **함수 리터럴 방식으로 함수를 정의하고 변수에 할당** 한다.

> **함수(일급객체)의 특징**  
> 다음 조건을 만족하면 일급객체로 간주한다.  
> + 무명의 리터럴로 표현이 가능하다.
> + 변수나 자료 구조(객체, 배열...)에 저장할 수 있다.
> + 함수의 파라미터로 전달할 수 있다.
> + 반환값<sup>return value</sup>으로 사용할 수 있다.

```javascript
var square = function(number) {
  return number * number;
};

var getUserInfo = function() {
  console.log('getUserInfo 함수 실행');
};
```

함수 표현식에서 정의한 함수는 함수명을 생략하는 것이 일반적이다. ( **익명함수<sup>anonymous function</sup>** )

함수가 할당된 변수를 사용해 함수를 호출하지 않고 **기명 함수의 함수명을 호출하게 되면 에러가 발생한다.**  
이는 **함수 표현식에서 사용한 함수명은 외부 코드에서 접근이 불가능하기 때문이다.**
```javascript
// 기명 함수표현식
var foo = function multiply(a, b) {
  return a * b;
}
// 익명 함수표현식
var bar = function(a, b) {
  return a * b;
}
console.log(foo(10, 5)); // 50
console.log(multiply(10, 5)); // Uncaught ReferenceError: multiply is not defined
```

**변수에 할당**  
함수는 일급객체이기 때문에 변수에 할당할 수 있는데 이 변수는 **함수명이 아니라 할당된 함수를 가리키는 참조값을 저장** 하게 된다.  
함수 호출 시 이 변수가 함수명처럼 사용된다.

```javascript
var foo = function(a, b) {
  return a + b;
};

var bar = foo;

console.log(foo(10, 10)); // 100
console.log(bar(10, 10)); // 100

// 변수 bar와 변수 foo는 동일한 익명함수의 참조값을 갖는다.
```

※ 함수 선언식으로 정의한 경우 함수명으로 호출할 수 있는 이유는 자바스크립트 엔진에 의해 함수명과 함수 참조값을 가진 변수명이 일치하는 함수 표현식(기명 함수 표현식)으로 형태가 변경되기 때문이다.  
(즉, 변수명으로 호출된 것)  
**결국 함수선언식도 함수 표현식과 동일하게 함수 리터럴 방식으로 정의되는 것이다.**

```javascript
// 자바스크립트 엔진에 의해 함수선언식은 다음과 같은 함수 표현식으로 변경된다.
var square = function square(number) {
  return number * number;
};
```

**함수 선언식과 함수 표현식은** 모두 함수 리터럴 방식으로 함수를 정의한다. 이는 결국 **내장함수 Function() 생성자 함수로 함수를 생성하는 것을 단순화 시킨 것이다.**

### 1.3. Function() 생성자 함수

Function.prototype.constructor 프로퍼티로 접근할 수 있다.

Function() 생성자 함수로 함수를 생성하는 방식은 일반적으로 사용하지 않는다.
> new Function(arg1, arg2, ... argN, functionBody)
```javascript
var square = new Function('number', 'return number * number');
console.log(square(10)); // 100
```

## 2. 함수 호이스팅<sup>Function Hoisting</sup>

3가지 함수 정의 방식은 동작 방식에 약간 차이가 있다.

**함수 호이스팅<sup>Function Hoisting</sup>**  
자바스크립트 코드를 실행하기 전에 function 선언문을 해당 Scope 맨 위로 옮겨서 함수 선언의 위치와 상관없이 코드 내 어느 곳에서든지 호출이 가능하다.  

> 자바스크립트는 ES6의 let, const를 포함하여 모든 선언(var, let, const, function, function*, class)을 호이스팅한다.

함수선언식
```javascript
var res = square(5); // 25

function square(number) {
  return number * number;
}
```
함수 표현식
```javascript
var res = sqaure(5); // Uncaught ReferenceError: sqaure is not defined

var square = function(number) {
  return number * number
}
```

**함수 선언식** 으로 정의된 함수는 자바스크립트 엔진이 스크립트가 로딩되는 시점에 바로 초기화하고 이를 VO<sup>variable object</sup>에 저장한다.  
즉, _함수 선언, 초기화, 할당이 이루어지므로_ 함수 선언의 위치와 상관없이 소스 내 어느 곳에서든지 호출이 가능한다. (함수 호이스팅)

**함수 표현식** 의 경우 함수 호이스팅이 아니라 _**변수 호이스팅** 이 발생한다._  
함수 선언식과 달리 스크립트 로딩 시점에서 VO에 함수를 저장하지 않고 _runtime에 해석되고 실행된다._

> **변수 호이스팅**  
변수 생성과 할당이 분리되어 진행된다. 변수 선언만 호이스팅되고 값의 초기화는 변수 선언문에서 이루어 진다.  
호이스팅 된 변수에는 undefined가 우성 할당되고 실제값의 할당은 할당문에서 이루어진다.

> 함수 표현식만을 사용할 것을 권고한다. 함수 호이스팅이 함수 호출 전 반드시 함수를 선언하여야 한다는 규칙을 무시하므로 코드의 구조를 엉성하게 만들 수 있고, 사용하기에는 쉽지만 대규모 애플리케이션을 개발하는 경우 인터프리터가 너무 많은 코드를 VO에 저장하므로 애플리케이션의 응답속도가 현저히 떨어질 수 있다.

## 3.  일급객체<sup>First-class object</sup>

생성, 대입, 연산, 인자 또는 반환값으로서의 전달 등 프로그래밍 언어의 기본적 조작을 제한없이 사용할 수 있는 대상을 의미한다.

**자바스크립트의 함수는 일급객체이다**  
변수와 같이 사용할 수 있으며 코드의 어디에서든지 정의할 수 있다.  
**함수와 다른 객체를 구분 짖는 특징은 호출할 수 있다는 것이다.**

```javascript
// 1. 무명의 리터럴로 표현이 가능하낟.
// 2. 변수나 데이터 구조안에 담을 수 있다.
var increase = function(num) {
  return num + 1;
}

var decrease = function(num) {
  return num - 1;
}

var obj = {
  increase: increase,
  decrease: decrease
};

// 3. 함수의 파라미터로 전달할 수 있다.
function cal(func, num) {
  return func(num);
}

console.log(cal(increase, 1)); // 2
console.log(cal(decrease, 1)); // 0

// 4. 반환값(return value)으로 사용할 수 있다.
function cal(mode) {
  var funcs = {
    plus: function(left, right) {
      return left + right;
    },
    minus: function(left, right) {
      return left - right;
    }
  };
  return funcs[mode];
}

console.log(cal('plus')(2, 1));  // 3
console.log(cal('minus')(2, 1)); // 1
```

## 4. 매개변수<sup>Parameter, 인자</sup>

함수를 정의할 때 외부로부터 받아들이는 임의 값을 의미한다.

함수의 작업 실행을 위해 추가적인 정보가 필요한 경우 지정한다.  
함수 내에서 변수와 동일하게 동작한다.

매개변수 처리에 관해 자바스크립트는 상당히 유연하다.
+ 자바 스크립트 함수 정의는 매개 변수에 대한 데이터 유형을 지정하지 않는다.
+ 자바 스크립트 함수는 전달된 인수에 유형 검사를 수행하지 않는다.
+ 자바 스크립트 함수는 수신 된 인수의 수를 확인하지 않는다.

### 4.1. 매개변수<sup>Parameter, 인자</sup> vs 인수<sup>argument</sup>

함수 호출의 매개변수는 함수의 인수이다.  
인수는 함수에 값으로 전달된다.

매개변수는 함수 내에서 변수와 동일하게 메모리 공간을 확보하며  
전달되어진 인수는 매개변수에 대입된다.  
즉, 일반적인 변수가 `undefined`로 초기화되는 것과 달리 매개변수는 인수로 초기화된다.

### 4.2. Call-by-value / Call-by-reference

| Call-by-value<sup>값에 의한 호출</sup> | Call-by-reference<sup>참조에 의한 호출</sup> |
| ---- | ---- |
| Primitives<sup>기본자료형</sup> 인수는 **Call-by-value** 로 동작한다. | 객체타입(참조 타입) 인수는 **Call-by-reference** 로 동작한다. |
| 함수 호출 시 기본자료형 인수를 함수에 매개변수로 전달할 때 매개변수에 _값을 복사하여 함수로 전달하는 방식_ 이다. | 함수 호출 시 기본자료형 인수를 함수에 매개변수로 전달할 때 매개변수에 _값이 복사되지 않고 객체의 참조값이 매개변수에 저장되어 함수로 전달되는 방식_ 이다. |
| 함수 내에서 매개변수를 통해 값이 변경되어도 _전달이 완료된 기본 자료형 값은 변경되지 않는다._ | 함수 내에서 매개변수의 참조값을 이용하여 객체의 값을 변경했을 때 _전달되어진 참조형의 인수 값도 같이 변경된다._ |

```javascript
// Primitives, Call-by-value
function foo(primitive) {
  primitive += 1;
  return primitive;
}

var x = 0;

console.log(foo(x));  // 1
console.log(x);       // 0
```
```javascript
// 객체타입(참조 타입) 인수, Call-by-reference
function changeVal(primitive, obj) {
  primitive += 100;
  obj.name = "chi";
  obj.gender = "female";
}

var num = 100;
var obj = {
  name: "seon",
  gender: "male"
};

console.log(num); // 100
console.log(obj); // {name: "seon", gender: "male"}

changeVal(num, obj);

console.log(num); // 100
console.log(obj); // {name: "chi", gender: "female"}
```

## 5. 반환값<sup>return value</sup>

함수는 자신을 호출한 코드에 수행한 결과를 반환(return)할 수 있다.
+ `return` 키워드는 함수를 호출한 코드에 값을 반환할 때 사용한다.
+ 배열 등을 이용해 한번에 여러 개의 값을 리턴 할 수 있다.
+ 반환을 생략할 수 있다. (암묵적으로 undefined를 반환한다.)
+ 자바스크립트 해석기는 `return` 키워드를 만나면 함수의 실행을 중단 후, 함수를 호출한 코드로 되돌아간다. (`return`키워드 이후에 존재하는 다른 구문은 실행되지 않는다.)

```javascript
function calculateArea(width, height) {
  var area = width * height;
  return area; // 단일 값의 반환
}
var wallOne = calculateArea(3, 5);  
var wallTwo = calculateArea(8, 5);
console.log(wallOne, wallTwo); // 15 40

function getSize(width, height, depth) {
  var area = width * height;
  var volume = width * height * depth;
  var sizes = [area, volume];
  return sizes; // 복수 값의 반환
}
var areaOne = getSize(3, 2, 3)[0];
var volumeOne = getSize(3, 2, 3)[1];
var size = getSize(3, 2, 3);
console.log(areaOne)    // 6
console.log(volumeOne); // 18
console.log(size);      // [6, 18]
```

## 6. 함수 객체의 프로퍼티

함수는 객체이므로 함수도 프로퍼티를 가질 수 있다.
```javascript
function square(number) {
  return number * number;
}

square.x = 10;
square.y = 20;

console.log(square.x, square.y); // 10, 20
``` 

함수는 일반 객체와는 다른 함수만의 표준 프로퍼티를 갖는다.

※ 개발자도구에서 확인할 수 있는 여러가지 프로퍼티 중 `length`, `prototype` 프로퍼티는 ECAMSciprt spec에서 정한 표준 프로퍼티이다.  
나머지 프로퍼티는 ECMAScript 표준 spec은 아니다.
```javascript
function square(number) {
  return number * number;
}
console.dir(square);
```

**함수 객체의 프로퍼티**
+ `Function.arguments`
+ `Function.caller`
+ `Function.length`
+ `Function.name`
+ `Function.__proto__ `
+ `Function.prototype`

### 6.1 arguments 프로퍼티

자바스크립트의 모든 함수는 `arguments`라는 특별한 변수가 있다.

**arguments 객체** 는 함수 호출 시 전달된 인수<sup>argument</sup>들의 정보를 담고 있는 순회가능한<sup>iterable</sup> 유사배열객체<sup>array-like object</sup>이다.  

예를 들어 함수에 인수 셋이 전달된 경우 아래 코드와 같이 참조 가능하다.
```javascript
arguments[0]
arguments[1]
arguments[2]
```
함수 객체의 `arguments` 프로퍼티는 `arguemnts` 객체를 값으로 가지며 함수 내부에서 지역변수처럼 사용된다. (외부에서는 사용할 수 없다.)

자바스크립트는 함수 호출 시 함수 정의에 따라 인수를 전달하지 않아도 에러가 발생한다.
```javascript
function multiply(x, y) {
  console.log(arguments);
  return x * y;
}
console.log(multiply());        // NaN  {} 
console.log(multiply(1));       // NaN  {0: 1}
console.log(multiply(1, 2));    // 2    {0: 1, 1: 2}
console.log(multiply(1, 2, 3)); // 2    {0: 1, 1: 2, 2: 3}
```

매개변수parameter는 인수argument로 초기화된다.
+ 매개변수의 갯수보다 인수를 적게 전달했을 때, 인수가 전달되지 않은 매개변수는 undefined로 초기화된다.
+ 매개변수의 갯수보다 인수를 더 많이 전달할 경우, 초과된 인수는 무시된다.

`arguments` 객체는 이러한 자바스크립트 특성 때문에 _런타임 시 호출된 함수의 인자 갯수를 확인하고 이에 따라 동작을 달리 정의할 필요가 있을 때_ 유용하게 사용된다.
```javascript
function sum() {
  var res = 0;

  for(var i=0; i < arguments.length; i++) {
    res += arguments[i];
  }
  return res;
}
console.log(sum());          // 0 
console.log(sum(1, 2));      // 3 
console.log(sum(1, 2, 3));   // 6
```

자바스크립트는 함수를 호출할 때 인수들과 함께 암묵적으로 arguments 객체가 함수 내부로 전달된다.  
arguments 객체는 배열의 형태로 인자값 정보를 담고 있지만 실제 배열이 아닌 **유사배열객체이다.**

> **유사배열객체<sup>array-like object</sup>**  
`length` 프로퍼티를 가진 객체. 배열이 아니므로 배열 메서드(pop, push, slice 등)를 사용하는 경우 에러가 발생한다.  
배열 메서드를 사용하려면 [`Function.prototype.call`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/call), [`Function.prototype.apply`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)를 사용해야한다.

```javascript
function sum() {
  // arguments 객체를 배열로 변환
  var array = Array.prototype.slice.call(arguments);
  console.log(array);
  return array.reduce(function (pre, cur) {
    return pre + cur
  });
}

console.log(sum(1, 2, 3, 4, 5)); 
// [1, 2, 3, 4, 5]
// 15
```

> [Array.prototype.slice()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)  
`slice()` 메서드는 어떤 배열의 begin부터 end까지(end는 포함하지 않는다.)에 대한 shallow copy를 새로운 배열 객체로 반환한다. (원본을 대체하지 않는다)

> [Array.prototype.reduce()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)  
`reduce()` 메서드는 accumulator(누산기) 및 배열의 각 값(좌에서 우로)에 대해 (누산된) 한 값으로 줄도록 함수를 적용한다.

### 6.2 caller 프로퍼티

자신을 호출함 함수를 의미한다.
```javascript
function foo(func) {
  var res = func();
  return res;
}

function bar() {
  if (bar.caller == null) {
    return 'The function was calles from the top!';
  } else {
    return 'This function\'s caller : \n' + bar.caller;
  }
}
console.log(foo(bar)); // This function's caller : function foo(func) {...}
console.log(bar());    // The function was calles from the top!
```

### 6.3 length 프로퍼티

함수 정의 시 작성된 매개변수 갯수를 의미한다.  
※ `arguments.length`(함수 호출 시 인자의 갯수)의 값과 다를 수 있으므로 주의해야한다.
```javascript
function foo() {}
console.log(foo.length); // 0

function bar(x) {
  return x;
}
console.log(bar.length); // 1

function baz(x, y) {
  return x * y;
}
console.log(baz.length); // 2
```

### 6.4 name 프로퍼티

함수명을 나타낸다. 
+ 기명함수의 경우 함수명을 값으로 갖는다.
+ 익명함수의 경우 빈문자열을 값으로 갖는다.  
(ES6 함수를 구현한 브라우저에서는 익명함수의 이름을 그 구문상 위치로부터 추측한다.)

```javascript
// 기명 함수표현식 (named function expression)
var namedFunc = function multiply(a, b) {
  return a * b;
};
// 익명 함수표현식 (anonymous function expression)
var anonymousFunc = function(a, b) {
  return a * b;
};

console.log(namedFunc.name);     // multiply
console.log(anonymousFunc.name); // '', (ES6 : anonymousFunc)
```

### 6.5 `__proto__` 프로퍼티

ECMAScript spec에서 **모든 객체는 자신의 프로토타입을 가리키는 [[Prototype]]이라는 숨겨진 프로퍼티를 가진다** 라고 되어있다.  
크롬, 파이어폭스 등에서는 숨겨진 [[Prototype]] 프로퍼티가 `__proto__` 프로퍼티로 구현되어 있다.  
(즉, `__proto__`과 [[Prototype]]은 같은 개념이다.)

```javascript
function square(number) {
  return number * number;
}

console.dir(square);
```
함수 역시 객체이므로 [[Prototype]] 프로퍼티(`__proto__` 프로퍼티)를 가지며 이를 통해 자신의 부모 역할을 하는 프로토타입 객체를 가리킨다.  

함수의 프로토타입 객체는 `Function.prototype` 이다. (이것 역시 함수이다.)

### 6.6 prototype 프로퍼티

모든 함수 객체만이 가지고 있는 프로퍼티, 자바스크립트 객체지향의 근간이다.

**prototype 프로퍼티는 프로토타입 객체를 가리키는 [[Prototype]] 프로퍼티(`__proto__` 프로퍼티)와는 다르다.**  
모두 프로토타입 객체를 가리키지만 관점의 차이가 있다.

+ [[Prototype]] 프로퍼티
  - 모든 객체가 가지고 있는 프로퍼티
  - **객체의 입장에서 자신의 부모 역할을 하는 프로토타입 객체를 가리키며**  
  **함수 객체의 경우 `Function.prototype`을 가리킨다.**
+ prototype 프로퍼티
  - 함수 객체만 가지고 있는 프로퍼티
  - **함수 객체가 생성자로 사용될 때 이 함수를 통해 생성된 객체의 부모 역할을 하는 객체를 가리킨다.**
  - 함수가 생성될 때 만들어 지며 `constructor` 프로퍼티를 가지는 객체를 가리킨다.  
  이 `constructor` 프로퍼티는 함수 객체 자신을 가리킨다.

```javascript
function square(number) {
  return number * number;
}

console.dir(square.__proto__); 
// function anonymous() {constructor: function Function()}
console.dir(square.prototype); 
// Object               {constructor: function square(number)}

console.log(square.__proto__ == Function.prototype);  // true
console.log(square.__proto__ == square.prototype);    // false
console.log(square.prototype.constructor === square); // true
console.log(sqaure.__proto__.constructor === square.prototype.constructor); // false
```

## 7. 함수의 다양한 형태

### 7.1. 즉시호출함수표현식<sup>IIFE, Immediately Invoke Function Expression</sup>

[IIFE](http://benalman.com/news/2010/11/immediately-invoked-function-expression/#iife)

함수의 정의와 동시에 실행되는 함수로 최초 한번만 호출되며 다시 호출할 수 없다.  
초기화 처리 등에 사용할 수 있다.

+ 전역 영역<sup>Global Scope - public</sup>를 오염 시키지 않기 위해 사용한다.
+ 변수를 전역<sup>global scope</sup>으로 선언하는 것을 피하기 위해 사용한다.
+ 지역 변수를 익명 함수로 위치시켜 외부와의 충돌을 방지할 수 있다.
+ 함수 내 정의된 변수와 함수 등은 해당 영역 내부에서 접근할 수 있지만 외부에서 접근할 수 없다. 즉, private 영역이 생성된다.

```javascript
// 기명 즉시실행 함수
(function myFunction(){
  var a = 3;
  var b = 5;
  return a * b;
}());

// 익명 즉시실행 함수
(function() {
  var a = 3;
  var b = 5;
  return a * b;
}());
```

jQuery 같은 라이브러리의 경우 코드를 즉시실행함수 내에 정의해 두면 라이브러리 변수들이 독립된 영역 내에 있게 되어 여러 라이브러리들을 동시에 사용하더라도 변수명 충돌과 같은 문제를 방지할 수 있다.

```javascript
(function() {
  var foo = 1;
  console.log(foo);  // 1
}());

var foo = 100;
console.log(foo);    // 100
```

#### 7.1.1 일반적인 IIFE 작성 방법

```javascript
(function() { /* code */ })();
(function() { /* code */ }());
```

괄호로 묶는 것은 자바스크립트에서는 괄호에 명령문을 포함할 수 없기 때문에 파서가 `function` 키워드를 만날 때, 함수 선언이 아닌 함수 표현식으로 구문 분석하기 때문이다.

#### 7.1.2 함수 표현식을 적용한 IIFE 작성 방법

반환값이나 생성 가능성에 신경 쓰지 않는다면 접두어로 byte를 세이브 할 수 있다.  
(읽기는 조금 더 어려워지지만)

```javascript
!function() { /* code */ }();
~function() { /* code */ }();
-function() { /* code */ }();
+function() { /* code */ }();
void function() { /* code */ }();
```
`!`때문에 그 뒤 함수 선언을 표현식으로 간주해 함수의 연산 순위가 높아져 괄호 없이도 실행된다.

#### 7.1.3 표현식이 예상되는 컨텍스트 작성 방법

아래도 함수 선언과 동시에 바로 실행할 수 있다.
```javascript
var i = function(){return 10;}();
true && function(){ /* code */}();
0, function(){/* code */}();
```

### 7.2 내부 함수<sup>Inner function</sup>

함수 내부에 정의된 함수

내부함수는 자신을 포함하고 있는 부모함수의 변수에 접근할 수 있지만  
부모함수는 자식함수(내부함수)의 변수에 접근할 수 없다.

또한 내부함수는 부모함수 외부에서 접근할 수 없다.
```javascript
function parent(param) {
  var parentVar = param;
  function child() {
    var childVar = 'chi';
    console.log(parentVar + ' ' + childVar); // Hello chi
  }
  child();
  console.log(parentVar + ' ' + childVar);   // Uncaught ReferenceError: childVar is not defined
}
parent('Hello');
// Hello chi
// Uncaught ReferenceError: childVar is not defined
child();
// Uncaught ReferenceError: child is not defined
```

### 7.3 콜백 함수<sup>Callback function</sup>

함수를 명식적으로 호출하는 방식이 아니라 특정 이벤트가 발생했을 때 시스템에 의해 호출되는 함수

자주 사용되는 대표적인 예는 **이벤트 핸들러 처리** 이다.
```html
<!DOCTYPE html>
<html>

<body>
  <button id="myButton">Click me</button>
  <script>
    var button = document.getElementById('myButton');
    button.addEventListener('click', function(){
      console.log('button clicked');
    });
  </script>
</body>
</html>
```

자바스크립트의 함수는 일급객체이므로 변수처럼 사용될 수 있다.

콜백 함수는 매개변수를 통해 전달되고 전달받은 함수의 내부에서 **어느 특정시점에 실행된다.**  
(함수 내에서 어느 특정시점 또는 조건 하에 특정 행위를 하는 _클로저_를 호출하는 것과 유사하다.)

```javascript
setTimeout(function(){
  console.log('1초 후 출력');
}, 1000);
// 두번째 매개변수에 전달된 시간이 경과되면 첫번째 매개변수에 전달한 콜백함수가 실행
```
[global] >> 호출 >>> [setTimeout] >> 콜백함수 등록 >>> [Handler] <<< 호출 << [Timer Event]

콜백 함수는 주로 비동기식 처리 모델<sup>Asynchronous processing model</sup>에 사용된다.  
콜백함수는 콜백 큐에 들어가 있다가 해당 이벤트가 발생하면 호출된다.  
콜백 함수는 클로저이므로 콜백 큐에 단독으로 존재하다가 호출되어도 콜백함수를 전달받은 함수의 변수에 접근할 수 있다.

> **비동기식 처리 모델<sup>Asynchronous processing model</sup>**  
처리가 종료하면 호출될 함수(콜백함수)를 미리 매개변수에 전달하고 처리 종료시 콜백함수를 호출한다.
```javascript
function doSomething() {
  var name = 'chi';

  setTimeout(function() {
    console.log('My name is ' + name);
  }, 100);
}

doSomething();  // My name is chi
```

### 7.4  재귀함수 / 팩토리얼<sup>Factorial</sup>

**재귀함수**  
자기 자신을 재호출 하는 함수(e.g. 팩토리얼)
```javascript
function add(){
  add();
}
```

**팩토리얼**  
자기 자신의 수에 1 작은 수를 곱하고 또 1작은 수를 곱하고 해서 1작은 수가 1이 될 때까지 곱한 값

```sh
1! = 1 = 1
2! = 2 x 1 = 2
3! = 3 x 2 x 1 = 6
4! = 4 x 3 x 2 x 1 = 24
5! = 5 x 4 x 3 x 2 x 1 = 120
```

#### 7.4.1 반복문을 이용한 팩토리얼 함수

```javascript
function factorial(n) {
  if (n < 2) {
    return 1;
  }
  // n >= 2인 경우
  // n의 값을 기억하기 위한 result 변수 선언
  var result = n;
  do {result *= --n;}
  while(n > 1);
  return result;
}
```

#### 7.4.2 재귀함수를 이용한 팩토리얼 함수

```javascript
function facotrial(n) {
  if (n < 2) {
    return 1;
  }
  return n * factorial(--n);
  // n = 5인 경우,
  // 5 * factorial(4)
  // 5 * 4 * factorial(3)
  // 5 * 4 * 3 * factorial(2)
  // 5 * 4 * 3 * 2 * factorial(1)
  // ※factorial(5) 는 5 x 4 x3 x 2 x 1 이 성립한다.
}
```
***

## 함수 프로토타입 객체(선언, 할당된 모든 함수 객체) 메서드

[참고 : poiemaweb](http://poiemaweb.com/js-this#4-apply-호출-패턴apply-invocation-pattern)

Function.prototype 객체 메서드
+ `.apply()`  
+ `.call()`  
+ `.bind()` : 2009, ES5 (IE 9+)

함수 호출 시 자바스크립트 엔진 내부에서 자동으로 각 상황에 따라 this에 바인딩 될 객체가 결정된다.  
이러한 내부적 바인딩 이외에 _this를 특정 객체에 명시적으로 바인딩_ 하기 위해 Function.prototype.apply(),Function.prototype.call() 메서드를 사용한다.

> (객체.)함수.call(컨텍스트 객체, 전달인자(각각 콤마로 구분 전달));  
> (객체.)함수.apply(컨텍스트 객체, 전달인자(배열로 묶어서 전달));

※ appy()메서드를 호출하는 주체는 함수이며 apply()메서드는 this를 특정 객체에 바인딩할 뿐 본질적인 기능은 함수 호출이다.

```javascript
Array.prototype.slice.apply(arguments);
```
"`Array.prototype.slice()`메서드를 호출하라. 단, this는 arguments 객체로 바인딩하라"는 의미가 된다.  
결국 `Array.prototype.slice()`메서드를 arguments 객체 자신의 메서드인 것처럼 `arguments.slice()`와 같은 형태로 호출하라는 것이다.

call() 메서드는 apply()와 기능은 같지만 두번째 인자에서 배열 형태가 아닌 각각 하나의 인자로 넘긴다는 차이가 있다.

```javascript
Person.apply(foo, [1, 2, 3]);
Person.call(foo, 1, 2, 3);
```

***

[참조 : MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions)


