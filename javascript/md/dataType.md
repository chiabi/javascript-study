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

* [Symbol](#symboles6)

## 2.2 Object type (객체형, 참조형)

기본자료형(Primitives)을 제외한 나머지 값들(배열, 함수, 정규표현식 등)은 모두 객체이다.
또한 객체는 **pass-by-reference** 이다 
+ 함수(Function)
+ 배열(Array)
+ 날짜(Date)
+ 정규식(RegExp)

> **객체**  
데이터와 그 데이터에 관련도니 동작(절차, 방법, 기능)을 모두 포함할 수 있는 개념적 존재이다.  
이름과 값을 가지는 데이터를 의미하는 속성<sup>property</sup>와 동작을 의미하는 메서드<sup>method</sup>를 포함하고 있는 독립적 주체이다.

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

[참조 : ModernJS](https://github.com/yamoo9/Modern.JS/blob/master/Documentation/ECMAScript2015.md#%EC%8B%AC%EB%B3%BCsymbol)  
[참조 : poiemaweb](http://poiemaweb.com/es6-symbol)  
[참조 : es6 이터레이터](https://github.com/otwm/ProReactStudy/wiki/(es6)%EC%9D%B4%ED%84%B0%EB%A0%88%EC%9D%B4%ED%84%B0)

+ ES6에서 새롭게 추가된 7번째 타입 : 이전에도 존재했지만 이제 직접적으로 심볼을 사용할 수 있는 공식 인터페이스가 제공된다.
+ 애플리케이션 전체에서 _유일하며 변경 불가능한<sup>immutable</sup> 기본 자료형<sup>primitive</sup>_ 
+ 주로 객체의 property key로 사용, 모든 객체의 식별자로 활용할 수 있다.

### 1. Symbol의 생성

+ `Symbol()` 함수를 통해 생성한다. 이때 생성된 Symbol은 객체가 아니라 값<sup>value</sup>이다.
+ `Symbol()` 함수는 `String()`, `Number()`, `Boolean()`과 같이 래퍼 객체를 생성하는 생성자 함수와 달리 **`new` 연산자를 사용하지 않는다**.
+ Symbol은 변경 불가능한 기본 자료형이다.  
+ Symbol함수는 인자로 문자열을 전달할 수 있다. Symbol(description)  
이 문자열은 Symbol 생성에 어떠한 영향도 주지 않지만 생성된 Symbol에대한 설명<sup>description</sup>으로 디버깅 용도로만 사용된다.
+ Symbol() 함수가 생성한 Symbol은 애플리케이션 전체에서 유일하다. - 전역적으로 사용할 수 없는 고유한 심볼
```javascript
let mySymbol = Symbol();
console.log(mySymbol);        // Symbol()
console.log(typeof mySymbol); // Symbol

new Symbol(); // Uncaught TypeError: Symbol is not a constructor
console.log(mySymbol + 's'); // VM880:1 Uncaught TypeError: Cannot convert a Symbol value to a string

let symbolWithDesc = Symbol('chi');
console.log(symbolWithDesc); // Symbol(chi)
console.log(typeof symbolWithDesc) // symbol

// Symbol() 함수가 생성한 Symbol은 애플리케이션 전체에서 유일하다.
mySymbol = Symbol('chi2');
console.log(mySymbol === Symbol('chi2')); // false
```
### 2. Symbol의 사용

객체의 프로퍼티 키는 빈 문자열을 포함하는 문자열과 숫자로 만들 수 있다.
```javascript
const obj = {};
obj.prop = 'myProp';
obj[123] = 123;  // obj.123 = 123 [x]
obj['prop' + 123] = false;

console.log(obj); // {123: 123, prop: "myProp", prop123: false}
```

Symbol 값도 객체의 프로퍼티 키로 사용할 수 있다.  
Symbol 값은 애플리케이션 전체에서 유일하기 때문에 **Symbol 값을 키로 갖는 프로퍼티는 다른 어떠한 프로퍼티와도 충돌하지 않는다.**

**객체 프로퍼티 키로 사용해서 얘기치 않게 프로퍼티 키와 충돌하는 일을 방지** 
```javascript
const obj = {};

const mySymbol = Symbol('mySymbol');
obj[mySymbol] = 123;

console.log(obj);           // {Symbol(mySymbol): 123}
console.log(obj[mySymbol]); // 123
```

Symbol()은 써드파티 라이브러리의 객체 혹은 네임스페이스에 충돌할 염려가 없는 새로운 코드를 덧입히는데 종종 쓰인다.  

(e.g. 나중에 라이브러리가 업데이트 되더라도 겹칠 우려가 없이, `React.Component` 클래스에 `refreshComponent` 메소드를 추가하고 싶다면)
```javascript
const refreshComponent = Symbol();

React.Component.prototype[refreshComponent] = () => {
  do something
}
```
### 3. Symbol 객체

Symbol() 함수를 통해 Symbol을 생성할 수 있음은 **Symbol이 함수 객체** 라는 의미이다.  
Symbol 객체틑 프로퍼티와 메서드를 가지고 있다.  
Symbol 객체의 프로퍼티 중 `length`, `prototype`은 제외한 프로퍼티를 **Well-Known Symbol** 이라 부른다.

> **Well-Known Symbol**  
미리 상수로 제공되는 다양한 심볼이 시스템에 처음부터 존재한다.  
자바스크립트 엔진은 이 상수들을 참조하여 일정한 처리를 한다.  
(엔진에 사용되며 원래 내장되어있던 심볼들이나 ECMAScript 5와 그 이전의 개발자들에게는 드러나지 않았던 것이다.)

### 4. Symbol.iterator
어떤 객체가 `Symbol.iterator`를 `key`로 사용한 메서드를 가지고 있으면 자바스크립트 엔진은 이 객체가 [이터레이션 프로토콜](http://poiemaweb.com/es6-iteration-for-of)을 따르는 것으로 간주하고 이터레이터로 동작하도록 한다.

> **이터레이션 프로토콜**  
ES6에 추가되었다. 이터러블<sup>iterable</sup>과 이터레이터<sup>iterator</sup>를 정의한다.
> + **이터러블(iterable, 반복가능한)** : **순회가능한 자료구조** 이다. **`Symbol.iterator`를 key로 사용한 메서드를 구현** 하는 것에 의해 순회 가능한 자료 구조인 이터러블이 된다.  
> + **이터레이터(iterator, 반복자)** : `Symbol.iterator`를 key로 사용한 메서드는 이터레이터를 반환한다. 이터레이터는 순회 가능한 자료 구조인 이터러블의 욧를 탐색하기 위한 포인터로서 **next()메서드** 를 갖는 객체이다.  
next() 메서드는 value, done 프로퍼티를 갖는 객체를 반환하며 이 메서드를 통해 이터러블 객체를 순회할 수 있다. 
>
> 이터레이션 프로토콜은 이터레이터의 next() 메서드를 통해 **다양한 데이터 소스에 순차적으로 접근할 수 있는 일관된 방법을 제시한다.**

```
----------------------------------
<iterable : 순회 가능한 자료 구조>
[Symbol.itrator]()
-----------------------------------
          .
          . return
          ↓
-----------------------------------
<itrerator : 이터러블의 요소를 탐색하기 위한 포인터>
{
  next(){
    return {
      value: any,
      done: boolean
    };
  }
}
-----------------------------------       
```

아래는 `Symbol.iterator`를 key로 사용한 메서드를 구현하고 있는 빌트인 객체(빌트인 이터러블)  
배열, 문자열, 생성자 등 반복 가능한<sup>iterable</sup> 타입은 이 메소드를 통해 호출되면 반복자<sup>iterator</sup> 인터페이스를 포함한 객체 형태로 리턴된다.  
(ES6에서 이들은 이터레이터로 동작한다. 이터레이션 프로토콜을 준수한다.)
+ **Array**   
Array.prototype[Symbol.iterator]
+ **String**   
String.prototype[Symbol.iterator]
+ **Map**   
Map.prototype[Symbol.iterator]
+ **Set**   
Set.prototype[Symbol.iterator]
+ **DOM data structures**   
NodeList.prototype[Symbol.iterator]
HTMLCollection.prototype[Symbol.iterator]

```javascript
// 이터러블
// Symbol.iterator를 key로 사용한 메서드를 구현해야 한다.
const iterable = ['a','b','c'];

// 이터레이터
// 이터러블의 Symbol.iterator를 key로 사용한 메서드는 이터레이터를 반환한다.
const iterator = iterable[Symbol.iterator]();

// 이터레이터는 순회 가능한 자료 구조인 이터러블의 요소를 탐색하기 위한 포인터로서 value, done 프로퍼티를 갖는 객체를 반환하는 next() 함수를 메서드로 같는 객체이다. 이터레이터의 next() 메서드를 통해 이터러블 객체를 순회할 수 있다.
console.log(iterator.next()); // {value: "a", done: false}
console.log(iterator.next()); // {value: "b", done: false}
console.log(iterator.next()); // {value: "c", done: false}
console.log(iterator.next()); // {value: undefined, done: true}

// 문자열의 경우
const iterableString = "String";
const iteratorString = iterableString[Symbol.iterator]();

console.log(iteratorString.next());  // {value: "S", done: false}
console.log(iteratorString.next());  // {value: "t", done: false}
console.log(iteratorString.next());  // {value: "r", done: false}
console.log(iteratorString.next());  // {value: "i", done: false}
console.log(iteratorString.next());  // {value: "g", done: false}
console.log(iteratorString.next());  // {value: undefined, done: true}
```

### 5. Symbol.for

`Symbol.for` 메서드는 인자로 전달받은 프로퍼티 키를 통해 Symbol 레지스트리<sup>Symbol registry</sup>(Symbol들의 리스트)에 존재하는 Symbol을 검색한다.  
검색에 성공하면 검색된 Symbol을 반환하고, 실패하면 새로운 Symbol을 생성한다. 

`Symbol()` 함수가 매번 다른 Symbol 값을 생성하는 것에 반해,  
`Symbol.for`는 단 하나의 Symbol을 생성하여 여러 모듈이 공유하게 된다. (항상 전역 범위의 심볼을 생성한다.)
```javascript
// 새로운 전역 Symbol 생성
const s1 = Symbol.for('foo');

// Symbol 레지스트리에서 이미 만들어진 Symbol을 검색
const s2 = Symbol.for('foo');

console.log(s1 === s2); // true
``` 
```javascript
let obj = {};
(function(){
  let s1 = Symbol("name");
  obj[s1] = "수지";
})();
// 이 위치에서 obj[s1]은 안보인다.

(function(){
  let s2 = Symbol.for("age");
  obj[s2] = 27;
})();

console.log(obj[Symbol("name")]);    // undefined
console.log(obj[Symbol.for("age")]); // 27
```

일반적으로 심볼, 특히  `Symbol.for(key)`는 상호운용성을 위해 사용한다.  
상호 운영성은 몇가지 알려진 인터페이스를 포함하는 서드파티 라이브러리의 객체에 인자로 심볼 멤버 형태의 코드를 사용함으로써 만족될 수 있다.

e.g.
```javascript
function reader(obj) {
  const specialRead = Symbol.for('specialRead');
  if (obj[specialRead]) {
    const reader = obj[specialRead]();
    // do something with reader
    console.log(reader);
  } else {
    throw new TypeError('객체를 읽을 수 없습니다.');
  }
}
```

