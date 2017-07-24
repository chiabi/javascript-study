# scrollMagic

https://github.com/yamoo9/Modern.JS/blob/2017.06/WEEK__2/ScrollMagic/ScrollMagic.md

+ [ScrollMagic](http://scrollmagic.io/)
+ [ScrollMagic Documentation](http://scrollmagic.io/docs/)
+ [ScrollMagic github](https://github.com/janpaepke/ScrollMagic)

스크롤 매직 인터랙션 자바스크립트 라이브러리.
+ 스크롤 위치에 따른 애니메이션 적용 - 애니메이션을 trigger하거나 scrollbar 동작과 동기화 한다. (playback scrub control과 유사)
+ 특정 스크롤 위치에서 시작하는 요소를 핀으로 설정한다. - 무기한 또는 제한된 양의 스크롤 progress로 (고정 요소)
+ 스크롤 위치에 따라 엘리먼트의 CSS 클래스를 ON, OFF 토글한다.
+ 여유롭게 parallax 효과를 추가한다.
+ 무한 스크롤 페이지를 만든다(추가 콘텐츠는 ajax로 로드한다.)
+ 특정 스크롤 위치에서 콜백을 추가하거나 특정 섹션을 지나 스크롤하면서 진행 매개 변수를 전달한다.

***

## Detectizr

Detectizr는 Modernizr의 확장 기능으로서 역할을 하는 서드파티(Third Party) 라이브러리

+ [Detectizr](https://github.com/barisaydinoglu/Detectizr)
+ [Detectizr(디텍타이저) - 디바이스/플랫폼 탐지기능](http://webclub.tistory.com/257)

## 네임스페이스 패턴

프로그램에서 필요로 하는 전역 변수의 개수를 줄이는 동시에 과도한 접두어를 사용하지 않고도 이름이 겹치지 않게하는 자바스크립트 디자인 패턴

애플리케이션이나 라이브러리를 위해 전역 유효범위에 전역 객체를 하나 만들고, 모든 기능을 이 객체 추가하는 패턴이다.

**안티패턴**
```javascript
/*
 * -----------------------------
 * 안티패턴
 * 전역을 오염시키는 행위
 * -----------------------------
 */
// 생성자 함수 2개
function Parent() {}
function Child() {}

// 변수 1개
var some_var = 1;


// 객체 2개
var module1 = {};
module1.data =  {
  a: 1,
  b: 2
};
var module2 = {};
```

**리팩토링 네임스페이스 패턴**  
애플리케이션 전용 전역 객체를 생성 후 모든, 변수, 함수, 객체를 묶어준다.
```javascript
/*
 * -----------------------------
 * 네임스페이스 패턴
 * 전역 객체 하나에 묶음
 * -----------------------------
 */

// 애플리케이션 전용 객체(전역에 선언)
var APP = {};

// 생성자 함수를 애플리케이션 전용 객체의 속성에 할당
APP.Parent = function(){};
APP.Child = function(){};

// 애플리케이션 멤버(속성) 설정
APP.some_var = 1;

// 애플리케이션 모듈 컨테이너 객체 생성
APP.modules = {};

// 애플리케이션 모듈 컨테이너 객체 내부에 하위 모듈 객체 생성
APP.modules.module_1 = {}
APP.modules.module_1.data = {'a': 1, 'b': 2}
APP.modules.module_2 = {}
```
> ※ 일반적으로 이름이 모두 대문자인 경우는 상수를 말하지만, 변수 이름을 모두 대문자로 사용하여 지우거나 변경하면 안된다는 것을 암시할 수 있다.(필수적인 것은 아니다.)

**네임스페이스의 단점**
+ 변수, 함수에 네임스페이스 이름이 붙어야해 코드의 양이 많아져 파일 크기가 늘어난다.
+ 전역 변수가 단 하나라서 코드의 어느 한 부분이 수정되어도 전역 변수가 수정되게 된다.
+ 이름이 중첩되고 길어지므로 속성을 판별하기 위한 검색 작업이 길어진다.(샌드박스 패턴으로 해결)

+ [자바스크립트 네임스페이스 패턴](https://github.com/yamoo9/FDS/blob/4th/LECTURE/Keynote/JavaScript%20Design%20Pattern/js-06-create-object-pattern.md#네임스페이스-패턴)
