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

jQuery.fn = Object.prototype = {
  constructor: jQuery,
  /* ... */
}
```
```
=========================  __proto__  =========================
   function.prototype       ------->      Object.ptrototype
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

> `this`는 greenify 메서드를 호출한 객체 `$('a')`에 바인딩된다. greenify 메서드를 호출한 객체는 언제나 jQuery 객체이므로 `$(this)`를 사용할 필요가 없다.

[함수 호출 패턴에 따라 결정되는 this](http://poiemaweb.com/js-this#method-invocation-pattern)

> `each()`, `append()` 메서드 등의 callback 함수 내에서 사용된 `this`는 DOM요소를 의미한다. 따라서 callback 함수 내에서 DOM 요소에 대해 jQuery 메서드를 사용하기 위해서는 `this`를 jQuery 객체화해야 한다. 

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

## 3. 체이닝(Chaining)
