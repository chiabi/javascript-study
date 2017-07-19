# Scope

[참조 poiemaweb](http://poiemaweb.com/js-scope)

Scope<sup>유효범위</sup>란 변수에의 접근성과 생존기간<sup>life-cycle</sup>을 의미한다.  
변수가 가지고 있는 참조범위를 의미한다.

**자바스크립트의 scope 종류**
| 전역 Scope(Global scope) | 지역 Scope(Local scope) |
| ------- | ------ |
| 코드 어디에서든지 참조가 가능하다. | 정의된 함수 내에서만 참조가 가능하다. |

**변수 scope** : 모든 변수는 Scope를 가진다.
| 전역 변수(Global variable) | 지역 변수(Local variable) |
| ------- | ------ |
| 전역 Scope를 가지는 변수 | 지역 Scope를 가지는 변수 |

변수는 **선언 위치(전역 또는 지역)에 의해** Scope를 가지게 된다.
즉, 전역에서 선언된 변수는 전역 Scope를 가지는 **전역 변수** 이고,  
지역(자바스크립트의 경우 함수 내)에서 선언된 변수는 지역 Scope를 가지는 **지역 변수** 가 된다. 

자바스크립트의 Scope는 타 언어와 다른 특징을 가지는 데,  
대부분의 C-family 언어가 **block-level scope** 를 사용하는 반면에 자바스크립트는 **function-level scope** 를 사용한다.

| **block-level scope** | **function-level scope** |
| ------- | ------ |
| code block({...}) 내에서 유효한(참조(접근) 할 수 있다) scope | 함수 코드 블럭 내에서 선언된 변수는 함수 코드 블럭 내에서만 유효하고 외부에서는 유효하지 않다(참조할 수 없다) |

> 단, ECMAScript 6에서 도입된 `let` keyword를 사용하면 block-level scope를 사용할 수 있다.
```javascript
var x = 0;
{
  var x = 1;
  console.log(x); // 1
}
console.log(x);   // 1 (코드블록이 scope를 가지지 않아 1이 출력.)

let y = 0;
{
  let y = 1;
  console.log(y); // 1
}
console.log(y);   // 0 (`let` keyword를 사용하면 block-level scope를 사용할 수 있다.)
```

## 1. Global scope

global scope를 가지는 전역 변수는 전역 객체(Global Object) `window`의 속성이다.

자바스크립트는 다른 C-family 언어와 달리 특별한 시작점이 없으며 코드가 나타나는 즉시 해석되고 실행되므로 글로벌 영역에 변수를 선언하기 쉽다.  
이것은 전역 변수를 남발하게 하는 문제를 야기하는데 변수명의 중복 등 여러 문제를 발생시키므로 전역변수 사용을 가급적 억제해야한다.
```javascript
var global = 'global'; // 전역에서 선언된 전역변수이다.
function foo() {
  var local = 'local'; // 함수 내부에서 선언된 지역변수이다. 함수 외부에서 참조 불가능하다.
  console.log(global); // global
  console.log(local);  // local
}
foo();

console.log(global); // global
console.log(local);  // Uncaught ReferenceError: local is not defined
```

## 2. Non block-level scope

자바스크립트는 block-level scope를 사용하지 않으므로 function 밖에서 선언된 변수는 코드 블럭({...}) 내에서 선언되었다 할지라도 모두 global scope를 갖게 된다.(전역변수)

```javascript
if(true) {
  var x = 5;    // if-block 내에 있지만 전역 변수이다.
}
console.log(x); // 5
```
## 3. Function scope

함수 내에서 선언된 매개변수와 변수는 지역변수로 함수 외부에서는 유효하지 않다.  
전역변수와 지역변수의 변수명이 중복된 경우 지역 변수를 우선하여 참조한다.  
```javascript
var a = 10;      // variable of the global context
(function() {
  var a = 30;
  var b = 20;    // local variable of the function context
  console.log(a) // 30 - 지역변수를 우선하여 참조한다.
})();

console.log(a);  // 10
console.log(b);  // Uncaught ReferenceError: b is not defined
```

내부 함수는 자신을 포함하고 있는 외부함수의 변수에 접근할 수 있는데, _클로저_ 에서와 같이 내부함수가 더 오래 존재하는 경우, 다른 언어와는 다른 움직임을 보인다.

## 4. 암묵적 전역(implied globals)
## 5. scope Hoisting
## 6. Lexical scoping (static scoping)
## 7. 변수명의 중복
## 8. 최소한의 전역변수 사용
## 9. 즉시실행 함수를 이용한 전역변수 사용 억제