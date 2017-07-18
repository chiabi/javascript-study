# Advanced Plugin Concepts

[참조 : Advanced Plugin Concepts](https://learn.jquery.com/plugins/advanced-plugin-concepts/)

## 1.  Default Plugin Settings에 대한 Public Access 제공

이전 코드에서 개선해야할 점은 기본 플러그인 설정을 노출하는 것이다. 

이는 플러그인 사용자가 최소한의 코드로 플러그인을 재정의하거나 커스터마이징 하는 것을 매우 쉽게 만들기 때문에 중요하다.  
그리고 이것이 우리가 함수 객체를 이용하기 시작하는 지점이다.

```javascript
// 플러그인 정의
$.fn.hilight = function(options) {
  // 제공된 옵션으로 기본 옵션을 확장하라.
  // 확장 할 첫번째 인수는 빈 객체이다
  // - 이는 "defaults" 객체를 덮어 쓰지 않게하기 위해서다.
  var opts = $.extend({}, $.fn.hilight.defaults, options);

  // ...플러그인 구현 코드... 
};

// 플러그인 기본값(defaults) - 플러그인 함수에 속성으로 추가되었다.
$.fn.hilight.defaults = {
  foreground: "red",
  background: "yellow"
}
```

이제 사용자는 다음과 같은 라인을 스크립트에 포함시킬 수 있다. : 
```javascript
// 이것은 한번만 호출되고 "ready" 블록에서 호출 될 필요가 없다.
$.fn.hilight.defaults.foreground = "blue";
```

그리고 이제 우리는 이와 같은 플러그인 메서드를 호출할 수 있고,   
파란 foreground(전경 색상)사용해 볼 것이다. : 
```javascript
$("#myDiv").hilight();
```

보다시피 사용자는 플러그인의 기본 전경색을 변경하기 위해 한 줄의 코드를 작성할 수 있다.  
사용자는 원하는 경우 이 새로운 기본값을 선택적으로 무시할 수 있다.

```javascript
// 플러그인의 dafault foreground 색을 덮어 쓴다.
$.fn.hilight.defaults.foreground = "blue";

// ....

// 새 기본값을 사용해 플러그인을 호출한다.
$(".hilightDiv").hilight();

// ....

// 옵션을 플러그인 메서드에 전달해 기본값을 재정의한다.
$("#green").hilight({
  foreground: "green"
});
```

## 2. 적용 가능한 보조 기능에 대한 Public Access 제공

다른 사용자가 플러그인을 확장할 수 있게하는 방법이다. 

예를 들어, 우리의 플러그인 구현은 하이라이트 텍스트를 포맷하는 "format" 함수를 정의할 수 있다.
플러그인은 이제 hilight 함수 아래에 정의 된 format 메서드의 기본 구현으로 다음과 같이 보일 수 있다. : 
```javascript
// 플러그인 정의
$.fn.hilight = function(options) {
  // 일차하는 각 요소를 반복하고 다시 형식을 지정한다.
  return this.each(function(){
    var elem = $(this);
    // ...

    var markup = elem.html();

    // 만든 format 함수를 호출한다.
    markup = $.fn.hilight.format(markup);

    elem.html(markup);
  });
};

// format 함수를 정의한다.
$.fn.hilight.format = function(txt) {
  return "<strong>" + txt + "</strong>";
}; 
```