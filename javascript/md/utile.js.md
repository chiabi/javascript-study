## 1. [JSDOC]((http://usejsdoc.org/))

book 함수에 대한 설명 예)

```javascript
/**
 * @constructor
 * @param {string} title - The title of the book
 * @param {string} author - The author of the book
 */
```
### 1.1 [jsDoc Block Tags](http://usejsdoc.org/index.html#block-tags)

* @global : 심볼이 문서에서 전역 심볼로 나타나도록 지정, JSDoc은 소스 파일 내 심볼의 실제 범위 무시
* @function (@func, @method) [<functionName>] : 함수 이름
* @param {string} [이름] - [설명] : 함수 매개 변수의 이름, 유형 및 설명을 제공
* @returns {string} : 함수 반환값

***

## 2. 유틸리티 함수 제작

### 2.1. Javascript 데이터 유형을 완벽하게 문자열로 반환하는 유틸리티 함수

```javascript
function type(data) {
    return Object.prototype.toString.call(data).slice(8,-1).toLowerCase();
}
// e.g.
var data_string = '문자열입니다.', 
    data_number = 71,
    data_boolean = 1 > 4,
    data_null = null,
    data_undefined = undefined;

type(data_string);      // "string"
type(data_number);      // "number"
type(data_boolean);     // "boolean"
type(data_null);        // "null"
type(data_undefined);   // "undefined"
```

> Object.prototype.toString : 객체를 나타내는 문자열을 반환 함

> Function.prototype.call() : 주어진 this 값 및 각자에게 제공된 인수를 갖는 함수를 호출한다.

### 2.2. Javascript 데이터 유형을 검증하여 참/거짓을 반환하는 유틸리티 함수

```javascript
function isType(data, kind) {
    // validateError()를 사용하여 오류 조건을 발생시킴:
    validateError(kind, '!string', '2번째 전달인자는 문자열이어야 합니다.');
    return type(data === kind);
}

// e.g.
// 위 예시의 변수
isType(data_number, 'number'); //true
isType(data_number, 'string'); //false

isType(data_number, number); //VM237:1 Uncaught ReferenceError: number is not defined
isType(data_number); // 2번째 전달인자는 문자열이어야 합니다
```

### 2.3. 오류 조건을 발생시키는 문장을 만들어 내는 유틸리티 함수

```javascript
function validateError(data, kind, error_massage){
    data = type(data);
    // kind 문자열 인덱스 첫번째에 '!'가 있으면
    if( kind.indexOf('!') === 0 ) {
        if( data !== kind.slice(1) ) {
            throw error_massage || '두 값이 다르기에 오류입니다.';
        }
    } else {
        if ( data === kind ) {
            throw error_massage || '두 값은 동일하기에 오류입니다.';
        }
    } return '오류는 발생하지 않았습니다.';
}

// e.g.
validateError(44, '!string');           // 두 값이 다르기에 오류입니다.
validateError('문자열', 'string');       // 두 값은 동일하기에 오류입니다.
validateError('문자열', 'string', '문자열이기 때문에 오류입니다'); 
// 문자열이기 때문에 오류입니다
```

#### String.prototype.indexOf()

indexOf() 메서드는 호출한 String 객체에서 특정 값의 첫 번째 일치하는 인덱스를 반환한다.  
일치하는 값이 없으면 -1을 반환한다.  

> str.indexOf(searchValue[, fromIndex])

+ searchValue : 찾고자 하는 문자열
+ fromIndex : 문자열에서 찾기 시작하는 위치를 나타내는 인덱스 값  
  searchValue가 공백 문자열이 아니라면, str.length를 반환함

```javascript
'Blue Whale'.indexOf('Blue');     // 0 
'Blue Whale'.indexOf('Blute');    // -1 (일치하는 값 없음)

'Blue Whale'.indexOf('Whale', 0); //  5
'Blue Whale'.indexOf('Whale', 5); //  5

'Blue Whale'.indexOf('', 9);      //  9
'Blue Whale'.indexOf('', 10);     //  10
'Blue Whale'.indexOf('', 11);     //  10
```

