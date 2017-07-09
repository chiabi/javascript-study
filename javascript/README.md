## [JSDOC]((http://usejsdoc.org/))

book 함수에 대한 설명 예)

```javascript
/**
 * @constructor
 * @param {string} title - The title of the book
 * @param {string} author - The author of the book
 */
```
### [jsDoc Block Tags](http://usejsdoc.org/index.html#block-tags)

* @global : 심볼이 문서에서 전역 심볼로 나타나도록 지정, JSDoc은 소스 파일 내 심볼의 실제 범위 무시
* @function (@func, @method) [<functionName>] : 함수 이름
* @param {string} [이름] - [설명] : 함수 매개 변수의 이름, 유형 및 설명을 제공
* @returns {string} : 함수 반환값

***

# 유틸리티 함수 제작

## 1. Javascript 데이터 유형을 완벽하게 문자열로 반환하는 유틸리티 함수

```javascript
function type(data) {
    return Object.prototype.toString.call(data).slice(8,-1).toLowerCase();
}
```
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

### 1.2. Stnadard built-in objects(표준 내장 객체)

Javascript는 프로그램 전체의 영역에서 공통적으로 필요한 기능을 개발자 각자가 일일히 작성하는 수고를 줄이기 위해 Standard Built-in Objects(표준 빌트인 객체)를 제공한다.  
일반적으로 String, Array와 같이 대문자로 시작한다.

Standard Built-in Objects를 Global Objects로 표현하기도 하는데 이것은 전역객체(Global Object)와 다른 의미로 사용되므로 혼동해서는 안된다.

[참조 : Stnadard built-in objects (poinweb)](http://poiemaweb.com/js-standard-built-in-objects#2-standard-built-in-objects-global-objects)

### 1.3. Object.prototype

Object 타입의 모든 객체에 속성(property)들을 추가할 수 있게 함

Object.prototype 속성(property)은 Object 프로토타입(원형) 객체를 나타낸다.

JavaScript에서 모든 객체는 `Object`의 후손이다.  
모든 객체는 `Object.prototype`으로부터 메소드 및 속성을 상속한다.

 + 속성
    - Object.prototype.constructor
 + 메소드
    - Object.prototype.hasOwnProperty()
    - Object.prototype.isPrototypeOf()
    - Object.prototype.toString()

#### 1.3.1 Object.prototype.constructor

인스턴스 객체를 생성한 객체의 생성자 함수에 대한 참조를 반환한다.  
프로퍼티의 값은 함수의 이름을 포함한 문자열이 아니라 함수 자체에 대한 참조이다.
이 값은 read-only이며 1, true, "test"와 같은 원시(primitive)값이다.

모든 객체는 `constructor` 속성을 가진다.
생성자 함수를 명시적으로 사용하지 않고 만든 객체 (예, 객체와 배열 리터럴)는 해당 객체의 기본 객체 생성자 유형을 가리키는 생성자 속성을 갖는다.

```javascript
var o = {};
o.constructor === Object; // true

var o = new Object;
o.constructor === Object; // true 

var a = [];
a.constructor === Array; // true

var a = new Array;
a.constructor === Array; // true

var n = new Number(3);
n.constructor === Number; // true
```

[참조: MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor)

#### 1.2.2 Object.prototype.hasOwnProperty