### 1.1. Prototype

다른 클래스 기반 객체지향 프로그래밍 언어와 달리 자바스크립트는 _프로토타입 기반의 객체지향 프로그래밍_ 언어  
클래스 없이도(※ECMAScript6에서 클래스가 추가되었다.) 객체를 생성할 수 있다.

자바스크립트의 모든 객체는 자신의 부모 역할을 하는 객체와 연결 된다.  
객체 지향의 상속 개념과 같이 부모 객체의 프로퍼티 또는 메서드를 상속받아 사용할 수 있게 한다.  
이러한 부모객체를 **Prototype(프로토타입)객체** (줄여서 Prototype(프로토타입))이라고 한다

> **ECMAScript spec**   
자바스크립트의 모든 객체는 자신의 프로토타입을 가리키는 **[[Prototype]]** 이라는 숨겨진 프로퍼티를 가진다.

※ 크롬, 파이어폭스 등에서는 숨겨진 `[[Prototype]]` 프로퍼티가 `__prototype__` 프로퍼티로 구현된다.

```
var student =  {
    name: 'Lee',
    score; 90
};

console.log(student.hasOwnProperty('name')); // true
console.log(student);                        // .... __proto__ : object ....

console.log(student.__proto__ === Object.prototype); // true
```

student 객체는 `__proto__` 라는 프로퍼티에 자신의 부모객체(프로토타입 객체)인 Object.prototype을 Link 하고 있다.