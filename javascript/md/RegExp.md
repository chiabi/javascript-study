# 정규표현식(Regular Expression)

[참조 : poiemaweb](http://poiemaweb.com/js-regexp)

문자열에서 특정 내용을 찾거나 대체 또는 발췌하는 데 사용한다.

e.g. 회원가입 화면에서 사용자로부터 입력 받는 전화번호가 유효한지 체크할 때  
반복문으로 한문자씩 체크할 수도 있지만, 정규표현식을 사용하면 간단하다

```javascript
var tel = '0101234567팔';

var myRegExp = /^[0-9]+$/;

console.log(myRegExp.test(tel)); // false;
```

#### 정규표현식은

+ 간단하다 : 반복문, 조건문을 사용한 복잡한 코드도 간단히 표현할 수 있다.
+ 가독성이 좋지 않다 : 주석이나 공백을 허용하지 않고 여러가지 기호를 혼합해 사용한다.

#### `/regexr/i`

+ `/` : 시작, 종료기호
+ `regexr` : 패턴(pattern)
+ `i` : 플래그(Flag)

#### 정규표현식을 사용하는 자바스크립트 메소드

+ `RegExp.prototype.exec()`
+ `RegExp.prototype.test()`
+ `String.prototype.match()`
+ `String.prototype.replace()`
+ `String.prototype.search()`
+ `String.prototype.split()` ...

```javascript
var targetStr = 'This is a pen.';
var regexr = /is/ig;

// RegExp 객체의 메소드
console.log(regexr.exec(targetStr)); // ["is", index: 2, input: "This is a pen."]
console.log(regexr.test(targetStr)); // true

// String 객체의 메소드
console.log(targetStr.match(regexr));  // ["is", "is"]
console.log(targetStr.replace(regexr, 'IS'));  // ThIS IS a pen.
console.log(targetStr.search(regexr));  // 2
console.log(targetStr.split(regexr));  // ["Th", " ", " a pen."]
```

## 플래그

옵션으로 선택적으로 사용한다.  
사용하지 않는 경우 문자열 내 검색 매칭 대상이 1개 이상이더라도 첫번째 매칭한 대상만 검색하고 종료한다.

<table>
    <tr>
        <th>Flag</th>
        <th>Meaning</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>i</td>
        <td>Ignore Case</td>
        <td>대소문자를 구별하지 않고 검색한다.</td>
    </tr>
    <tr>
        <td>g</td>
        <td>Global</td>
        <td>문자열 내의 모든 패턴을 검색한다.</td>
    </tr>
    <tr>
        <td>m</td>
        <td>Multi Line</td>
        <td>문자열의 행이 바뀌더라도 검색을 계속한다.</td>
    </tr>
</table>

```javascript
var targetStr = 'Is this all there is?';
var regexr = /is/;

console.log(targetStr.match(regexr)); // ["is", index: 5, input: "Is this all there is?"]

regexr = /is/ig;

console.log(targetStr.match(regexr)); // ["Is", "is", "is"]
```

## 패턴

찾고자 하는 대상을 문자열로 지정한다.  
특별한 의미를 가지는 메타문자(Metacharater) 또는 기호로 표현할 수 있다.

### `.` 

임의의 문자 한 개  
문자의 내용이 무엇이든 상관없이 패턴과 일치하는 n자리 문자를 추출한다.

```javascript
var targetStr = 'AA BB Aa Bb';
// 임의의 문자 3개
var regexr = /.../; // 3자리 문자를 추출

console.log(targetStr.match(regexr)); // ["AA ", index: 0, input: "AA BB Aa Bb"]
```

추출을 반복하기 위해서는 플래드 `g`를 사용한다.
```javascript
var targetStr = 'AA BB Aa Bb';
// 임의의 문자 3개를 반복하여 검색
var regexr = /.../g; // 3자리 문자를 추출

console.log(targetStr.match(regexr)); // ["AA ", "BB ", "Aa "]
```

모든 문자를 선택하려면 `.`와 `g`를 동시에 지정
```javascript
var targetStr = 'AA BB Aa Bb';
// 임의의 한문자를 반복 검색
var regexr = /./g;
console.log(targetStr.match(regexr));
//  ["A", "A", " ", "B", "B", " ", "A", "a", " ", "B", "b"]
```

※ 전체 문자열(문자로 분해되지 않은)을 선택하려면 `.`와 `+`를 동시에 지정
```javascript
var targetStr = 'AA BB Aa Bb';
var regexr = /.+/;
console.log(targetStr.match(regexr)); // ["AA BB Aa Bb"]
```

### 문자, 문자열

일치하는 문자 또는 문자열을 추출한다.  
대소문자를 구별하여 패턴과 일치한 첫번째 결과만 반환된다.
```javascript
var targetStr = 'AA BB Aa Bb';
// 임의의 한문자를 반복 검색
var regexr = /A/;
console.log(targetStr.match(regexr)); // ["A", index: 0, input: "AA BB Aa Bb"]
```

대소문자를 구별하지 않게 하려면 플래그 `i`를 사용
```javascript
var targetStr = 'AA BB Aa Bb';
// 'A'를 대소문자 구분없이 반복 검색
var regexr = /A/ig;
console.log(targetStr.match(regexr)); // ["A", "A", "A", "a"]
```

### `+`

앞선 패턴을 최소 한번 반복하려면 앞선 패턴 뒤에 `+`를 붙인다.
```javascript
var targetStr = 'AA AAA BB Aa Bb';
// 'A'가 한번이상 반복되는 문자열을 반복 검색
var regexr = /A+/g;
console.log(targetStr.match(regexr)); // ["AA", "AAA", "A"]
```

### `|`

or의 의미
```javascript
var targetStr = 'AA BB Aa Bb';
// 'A' 또는 'B'를 반복 검색
var regexr = /A|B/g;
console.log(targetStr.match(regexr)); // ["A", "A", "B", "B", "A", "B"]
```

### `+`

분해되지 않은 단어 레벨로 추출하기 위해서는 `+`를 같이 사용
```javascript
var targetStr = 'AA AAA BB Aa Bb';
// 'A'가 한번이상 반복되는 문자열을 반복 검색
var regexr = /A+|B+/g;
console.log(targetStr.match(regexr)); // ["AA", "AAA", "BB", "A", "B"]
```

### `[]`

`[]`내의 문자는 or로 동작한다.
```javascript
var targetStr = 'AA BB Aa Bb';
// 'A' 또는 'B'가 한번이상 반복되는 문자열을 반복 검색
var regexr = /[AB]+/g;
console.log(targetStr.match(regexr)); // ["AA", "BB", "A", "B"]
```

### `[ - ]`

범위를 지정하려면 `[]`내에 메타 문자 마이너스`-`을 사용한다.  
왼쪽 문자를 시작으로 오른쪽 문자까지 순차적으로 문자를 증가
```javascript
var targetStr = 'AA BB ZZ Aa Bb';
// 'A' ~ 'Z'가 한번이상 반복되는 문자열을 반복 검색
var regexr = /[A-Z]+/g; // [ABCDEFGHIJKLNMOPQRSTUVWXYZ] 와 동일하다
console.log(targetStr.match(regexr)); // ["AA", "BB", "ZZ", "A", "B"]
```

##### 대소문자를 구별하지 않고 알파벳을 추출하려는 경우 : [A-Za-z]
```javascript
var targetStr = 'AA BB Aa Bb';
// 'A' ~ 'Z' 또는 'a' ~ 'z'가 한번이상 반복되는 문자열을 반복 검색
var regexr = /[A-Za-z]+/g;
console.log(targetStr.match(regexr)); // ["AA", "BB", "Aa", "Bb"]
```

##### 숫자를 추출하는 방법 : [0-9]
```javascript
var targetStr = 'AA BB Aa Bb 24,000';
// '0' ~ '9'가 한번이상 반복되는 문자열을 반복 검색
var regexr = /[0-9]+/g;
console.log(targetStr.match(regexr)); // ["24", "000"]
```

컴마 때문에 결과가 분리되므로 패턴에 포함시킨다. 
```javascript
var targetStr = 'AA BB Aa Bb 24,000';
// '0' ~ '9' 또는 ','가 한번이상 반복되는 문자열을 반복 검색
var regexr = /[0-9,]+/g;
console.log(targetStr.match(regexr)); // ["24,000"]
```

### `\d`, `\D`

`\d`는 숫자를 의미한다. `[0-9]`와 같음  
`\D`는 `\d`와 반대로 동작한다.

```javascript
var targetStr = 'AA BB Aa Bb 24,000';
// '0' ~ '9' 또는 ','가 한번이상 반복되는 문자열을 반복 검색
var regexr = /[\d,]+/g;
console.log(targetStr.match(regexr)); // ["24,000"]

// '0' ~ '9'가 아닌 문자(숫자가 아닌 문자) 또는 ','가 한번이상 반복되는 문자열을 반복 검색
var regexr = /[\D,]+/g;
console.log(targetStr.match(regexr)); // ["AA BB Aa Bb ", ","]
```

### `\w`, `\W`

`\w`는 알파벳과 숫자를 의미한다. `[A-Za-z0-9]`, `[a-zA-Z_0-9]`과 같다  
`\W`는 `\w`와 반대로 동작한다. `[^a-zA-Z_0-9]` 의 축약형

```javascript
var targetStr = 'AA BB Aa Bb 24,000';
// 알파벳과 숫자 또는 ','가 한번 이상 반복되는 문자열을 반복 검색
var regexr = /[\w,]+/g;
console.log(targetStr.match(regexr)); // ["AA", "BB", "Aa", "Bb", "24,000"]

// 알파벳과 숫자가 아닌 문자 또는 ','가 한번 이상 반복되는 문자열을 반복 검색
var regexr = /[\W,]+/g;
console.log(targetStr.match(regexr)); // [" ", " ", " ", " ", ","]
```

## 자주 사용하는 정규표현식

### `^` 특정 단어로 시작하는지 검사

> ※ `[^]` : 대괄호 사이의 가장 첫번째 문자로, 괄호안의 문자를 제외한 모든 문자와 일치함  
> 문자 집합의 반대(not)을 의미한다.

```javascript
var targetStr = 'abcdef';
// `abc`로 시작하는지 검사
var regexr = /^abc/;
console.log(regexr.test(targetStr)); // true
```

### `$` 특정 단어로 끝나는지 검사

```javascript
var targetStr = 'abcdef';
// `ef`로 끝나는지 검사
var regexr = /ef$/;
console.log(regexr.test(targetStr)); // true
```

### 모두 숫자인지 검사

```javascript
var targetStr = '12345';
var regexr = /^\d+$/;
console.log(regexr.test(targetStr)); // true
```

### `\s` 공백 검사

스페이스, 탭, 폼 피드, 줄 바꿈 문자들을 포함한 하나의 공백 문자에 일치한다.  
`\S`는 `\s`의 반대로 동작한다.

##### 공백으로 시작하는지 검사

```javascript
var targetStr = ' Hi!';
// 1개 이상의 공백으로 시작하는지 검사
var regexr = /^\s+/;
console.log(regexr.test(targetStr)); // true
```

### `{n}`, `{n,m}` n, n ~ m 자리인지 검사

+ `{n}` : n은 양의 정수이고, 앞 문자가 n번 나타날 경우에 일치한다.
+ `{n,m}` : n,m은 양의 정수이고, `n <= m`(from to, 이상 이하) 을 만족해야한다.  
앞 문자가 최소 n개, 최대 m개가 나타나면 일치한다.

##### 아이디로 사용 가능한지 검사.(영문자, 숫자만 허용, 4~10자리)

```javascript
var targetStr = 'abc123';
// 알파벳 대소문자 또는 숫자로 시작하고 끝나며, 4~10자리인지 검사
var regexr = /^[A-Za-z0-9]{4,10}$/;
// var regexr = /^[A-Z0-9]{4,10}$/i;
// var regexr = /^[\w]{4,10}$/;
console.log(regexr.test(targetStr)); // true
```

##### 핸드폰 번호 형식에 맞는지 검사

```javascript
var targetStr = '010-1234-5678';
var regexr = /^\d{3}-\d{3,4}-\d{4}$/;
console.log(regexr.test(targetStr)); // true
```

### `?`, `*`, `\`, `\n`, `\b`
+ `?`: 앞에 문자가 없거나 1번만 나타나는 패턴과 일치시킴 (0 or 1)
+ `*`: 앞에 문자가 없거나 1번이상 나타나는 패턴과 일치시킴 (0 or more)
+ `\`: 메타 문자를 일반문자로 취급, e.g `\$` 정규식은 $문자와 일치
+ `\n` : 줄 바꿈 문자에 일치
+ `\b` : 공백, 구두점 또는 문자열 시작/끝과 같은 단어 경계 위치를 찾는다.  
`\B`는 이와 반대로 동작한다.


##### 메타 문자를 일반 문자로 추출

```javascript
// $12,000을 추출할 때
var targetStr = 'AA BB Aa Bb $12,000';
// 역슬래쉬(\)로 메타문자를 일반 문자로 취급하게 한다.
// var regexr = /\$12,000/g;
// [0-9]를 사용 $이후 숫자를 한정하지 않음
// [0-9,]를 사용해 ','도 추출
// [0-0,]+ 문자 집합을 반복 일치해 콤마가 나타나도 일치가 중단되지 않게 함
var regexr = /\$[0-9,]+/g
console.log(targetStr.match(regexr)); // ["$12,000"]
```

```javascript
// $12,000.00을 추출할 때
var targetStr = 'AA BB Aa Bb $12,000.00';
// 역슬래쉬(\)로 메타문자(. : 임의의 한 문자를 의미)를 일반 문자로 취급하게 한다.
var regexr = /\$[0-9,\.]+/g
console.log(targetStr.match(regexr)); // ["$12,000.00"]
```

##### 메일 주소 형식에 맞는지 검사

```javascript
var targetStr = 'ungmo2@gamil.com';
var regexr = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

console.log(regexr.test(targetStr)); // true
```

```javascript
var targetStr = 'A full Reference foo@demo.net bar.ba@test.co.uk www.demo.com';

// 글 사이에서 이메일 형식을 찾으려 할
var regexr = /\b[\w\.-_]+@[\w\.-_]+\.\w{2,4}\b/g;
console.log(targetStr.match(regexr)) // ["foo@demo.net", "bar.ba@test.co.uk"]
```

##### HTTP URL 추출하기

```javascript
var targetStr = "http://www.static.com:8080/a.jpg A: https://admin.static-best.io/show?no=1 B: https://static-best.site.org/show.jsp?no=1 http://static best.net/#!/ibare http://static.net/#!/ibare";

// 올바른 HTTP URL 만 추출하려 할 때
var regexr = /\bhttps?:\/\/[^:\/\s]+\.\w+(:\d+)?/g;
console.log(targetStr.match(regexr)) // ["http://www.static.com:8080", "https://admin.static-best.io", "https://static-best.site.org", "http://static.net"]
```

## 위치 지정 메타 문자

패턴을 일치시키는 위치를 지정한다.

> ※ 후방탐색 연산자`(?<=)` 는 Javascript 정규식에서 지원되지 않는다.

+ `(?:y)`: y에 일치한 것을 기억하지 않는다.
+ `(?=y)`: y가 뒤따라오는 것에만 일치한다.
+ `(?!y)`: y가 뒤따라오지 않은 것에만 일치한다.

##### 컬러값 추출
```javascript
var targetStr = 'color: #ff0000; background-color: #00ff00; border-color: #ddd;';
// ;를 포함하면서 추출 시 세미콜론을 제거한다.
var regexr = /#[\da-fA-F]{3,6}(?=;)/g;
console.log(regexr.match(regexr));
```

##### 특수 문자 포함 여부 검사
```javascript
var targetStr = 'abc#123.$';
var regexr = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
console.log(regexr.test(targetStr)); // true
console.log(targetStr.match(regexr)); // [#]
```

## Javascript Regular Expression

### RegExp Constructor

자바스크립트는 정규표현식을 위해 RegExp 객체를 지원한다.  
RegExp 객체 생성을 위해 리터럴 방식, RegExp 생성자 함수를 사용할 수 있다.

> `new RegExp(pattern[, flags])`

+ pattern 정규표현식의 텍스트 
+ flags 정규표현식의 플래그(g, i, m, u, y)

```javascript
// 정규식 리터럴
var myRegExp = /ab+c/i;

var myRegExp = new RegExp('ab+c', 'i');
var myRegExp = new RegExp(/ab+c/, 'i');
var myRegExp = new RegExp(/ab+ci/); // ES6
```

### RegExp Method

#### RegExp.prototype.exec()

문자열을 검색하여 매칭 결과를 반환한다.  
반환값은 배열 또는 null 이다.

※ exec 메소드는 g 플래그를 지정해도 첫번째 매칭 결과만 반환한다.

```javascript
var target = 'Is this all there is?';
var regExp = /is/g;

var res = regExp.exec(target);
console.log(res); // ["is", index: 5, input: "Is this all there is?"]
```

#### RegExp.prototype.test()

문자열을 검색하여 매칭 결과를 반환한다.
반환값은 true 또는 false이다.

***

+ [MDN: 정규표현식](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/%EC%A0%95%EA%B7%9C%EC%8B%9D)
+ [초보자를 위한 정규 표현식 가이드](https://www.slideshare.net/ibare/ss-39274621)
+ [정규표현식 도식화 사이트](https://regexper.com/)
+ [정규표현식 테스트 사이트, 레퍼런스도 있음](https://regexr.com/)
