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