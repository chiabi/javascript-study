라이브러리 분석

[참고: poiemaweb](http://poiemaweb.com/jquery-plugin)

[참조: How to Create a Basic Plugin](http://learn.jquery.com/plugins/basic-plugin-creation/)

# 제이쿼리 확장 

코드의 전반에 걸쳐 사용할 수 있는 기능을 만들고 싶을 수 있다. 예를 들어, 선택 영역<sup>selection</sup>에 대해 일련의 연산을 수행하는 jQuery selection에서 호출 할 수 있는 단일 메서드가 필요할 수 있다. 이러한 경우에는 플러그인을 작성하는 것이 좋다.

## 1. How jQuery Works 101 : jQuery Object Method

자체 플러그인을 작성하기 전에 먼저 jQuery의 작동 방식에 대한 약간의 이해가 필요하다. 

```javascript
$('a').css('color', 'red');
```
이것은 꽤 기본적인 jQuery 코드이지만, 뒤에서 어떤 일이 벌어지는 지 아는가?

`$`함수를 사용하여 요소를 선택할 때마다 jQuery 객체가 반환된다.  
이 객체에는 사용하고 있는 모든 메서드(`.css()`, `.click()`, 등등)와 선택자<sup>selector</sup>에 맞는 모든 요소를 포함한다.  

jQuery 객체는 `$.fn` 객체에서 이 메서드들을 가져온다. 이 객체는 모든 jQuery 객체 메서드를 포함하며, 만약 직접 메서드를 작성하고 싶다면, 이들을 모두 포함시켜야한다.

>**$.fn**
pure javascript에서 built-in object의 메서드가 prototype에 담겨있는 것과 같이 jQuery 객체의 메서드들은 jQuery 객체의 prototype인 `$.fn`에 담겨있다.

jQueyr 소스 코드의 초기 부분의 일부 발췌
```javascript
var jQuery = function(selector, context) {
  return new jQuery.fn.init(selector, context);
}
/* ... */
jQuery.fn = Object.prototype = {
  constructor: jQuery,
  /* ... */
}
```
```
=========================  __proto__  =========================
   Function.prototype       ------->      Object.ptrototype
                                            [constructor]
-------------------------             ------------------------- 
            ^                                  ^           
  __proto__ |                                  | __proto__ 
            |                                  |           
=========================             =========================
   jQuery() 생성자 함수     prototype         jQuery.fn
       [prototype]          ------->       [constructor]
       [__proto__]          <-------    [greenify][function]
                          constructor
-------------------------             -------------------------
            |                                   ^
            |                                   | __proto__ 
            |  jQuery 객체 생성       =========================
            └-------------------->       jQuery객체  $('a')
                                      ------------------------- 
```
## 2. 기본 플러그인 작성(Basic Plugin Authoring)

검색된 element 안의 텍스트를 녹색으로 만드는 플러그인을 만든다고 가정하자. `greenify` 라는 함수를 `$.fn`에 추가하면 다른 jQuery 객체 메서드와 마찬가지로 사용할 수 있다.

```javascript
$.fn.greenify = function(){
  this.css('color', 'green');
};
$('a').greenify(); // Makes all the links green.
```

다른 방법으로 `.css()`를 사용하려면 `$(this)`가 아닌 `this`를 사용한다. 이것은 `greenify` 함수가 `.css()`와 같은 객체의 일부이기 때문이다.

> `this`는 greenify 메서드를 호출한 객체 `$('a')`에 바인딩된다. greenify 메서드를 호출한 객체는 언제나 **jQuery 객체** 이므로 `$(this)`를 사용할 필요가 없다.

[함수 호출 패턴에 따라 결정되는 this](http://poiemaweb.com/js-this#method-invocation-pattern)

> `each()`, `append()` 메서드 등의 callback 함수 내에서 사용된 `this`는 DOM요소를 의미한다. 따라서 callback 함수 내에서 DOM 요소에 대해 jQuery 메서드를 사용하기 위해서는 `this`를 jQuery 객체화해야 한다. 

## 3. 체이닝(Chaining)

jQuery의 기능 중 하나는 5개 또는 6개의 액션을 하나의 selector에 연결, chaining 하는 것이다.  
이것은 모든 jQuery 객체 메서드가 원래의 jQuery 객체를 다시 반환하게 해야 가능하다.  
(매개변수 없이 호출 된 `.width()`는 선택된 요소의 너비를 반환하고 체인이 가능하지 않다.)  
플러그인 메서드를 체이닝 가능하게 만드려면 한 줄의 코드가 필요하다. (`this`를 리턴)

```javascript
$.fn.greenify = function() {
  this.css('color', 'green');
  return this;
}
$('a').greenify().addClass('greenified');
```

jQuery() 함수에 의해 생성된 객체를 Matched set 또는 jQuery selection이라 한다.  
이 객체에는 선택한 요소에 대한 참조가 저장되어 있다.  
jQuery가 제공하는 프로퍼티와 메서드는 prototype 객체를 통해 접근할 수 있다.

> **chanining**  
jQuery 함수에 의해 생성된 Matched set에 jQuery 메서드를 끝없이 연결하여 호출할 수 있게 하는 기법

## 4. `$` 별칭 보호 및 Scope 추가

`$` 변수는 자바스크립트 라이브러리에서 매우 인기가 있다.  
다른 라이브러리와 제이쿼리를 같이 사용한다면 jQuery가 `jQuery.noConflict()`와 `$`를 함께 사용하지 않도록해야한다.
그러나 이것은 `$`가 함수 `jQuery`의 별칭이라는 가정하에 작성되었으므로 깨질 것이다.  
다른 플러그인과 잘 작동하면서 jQuery의 `$` 별칭을 계속 사용하려면 IIFE에 모든 코드를 넣은 다음 함수 `jQuery`객체를 인자로 파라미터 `$`에 전달하면 된다.


> [IIFE(Immediately Invoked Function Expression, 즉시실행 함수 표현식)](http://benalman.com/news/2010/11/immediately-invoked-function-expression/)

```javascript
(function($) {
  $.fn.greenify = function() {
    this.css('color', 'green');
    return this;
  };
}(jQuery));
```

즉시호출 함수(Immediately Invoked Function) 의 주된 목적은 private 변수를 가질 수 있게 하는 것이다. 다른 그린 컬러를 원한다면 변수에 저장한다.

이 방법은 전역 namespace의 오염을 방지할 수 있기 때문에 매우 유용하다.

```javascript
(function($) {
  var shade = '#556b2f';

  $.fn.greenify = function() {
    this.css('color', shade);
    return this;
  };
}(jQuery));
```

## 5. Minimizing Plugin Footprint

> **Footprinst**  
특정 하드웨어나 소프트웨어 단위가 차지하고 있는 공간의 크기

플러그인을 작성하여 `$.fn` 내에서 하나의 슬롯만 사용하는 것이 좋다.  
이렇게 하면 플러그인이 재정의 되거나 다른 플러그인을 대체 할 경우가 줄어든다.

```javascript
// Bad
(function($){
  $.fn.openPopup = function() {
    // Open popup code.
  };
  $.fn.closePopup = function() {
    // Close popup code.
  };
}(jQuery));
```

하나의 슬롯을 가지고 매개변수를 사용해 하나의 슬롯이 수행하는 동작을 제어하는 것이 훨씬 더 좋다.

```javascript
(function($){
  $.fn.popup = function(action) {
    if (action === 'open') {
      // Open popup code.
    }
    if (action === 'close') {
      // Close popup code.
    }
  }
}(jQuery));
```

## 6. `each()` 메서드 사용

일반적인 jQuery 객체는 모든 DOM 엘리먼트에 대한 참조를 포함하므로 jQuery 객체를 종종 collections라고 한다.  
특정 엘리먼트 (e.g. 데이터 속성 가져오기, 특정 위치 계산)를 조작하려는 경우 `.each()`를 사용해 엘리먼트를 반복해야 한다.

```javascript
$.fn.myNewPlugin = function(){
  return this.each(function(){
    // Do something to each element here.
  });
}
```
`this`를 반환하는 대신 `.each()` 결과를 반환하는데 주의하라.
`.each()`는 이미 체이닝이 가능하기 때문에, 반환한 `this`를 반환한다.  
이것은 우리가 해 왔던 것보다 연결 가능성을 유지하는 더 좋은 방법이다. 

## 7. Accepting Options

플러그인이 점점 복잡해지면서 옵션을 수락해 플러그인을 사용자 정의할 수 있게 만드는 것이 좋다.  
특히 많은 옵션이 있는 경우 이를 수행하는 가장 쉬운 방법은 객체 리터럴을 사용하는 것이다.  

일부 옵션을 허용하도록 greenify 플러그인을 변경할 경우
```javascript
(function($) {
  $.fn.greenify = function(options) {
    // 기본 옵션을 갖게하는 가장 쉬운 방법
    var settings = $.extend({
      //  기본값
      color: '#556b2f',
      backgroundColor: 'white'
    }, options );
    // 설정 변수를 기반으로 컬렉션을 Greenify 한다.
    return this.css({
      color: settings.color,
      backgroundColor: settings.backgroundColor
    });
  };
}(jQuery));
```

> **jQuery.extend( target [, object1 ] [, objectN ] )**  
두 개 이상의 객체의 내용을 첫번째 객체로 병합한다.

사용 예 : 
```javascript
$('div').greenify({
  color: 'orange'
});
```

`color`의 `#556b2f` 기본값은 `$.extend()`에 의해 주황색으로 재정의 된다.

## 8. Putting It Together

다음은 논의한 기술 중 일부를 사용하는 작은 플러그인의 예이다. : 

```javascript
(function($) {
  $.fn.showLinkLocation = function() {

    this.filter('a').each(function() {
      var link = $(this);
      link.append('('+ link.attr('href') +')');
    });
    
    return this;
  };
}(jQuery));

// Usage example:
$('a').showLinkLocation();
```

> `.filter()`  
일치하는 엘리먼트의 하위 집합에서 새 jQuery 객체를 생성한다.  
제공된 셀렉터는 각 엘리먼트에 대해 테스트 되고 셀렉터와 일치하는 모든 요소가 결과에 포함된다.

> `.append()`  
지정된 내용을 jQuery 컬렉션의 각 엘리먼트의 마지막 자식으로 삽입한다.  
(첫번째 자식으로 삽입하려면 `.prepend()`를 사용한다.)

이 플러그인은 컬렉션의 모든 앵커를 거쳐 괄호 안에 href 속성을 추가한다.

```html
<!-- Before plugin is called: -->
<a href="page.html">Foo</a>

<!-- After plugin is called: -->
<a href="page.html">Foo (page.html)</a>
```

위 플러그인 최적할 경우

`.append()` 메서드의 기능을 사용하여 콜백을 허용하고, 콜백의 반환값은 콜렉션의 각 엘리먼트에 추가되도록 한다.  
네이티브 DOM API는 적절한 `href` 속성을 사용하여 쉽게 액세스 할 수 있기 때문에 `.attr()` 메서드를 사용하여 `href` 속성을 검색하지 않아도 된다.
```javascript
(function($){
  $.fn.showLinkLocation = function() {
    this.filter('a').append(function(){
      return "(" + this.href + ")";
    });
    return this;
  };
}(jQuery));
```
