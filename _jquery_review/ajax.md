# AJAX

+ [참조: zerocho](https://www.zerocho.com/category/jQuery/post/57b1a48f432b8e586ae4a973)

AJAX(Asynchoronous Javascript and XML)  
비동기적으로 서버에 요청을 하여 페이지 전환없이도 새로운 데이터를 가져온다.

jQuery AJAX 코드
```javascript
$.ajax({
    url: '주소',
    type: 'get 또는 post',
    data: {
        // 보낼 데이터
    },
    dataType: 'json, xml, script, text 또는 html',
    done: function(response) {
        // 성공 시 동작
    },
    fail: function(error) {
        // 실패 시 동작
    },
    always: function(response) {
        // 성공하든 실패하든 항상 할 동작
    }
});
```

### get이나 post만을 전문적으로 하는 메소드  

데이터, 데이터타입은 입력하지 않아도 된다.

```javascript
$.get('주소', '데이터', function(res) {
    // 성공 시 동작
}, '데이터타입');
$.post('주소', '데이터', function(res) {
    // 성공 시 동작
}, '데이터타입');
```

### 스크립트와 JSON만을 전문적으로 가져오는 메소드

```javascript
$.getScript('스크립트 주소', function(script) {
    // 성공 시 동작
});
$.getJSON('JSON 주소', {데이터}, function(data) {
    // 성공 시 동작
});
```

### 선택한 태그 안에 다른 html 파일로부터 가져온 태그를 넣는 메소드
```javascript
$('#tag').load('다른 html 주소');
```

## Promise

jQuery는 가짜 프로미스 객체를 지원한다(공식적인 Promise 구현을 따르지 않은)

> __promise__
> 자바스크립트는 비동기 처리를 위해 콜백을 사용하는 데, 전통적인 콜백패턴의 한계를 보완하며, 비동기 처리 시점을 명확하게 표현하는 기법

```javascript
$.ajax({
    url: '주소',
    type: 'get 또는 post',
    data: {
        // 보낼 데이터
    },
    dataType: 'json, xml, script, text 또는 html'
}).done(function(response) {
    // 성공 시 동작
}).fail(function(error) {
    // 실패 시 동작
}).always(functino(response) {
    // 완료 시 동작
});
```