> 프로그래밍은  
_변수_ 를 통해 값을 저장, 참조하며  
_연산자_ 로 값을 연산, 평가하고  
_조건문과 반복문_ 에 의한 흐름제어로 데이터 흐름을 제어하고  
_함수_ 로 재사용이 가능한 구문의 집합을 만들며  
_객체, 배열_ 등으로 자료를 구조화하는 것이다.

# 1. 변수

[참조. FDS](https://github.com/owl423/FDS04_Summary/blob/master/README/0529.md)  
[참조. poiemaweb](http://poiemaweb.com/js-data-type-variable)  

애플리케이션에서 값(Value)을 유지할 필요가 있을 때 변수를 사용한다.  
자바스크립트는 동적 타이핑(Dynamic Typing) 언어로 변수의 Type annotation이 필요없이 값이 할당되는 과정에서 자동으로 자료형이 결정(Type Inference)된다.  
(같은 변수에 여러 자료형의 값을 대입할 수 있다.)

## 1.1. 변수 (Variable) 선언과 값 할당

변수 선언, 초기 값은 할당 되지 않았다.
변수 선언시 `var` 키워드를 사용한다.
```javascript
var runch; // undefined로 초기값을 갖게 된다.
```

선언된 변수에 값을 할당하는데 이때 대입(할당) 연산자(=)로 값을 할당한다.  
선언된 변수가 없으면 _참조 오류(ReferrenceError)_ 가 발생한다.  
```javascript
runch = 김밥; // Uncaught ReferenceError: 김밥 is not defined
runch = "김밥"; // ''(작은 따옴표)를 사용해도 같은 문자열 데이터이다.
```

변수를 선언과 동시에 값을 할당하는 구문
```javascript
var dinner = '치맥';
var dinner = runch; // 다른 변수에 할당된 값을 선언하는 변수에 할당
```

## 1.2. 변수 이름 작성 규칙

변수명은 식별자(identifier)로 불리기도 한다.  

알아보기 쉽게, 이해하기 쉽게, 명시적으로, 직관적으로

+ 공백으로 이름이 구분되게 지어서는 안된다.
+ 첫 글자가 숫자여서는 안된다.
+ 사용할 수 있는 특수문자는 '_', '$' 뿐이다.
+ 자바스크립트는 대소문자를 구분하며 이름 짓는 관례가 있다.
  - 변수 이름은 '_'을 사용해 이름을 구분한다.
  - 함수 이름은 카멜 케이스(camelCase) 표기법을 사용한다.
  - 함수 이름의 첫글자가 대문자인 경우는 특별한 함수(생성자 함수같은)일 가능성이 높다.
```javascript
var my name = 'chi'; // [x]
var 101Team = 'IOI'; // [X]
var my-name = 'chi'; // [x]
var @my_name = 'chi'; // [x]

var my_name = 'chi'; // 변수 이름은 '_'로 구분
function myName() {
  /* ... */
} // 함수 이름은 카멜 케이스 표기법을 사용
```

> **single var pattern** : var 변수 선언 키워드를 한 번만 사용하여 변수를 정의하는 패턴
```javascript
var my_name, is_visible, has_children, remote_control;
```

## 1.3. 변수 범위(Scope)
+ 전역 변수(Global Variable)
  - 클라이언트 환경(Front-End)
  - 전역 객체(Global Object) : Window 객체
  - 전역 변수는 전역 객체의 프로퍼티다. 모든 구역(Block)에서 접근이 가능한 변수이다.
+ 지역 변수(Local Variable)
  - 특정한 구역(Block)에서만 접근이 가능한 변수
```javascript
var my_name = 'chi';
console.log('전역변수: ', my_name); // 'chi'
{
  var my_name = 'park';
  console.log('블록 내부 변수: ', my_name); // 'park'
}
console.log('전역 변수는 블록 변수의 영향을 받는가? ', my_name); // 'park'

function myName(){
  var my_name = 'chichi';
  console.log('지역변수: ', my_name);
}
myName(); // 'chichi'
console.log('전역 변수는 지역 변수의 영향을 받는가? ', my_name); // 'park'
```

> **Non block-level scope** : 자바스크립트는 block-level scope를 사용하지 않으므로 **function 밖에서 선언된 변수는 코드 블럭 내에서 선언되었다할지라도 모두 global scope** 를 갖게 된다.

## 1.4. 변수 호이스팅(Variable Hoisting)

변수가 끌어올려지는 현상
```javascript
console.log(foo); // 1. undefined
var foo = 123;
console.log(foo); // 2. 123
{
  var foo = 456;
}
console.log(foo); // 3. 456
```

`1.` 에서 `Uncaught ReferenceError: foo is not defined` 에러를 기대했지만 콘솔에서는 `undefined`가 출력된다.

이는 자바스크립트의 특징으로 **모든 선언문은 호이스팅(Hosting)되기 때문**이다.

> **호이스팅** : var 선언문 이나 function 선언문을 해당 Scope 선두로 옮기는 것  자바스크립트는 코드를 실행하기 전에 호이스팅을 한다.

> [변수 선언 단계]
> + **선언 단계(Declaration phase)** : 스코프(Variable Object)에 변수를 등록한다.
> + **초기화 단계(Initailization phase)** : 스코프에 있는 변수를 메모리에 할당한다. 이 단계에서 변수는 undefined로 초기화 된다.
> + **할당 단계(Assignment phase)** : undefined로 초기화된 변수에 실제값을 할당한다.  
>
> [참고: Execution Context(실행 컨텍스트)](http://poiemaweb.com/js-execution-context)

`1.`이 실행되기 전에 호이스팅 되어 `1.` 구문 앞에 `var foo;` 가 옮겨지며 변수 선언과 초기화가 이루어진다. `2.` 에서야 변수에 값이 할당되어 123이 출력된다.

## 1.5. 상수(Constant)

[참조: let, const](http://poiemaweb.com/es6-block-scope)

※ **ES6** 은 `var`의 단점을 보완하기 위해 `let`과 `const` 키워드를 도입했다.

**`var`의 단점**
+ Function-level scope : 전역변수를 남발, for loop 초기화식에서 사용된 변수를 for loop 외부 또는 전역에서 참조할 수 있다.
+ var 키워드 생략 허용 : 의도하지 않은 변수의 전역화가 발생한다.
+ 중복 선언 허용 : 의도하지 않은 변수값 변경
+ 변수 호이스팅 : 변수를 선언하기 전에 참조가 가능하다.

변수의 범위(scope)는 좁을수록 좋다. (전역 변수는 scope가 넓다.)  
+ 어디에서 어떻게 사용할 지 파악이 어렵다.
+ 의도치 않은 변수의 변경이 발생할 가능성이 증가한다.
+ 여러 함수와 상호 의존하는 등 side effect가 있을 수 있어 복잡성이 증가한다.

> **side effect** : 실행 중에 어떤 객체를 접근해서 변화가 일어나는 행위(라이브러리 I/O, 객체 변경 등)  
side effect 자체는 아무 문제가 안되지만, 개발자가 이를 고려하지 않고 사용했을 경우 의도치 않은 결과가 나올 수 있다.
```javascript
var x, y;
x = 3 + 4; // 1개의 side effect가 있다. x의 값이 변경되었다.
y = x++; // 2개의 side effect가 있다. x++에서 x가 한번 변하고, x 값 대입으로 y가 한번 변함
3 + 4; // 이 표현식에는 side effect가 없다.
if(flag) {
  foo();
} // flag가 true일 경우에 한해서 잠재적으로 side effect가 있다.
```

**상수** 는 변수와 유사하나, 읽기 전용(Read Only)이다.  (변하지 않는 값)

### 1.5.1 선언과 초기화

한번 선언된 상수는 재선언될 수 없고 다른 값을 할당하는 것도 불가능하다.  
관례적으로 대문자로만 구성된 이름을 사용하여 변수와 구분 짓는다.(강제성 x)

const는 반드시 선언과 동시에 초기화가 이루어져야 한다. (아니면 SyntaxError 발생)
```javascript
const IS_ROTATION_EARTH; // Uncaught SyntaxError: Missing initializer in const declaration
const IS_ROTATION_EARTH = true; // 대문자로 구성된 상수
const is_rotation_earth = true; // 소문자로 구성된 상수

console.log('IS_ROTATION_EARTH:', IS_ROTATION_EARTH);
console.log('is_rotation_earth:', is_rotation_earth);

IS_ROTATION_EARTH = false; // Uncaught TypeError: Assignment to constant variable.
```

const는 **Block-level scope** 를 갖는다.
```javascript
{
  const FOO = 10;
  console.log(FOO); // 10
}
console.log(FOO); // FOO is not defined
```

### 1.5.2 상수

가독성의 향상과 유지보수의 편의를 위해 적극적으로 사용해야한다.
```javascript
// Low readability
if(x > 10) {
}

// Better!
const MAXROWS = 10;
if(x > MAXROWS) {
}
```
조건문 내의 10 대신 네이밍이 적절한 상수로 선언하면 사용한 의미도 파악되고 가독성과 유지보수성이 대폭 향상된다.

### 1.5.3 const와 객체

const는 객체에도 사용할 수 있다.
```javascript
const obj = {foo: 123};
obj = {bar: 456} // Uncaught TypeError: Assignment to constant variable.
```

객체에 대한 참조의 변경을 금지하지만 **객체의 프로퍼티는 보호되지 않는다.**  
따라서 재할당은 불가능하지만 할당된 객체의 내용은 변경할 수 있다.
```javascript
const user = {
  name: 'chi',
  address: {
    city: 'Seoul'
  }
};

user.name = 'park';
console.log(user); // {name: "park", address: { city: 'Seoul'}}
```

const를 사용한다 하더라도 객체의 내용을 변경할 수 있으며 변수에 할당된 주소값은 변경되지 않으므로 **객체 타입 변수 선언에 const를 사용하는 것이 좋다.**

자바스크립트의 값은 대부분 객체(primitive형 변수를 제외한 모든 값은 객체)이므로  
결국 대부분의 경우 const를 사용하게 된다.

> primitives(기본자료형)을 제외한 나머지 값들(함수, 배열, 정규표현식 등)은 모두 객체이다.

## 1.6. let

### 1.6.1. Block-level scope

ES6는 **Block-level scope**를 갖는 변수를 선언하기 위해 `let` 키워드를 제공한다.

> + **Function-level scope** : 함수내에서 선언된 변수는 함수 내에서만 유효하며 함수 외부에서 참조할 수 없다. 함수 외부에서 선언한 변수는 모두 전역 변수이다.
> + **Block-level scope** : 코드 블럭(`{}`)내에서 선언된 변수는 코드 블럭 내에서만 유효하며 코드 블럭 외부에서는 참조할 수 없다.

```javascript
let foo = 123;
{
  let foo = 456;
  let bar = 456; 
  // let으로 선언했기 때문에 Block-level scope를 갖는 지역변수이다.
}
console.log(foo); // 123
console.log(bar); // Uncaught ReferenceError: bar is not defined
```

### 1.6.2 호이스팅(Hosting)

자바스크립트는 모든 선언(let, const(ES6), var function, [function*](http://hacks.mozilla.or.kr/2015/08/es6-in-depth-generators/), class)을 호이스팅한다.

`var`와 달리 `let` 키워드로 선언된 변수는 선언문 이전에 참조하면 ReferenceError가 발생한다.

`let`키워드로 선언된 변수는 스코프의 시작에서 변수의 선언까지 **일시적 사각지대(TDZ; Temporal Dead Zone)** 에 빠진다.
```javascript
console.log(foo); // undefined
var foo;

console.log(bar); // Uncaught ReferenceError: bar is not defined
let bar;
```

`let`키워드로 선언된 변수는 선언단계와 초기화 단계가 분리되어 진행된다.  
스코프에 변수가 등록되지만 초기화는 변수 선언문에 도달했을 때 이루어진다.  
초기화 이전 변수에 접근하려고 하면 `ReferenceError`가 발생한다.

### 1.6.3 클로저

let은 var보다 직관적이다.

+ Function-level scope로 인해 for loop의 초기화식에 사용된 변수가 전역 스코프를 갖게 되어 문제가 발생
```javascript
var funcs = [];

// 함수의 배열을 생성한다.
// i는 전역 변수이다.
for (var i = 0; i < 3; i++) {
  funcs.push( function() {console.log(i); });
}

// 배열에서 함수를 꺼내어 호출한다.
for (var j = 0; j < 3; j++) {
  funcs[j]();
} 
// ※ 결과 :  3 이 3번 출력된다.
// for문의 var i가 전역변수이기 때문이다.
```

 
+ 기존 자바스크립트에서는 **클로저** 를 활용하여 위와 같은 문제를 회피한다.

> **클로저** : 자바스크립트의 고유 개념이 아니라 함수를 일급객체로 취급하는 함수형 언어에서 사용되는 중요한 특성이다.  
내부함수를 위한 외부함수의 지역변수가 외부함수에 의해 내부함수가 반환된 이후에도 life-cycle이 유지되는 것

```javascript
var funcs = [];

// 함수의 배열을 생성한다.
// i는 전역 변수이다.
for (var i = 0; i < 3; i++) {
  (function(index) {
    funcs.push( function() {console.log(index); });
  }(i));
}

// 배열에서 함수를 꺼내어 호출한다.
for (var j = 0; j < 3; j++) {
  funcs[j]();
}  
// ※ 결과 :  0, 1, 2가 실행된다.
```

+ ES6 let 키워드를 사용하는 방법
```javascript
var funcs = [];

// 함수의 배열을 생성한다.
// i는 전역 변수이다.
for (let i = 0; i < 3; i++) { 
  funcs.push( function() {console.log(i); });
}

// 배열에서 함수를 꺼내어 호출한다.
for (var j = 0; j < 3; j++) {
  funcs[j]();
}  
// ※ 결과 :  0, 1, 2가 실행된다.
```

`let`키워드로 선언한 변수 i는 for loop에서만 유효한 지역변수이다.  
또한 자유변수로서 for loop의 생명주기가 종료하여도 변수 i를 참조하는 함수가 존재하는 한 계속 유지된다.

> **자유변수(Free variable)** : 클로저에 의해 참조되는 외부함수의 변수

### 1.6.3 전역 객체와 let

전역 객체 : 모든 객체의 유일한 최상위 객체(window(Browser-side), global(Server-side(Node.js)))

`var` 키워드로 선언된 변수를 전역 변수로 사용하면 _전역 객체의 프로퍼티가 된다._  
`let` 키워드로 선언된 변수를 전역 변수로 사용하는 경우, let 전역변수는 _전역객체의 프로퍼티가 아니다._  
즉, `window.foo`와 같이 접근할 수 없다. 보이지 않는 개념적인 블럭 내에 존재하게 된다.
```javascript
var foo = 123; // 전역변수
console.log(window.foo); // 123

let bar = 123; // 전역변수
console.log(window.bar); // undefined
```

## 1.7. `var` vs `let` vs `const`

권장 사항
+ ES6를 사용한다면 `var`키워드는 사용하지 않는다.
+ 변경이 발생하지 않는 (재할당이 필요없는) primitive형 변수와 객체형 변수에는 `const`를 사용한다.
+ 재할당이 필요한 primitive형 변수에는 `let`를 사용한다.