#### throw 문

> throw _expression_;

사용자 정의 예외를 throw 한다. 예외를 사용할 때, 사용되는 값을 포함하는 표현을 명시해야한다.

```javascript
throw 'Error2';
throw 42;
throw true;
```

### 2.4. 전달된 숫자보다 하나 작은 수 까지의 난수를 반환하는 유틸리티 함수

```javascript
function randomNumber(n) {
    // 기본 값을 지정한다.
    n = n || 2; // 0, 1
    validateEerror(n, '!number', '숫자 값을 전달해주세요.');
    return Math.floor( Math.random() * n);
}
```

+ Math.floor() : 주어진 숫자보다 작거나 같은 가장 큰 정수를 반환함
+ Math.random() : 0(포함)과 1(불포함)사이의 난수를 반환함

```javascript
Math.floor(45.95); // 45
Math.floor(45.05); // 45
Math.floor(-45.05); // -46
Math.floor(-45.95); // -46

var randomNum = Math.floor((Math.random() * 10) + 1); // 1 ~ 10
console.log(randomNum);
```

> Math.random()은 암호적으로 안전한 난수를 제공하지 않는다. 보안과 관련된 어떤 것에도 이를 사용하지 말아라.

### 2.5. 전달된 최소값, 최대값 사이의 난수를 반환하는 유틸리티 함수

```javascript
function randomMinMax(min, max) {
    validateError(min, '!number', '첫번째 인자 최소값을 전달해주세요.');
    validateError(max, '!number', '두번째 인자 최대값을 전달해주세요.');
    max = max - min;
    return Math.round( Math.random() * max ) + min;
}
```

+ Math.round() : 어떤 수와 가장 가까운 정수를 반환한다.(반올림)

### 2.6. 전달된 인자에서 최소값, 최대값을 구분한 후, 그 사이의 나나수를 반환하는  유틸리티 함수

```javascript
function randomRange(n1, n2) {
    var min, max;
    min = Math.min(n1, n2);
    max = Math.max(n1, n2);
    return randomMinMax(min, max);
}
```

+ Math.min
+ Math.max

### 2.7. 숫자 유형의 데이터인지 감별하는 유틸리티 함수

```javascript
function isNumber(data){
    // 데이터가 넘버이고 NaN이 아닐 경우 true를 반환
    return isType(data, 'number') && !Number.isNaN(data);
}
```

#### Number.isNaN()

전달된 값이 NaN인지 결정함.
global isNaN() 함수에서 매개변수를 강제로 숫자로 변환하는 문제가 없음
오직 숫자형이고 NaN인 값만이 true를 반환함

```javascript
Number.isNaN(NaN);        // true
Number.isNaN(Number.NaN); // true
Number.isNaN(0 / 0)       // true

// global isNaN()으로는 true가 됐을 것임
Number.isNaN("NaN");      // false
Number.isNaN(undefined);  // false
Number.isNaN({});         // false
Number.isNaN("blabla");   // false
```

### 2.. 문자 유형의 데이터인지 감별하는 유틸리티 함수

```javascript
function isString() {
    return isType(data, 'string');
}
```

### 2.. 불리언 유형의 데이터인지 감별하는 유틸리티 함수

```javascript
function isBoolean() {
    return isType(data, 'bloolean');
}
```

### 2.. 함수 유형의 데이터인지 감별하는 유틸리티 함수

```javascript
function isFunction(data) {
    return isType(data, 'function');
}
```

### 2.. 배열 유형의 데이터인지 감별하는 유틸리티 함수

```javascript
function isArray(data) {
    return isType(data, 'array');
}
```

### 2.. 객체(Object) 유형의 데이터인지 감별하는 유틸리티 함수

```javascript
function isObject(data) {
    return isType(data, 'object');
}
```