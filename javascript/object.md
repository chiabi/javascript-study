## 1. 객체(Object)

* 객체기반의 스크립트 언어, _자바스크립트를 이루는 거의 모든것은 객체_ 이다.  
기본자료형(Primitives)을 제외한 나머지 값들(함수, 배열, 정규표현식 등)은 모두 객체
* 데이터와 데이터에 관련된 동작(절차, 방법, 기능)을 모두 포함할 수 있는 개념적 존재.
* **속성(property: 이름과 값을 가지는 데이터를 의미)** 과 **메서드(method: 동작을 의미)** 를 포함하고 있는 독립적 주체
* 데이터를 한 곳에 모으고 _구조화_ 하는데 유용 (객체는 다른 객체를 포함할 수 있다)

### 1.1 속성(Proprety)

객체는 이름(name)과 값(value)의 쌍인 속성들을 포함하는 컨테이너  
속성은 속성명 속성값으로 구성됨

* 속성명 : 빈 문자열을 포함하는 문자열과 숫자
* 속성값 : `undefined`을 제외한 모든 값

### 1.2 메서드(Method)

객체에 제한되어 있는 함수. 즉, 속성값이 함수일 경우

## 2. 객체 생성 방법

* 자바 : 클래스를 사전에 정의, 필요한 시점에 new 연산자를 사용하여 인스턴스를 생성
* 자바스크립트 : 클래스라는 개념이 없음 별도의 객체 생성 방법이 존재

