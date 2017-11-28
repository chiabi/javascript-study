# 02. 기초

유지보수를 쉽게하는 올바른 코딩 습관, 모범적인 관행에대한 파트
+ 젼역 변수의 사용을 최소화한다.
+ var 선언은 한번만 사용한다.
+ 루프 내 length는 캐시해두고 사용한다.
+ API 문서작성, 동료 리뷰 수행, JSLint 실행 등 

## 유지보수 가능한 코딩 작성

## 전역 변수 최소화

자바스크립트는 함수를 사용해 유효범위를 관리한다.  
(내부에서 선언된 변수는 지역변수로 외부에서 접근할 수 없다.)

전역 변수를 생성하는 것은 전역 객체(global object)의 프로퍼티(property)를 만드는 것과 같다.  
(편의상 브라우저에는 `window`라는 부가적인 프로퍼티가 존재하며 전역 객체 자신을 가리킨다.)

```javascript
// 전역 변수
myglobal = 'hello'; // 안티패턴
console.log(myglobal);
console.log(window.myglobal);
console.log(window['myglobal']);
console.log(this.myglobal);
console.log(this['myglobal']);

console.log(this); 
// window {frames: Window, postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, …}
```

### 전역변수 문제점

모든 전역 변수는 동일한 전역 [네임스페이스](https://ko.wikipedia.org/wiki/%EC%9D%B4%EB%A6%84%EA%B3%B5%EA%B0%84) 안에 존재한다.  
애플리케이션 내의 다른 영역에서 목적이 다른 전역변수를 동일한 이름으로 정의할 경우 덮어쓰게 된다.

#### 외부 코드를 삽입하는 경우

+ 서드파티 자바스크립트 라이브러리 
+ 광고 제휴 업체의 라이브러리
+ 사용자 추적, 분석하는 서드파티 스크립트 코드
+ 다양한 위젯, 배지, 버튼 등

#### 전역변수 개수를 최소화 하는 방법

+ 네임스페이스 패턴 
+ 즉시실행함수
+ 변수 선언 시 var 사용
+ 변수 선언시 연쇄적으로 할당을 사용하지 말 것
+ 단일 var 패턴


> __암묵적 전역(implied globals)__   
> + var를 선언하지 않고 사용한 변수는 자동으로 전역 객체의 프로퍼티가 된다.  
> + var 선언에서 연쇄적으로 할당을 사용하면 그 중 전역 변수가 된다.  
> 
> 지양해야할 안티패턴이다.

##### 안티패턴

```javascript
function sum(x, y) {
    // 안티패턴 : 암묵적 전역
    result = x + y;
    return result;
}
sum(3,2); // 5
console.log(result); // 5
// 외부에서도 접근이 가능하다.

function foo() {
    // 안티패턴
    var a = b = 0;
    // 평가(evalutaion)가 오른쪽에서 왼쪽으로 진행되므로
    // b = 0이 되는 표현식의 b는 var 선언이 없는 전역 변수가 된다.
    // var a = ( b = 0 )과 동일하다.
}
```

##### 문제 해결

```javascript
function sum(x, y) {
    var result = x + y; // result는 지역변수가 된다.
    return result;
}
sum(3,2); // 5
console.log(result); // 'result is not defined'

function foo() {
    // 변수를 미리 선언한다.
    var a, b
    a = b = 0;
}
```

> [__이식성(portability)__](https://ko.wikipedia.org/wiki/%EC%9D%B4%EC%8B%9D_(%EC%BB%B4%ED%93%A8%ED%8C%85))때문에   
코드를 다른 실행환경(호스트)에서 실행할 경우, 원래 실행환경에 존재하지 않았던 __암묵적 전역 변수가__   
새로운 실행 환경의 호스트 객체를 의도치 않게 덮어쓸 수 있다.

#### 암묵적 전역변수와 명시적 선언된 변수 사이 차이점

> [`delete` 연산자](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete)   
객체에서 속성(property)을 제거한다.   

`delete` 연산자를 사용해 이 변수의 정의를 취소할 수 있는가
+ `var`를 사용해 명시적으로 선언된 전역 변수 -> 삭제 X
+ `var`를 사용하지 않고 생성한 암묵적 전역변수  -> 삭제 O

암묵적 전역변수는 엄밀히 말하면 변수가 아니라 전역객체의 프로퍼티이기 때문이다.

