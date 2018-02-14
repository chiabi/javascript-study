### How to unset a JavaScript variable?

[참조: stack overflow - How to unset a JavaScript variable?](https://stackoverflow.com/questions/1596782/how-to-unset-a-javascript-variable)

[속깊은 자바스크립트](http://unikys.tistory.com/324)

[참조 : [번역] ECMA-262-3 in detail. Chapter 1. Execution Contexts.](http://wit.nts-corp.com/2013/09/10/120)

[참조: [번역] ECMA-262-3 in detail. Chapter 2. Variable object.](http://wit.nts-corp.com/2013/09/10/123)

***

### [참조: var 전역변수, 객체 리터럴, delete 연산자](http://mylife365.tistory.com/27)

```javascript
// hasOwnProperty로 전역변수들이 해당 객체의 멤버로 존재하는지 확인
// 객체에 property라는 속성이 있는지 여부 확인
var a;
b = 2;
window.c = 10;

// obj.hasOwnProperty(prop)
// prop : 테스트할 property의 `String` 이름이나 `symbol`
console.log(window.hasOwnProperty('a')); // true
console.log(window.hasOwnProperty('b')); // true
console.log(window.hasOwnProperty('c')); // true
console.log(window.hasOwnProperty('d')); // false
```