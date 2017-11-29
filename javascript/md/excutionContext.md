# Execution Context(실행 컨텍스트), EC

[참조: 5.13 Javascript Execution Context - poiemaweb](http://poiemaweb.com/js-execution-context)  
[참조: [번역] ECMA-262-3 in detail. Chapter 1. Execution Contexts. - 개발왕김코딩](http://wit.nts-corp.com/2013/09/10/120)  
[참조: ECMA-262 5.1](http://www.ecma-international.org/ecma-262/5.1/#sec-10.3)

(※ scope, hoisting, this, function, closure 등의 동작원리를 담고 있는 자바스크립트의 핵심원리이다.) 

> 실행 컨텍스트는(Execution context, EC) ECMA-262 스펙이 __실행 가능한 코드의 유형을 나누고 구별하기 위해서 정의하고 있는 추상적 개념이다.__  
ECMA 표준에서는 이에 대한 정확한 구조를 정의하지는 않는데, 이는 표준 스펙을 구현하는 ECMAScript 엔진이 처리해야할 문제이다.

실행 컨텍스트는 실행 가능한 코드(Executable Code)가 실행되는 환경이라 할 수 있다.

ECMASciprt 실행 코드(Executable Code)는 다음의 세가지 유형이 있다.

+ __Global Code__  
  전역 영역에 존재하는 코드
+ __Eval Code__  
  Eval 함수로 실행되는 코드
+ __Function Code__  
  함수 내에 존재하는 코드

※ 일반적으로 실행 가능한 코드는 전역코드와 함수 내 코드가 된다.

> [**eval(string)**](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/eval)  
문자열 파라미터로서 전달된 code 또는 표현식(expression)을 평가 또는 실행한다.  
※ 사용자로 부터 입력받은 Contents(untrusted data)를 eval()로 실행하는 것은 보안에 매우 취약하다. 불필요한 eval()의 사용은 금지되어야 한다.

자바스크립트 엔진은 코드를 실행하기 위해 필요한 아래와 같은 여러 정보들을 형상화하고 구분하기 위해 실행 컨텍스트를 물리적 객체의 형태로 관리한다.

+ 변수
  - 전역변수
  - 함수 내부에서만 접근할 수 있는 지역변수
  - this를 통해 접근할 수 있는 객체의 프로퍼티
  - 매개변수(parameter)
+ 함수 선언
+ 변수의 유효범위(scope)
+ this

> 아래는 ECMA-262 5.1 번역

컨트롤(Control, 제어)가 실행 코드로 진입하면(is transferred to ECMAScript executable code), 컨트롤은 실행 컨텍스트를 입력한다.(control is entering an execution context)  
활성 실행 컨텍스트(Active EC)는 논리적으로 스택을 형성하는데, 이 논리 스택의 최상위 실행 컨텍스트는 실행중인 실행 컨텍스트(the running EC)이다.

현재 실행중인 컨텍스트와 연결된 executable code에서 해당 실행 컨텍스트와 관련이 없는 executable code로 컨트롤이 전송될 때마다 새로운 실행 컨텍스트가 만들어진다.

새로 생성된 실행 컨텍스트가 스택에 들어오고(pushed) 실행중인 실행 컨텍스트가 된다.(the runnig EC)  

-> 스택은 다양한 종류의 실행 컨텍스트가 들어오고(push) 나가면서(pop) 변경된다.  
스택의 바닥에는 항상 전역 컨텍스트(global context)가 위치하고,   
꼭대기에는 현재(활성화되어 있는) 실행 컨텍스트(EC)가 위치한다.  

## 1. 실행 컨텍스트 상태 구성 요소(Execution Context State Components)

실행 컨텍스트에는 연관된 코드의 실행 과정(execution progress)을 추적하는 데 필요한 모든 상태(state)가 포함된다.   
각 실행 컨텍스트는 다음 표에 나열된 상태 구성요소를 가진다. 

<table>
    <thead>
        <tr>
            <th>Component</th>
            <th>Purpose</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Variable object(VO/변수객체)</td>
            <td>실행컨텍스트가 생성되면 엔진은 필요한 여러 정보들을 담을 객체를 생성하는데, 이를 Variable Object라 한다.<br>
            Variable Object는 코드가 실행될 때 엔진에 의해 참조되며, 코드에서는 접근할 수 없다.(즉, 변경되지 않는다.)<br>
            변수, 매개변수(parameter)와 인수정보(arguments), 함수 표현식을 제외한 함수 선언을 담는다.
            </td>
        </tr>
        <tr>
            <td>Scope chain</td>
            <td>일종의 리스트로 중첩된 함수의 스코프의 참조를 차례로 저장하고 있는 개념이다. 엔진은 이를 통해 변수의 스코프를 파악한다.  
            스코프 체인은[[scope]] 프로퍼티로 참조할 수 있다.
            </td>
        </tr>
        <tr>
            <td>thisValue</td>
            <td>this값이 할당된다. this에 할당되는 값은 함수 호출 패턴에 의해 결정된다.
            </td>
        </tr>
    </tbody>
</table>

※ ECMAScript 1~3은 변수객체(Vaiable Object), 활성화 객체(Activation Object)라는 개념을 이용해 자바스크립트 코드의 scope 처리 매커니즘을 설명했지만 ECMAScript 5에서는 LexicalEnvironment라는 새로운 개념이 등장했다.  
아 머리야....

[참고 : Lexical environment in ecma 262 5 - 슬라이드로 보기](https://www.slideshare.net/jeokrang/lexical-environment-in-ecma-262-5-36095103)  

(아래 표는 ECMA-262 5.1 기준)
<table>
    <thead>
        <tr>
            <th>Component</th>
            <th>Purpose</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>LexicalEnvironment</td>
            <td>실행 컨텍스트 내에서 코드로 작성된 식별자(변수, 함수등)들의 참조 값을 찾는 데 사용되는 어휘적 환경(구성환경이라고 번역한 사람도 있다.)을 말한다.<br>
            (의역임 아래 원문 참고할 것)<br><br>
            Identifies the Lexical Environment used to resolve identifier references made by code within this execution context.
            </td>
        </tr>
        <tr>
            <td>VariableEnvironment</td>
            <td>환경 컨텍스트내에서 VariableStatements 와 FunctionDecaltion에 의해 생성된 바인딩을 보유하는 환경 레코드(environment record), 어휘적 환경을 말한다.<br>
            즉, 내부에 선언된 변수, 함수선언, 함수의 매개변수를 저장하는 개념이라고 생각하면 된다.<br>
            (의역임 아래 원문 참고할 것)<br><br>
            Identifies the Lexical Environment whose environment record holds bindings created by VariableStatements and FunctionDeclarations within this execution context.
            </td>
        </tr>
        <tr>
            <td>ThisBinding</td>
            <td>실행 컨텍스트와 연관된 ECMAScript 코드내에서 `this` 키워드와 연관되어 있는 값이다<br>
            즉, 해당 컨텍스트의 this 키워드 반환 값을 저장한다.<br>
            (의역임 아래 원문 참고할 것)<br><br>
            The value associated with the this keyword within ECMAScript code associated with this execution context.
            </td>
        </tr>
    </tbody>
</table>

실행 컨텍스트의 LexicalEnvironment 와 VariableEnvironment 구성 요소는 항상 어휘적 환경이다.(Lexical Environments)  
실행 컨텍스트가 생성되면 LexicalEnvironment 와 VariableEnvironment의 구성요소 초기값은 동일하다.

실행 환경 내에서 코드를 실행하는 동안 LexicalEnvironment 구성 요소의 값은 변경될 수 있지만 VariableEnvironment 구성요소의 값은 변경되지 않는다.

위 3가지 속성 모두 객체 형식으로 구성되지만(실행 컨텍스트란 순전히 명세 메커니즘이며) ECMAScript의 자료형으로 저장되는 것이 아니므로 ECMASciprt 프로그램이 실행 컨텍스트에 접근하는 것은 불가능하다. 

[참고: ES5 에서의 실행 컨텍스트](http://intellegibilisverum.tistory.com/entry/ES5-%EC%97%90%EC%84%9C%EC%9D%98-%EC%8B%A4%ED%96%89-%EC%BB%A8%ED%85%8D%EC%8A%A4%ED%8A%B8)

> __환경 레코드(Environment Record)__  
관련 Lexical Environment의 스코프 안에 만들어진 식별자 바인딩들을 기록한다.

## 2. 실행 컨텍스트 설정, 실행 코드의 종류

(아래부터는 ECMA-262 5.1 문서를 참조했다. ECMA-262 3 기준은 하단에 따로 정리)

코드의 종류는 특정 순간의 실행 컨텍스트를 의미한다고 할 수 있다.  

ECMAScript 코드 함수의 모든 호출은 함수가 재귀 적으로 호출하는 경우에도 새 실행 컨텍스트를 설정하고 입력한다.  
eval 함수를 사용해 global code 또는 code를 평가(Evaluation)하는 경우도 마찬가지이다.

모든 return은 실행 컨텍스트를 종료한다. throw된 예외는 하나 이상의 실행 컨텍스트를 종료할 수도 있다.

컨트롤이 실행 컨텍스트에 들어가면 실행컨텍스트의 ThisBinding이 설정되고,  VaraibalEnvironment 및 초기 LexicalEnvironment가 정의되고, 선언 바인딩 인스터스화(declaration binding instantiation)가 수행된다.

> __선언 바인딩 인스턴스화(객체화)(declaration binding instantiation)__  
모든 실행 컨텍스트에는 연관된 VariabalEnvironment가 있는데, 실행 컨텍스트에서 평가된(evaluated) ECAMScript 코드에서 선언된 변수와 함수는 해당 VariableEnvironment의 환경 레코드에 바인딩으로 추가된다.  
function code의 경우 매개변수도 해당 환경 레코드에 바인딩으로 추가된다.

이러한 동작(초기화 과정)이 발생하는 정확한 방식은 입력되는 코드 유형에 따라 다르다.  
(즉, 실행 코드의 종류에 따라 실행 컨텍스트의 성격이 결정된다고 볼 수 있다.)

```javscript
// 실행 컨텍스트 스택을 배열이라고 가정하면
EC_Stack = [];
```
### 2.1 Global Code(전역코드)로의 진입

컨트롤이 Global Code의 실행 컨텍스트에 진입할 때 다음 단계가 수행된다.

1. 전역 코드를 사용하여 실행 컨텍스트를 초기화한다.  
ECMAScript 코드 C에대한 __전역 실행 컨텍스트 초기화__ 를 위해 다음단계가 수행된다.  
    1. Global Environment(전역 환경)의 VariableEnvironment를 설정한다.
    1. Global Environment(전역 환경)의 LexicalEnvironment를 설정한다.
    1. global object(전역 객체)의 ThisBinding을 설정한다.
1. 전역 코드를 사용해 선언 바인딩 인스턴스화(Declaration Binding Instantiation)를 수행한다.

(이해가 안되네;;;;)

```javascript
// 실행 컨텍스트 초기화 단계(프로그램 시작시)
EC_Stack = [
  globalContext
];
```

### 2.2 Eval Code로의 진입

컨트롤이 Eval Code의 실행 컨텍스트에 진입할 때 다음 단계가 수행된다.

1. 호출하는 컨텍스트가 없거나, eval 코드가 eval 함수에대한 직접 호출에 의해 평가되지 않는 경우
    1. 실행 컨텍스트를 마치 C로 eval 코드를 사용하는 전역 실행 컨텍스트인 것처럼 초기화한다.
1. 그 외에는,  
    1. ThisBinding을 호출 실행 컨텍스트의 ThisBinding과 동일한 값으로 설정한다.
    1. LexicalEnvironment를 호출하는 실행 컨텍스트의 LexicalEnvironment와 동일한 값으로 설정한다.
    1. VariableEnvironment를 호출하는 실행 컨텍스트의 VariableEnvironment와 동일한 값으로 설정한다.
1. 만약 eval code가 strict code일 때, 
    1. LexicalEnvironment를 인수로 전달하는 NewDeclarativeEnvironment를 호출 한 결과로 strictVarEnv를 보냅니다.
    1. LexicalEnvironment를 strictVarEnv로 설정한다.
    1. VariableEnvironment를 strictVarEnv로 설정한다.
1.  eval 코드를 사용해 선언 바인딩을 수행한다.

```javascript
// 전역 컨텍스트에 영향을 준다.
eval('var x = 10');

(function foo() {
  // 여기의 변수 y는 foo 함수의 지역 컨텍스트에 만들어진다.
  eval('var y = 20');
})();

alert(x); // 10
alert(y); // 'y'is not defined
```

위의 예제는 EC_Stack에서 아래와 같이 변경된다.
```javascript
EC_Stack = [
  globalContext
];

// eval('var x = 10'); 
EC_Stack.push({
  context: evalContext,
  callingContext: globalContext
});

// eval exited context
ECStack.pop();

// foo funciton call
ECStack.push(foo functionContext);

// eval('var y = 20');
ECStack.push({
  context: evalContext,
  callingContext: foo functionContext
});

// return from eval 
ECStack.pop();

// return from foo
ECStack.pop();
```
### 2.3 Function Code로의 진입

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


