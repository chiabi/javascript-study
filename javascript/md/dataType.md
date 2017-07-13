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

> **변경불가성(immutability)** : 객체가 생성된 이후 그 상태를 변경할 수 없는 디자인 패턴, 함수형 프로그래밍의 핵심 원리이다.

> **Pass-by-reference** : 기본자료형 object를 객체형 또는 참조형이라고 한다.  
참조형이란 **객체의 모든 연산이 실제값이 아닌 참조값으로 처리됨** 을 의미한다.  
이에 반해 기본자료형의 값은 값(value)으로 전달된다. 즉 **복사되어 전달된다.(pass-by value)**

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

※ 동적 할당에 유의할 점
```javascript
var a, b, c;

a = 10;
b = 7;
c = a + b; // 17

a = 10;
b = '칠'; // 사용자가 잘못된 유형을 입력한 경우
c = a + b; // '10칠' - 의도치 않은 결과를 가져온다.
```