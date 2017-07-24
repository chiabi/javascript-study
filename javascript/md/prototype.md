## 1. Prototype 객체

[참조 : poiemaweb](http://poiemaweb.com/js-prototype)  
[참조 : MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/%EA%B0%9D%EC%B2%B4_%EB%AA%A8%EB%8D%B8%EC%9D%98_%EC%84%B8%EB%B6%80%EC%82%AC%ED%95%AD#Class-based_vs._prototype-based_languages)

객체 생성 이전에 클래스를 정의하고 이를 통해 객체(인스턴스)를 생성하는  
다른 클래스 기반 객체지향 프로그래밍 언어와 달리  
자바스크립트는 _프로토타입 기반의 객체지향 프로그래밍_ 언어로  
클래스 없이도 (※ECMAScript6에서 클래스가 추가되었다.) 객체를 생성할 수 있다.

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

상속 개념에서 자바스크립트는 객체라는 생성체만을 가진다. 각 객체는 **프로토타입** 이라고 하는 다른  
객체에 대한 링크를 보유하고 있는 private property([[Prototype]]이라고 하는)를 가진다.

student 객체는 `__proto__` 라는 프로퍼티에 자신의 부모객체(프로토타입 객체)인 `Object.prototype`을 Link 하고 있다.

객체를 생성할 때 프로토타입은 결정된다. 결정된 프로토타입 객체는 다른 임의의 객체로 변경할 수 있다.  
이것은 부모 객체인 프로토타입을 동적으로 변경할 수 있음의 의미한다.  
이러한 특징을 활용하여 객체의 상속을 구현할 수 있다.

## 2. `[[Prototype]]` 프로퍼티 vs prototype 프로퍼티

**`[[Prototype]]` 프로퍼티**
+ 자신의 프로토타입 객체를 가리키는 숨겨진 프로퍼티
+ `__proto__` 프로퍼티로 구현되어 `__proto__`와 `[[Prototype]]`은 같은 개념이다.
+ 함수도 객체이므로 `[[Prototype]]` 프로퍼티를 갖는다. 일반 객체와 달리 prototype 프로퍼티도 소유한다.

> ※ prototype 프로퍼티와 `[[Prototype]]` 프로퍼티는 **모두 프로토타입을 가리키지만 관점의 차이가 있다.**

```javascript
// 생성자 함수 정의
function Person(name, gender) {
    this.name = name;
}

// new 연산자와 함께 생성자 함수 사용
var foo = new Person('chi'); 

console.dir(Person);  // { prototype: Object, __proto__: function () }
console.dir(foo);     // { __proto__: Object }

console.log(Person.__proto__ === Function.prototype);    // true
console.log(Person.prototype === foo.__proto__);         // true
console.log(Person.prototype.constructor === Person);    // true
```
| [[Prototype]] 프로퍼티 | prototype 프로퍼티 |
| ---- | ---- |
| 함수를 포함한 모든 객체가 가지고 있는 프로퍼티 | 함수 객체만 가지고 있는 프로퍼티 |
| **객체의 입장에서 자신의 부모 역할을 하는 프로토타입 객체를 가리키며 함수 객체의 경우 `Function.prototype`을 가리킨다.** | **함수 객체가 생성자로 사용될때 이 함수를 통해 생성된 객체의 부모 역할을 하는 객체를 가리킨다** |
| - | 함수가 생성될 때 만들어 지며 constructor 프로퍼티를 가지는 객체를 가리킨다. 이 constructor 프로퍼티는 함수 객체 자신을 가리킨다. |

## 3. Prototype chain

프로토타입 체인이란 특정 객체의 프로퍼티나 메서드에 접근하려고 할 때  
해당 객체에 접근하려는 프로퍼티 또는 메서드가 없다면 `[[Prototype]]` 프로퍼티가  
가리키는 링크를 따라 자신의 부모 역할을 하는 프로토타입 객체의 프로퍼티나 메서드를  
차례대로 검색하는 것이다.

```javascript
var student = {
    name: 'chi',
    scrore: 90
}
console.log(student.hasOwnProperty('name'));                    // true
console.log(Object.prototype.hasOwnProperty('hasOwnProperty')); // true
```

student 객체는 hasOwnProperty() 메서드를 가지고 있지 않지만 `[[Prototype]]` 프로퍼티가 가리키는 링크를 따라가서 student 객체의 부모역할을 하는 프로토타입 객체(Object.prototype)의 메서드 hasOwnProperty를 호출했기 때문에 에러 없이 정상적으로 결과가 출력되었다.

### 3.1. 객체 리터럴 방식으로 생성된 객체의 프로토타입 체인

객체 생성 방법 3가지 : 객체 리터럴, 생성자 함수, Object() 생성자 함수

자바스크립트 엔진은 객체 리터럴로 객체를 생성하는 코드를 만나면 내부적으로  
**내장 함수(Built-in)인 Object() 생성자 함수를 사용하여 객체를 생성한다.**

> Object() 생성자 함수는 물론 함수이다. (일반 객체와 달리 함수 객체는 prototype 프로퍼티가 있다.)

```javascript
var person = {
    name: 'chi',
    gender: 'female',
    sayHello: function() {
        alert('Hi! my name is ' + this.name);
    }
};

console.dir(person);

console.log(person.__proto__ === Object.prototype);             // true 
console.log(Object.prototype.constructor === Object);           // true
console.log(Object.__proto__ === Function.prototype);           // true
console.log(Function.prototype.__proto__ === Object.prototype); // true
```

### 3.2. 생성자 함수로 생성된 객체의 프로토타입 체인

함수 선언 방식 3가지 : 함수선언식, 함수표현식, Function() 생성자 함수

함수 선언식과 함수 표현식은 모두 함수 리터럴 방식으로 함수를 정의하는데  
이것은 결국 내장 함수 Function() 생성자 함수로 함수를 생성하는 것을 단순화 시킨것이다.

> 내장 함수 Function() 생성자 함수도 물론 함수이기 때문에 일반객체와 달리 prototype 프로퍼티가 있다.

```javascript
function Person(name, gender) {
    this.name = name;
    this.gender = gender;
    this.sayHello = function() {
        alert('Hi! my name is ' + this.name);
    };
}

var foo = new Person('chi', 'female');

console.dir(Person);
console.dir(foo);

console.log(foo.__proto__ == Person.prototype);                 // true 
console.log(Person.prototype.__proto__ === Object.prototype);   // true
console.log(Person.prototype.constructor === Person);           // true
console.log(Person.__proto__ === Function.prototype);           // true
console.log(Function.prototype.__proto__ === Object.prototype); // true 
```

**프로토타입 체인의 종점<sup>End of prototype chain</sup>**  
Object.prototype 객체

객체 리터럴 방식이나 생성자 함수 방식이나 결국 모든 객체의 부모 객체인 Object.prototype 객체에서 프로토타입 체인이 끝나기 때문에  
foo 객체의 프로토타입 객체 Person.prototype 객체와 Person() 생성자 함수의 프로토타입 객체인 Function.prototype의 프로토타입 객체는 Object.prototype 객체이다. 

## 4. 기본자료형<sup>Primitive data type</sup> 확장

기본자료형을 제외한 모든 것은 객체이다.  
기본자료형인 문자열은 흡사 객체와 같이 동작한다.

```javascript
var str = 'test';
```