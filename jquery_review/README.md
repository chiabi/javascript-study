# jQuery 코드 분석

* [jQuery.com](http://jquery.com/)

## jQuery

### jQuery란?

jQuery는 빠르고 작으며 기능이 풍부한 _Javascript 라이브러리_ 이다.  
여러 브라우저에서 작동하는 사용하기 쉬운 API로  
_HTML 문서 탐색 & 조작, 이벤트 처리, 애니메이션 및 Ajax_ 를 훨씬 간단하게 만든다.

### jQuery 보기

#### DOM 탐색 및 조작

'continue' 클래스를 가지는 `<button>` 요소를 가져와서 HTML을 'Next Step...'으로 변경

```javascript
$('button.continue').html('Next Step...');
```

#### 이벤트 핸들링

`#button-container`안의 버튼을 클릭하면 CSS의 `display: hidden`으로 숨겨진 `#banner-message`요소를 표시함

```javascript
var hiddenBox = $('#banner-message');
$('#button-container button').on('click', function(event) {
    hiddenBox.show();
});
```

#### Ajax

쿼리 매개변수 `zipcode=97201`을 사용하여 서버 `/api/getWeather`에서 로컬 스크립트를 호출하고 요소 `#weather-temp`의 html을 반환 된 텍스트로 수정함

```javascript
$.ajax({
    url: '/api/getWeather',
    data: {
        zipcode: 97201
    },
    success: function(result) {
        $('#weather-temp').html('<strong>' + result + '</strong> degrees');
    }
});
```

***
