# 2. Data type(자료형)

Data type은 프로그래밍 언어에서 문자열, 숫자, 불린, 객체 등 여러 종류의 데이터를 식별하는 분류를 말한다.

**최신 ECMAScript 표준((ECMAScript 2015, ES6) 기준 (7개)**
+ Primitive data type(기본 자료형, 원시 데이터 유형) 
  - `Boolean`
  - `null`
  - `undefined`
  - `Number`
  - `String`
  - `Symbol` (ES6에서 추가)

+ Object type(객체형, 참조 데이터 유형)
  - `Object`

## 2.1 Primitive data type (기본 자료형)

기본자료형의 값은 [변경불가능한 값<sup>immutable value</sup>](http://poiemaweb.com/js-immutability)이다.
또한 이들은 **pass-by-value**(복사되어 전달됨)이다.

> **변경불가성(immutability)**  
객체가 생성된 이후 그 상태를 변경할 수 없는 디자인 패턴, 함수형 프로그래밍의 핵심 원리이다.

> **Pass-by-reference**  
기본자료형 object를 객체형 또는 참조형이라고 한다.  
참조형이란 **객체의 모든 연산이 실제값이 아닌 참조값으로 처리됨** 을 의미한다.  
이에 반해 기본자료형의 값은 값(value)으로 전달된다. 즉 **복사되어 전달된다.(pass-by value)**

### 2.1.1. Boolean

논리적 요소 : `true`, `false` 두가지 값을 가질 수 있다.  
`false`로 간주되는 경우(형변환) : 비어있는 문자열, `null`, `undefined`, 숫자 0

```javascript
var foo = true;
var bar = false;
```

### 2.1.2. null

딱 한 가지 값, `null`만 가질 수 있다.
`null`은 Null, NULL등과 다르다. (자바스크립트는 대소문자를 구분한다.<sup>case-sensitive</sup>)

`null`은 의도적으로 **기본형(primitives) 또는 object형 변수에 값이 없음** 을 명시한 것

설계상의 문제로 typeof 연산자(데이터 형식을 나타내는 문자열을 반환한다.)로 null값을 가진 변수를 연산하면 null이 아닌 object가 나온다.
->> null 타입 변수인지 확인할 때 typeof 연산자가 아닌 일치 연산자(===)를 사용해야 한다.
```javascript
var foo = 'chi';
foo = null // 값 또는 참조 정보가 제거됨

console.log(typeof(foo));          // object

console.log(typeof(foo) === null); // false
console.log(foo === null);         // true
```

### 2.1.3. undefined

값을 할당하지 않는 변수는 `undefined` 값을 가진다.  
선언은 되었지만 할당된 적이 없는 변수에 접근하거나  
존재하지 않는 객체 프로퍼티에 접근할 경우 반환된다.
```javascript
var foo;
console.log(foo); // undefined

foo = {
  name: 'chi',
  gender: 'female'
}
console.log(foo.bar); // undefined
```

### 2.1.4. Number

자바스크립트는 하나의 숫자 자료형만 존재한다. 

> 배정밀도 64비트 부동 소주점형<sup>[double-precision 64-bit floating-point](https://en.wikipedia.org/wiki/Double-precision_floating-point_format)</sup> : -(2<sup>53</sup> -1) 와 2<sup>53</sup> -1 사이의 숫자값

> C 언어의 경우, 정수형과 실수형을 구분하여 int, long, float, double 등과 같은 다양한 숫자 자료형이 존재한다. 

정수만 표현하기 위한 특별한 자료형<sup>integer type</sup>은 없다.

세가지 의미있는 기호적인 값들도 표현할 수 있다.
+ `Infinity` (양의 무한대)
+ `-Infinity`
+ `NaN` (not-a-number)
```javascript
var x = 10;     // 정수
var y = 10.12;  // 실수
var z = -20;    // 음의 정수

var foo = 42 / -0;
console.log(foo);         // -Infinity
console.log(typeof foo);  // number

var bar = 1 * 'string';
console.log(bar);         // NaN
console.log(typeof bar);  // number
```

### 2.1.5. String

문자열 타입은 텍스트 데이터를 나타내는데 사용한다.  
0개 또는 그 이상의 유니코드(16비트 부호없는 정수 값) 문자들의 집합이다.  

작은 따옴표(''), 큰 따옴표("")안에 텍스트를 넣어서 생성한다.

C와 같은 언어와는 다르게, 자바스크립트의 문자열으 변경 불가능<sup>immutable</sup>하다.  
(한 번 문자열이 생성되면, 그 문자열을 변경할 수 없다. _read only_)
```javascript
var name = "John Doe";
    name = 'John Doe';
console.log(typeof name); // string

var answer = "It's alright";
    answer = "He is called 'Johnny'";
    answer = 'He is called "Johnny"';
```

문자열은 배열처럼 인덱스를 통해 접근할 수 있지만 str[0] = 'S'처럼 이미 생성된 문자열에 새로운 문자를 대입하여 변경시켜도 반영되지 않는다.

새로운 문자열을 할당하는 것은 가능하다. (수정이 아닌 할당)
```javascript
var str = 'string';
console.log(str[0], str[1], str[2], str[3], str[4], str[5]); // s t r i n g

str[0] = 'S';
console.log(str); // string (반영되지 않았다.)

str = 'String';
console.log(str); // String

str += ' test';
console.log(str); // String test

str = str.substring(0, 3);
console.log(str); // Str

str = str.toUpperCase();
console.log(str); // STR
```

> **str.substring(indexStart[, indexEnd])**  
지정한 인덱스 사이 또는 문자열의 끝을 통해 문자열의 하위 집합을 반환한다.

### 2.1.6. Symbol<sup>ES6*</sup>

ES6에서 새롭게 추가된 7번째 타입  
애플리케이션 전체에서 유일하며 변경 불가능<sup>immutable</sup>한 기본 자료형<sup>Primitive</sup>이다.  
주로 객체의 프로퍼티 키<sup>property key</sup>로 사용한다.

```javascript
var key = Symbol('key');
console.log(typeof key); // symbol

var obj = {};
obj[key]  = 'value';
console.log(obj[key]); // value
```
[Symbol](#symbol)
## 2.2 Object type 

## 2.3. 동적 타이핑(Dynamic Typing)

자바스크립트는 동적 타입<sup>Dynamic Typed</sup> 언어 혹은 느슨한 타입<sup>loosely typed</sup>언어 이다.  
변수의 Type annotatino이 필요없이 값이 할당되는 과정에서 자동으로 자료형이 결정된다. (Type inference)  
따라서 **같은 변수에 여러 data type의 값을 대입할 수 있다.** (동적 타이핑<sup>Dynamic Typing</sup>)

```javascript
var foo;

console.log(typeof foo); // undefined

foo = null;
console.log(typeof foo); // object *typeof는 Null을 'object'로 반환한다.

foo = {};
console.log(typeof foo); // object

foo = 3;
console.log(typeof foo); // number
foo = 3.14;
console.log(typeof foo); // number

foo = 'Hello world';
console.log(typeof foo); // string

foo = true;
console.log(typeof foo); // boolean
```

[참고 : typeof](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/typeof)

※ 동적 할당에 유의할 점 : 사용자가 잘못된 유형을 입력한 경우 의도치 않은 결과를 가져온다.
```javascript
var a, b, c;

a = 10;
b = 7;
c = a + b; // 17

a = 10;
b = '칠'; // 사용자가 잘못된 유형을 입력한 경우
c = a + b; // '10칠' - 의도치 않은 결과를 가져온다.
```

*** 
## Symbol<sup>ES6*</sup>