# Execution Context(실행 컨텍스트)

scope, hoisting, this, function, closure 등의 동작원리를 담고 있는 자바스크립트의 핵심원리이다.  

실행 가능한 코드 블럭이 실행되는 환경이다.

자바스크립트 엔진은 코드를 실행하기 위해 실행에 필요한 여러가지 정보(실행 환경)를 실행 컨텍스트라는 객체로 관리한다.

**실행 가능한 코드**
+ Global Code : 전역 영역에 존재하는 코드
+ Eval Code : Eval 함수로 실행되는 코드
+ Function Code : 함수 내에 존재하는 코드

> **eval(string)**  
문자열 파라미터로서 전달된 code 또는 표현식(expression)을 평가 또는 실행한다.  
사용자로 부터 입력받은 Contents(untrusted data)를 eval()로 실행하는 것은 보안에 매우 취약하다. 불필요한 eval()의 사용은 금지되어야 한다.

※ 일반적으로 실행 가능한 코드는 전역코드와 함수(Function code)가 된다.

**실행에 필요한 정보**
+ 변수
  - 함수 내부에서만 접근할 수 있는 지역변수
  - this를 통해 접근할 수 있는 객체의 프로퍼티
+ 매개변수(parameter)
+ 함수 선언
+ 변수의 유효범위(scope)
+ this

위 정보를 자바스크립트 엔진은 실행 컨텍스트<sup>Execution Context</sup>라는 또다른 객체 내에서 관리하게 된다.

```javascript
var x = 'xxx';

function foo() {
  var y = 'yyy';

  function bar() {
    var z = 'zzz';
    console.log(x + y + z); // xxxyyyzzz
  }
  bar();
}
foo();
```

![예제 실행컨텍스트](https://github.com/chiabi88/javascript-study/asset/img_excution_context01.jpg)