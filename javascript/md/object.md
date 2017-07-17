## 1. 객체(Object)

* 객체기반의 스크립트 언어, **자바스크립트를 이루는 거의 모든것은 객체** 이다.  
(기본자료형<sup>Primitives</sup>을 제외한 나머지 값들(함수, 배열, 정규표현식 등)은 모두 객체이다)
* 데이터와 데이터에 관련된 동작(절차, 방법, 기능)을 모두 포함할 수 있는 개념적 존재이다.
* **속성(property: 이름과 값을 가지는 데이터를 의미)** 과 **메서드(method: 동작을 의미)** 를 포함하고 있는 독립적 주체이다.
* 데이터를 한 곳에 모으고 _구조화_ 하는데 유용하다. (객체는 다른 객체를 포함할 수 있다.)

### 1.1 속성(Proprety)

객체는 이름(name)과 값(value)의 쌍인 속성들을 포함하는 컨테이너라고 할 수 있다.  
속성(프로퍼티)은 속성명 속성값으로 구성된다.

* 속성명 : 빈 문자열을 포함하는 문자열과 숫자
* 속성값 : `undefined`을 제외한 모든 값

### 1.2 메서드(Method)

객체에 제한되어 있는 함수. 즉, 속성값이 함수일 경우, 일반함수과 구분하기 위해 메서드라 한다.

## 2. 객체 생성 방법

* 자바 : 클래스를 사전에 정의, 필요한 시점에 new 연산자를 사용하여 인스턴스를 생성한다.
* 자바스크립트 : 클래스라는 개념이 없고 별도의 객체 생성 방법이 존재한다.

