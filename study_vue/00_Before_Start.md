# MVC 디자인 패턴

[참조 : 생활코딩 MVC 디자인 패턴](https://opentutorials.org/course/697/3828)

## 디자인 패턴

소프트웨어의 개발 방법을 공식화(규칙), 구현자들 간의 커뮤니케이션의 효율성을 높이는 기법이다.

## MVC(Model View Controller)

애플리케이션을 세가지 역할로 구분한 개발 방법론.

1. 사용자가 __Controller__ 조작(웹사이트에 접속)  
    (USER - use -> CONTROLLER)
1. __Controller__ 는 __Model__ 을 통해 데이터를 가져옴  
    (모델이 데이터베이스나 파일과 같은 데이터 소스를 제어한 후 그 결과를 리턴)  
    (CONTROLLER - mainpulates -> MODEL)
1. 그 정보를 바탕으로 시각적인 표현을 담당하는 __View__ 를 제어
    (리턴한 결과를 View에 반영)
    (MODEL - updates -> VIEW)
1. 사용자에게 정보 전달
    (데이터가 반영된 View는 사용자에게 보여짐)
    ( VIEW - sees -> USER)]

***

[참조: (번역)JavaScript 생태계의 현상황 : 초심자를 위한 안내 (1/2)](http://han41858.tistory.com/3)
[참조: 원문](https://www.infoq.com/articles/state-of-javascript-2016?utm_source=infoq&utm_medium=popular_widget&utm_campaign=popular_content_list&utm_content=homepage)

## 클라이언트 측 JavaSciprt는 어떻게 동작하며, 왜 사용해야 하는가?

> __*Key terms__  
> __DOM__(Document Object Model), __javaScript__, __비동기__, __AJAX__

- 클라이언트(보통 브라우저)가 HTML 페이지에 접근하면, 이를 다운받고, 파싱한 다음 이를 사용해 __DOM(Document Object Model)__ 을 구축한다.
- JavaScript는 DOM을 조작하는 데 사용되며, 상호작용하는 웹사이트를 만들 수 있다.
- JavaScript는 별도의 script 태그로 시작한다.
- JavaScript의 실행은 DOM 생성을 중단시킨다.
- 위와 같은 상황을 피하기 위해 클라이언트 사이드 JavaScript는 종종 __비동기__ 로 동작한다.(AJAX(<b style="color: red">A</b>synchronous <b style="color: red">J</b>avaScript <b style="color: red">A</b>nd <b style="color: red">X</b>ML)라고 들어봤을 것이다.)

상호작용할 수 있는 웹사이트를 만드려면, Javascript를 사용하고, `form`이나 다른 요소를 비동기로 다루게 될 것이다.

## 프레임워크는 무엇인가? trendy.js를 사용해야 하는가?

> __*Key terms__  
> React, Angular, Ember, Backbone, jQuery, Underscore, Lodash

"프레임워크"는 많은 뜻이 있다.  
JavaScript 프레임워크의 목적은 인터랙티브 웹페이지를 만드는 데 요구되는 불필요하고 많은 작업 양을 줄여주는 데 있다.  
프레임워크는 기본적인 틀을 잡아주며(scaffolding), 특정 문제를 해결하기 위해 설계되어 있다.  

현재 유행하고 있는 많은 프레임워크들을 다음과 같은 문제를 해결하도록 설계되었다.  
"어떻게 복잡한 사용자 인터렉션을 지원하는 단일페이지 웹 애플리케이션(__SPA__)을 만들고, 프론트엔드의 모든 업무로직을 관리할 수 있을까?"  
-- Facebook 홈페이지나 Gmail inbox(받은편지함) 같이

> __SPAs__(Single-page applications)  
> 페이지 리프레쉬가 필요없이 단일 페이지에서 동작하는 웹 어플리케이션 

그래서 프레임워크를 사용해야 할까? React? Angular? Ember? 프레임워크가 필요하기는 한가?  
일단 결정을 미루자.

이 모든 프로젝트들은 보다 나은 웹 어플리케이션 작성하는 데에 도움이 될 것이다.  
어떤 프레임워크를 사용해야하는 지에 대한 정답은 없다.

자바스크립트 초심자라면 프레임워크를 사용하지 않는 것이 좋을 수 있고, 제이쿼리나 작은 프레임워크로 사이트를 만들어보는 것이 좋다.  
이 방법은, 작업이 약간 지루할 수 있지만, 당장 해볼 수 있고 자바스크립트가 어떻게 동작하는 지 감을 잡는데 도움이 될 것이다.  
[jQuery로 소프트웨어 공학 원리를 연습할 수 있다.](https://www.youtube.com/watch?v=5Vpdyk9Hpng)

만약 적당히 복잡한 사이트를 만들고 있다면, 도움이 될만한 프레임워크를 찾게될 것이다.  
현재는, Angular, React, Ember 가 가장 인기있고 합리적인 선택이다.  

[Backbone](http://backbonejs.org/) 은 약간 오래된 스타일의 프레임워크이며, 범위가 좁다(smaller in scope)  
(그러나 많은 프로젝트에 적합하다.)  
올려둔 [Starter kit](https://github.com/bonniee/react-starter) 은 React 를 사용하지만, 잘못된 선택은 아니다.  
많은 프레임워크를 비교하기 위해서는 [TodoMVC](http://todomvc.com/)를 확인해라. 각각의 프레임워크에 대해 동일한 기능의 checklist 를 구현해두었다.

JavaScript는 기본적인 라이브러리 함수가 부족하다. (다른 라이브러리에서 지원하는 문자열 패딩(padding strings)이나 배열 셔플링(shuffling an array)과 같은). 

> [padding strings](https://lodash.com/docs#padStart)  
> 길이보다 짧으면 왼쪽에 문자열을 덧붙인다, 패딩 문자는 길이를 초과하면 잘린다.

> [shuffling an array](https://lodash.com/docs/4.17.4#shuffle)  
> 섞인 배열 값을 만든다. 

이러한 이유로, 간격을 메우는 데 [jQuery](https://jquery.com/), [Underscore](http://underscorejs.org/), [Lodash](https://lodash.com/) 가 종종 쓰인다.  
이 라이브러리들은 일상적으로 임포트되어 각각 `$`, `_`, `_`로 참조할 수 있다.  
만약 JavaScript 파일 안에 많은 `$` 기호가 보인다면, jQuery를 호출하고 있을 가능성이 높다.  

새 프로젝트를 시작한다면, 나는 React 나 Angular를 Lodash 와 함께 쓰기를 권한다.

***

### 링크된 목록

+ [jQuery로 소프트웨어 공학 원리를 연습할 수 있다.](https://www.youtube.com/watch?v=5Vpdyk9Hpng)
+ [Backbone](http://backbonejs.org/)
+ [Starter kit](https://github.com/bonniee/react-starter)
+ [TodoMVC](http://todomvc.com/)

+ [jQuery](https://jquery.com/)
+ [Underscore](http://underscorejs.org/)
+ [Lodash](https://lodash.com/)