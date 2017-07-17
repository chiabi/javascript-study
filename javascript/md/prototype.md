## 1. Prototype 객체

[참조 : poiemaweb](http://poiemaweb.com/js-prototype)  
[참조 : MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain)

객체 생성 이전에 클래스를 정의하고 이를 통해 객체(인스턴스)를 생성하는 다른 클래스 기반 객체지향 프로그래밍 언어와 달리  
자바스크립트는 _프로토타입 기반의 객체지향 프로그래밍_ 언어로 클래스 없이도(※ECMAScript6에서 클래스가 추가되었다.) 객체를 생성할 수 있다.

자바스크립트의 모든 객체는 자신의 부모 역할을 하는 객체와 연결 되어 있는데   
이는 객체 지향의 상속 개념과 같이 _부모 객체의 프로퍼티 또는 메서드를 상속받아 사용할 수 있게 한다._  
이러한 부모객체를 **Prototype(프로토타입) 객체** (줄여서 Prototype(프로토타입))이라고 한다.

> **ECMAScript spec**   
**자바스크립트의 모든 객체는 자신의 프로토타입을 가리키는 [[Prototype]]이라는 숨겨진 프로퍼티를 가진다.**


※ 크롬, 파이어폭스 등에서는 숨겨진 `[[Prototype]]` 프로퍼티가 `__proto__` 프로퍼티로 구현되어 있다.(둘은 같은 개념)

```javascript
var student =  {
    name: 'chi',
    score: 90
};

console.log(student.hasOwnProperty('name')); // true
console.log(student);                        // .... __proto__ : object ....

console.log(student.__proto__ === Object.prototype); // true
```

상속 개념에서 자바스크립트는 객체라는 생성체만을 가진다. 각 객체는 **프로토타입** 이라고 하는 다른 객체에 대한 링크를 보유하고 있는 private property([[Prototype]]이라고 하는)를 가진다.

student 객체는 `__proto__` 라는 프로퍼티에 자신의 부모객체(프로토타입 객체)인 `Object.prototype`을 Link 하고 있다.

객체를 생성할 때 프로토타입은 결정된다. 결정된 프로토타입 객체는 다른 임의의 객체로 변경할 수 있다.  
이것은 부모 객체인 프로토타입을 동적으로 변경할 수 있음의 의미한다.  
이러한 특징을 활용하여 객체의 상속을 구현할 수 있다.

## 2. [[Prototype]] 프로퍼티 vs prototype 프로퍼티