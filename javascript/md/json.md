# JSON(JavaScript Object Notation)

[참조 : JSON](https://www.zerocho.com/category/Javascript/post/57432adfa48729787807c3fb)

자바스크립트 문법을 빌린 데이터 교환 형식  
XML보다 코드 양이 적다.

일반 자바스크립트 객체처럼 사용하면 되지만, __함수는 들어가면 안된다.__
작은따옴표 대신 큰따옴표로 감싸져야 한다.  
키(Key)도 반드시 쌍따옴표로 감싸져야 한다.  

```JSON
{
 "title": "chichi",
 "description": "치치의 자바스크립트 스터디", // String
 "email": "chiabi88@gmail.com",
 "date": "2017-11-06",
 "keyword": ["javascript", "jQuery", "nodejs", "webpack", "gulp"], // Array
 "contributor": 1, // Number
 "private": false, // Boolean
 "meta": { // Object
     "googleAnalytics": false
 }
}
```
## JSON 객체

자바스크립트는 JSON을 활용할 수 있게 __JSON객체__ 를 제공한다.

### JSON 객체의 메소드 
+ `stringify` : 서버를 위해 문자열로 바꿔준다.
+ `parse` : 서버에서 돌려받을 때 만약 문자열이 왔다면 다시 JSON 객체로 바꿔준다.

※ JSON 데이터를 서버를 통해 전송할 때, 객체를 이해하지 못하는 서버가 있기 때문  

```javascript
var example = {
    "stringifyMe": "please",
    "andParseMe": "thankYou"
};
var string = JSON.stringify(example); // '{"stringfyMe": "please", "andParseMe":"thankYou"};
var parsed = JSON.parse(string); // 원상태로
```

※ `JSON.parse`를 할 때 인자가 `undefined`나 JSON 형태가 아닌 문자열이면 안된다.  
(Uncaught SyntaxError : Unexpected token 에러가 뜬다.)

`JSON.stringify`와 `JSON.parse`를 한 번에 사용하면 객체를 복사할 수 있다.(참조가 아닌 복사)  
(객체는 원래 서로 참조를 하기 때문에 하나의 값을 바꾸면 다른 것들도 값이 바뀐다.)

```javascript
var obj = {test: 'yes'};
var obj2 = JSON.parse(JSON.stringify(obj));
obj2.test = 'no';
obj.test; // yes
```
