# Syntax Basic

[참조 : 5.3 Javascript Syntax Basics](http://poiemaweb.com/js-syntax-basics)

## 1. 구문 (Statement) : 각각의 명령

값(Vaules), 연산자(Operators), 표현식(Expressions), Keywords, 주석(Comments)으로 구성되며 세미콜론(;)으로 끝나야한다.

```javascript
var x = 5;
var y = 6;
var z = x + y;
document.getElementById('demo').innerHTML = z;
```

구문은 code bock({...})으로 그룹화 할 수 있다.  
목적 : 함께 실행되어져야 하는 구문 정의 (e.g. function)

```javascript
function myFuction(x, y) {
    return x + y;
}
```

구문은 대개 위에서 아래로 순서대로 실행된다.  
흐름 제어(Control Flow) : 조건문 (if, switch), 반복문(while, for)의 사용으로 실행순서가 제어될 수 있다.  
함수 호출로 실행 순서가 변경될 수 있다.  

```javascript
var time = 10;
var greeting;
if (time < 10) {
    greeting = 'Good morning';
} else if (time < 20) {
    greeting = 'Good day';
} else {
    greeting = 'Good evening';
}
console.log(greeting);
```

> ※ 다른 언어와 달리 자바스크립트에서는 블록유효범위<sup>Block-level scope</sup>를 생성하지 않는다.  
> 함수 단위의 유효범위<sup>Function-level scope</sup>만이 생성된다.


## 2. 표현식(Expression)

값, 변수, 연산자의 조합  
-> 연산을 통해 하나의 값을 만든다.  
즉, 표현식은 하나의 값으로 평가될 수 있는 문장이다.  

```javascript
5 * 10 // 50
'Hello' + ' ' + 'world' // 'Hello world' 
```

## 3. 변수(Variable)
data를 저장(할당), 참조하기 위해 사용 된다.  
변수 선언 시 `var` keyword가 사용된다. 

```javascript 
var x; //  변수의 선언과 초기화
x = 6; // 정수값의 할당
```
## 4. 값(Value)

```java 
String str = "Hello World";
// ※자바스크립트는 자바와 달리 값의 자료형에 따라 변수에 데이터 타입을 명시하지 않는다.
```

+ String - 데이터 타입  
+ str - 변수명  
+ "Hello World" - 문자열 리터럴(literal)

변수명은 메모리에 할당된 공간을 가리키는 식별자<sup>idenfier</sup>  
리터럴은 이 공간에 저장되는 값

**자바스크립트는 7가지 데이터 타입 제공**
+ 기본 자료형 : `Boolean`, `null`, `undefined`, `Number`, `String`, `Symbol`(New in ES 6)
+ 참조 자료형 : `Object`

> **리터럴<sup>literal</sup>** 이란 변수 또는 상수에 저장되는 값 자체를 의미한다.
```javascript
// literal : Number
10.50
1001

// literal : String
'Hello'
"World"

// literal : Object
{name: 'chi', gender: 'female'};

// literal : Array
['Black', 'Grey', 'White'];
```

## 5. 연산자

하나 혹은 그 이상의 값을 하나의 값으로 만들때 사용한다.  
- 대입연산자, 산술연산자, 문자열연산자, 비교연산자, 논리연산자

```javascript
// 대입연산자
var color = 'red';

// 산술연산자
var arae = 5 * 4

// 문자열연산자
var greeting = 'Hellow ' + 'World!'

// 비교연산자
var buy = 3 > 5; // false

// 논리연산자
var buy = (5 > 3) && (2 < 4); // true
```

## 6. 키워드(keyword)
수행되어져야할 동작을 규정한 것  
변수명 등으로 쓰지 않도록 한다.  
e.g. `var` 키워드는 브라우저에서 새로운 변수를 생성할 것을 지시한다.

```javascript
var x = 5 + 6;
var y = x * 10;
```

> abstract, argument, boolean, break, byte, case, catch, char, class, const, continue, debugger, default, delete, do, double, else, enum, eval, export, extends, false, final, finally, float, for, function, foto, if, implements, import, in, instaceof, int, interface, let, long, native, new, null, package, private, protected, public, return, short, static, supre, switch, synchronized, this, throw, throws, transient, true, try, typeof, var, void, volatile, while, with, yield 

## 7. 주석(Comment)

작성된 코드의 의미를 설명하기 위해 사용, 해석기가 무시하며 실행되지 않는다.
+ 한줄 주석 `//` 
+ 여러줄 주석 `/*  */`

```javascript
/*
 주석(Comment)은 작성된 코드의 의미를 설명하기 위해 사용한다.
 코드는 읽기(이해하기) 쉬워야 한다.
*/

// 주석(Comment)은 작성된 코드의 의미를 설명하기 위해 사용한다.
// 코드는 읽기(이해하기) 쉬워야 한다.
```