# Advanced Plugin Concepts

[참조 : Advanced Plugin Concepts](https://learn.jquery.com/plugins/advanced-plugin-concepts/)

## 1.  Provide Public Access to Default Plugin Settings
Default Plugin Settings에 대한 Public Access 제공

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

## 2. Provide Public Access to Secondary Functions as Applicable
적용 가능한 보조 기능에 대한 Public Access 제공

이 항목은 이전 항목과 함께 사용되고 당신의 플러그인을 확장하는 흥미로운 방법이다.  
(다른 사용자가 플러그인을 확장할 수 있게하는 방법이다.)

예를 들어, 하이라이트 텍스트를 포맷하는 "format"이라는 함수를 다른 사용자(또는 사용 시점에) 정의 할 수 있다. :  
```javascript
// 플러그인 정의
$.fn.hilight = function(options) {
  // 일치하는 각 요소를 반복하고 다시 형식을 지정한다.
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
default formatting을 덮어쓰는 콜백함수를 허용하는 옵션 객체에 다른 속성을 쉽게 지원할 수 있었다.  
이것은 플러그인의 사용자 정의를 지원하는 또다른 훌륭한 방법이다.  

이 기술은 format 함수가 다시 정의 될 수 있도록 실제로 노출시킴으로써 한 단계 더 나아갔다.   
이 기술을 사용하면 다른 사용자가 당신의 플러그인을 커스텀해서 덮어쓸 수 있다.  
즉 다른 사용자가 플러그인 용 플러그인을 작성할 수 있음을 의미한다.

이 문서에서 작성하는 간단한 예제 플러그인을 고려할 때, 이것이 언제 유용 할 지 궁금할 것이다.  
실 사용 예가 [Cycle Plugin](http://malsup.com/jquery/cycle/)이다.  
Cycle Plugin은 스크롤, 슬라이드, 페이드 등 내장 된 여러 전환 효과를 지원하는 슬라이드 쇼 플러그인이다. 하지만 실제로 슬라이드 전환에 적용 할 수있는 모든 유형의 효과를 정의 할 수있는 방법은 없다
그리고 바로 이러한 유형의 확장 성이 유용하다.

'Cycle Plugin은 사용자가 자신 만의 사용자 정의 트랜지션 정의를 추가 할 수있는 "트랜지션"객체를 제공한다.  
이는 플러그인에서 다음과 같이 정의된다.
```javascript
$.fn.cycle.transitons =  {
  /* ... */
}
```

이 기술은 다른 사람들이 Cycle Plugin에 plug-in하는 transitions 정의를 정의하고 제공 할 수 있디.