> ECMAScript 6에 새롭게 [클래스](http://poiemaweb.com/es6-class)가 도입되었다. 새로운 객체지향 모델을 제공하는 것은 아니며  
Class도 사실 함수이고 기존 _prototype_ 기반 패턴의 _syntactic sugar_이다.

> **syntactic sugar**  
사람이 이해하고 표현하기 쉽게 디자인 된 프로그래밍 언어 문법  
더욱 더 간결하고 명확하게 표현이 가능한 문법

#### 객체 생성 방법 3가지

1. **객체 리터럴** : 중괄호({})를 사용하여 객체를 생성
2. **Object() 생성자 함수** : new 연산자와 Object() 생성자 함수를 사용,  
 빈 객체 생성 이후 속성과 메서드를 추가
3. **생성자 함수** : 객체를 생성하기 위한 템플릿처럼 사용하여  
 속성값이 다른 객체 여러개를 간편하게 생성

### 2.1 객체 리터럴

가장 일반적이고 간편한 자바스크립트 객체 생성 방식  
중괄호({})내에 아무것도 기술하지 않으면 빈객체 생성,   
1개 이상의 **속성명(Property name): 속성값(Property value)** 을 기술하면 해당 속성이 추가된 객체 생성

```javascript
var empryObject = {}; // 빈객체 생성
console.log(typeof emptyObject); // object

var person = {
    name: 'Lee',
    gender: 'male',
    sayHello: function(){
        console.log('Hi! My name is ' + this.name);
    } // sayHello는 메서드
};

console.log(typeof person); // object
console.log(person); // Object {name: "Lee", gender: "male", sayHello: function}

person.sayHello(); // Hi! My name is Lee
```

### 2.2 Object() 생성자 함수

new 연산자와 [Object()](http://poiemaweb.com/js-standard-built-in-objects#object) 생성자 함수를 사용하여 빈객체를 생성  
빈 객체 생성 이후 속성과 메서드를 추가해 객체를 완성하는 방법

속성에 새로운 값을 할당하거나 속성과 값을 객체에 추가할 수 있다.

```javascript
var person = new Object();
// var person = {}; // 객체 리터럴 방식으로도 가능하다.

person.name = 'Lee';
person.gender = 'male';
person.sayHello = function(){
    console.log('Hi! My name is ' + this.name);
};

console.log(typeof person);
console.log(person);

person.sayHello();
```

> 자바스크립트 엔진은 객체 리터럴로 객체를 생성하는 코드를 만나면 내부적으로 Object() 생성자 함수를 사용하여 객체를 생성함  
(내장(Built-in) 함수인 Object()생성자 함수로 객체를 생성하는 것의 short-hand) 

### 2.3 생성자 함수

객체 리터럴 방식과 Object() 생성자 함수 방식은 객체를 생성할 때 속성값만 다른 여러개의 객체 생성에 불편이 있다.

생성자 함수는 객체를 생성하기 위한 템플릿처럼 사용하여 속성값이 다른 객체 여러개를 간편하게 생성할 수 있다.

```javascript
// 객체 리터럴 방식
var personl = {
    name: 'Lee',
    gender: 'male',
    sayHello: function(){
        console.log('Hi! My name is ' + this.name);
    }
};

var personl2 = {
    name: 'Kim',
    gender: 'female',
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

var person1 = new Person('Lee', 'male');
var person2 = new Person('Kim', 'female');

console.log('person1: ', typeof person1);
console.log('person2: ', typeof person2);
console.log('person1: ', person1);
console.log('person2: ', person2);

person1.sayHello();
person2.syaHello();
```

* 생성자 함수 이름은 일반적으로 대문자로 시작. (혼란을 방지하기 위해)
* 속성 또는 메서드명 앞 `this`는 생성자 함수로 생성될 **인스턴스(instance)** 를 가리킴,  
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

var person = new Person('Lee', 'male');

console.log(typeof person);
console.log(person);

console.log(person.gender); // 'male'
console.log(person.married); // undefined
```

> new 연산자와 함께 함수를 호출하면 `this` 바인딩이 다르게 동작한다. [(생성자호출패턴 참조)](http://poiemaweb.com/js-this#constructor-invocation-pattern)

## 3. 객체 속성 접근

### 3.1 속성명

* 문자열(빈 문자열 포함), 숫자가 올 수 있다. 
* 속성값은 undefined을 제외한 모든 값과 표현식이 올 수 있다.
* 속성값이 함수인 경우를 _메서드_ 라고 한다.
* 따옴표('',"")는 자바스크립트에서 사용할 수 있는 유효한 이름이고 예약어가 아닌 경우 생략 가능하다. (유효한 이름이 아닌 경우 반드시 따옴표 사용)
* 예약어를 속성명으로 사용시 예상치 못한 에러가 발생할 수도 있다.

```javascript
var person = {
    'first-name': 'chichi', 
    // '-'연산자가 있는 표현식은 자바스크립트에서 사용가능한 유효한 이름이 아님
    'last-name': 'Park',
    gender: 'male',
    function: 1 // 당장이 에러는 없지만, 예약어는 사용하지 말아야 한다.
};

console.log(person.function);
```

### 3.2 속성값 읽기 - 객체의 속성에 접근

* 마침표(.) 표기법
* 대괄호([]) 표기법 : 대괄호 내 들어가는 속성명은 반드시 문자열이어야 한다.

속성명이 유효한 자바스크립트 이름이 아니거나 예약어인 경우는 대괄호 표기법을 사용

객체에 존재하지 않는 속성을 참조하면 `undefined`를 반환

```javascript
var person = {
    'first-name': 'chichi',
    'last-name': 'Park',
    gender: 'male'
};

console.log(person);

console.log(person.first-name); // NaN : undefined
console.log(person[first-name]); // Uncaught ReferenceError: first is not defined
console.log(person['first-name']); // 'chichi'

console.log(person.gender); // 'male'
console.log(person[gende]); // Uncaught ReferenceError: gender is not defined
console.log(person['gender']); // 'male'

console.log(person.age); // undefined
```

### 3.3 속성값 갱신

객체가 소유하고 있는 속성에 새로운 값을 할당 >  속성값을 갱신

```javascript
var person = {
    'first-name': 'chichi',
    'last-name': 'Park',
    gender: 'male'
};

person['first-name'] = 'Kim';
console.log(person['first-name']); // 'Kim'
```
### 3.4 속성 동적 생성

객체가 소유하고 있지 않은 속성에 값을 할당 > 속성을 객체에 추가

```javascript
var person = {
    'first-name': 'chichi',
    'last-name': 'Park',
    gender: 'male'
};

person.age = 20;
console.log(person.age); // 20
```

### 3.5 속성 삭제

`delete` 연산자를 사용

```javascript
var person = {
    'first-name': 'chichi',
    'last-name': 'Park',
    gender: 'male'
};

delete person.gender;
console.log(person.gender); // undefined

delete person;
console.log(person); // Object {first-name: 'chichi', last-name: 'Park'}
```

### 3.6 for in 문

for in 문을 사용해 객체에 포함된 모든 속성에 대해 루프를 수행

```javascript
var person = {
    'first-name': 'chichi',
    'last-name': 'Park',
    gender: 'male'
};

var prop;

for(prop in person) {
    console.log(prop + ': ' + person[prop]);
}
// first-name: chichi
// last-namel: Park
// gender: male
```


## 4. Pass-by-reference

## 5. Pass-by-value

## 6. 객체의 분류