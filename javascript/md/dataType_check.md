# 암묵적 강제 형 변환 (Type coercion)

[참조 : FDS](https://github.com/owl423/FDS04_Summary/blob/master/README/0530.md)  
[참조 : poiemaweb](http://poiemaweb.com/js-control-flow#41-암묵적-강제-형-변환-type-coercion)

*** 
## 데이터 타입 검증

+ typeof
+ Array.isArray()
+ instanceof
+ constructor

### 1. typeof

> typeof _operand(피연산자)_

typeof 연산자는 평가되지 않은 피연산자의 타입을 나타내는 문자열을 반환한다.  

**parameters**  
+ operand : 유형이 반환 될 객체 또는 primitive를 나타내는 표현식이다.  

```javascript
console.log(typeof 'str');  // string
console.log(typeof 20);     // number

var a = 20 > 12;
console.log(typeof a);      // boolean

// Object
var obj =  {
  firstName: 'first',
  lastName: 'last'
};
console.log(typeof obj);  // object
```

#### typeof의 문제점

배열, null을 포함하여 constructor가 객체를 구분하지 못하고 'object'를 반환한다.
```javascript
// Array
var arr = [1, 2, 3, 4, 5];
// Array.isArray 또는 Object.prototype.toString.call을 사용할 것
console.log(typeof arr);  // object
console.log(typeof null); // object
```

### 2. Array.isArray()

> Array.isArray(obj)

Array.isArray() 메서드는 Array 값인지 true, false를 반환한다.

**parameters**  
+ obj : 검사할 객체이다.

```javascript
Array.isArray([]);        // true
Array.isArray(new Array); // true
Array.isArray('Array');   // false
```

### 3. instanceof

> _object_ instanceof _constructor_

instanceof 연산자는 프로토타입 체인의 객체에 생성자의 프로토타입 속성이 있는지 여부를 테스트한다. ( 객체의 생성자 확인 )

**Parameters**  
+ object : 테스트할 객체
+ constructor : 테스트 할 기능

```javascript
new Array() instanceof Array;          // true
new Array() instanceof Object;         // true
new Number(90) instanceof Number;      // true
new String('string') instanceof String // true
({}) instanceof Object;                // true : 오브젝트 리터럴 노테이션으로 생성된 오브젝트
```

#### typeof의 문제점

primitive type에는 사용할 수 없고, (객체로 랩핑되어 검사가 가능하나 불완전하다.)  
부모 클래스에 대한 연산결과를 구분할 수 없다.  
null, undefined에 대해서 오류를 내보낸다.

```javascript
90 instanceof Number;             // false
'string' instanceof String        // false
null instanceof null;             // ERR! 
```

### 4. constructor

인스턴스의 프로토타입을 만든 Object 함수의 참조를 반환한다. (객체의 속성 확인)  
null, undefined 와 같이 객체가 아닌 유형에는 사용할 수 없다.

```javascript
var a = 90;
a.constructor === Number;          // true;
new Array().constructor === Array; // true;
false.constructor === Boolean;     // true;

null.construcotr === null;         // ERR! Cannot read property 'construcotr' of null
```

## 분명한 데이터 타입 검증

### Object.prototype.toString.call( _data_ );

+ _data_ 에서 Object.prototype.toString 함수를 빌려(call), 해당 객체의 타입을 반환한다.
+ 대소문자가 구분된 `[object type]` 포맷으로 반환되므로, `slice()`와 `toLowerCase()` 함수를 이용하여 가공한다.

```javascript
function type(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}
```


