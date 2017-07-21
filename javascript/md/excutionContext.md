# Execution Context(실행 컨텍스트), EC

scope, hoisting, this, function, closure 등의 동작원리를 담고 있는 자바스크립트의 핵심원리이다.  

실행 가능한 코드 블럭이 실행되는 환경이다.  
**자바스크립트 코드가 실행되는 환경** 으로, 환경이란 자바스크립트 코드가 액세스 할 수 있는 변수, 객체 및 함수의 값이 환경을 구성한다는 것을 의미한다.

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
/////////// global context ////////////
var x = 'xxx';

function foo() {
/////////// execution context ////////////
  var y = 'yyy';

  function bar() {
    /////////// execution context ////////////
    var z = 'zzz';
    console.log(x + y + z); // xxxyyyzzz
    /////////////----------------/////////////
  }
  bar();
/////////////----------------/////////////
}
foo();
/////////////----------------/////////////
}
```

![예제 실행컨텍스트](../../asset/img_execution_context_01.jpg)  
<sup>이미지 출처 : http://maeharin.hatenablog.com/entry/20130313/javascript_scopechain</sup>

1. 컨트롤이 실행 가능한 코드로 이동하면 논리적 스택 구조를 가지는 새로운 실행 컨텍스트 스택이 생성된다.  
스택의 FILO(First in Last out, 선입후출)원리에 의해 **현재 실행중인 컨텍스트는 스택의 최상위에 위치** 하게 된다.
2. Global code(전역 코드)로 컨트롤이 들어가면 **전역 실행 컨텍스트** 가 실행 컨텍스트 스택에 쌓인다.
3. 함수가 호출되면 **함수의 실행 컨택스트가 생성** 된다.  
컨트롤이 새로운 함수로 들어갈 때마가 그 함수의 실행 컨텍스트가 컨텍스트 스택에 쌓인다.
4. 함수 실행이 끝나면 해당 함수의 실행 컨텍스트를 파기하고 컨트롤을 이전 컨텍스트에 반환한다.

> **Execution context stack (ECS)**  
실행 컨텍스트 스택은 자바스크립트 코드를 실행하는 동안 생성된 모든 실행 스택을 저장하는 스택 데이터 구조이다.

![실행컨텍스트 스택](../../asset/img_execution_context_stack.gif)  
<sup>이미지 출처 : https://hackernoon.com/execution-context-in-javascript-319dd72e8e2c</sup>

## 실행 컨텍스트 생성과정

실행 컨텍스트는 **Variable Object, Scope Chain, this value** 3가지 프로퍼티를 포함한다.

**자바스크립트의 실행 컨텍스트 3가지 유형**

+ **Variable Object(VO / 변수 객체)**  
실행 컨텍스트가 생성되면 실행에 필요한 여러 정보들을 담기위해 자바스크립트 엔진이 생성한 객체이다.  
코드가 실행될 때 참조되며 프로그램에서는 접근할 수 없다.  
전역 컨텍스트에서 VO는 전역객체를 가리키며 유일하고, 최상위에 위치하며 모든 전역 변수, 전역 함수 등을 포함한다.  
함수 컨텍스트에서 VO는 Activation object(AO / 활성 객체)를 가리키며 인수들의 정보를 배열 형태로 담고 있는 객체인 arguments object와 매개변수가 추가된다.  
아래의 정보를 담는다.
  - 변수
  - 매개변수<sup>parameters</sup>와 인수<sup>arguments</sup>
  - 함수 선언<sup>Function Declaration.</sup> (Function Expression은 제외)
  
+ **Scope Chain(SC)**  
일종의 리스트로 중첩된 함수의 스코프(혹은 VO)의 레퍼런스를 차례로 저장하고 있는 개념이다.  
이 리스트로 현재 컨텍스트의 변수 뿐만 아니라 상위 실행 컨텍스트의 변수에도 접근이 가능하다.  
이 리스트에서 찾지 못한 변수는 결국 정의되지 않은 변수에 접근하는 것으로 판단되어 ReferenceError 에러를 출력한다.  
[[scope]] 프로퍼티로 참조할 수 있다.
+ **this value**  
현재 실행 컨텍스트를 포함하는 객체에 대한 레퍼런스이다.

<table>
	<tr><th colspan="2">Execution context</th></tr>
	<tr>
		<td>Variable object</td>
		<td>{ vars, function declarations, arguments... }</td>
	</tr>
	<tr>
		<td>Scope chain</td>
		<td>[Variable object + all parent scopes]</td>
	</tr>
	<tr>
		<td>thisValue</td>
		<td>Context object</td>
	</tr>
</table>

> **위 예제에 대한 컨텍스트 생성 과정**
> + Global Code에의 진입
>   - Scope Chain의 생성과 초기화
>   - Variable Instantiation 실행
>     * (Function Code인 경우) 매개변수(parameter)가 Variable Object의 프로퍼티로, 인수 rgument)가 값으로 set된다.
>     * 대상 코드 내의 Function Declaration(Function Expression 제외)를 대상으로   명이 Variable Object의 프로퍼티로, 생성된 Function Object가 값으로 set된다.
>     * 대상 코드 내의 Variable Declaration을 대상으로 변수명이 Variable Object의   퍼티로, undefined가 값으로 set된다.
>   - this value 결정
> + Global code의 실행
>   - 변수 값의 대입
>   - 함수 foo의 실행
>     * Scope Chain의 생성과 초기화
>     * Variable Instantiation 실행
>     * this value 결정
> + foo function code의 실행
>   - 변수 값의 대입
>   - 함수 bar의 실행
>     * Scope Chain의 생성과 초기화
>     * Variable Instantiation 실행
>     * this value 결정
> + bar function code의 실행

## 1. Global Code에의 진입

컨트롤이 실행 컨텍스트에 들어가기 전, 유일한 전역 객체(Global Object, GO)가 생성된다.  
전역객체 단일 사본으로 존재하며, 이 객체의 프로퍼티는 프로그램의 어떠한 곳에서도 접근할 수 있다.  
프로그램이 종료되면 전역객체의 라이프 사이클은 끝난다.

초기상태의 전역 객체에는 Built-in object(Math, String, Array 등)와 BOM(window 객체 등), DOM이 Set 되어있다.

전역 객체 생성 후, Global Code로 컨트롤이 이동하면 새로운 실행 컨텍스트가 스택에 쌓인다.  

![전역객체 생성](../../asset/img_execution_context_00.jpg)  
<sup>전역객체 생성</sup>

![새로운 실행 컨텍스트가 스택에 쌓인다](../../asset/img_execution_context_02.jpg)  
<sup>Global Code로 컨트롤이 이동하면 새로운 실행 컨텍스트가 스택에 쌓인다</sup>

이후 이 실행 컨텍스트를 바탕으로 이하의 처리가 실행된다.
> 1. Scope Chain의 생성과 초기화
> 2. Variable Instantiation 실행
> 3. this value 결정

### 1.1. Scope Chain의 생성과 초기화

새로운 실행 컨텍스트에 들어가게 되면 우선 Scope Chain의 생성과 초기화가 실행된다.

![Scope Chain의 생성과 초기화](../../asset/img_execution_context_03.jpg)   
<sup>Global Code로 컨트롤이 이동하면 Scope Chain은 전역 객체의 레퍼런스를 포함하는 리스트가 된다.</sup>

> **Scope Chain**  
> + 함수가 중첩함수일 때 상위함수의 유효범위까지 흡수하는 것이다.  
> + 하위함수가 실행되는 동안 참조하는 상위 함수의 변수 또는 함수의 메모리를 참조한다.  
> + 일종의 리스트로서 중첩된 함수의 스코프(혹은 VO)의 레퍼런스를 차례대로 저장하고 있는 개념이다.  
> + 최상위는 Global Scope로서 전역 객체(window 객체)와 같아진다.
> + 함수가 중첩될 때마다 부모 함수의 Scope가 자식 함수의 Scope Chain에 포함되게 되고, 함수 실행 중 로컬변수를 만나면 그 이름을 우선 현재 Scope(Activation Object)에서 검색해보고, 만약 존재하지 않으면 스코프 체인에 담긴 순서대로 검색을 이어나가게 된다.

### 1.2. Variable Instantiation 실행

Scope Chain의 생성과 초기화가 끝나면 Variable Instantiation이 실행된다.

> **Variable Instantiation**  
Variable Object란 특수한 객체에 프로퍼티와 값을 추가하는 것을 의미한다.
변수와 함수 선언을 Variable Object에 추가하여 객체화하기 때문에 변수 객체화라고 번역하기도 한다.

#### Variable Instantiation 실행 순서

이하 순서로 Variable Object에 프로퍼티와 값이 set된다.
1. **(Function Code인 경우)**  
매개변수<sup>parameter</sup>가 Variable Object의 프로퍼티로,  
인수<sup>argument</sup>가 값으로  
set된다.
1. 대상 코드 내의 Function Declaration( **Functino Expression 제외** )를 대상으로  
함수명이 Variable Object의 프로퍼티로,  
생성된 Function Object가 값으로  
set된다.
1. 대상 코드 내의 Variable Declaration을 대상으로  
변수명이 Variable Object의 프로퍼티로,  
undefined가 값으로 set된다. 

위 예제에서는 Global Code의 변수 x 선언과 함수 foo의 선언이 실행되어, Variable Instantiation 실행 순서 상, 우선 2. 함수 foo의 선언이 처리되고(Function code가 아닌 Global Code이므로 1. 매개변수 처리는 실행되지 않는다.) 그 후 3. 변수 x의 선언이 처리된다.

![Variable Instantiatio](../../asset/img_execution_context_04.jpg)   
<sup>Global Code의 경우 Global Object가 Variable Object가 된다.</sup>

![함수 foo의 선언 처리](../../asset/img_execution_context_05.jpg)   
<sup>함수 선언은 선언된 함수명(foo)이 Variable Object(Global Code인 경우 Global Object)의 프로퍼티로, 생성된 Function Object가 값으로 set된다.   
생성된 Function Object는 [[Scope]] 프로퍼티를 가지게 되고 값으로 현재 실행 컨텍스트의 Scope Chain이 참조하고 있는 객체와 같은 객체를 참조하는 리스트가 set된다.</sup>

![변수 x의 선언 처리](../../asset/img_execution_context_06.jpg)   
<sup>Variable Declaration는 선언된 변수명( x )이 Variable Object의 프로퍼티로, undefined가 값으로 set된다.  
(아직 변수 x는 ‘xxx’로 초기화되지 않는다.)</sup>


### 1.3. this value 결정

Variable Instantiation 실행이 끝나면 다음은 this value가 결정된다.  
`this`는 모든 active한 실행 컨텍스트에 관련되어 있으며  
_호출한 객체와 실행된 코드의 종류에 따라_ 값이 결정된다.
결정된 값은 불변한다.  
(Global Code의 경우, this의 value는 언제나 전역 객체이다.)

![this value 결정](../../asset/img_execution_context_07.jpg)  
<sup>**전역 컨텍스트(Global Code)의 경우, VO, SC, this값은 언제나 GO이다.**</sup>

## 2. Global code의 실행

코드가 실행된다.  
(예제에서 전역변수 x에 문자열 'xxx' 대입과 함수 foo의 호출이 실행된다.)

![변수 값의 대입](../../asset/img_execution_context_07.jpg)  
<sup></sup>

![함수 foo의 실행](../../asset/img_execution_context_08.jpg)  
<sup></sup>

![Function Code의 Scope Chain의 생성과 초기화1](../../asset/img_execution_context_09.jpg)  
<sup></sup>

![Function Code의 Scope Chain의 생성과 초기화2](../../asset/img_execution_context_10.jpg)  
<sup></sup>

![Variable Instantiation 실행1](../../asset/img_execution_context_11.jpg)  
<sup></sup>

![Variable Instantiation 실행2](../../asset/img_execution_context_12.jpg)  
<sup></sup>

![this value 결정](../../asset/img_execution_context_13.jpg)  
<sup></sup>

***
### 스택(Stack)

[참조 : 자료구조(스택, stack)](https://www.zerocho.com/category/Algorithm/post/5800b79e1dfb250015c38db6)  
[참조 : FDS](https://github.com/owl423/FDS04_Summary/blob/master/README/0703.md)

> 제한적으로 접근할 수 있는 나열 구조, pushdown list(끝먼저내기 목록)

입력과 출력을 한 방향으로 제한한 자료구조이다.  
스택의 구조는 바닥부터 데이터를 차곡차곡 쌓아간다는 개념으로 후입선출(LIFO) 구조를 가진 자료구조를 가진다.  
이러한 방식으로 데이터를 추가(push)하거나 제거(pop)할 수 있다.

![LIFO stack](../../asset/Lifo_stack.png)  
<sup>이미지 출처 : https://en.wikipedia.org/wiki/Stack_(abstract_data_type)</sup>

+ Stack Underflow
  - stack이 비어있는데 사용자가 pop을 명령한 경우 stack underflow가 발생한다.
  - stack underflow 발생 시, 에러 메시지를 출력하는 등의 예외처리가 필요하다.
+ 스택 오버플로우(Stack Overflow)
  - stack 크기보다 더 많은 데이터를 Push 하려고 명령하는 경우 stack이 가득차서 더이상 Push명령을 할 수 없는 경우 stack overflow 발생가 발생한다.
  - stack overflow도 stack underflow와 마찬 가지로 예외처리를 해줘야 한다.
+ 스택 프레임(Stack Frame)
  - stack에 저장되는 함수의 호출정보(함수로 전달되는 인수, 함수 실행을 모두 마치면 돌아올 복귀 주소, 지역 변수 등)
  - 빠르고 손쉽게 지역변수 혹은 인수 등에 접근하기 위해 EBP 레지스터(stack의 크리를 조정하는 레지스터)를 통해 stack frame을 참조할 수 있다.