> ECMAScript 6에 새롭게 [클래스](http://poiemaweb.com/es6-class)가 도입되었다. 새로운 객체지향 모델을 제공하는 것은 아니며  
Class도 사실 함수이고 기존 _prototype_ 기반 패턴의 _syntactic sugar_이다.

> **syntactic sugar**  
사람이 이해하고 표현하기 쉽게 디자인 된 프로그래밍 언어 문법  
더욱 더 간결하고 명확하게 표현이 가능한 문법

#### 객체 생성 방법 3가지

+ **객체 리터럴** : 중괄호({})를 사용하여 객체를 생성한다.
+ **Object() 생성자 함수** : new 연산자와 Object() 생성자 함수를 사용하여 빈 객체를 생성한 후, 속성과 메서드를 추가한다.
+ **생성자 함수** : 객체를 생성하기 위한 템플릿처럼 사용하여 속성값이 다른 객체 여러개를 간편하게 생성한다.

### 2.1 객체 리터럴

가장 일반적이고 간편한 자바스크립트 객체 생성 방식  
중괄호({})내에 아무것도 기술하지 않으면 빈객체를 생성하고,   
1개 이상의 **속성명(Property name): 속성값(Property value)** 을 기술하면 해당 속성이 추가된 객체를 생성한다.

```javascript
var empryObject = {}; // 빈객체 생성
console.log(typeof emptyObject); // object

var person = {
    name: 'chi',
    gender: 'female',
    sayHello: function(){
        console.log('Hi! My name is ' + this.name);
    } // sayHello는 메서드
};

console.log(typeof person); // object
console.log(person); // Object {name: "chi", gender: "female", sayHello: function}

person.sayHello(); // Hi! My name is chi
```

### 2.2 Object() 생성자 함수

`new` 연산자와 [`Object()`](http://poiemaweb.com/js-standard-built-in-objects#object) 생성자 함수를 사용하여 빈객체를 생성한다.  
빈 객체 생성 이후 속성과 메서드를 추가해 객체를 완성하는 방법이다.

속성에 새로운 값을 할당하거나 속성과 값을 객체에 추가할 수 있다.

```javascript
var person = new Object();
// var person = {}; // 객체 리터럴 방식으로도 가능하다.

person.name = 'chi'; // 새로운 속성과 값을 객체에 추가
person.gender = 'female';
person.sayHello = function(){
    console.log('Hi! My name is ' + this.name);
};

console.log(typeof person); // object
console.log(person);        // {name: "chi", gender: "female", sayHello: function}

person.sayHello();           // Hi! My name is chi
```

> 자바스크립트 엔진은 객체 리터럴로 객체를 생성하는 코드를 만나면   내부적으로 Object() 생성자 함수를 사용하여 객체를 생성한다.
객체 리터럴 방식으로 생성된 객체는 결국 내장(Built-in) 함수인 Object()생성자 함수로 객체를 생성하는 것의 short-hand(축약법)이다.

### 2.3 생성자 함수

객체 리터럴 방식과 Object() 생성자 함수 방식은 객체를 생성할 때 속성값만 다른 여러개의 객체 생성에 불편이 있다.

생성자 함수는 객체를 생성하기 위한 템플릿처럼 사용하여 속성값이 다른 객체 여러개를 간편하게 생성할 수 있다.

```javascript
// 객체 리터럴 방식
var personl = {
    name: 'chi',
    gender: 'female',
    sayHello: function(){
        console.log('Hi! My name is ' + this.name);
    }
};

var personl2 = {
    name: 'seon',
    gender: 'male',
    sayHello: function(){
        console.log('Hi! My name is ' + this.name);
    }
}
```

```javascript
// 생성자 함수
function Person(name, gender) {
    this.name = name;
    this.gender = gender;
    this.sayHello = function(){
       console.log('Hi! My name is ' + this.name);
    };
}

var person1 = new Person('chi', 'female');
var person2 = new Person('seon', 'male');

console.log('person1: ', typeof person1);  // person1:  object
console.log('person2: ', typeof person2);  // person2:  object
console.log('person1: ', person1);         // {name: "chi", gender: "female", sayHello: function}
console.log('person2: ', person2);         // {name: "seon", gender: "male", sayHello: function}

person1.sayHello();  // Hi! My name is chi
person2.sayHello();  // Hi! My name is seon
```

* 생성자 함수 이름은 일반적으로 대문자로 시작한다. (일반 함수와 혼란을 방지하기 위해)
* 속성 또는 메서드명 앞 `this`는 생성자 함수로 생성될 **인스턴스(instance)** 를 가리킨다.
this에 연결되어 있는 속성과 메서드는 _public_ 이다.
* 생성자 함수 내 선언된 일반 변수는 _private_ 이다.  
(함수 내부에서는 자유롭게 접근이 가능하나 외부에서 접근할 수 없다.)

```javascript
function Person(name, gender) {
    var married = 'yes';  // private
    this.name = name;  // public
    this.gender = gender;  // public
    this.sayHello = function(){  // public 
       console.log('Hi! My name is ' + this.name);
    };
}

var person = new Person('chi', 'female');

console.log(typeof person);  // object
console.log(person);         // {name: "chi", gender: "female", sayHello: function}

console.log(person.gender); // 'female'
console.log(person.married); // undefined
```

자바같은 객체지향 언어의 생성자<sup>constructor</sup>와는 다르게 형식이 정해져 있지 않고 일반 함수에 new 연산자를 붙여 호출하면 생성자 함수로 동작 할 수 있다. (생성자 함수명의 첫문자를 대문자로 기술해 혼란을 방지한다.)

> new 연산자와 함께 함수를 호출하면 `this` 바인딩이 다르게 동작한다. [(생성자호출패턴 참조)](http://poiemaweb.com/js-this#constructor-invocation-pattern)

## 3. 객체 프로퍼티 접근

### 3.1 프로퍼티 이름

* 문자열(빈 문자열 포함), 숫자가 올 수 있다. 
* 속성값은 undefined을 제외한 모든 값과 표현식이 올 수 있다.
* 속성값이 함수인 경우를 _메서드_ 라고 한다.
* 따옴표('',"")는 자바스크립트에서 사용할 수 있는 유효한 이름이고 예약어가 아닌 경우 생략 가능하다.  
(유효한 이름이 아닌 경우 반드시 따옴표를 사용한다.)
* 예약어를 속성명으로 사용시 예상치 못한 에러가 발생할 수도 있다.

```javascript
var person = {
    'first-name': 'chichi', 
    // '-'연산자가 있는 표현식은 자바스크립트에서 사용가능한 유효한 이름이 아님
    'last-name': 'Park',
    gender: 'female',
    function: 1 // 당장 에러는 없지만, 예약어는 사용하지 말아야 한다.
};

console.log(person.function);
```

> abstract, arguments, boolean, break, byte
case  catch, char, class*, const
continue, debugger, default, delete, do
double, else, enum*, eval, export*
extends*, false, final, finally, float
for, function, goto, if, implements
import*, in, instanceof, int, interface
let, long, native, new, null
package, private, protected, public, return
short, static, super*, switch, synchronized
this, throw, throws, transient, true
try, typeof, var, void, volatile
while, with, yield  
>
> ※ '*'는 ES6에서 추가된 예약어이다.

### 3.2 프로퍼티 값 읽기 - 객체의 속성에 접근

* 마침표(.) 표기법
* 대괄호([]) 표기법 : 대괄호 내 들어가는 속성명은 반드시 문자열이어야 한다.

속성명이 유효한 자바스크립트 이름이 아니거나 예약어인 경우는 대괄호 표기법을 사용한다.

객체에 존재하지 않는 속성을 참조하면 `undefined`를 반환

```javascript
var person = {
    'first-name': 'chichi',
    'last-name': 'Park',
    gender: 'female'
};

console.log(person);

console.log(person.first-name);    // NaN : undefined
console.log(person[first-name]);   // Uncaught ReferenceError: first is not defined
console.log(person['first-name']); // 'chichi'

console.log(person.gender);        // 'female'
console.log(person[gende]);        // Uncaught ReferenceError: gender is not defined
console.log(person['gender']);     // 'female'

console.log(person.age);           // undefined
```

### 3.3 프로퍼티 값 갱신

객체가 소유하고 있는 프로퍼티에 새로운 값을 할당하면 프로퍼티 값은 갱신된다.

```javascript
var person = {
    'first-name': 'chichi',
    'last-name': 'Park',
    gender: 'female'
};

person['first-name'] = 'Kim';
console.log(person['firsts-name']); // 'Kim'
```
### 3.4 프로퍼티 동적 생성

객체가 소유하고 있지 않은 프로퍼티에 값을 할당하면 프로퍼티를 객체에 추가하고 값을 할당한다.

```javascript
var person = {
    'first-name': 'chichi',
    'last-name': 'Park',
    gender: 'female'
};

person.age = 20;
console.log(person.age); // 20
```

### 3.5 프로퍼티 삭제

`delete` 연산자를 사용하여 객체의 프로퍼티를 삭제할 수 있다.

```javascript
var person = {
    'first-name': 'chichi',
    'last-name': 'Park',
    gender: 'female'
};

delete person.gender;
console.log(person.gender); // undefined

delete person;
console.log(person); // Object {first-name: 'chichi', last-name: 'Park'}
```

### 3.6 for in 문

for in 문을 사용해 객체에 포함된 모든 프로퍼티에 대해 루프를 수행한다.

```javascript
var person = {
    'first-name': 'chichi',
    'last-name': 'Park',
    gender: 'female'
};

var prop;

for(prop in person) {
    console.log(prop + ': ' + person[prop]);
}
// first-name: chichi
// last-namel: Park
// gender: female
```


## 4. Pass-by-reference

기본 자료형 object를 객체형 또는 참조형이라 한다.

참조형 : 객체의 모든 연산이 실제값이 아닌 참조값으로 처리 됨을 의미한다.

객체는 참조 방식으로 전달된다. 결코 복사되지 않는다. 
```javascript
// Pass-by-reference
var foo =  {
    val: 10
};
var bar = foo;
console.log(foo.val, bar.val); // 10 10
console.log(foo === bar);      // true

bar.val = 20; // 참조하고 있는 객체의 val값이 변경되었다.
console.log(foo.val, bar.val); // 20 20
console.log(foo === bar);      // true
```
```javascript
var foo = {val: 10};
var bar = {val: 10}; // 별개의 객체를 생성하여 참조값을 할당했다.

console.log(foo.val, bar.val); // 10 10
console.log(foo === bar);      // false

var baz = bar;       // baz에 bar의 값을 할당했기에 동일한 객체를 가리키는 참조값을 저장하고 있다.
console.log(baz.val, bar.val); // 10 10
console.log(baz === bar);      // true
```

## 5. Pass-by-value

기본 자료형의 값은 값(value)으로 전달된다. (복사되어 전달:pass-by-value)  

기본자료형은 값이 한 번정해지면 변경할 수 없지만(immnutable)  
객체는 변경가능한 프로퍼티들의 집합이라 할 수 있다.

> 객체와 변경불가성(http://poiemaweb.com/js-immutability)

```javascript
// Pass-by-value
var a = 1;
var b = a;

console.log(a, b);    // 1 1
console.log(a === b); // true

a = 10;
console.log(a, b);    // 1 10
console.log(a === b); // false
```

## 6. 객체의 분류

+ **Built-in Object(내장객체)** : 웹페이지 등을 표현하기 위해 제공하는 공통의 기능, 웹페이지가 브라우저에 의해 로드되자마자 별다른 행위없이 바로 사용이 가능하다.
  - Standard Built-in Object (or Global Objects)
  - Native Object
    + BOM (Browser Object Model)
    + DOM (Document Object Model)
+ **Host Object(사용자 정의 객체)** : `constructor` 혹은 객체리터럴을 통해 사용자가 객체를 정의하고 확장시킨 것들로 Built-in Object가 구성된 이후에 구성된다. 


