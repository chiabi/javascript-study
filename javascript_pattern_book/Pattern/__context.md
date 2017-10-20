## 실행 컨텍스트

[참조 : 실행컨텍스트](https://www.zerocho.com/category/Javascript/post/5741d96d094da4986bc950a0)

코드의 실행 환경
```javascript
var name = 'chi'; // (1)변수 선언 (6)변수 대입
function wow(word) { // (2)변수 선언 (3) 변수 대입
  console.log(word + ' ' + name); // (11)
}
function say() { // (4) 변수 선언 (5) 변수 대입
  var name = 'seon'; //(8)
  console.log(name); // (9)
  wow('hello'); //(10)
}
say(); // (7)
// seon
// hello chi
```

### 컨텍스트의 원칙

+ 먼저 __전역 컨텍스트__ 하나 생성 후, 함수 호출 시마다 컨텍스트가 생긴다.
+ 컨텍스트 생성 시 컨텍스트 안에 __변수객체(arguments, variable), scope chain, this__ 가 생성된다.
+ 컨텍스트 생성 후 함수가 실행되는데, 사용되는 변수들은 변수 객체 안에서 값을 찾고, 없다면 스코프 체인을 따라 올라가며 찾는다.
+ 함수 실행이 마무리되면 해당 컨텍스트는 사라진다(클로저 제외). 페이지가 종료되면 전역 컨텍스트가 사라진다.

> __스코프 체인__   
> 지역 스코프에서 변수를 찾지 못하면 꼬리를 물고 계속 범위를 넓히는 관계.   
> 전역변수와 지역변수의 관계, 내부함수에서 외부함수의 변수에 접근이 가능하지만 그 반대는 불가능

### 전역 컨텍스트

전역 컨텍스트 생성 후 __변수객체, scope chain, this__ 가 들어온다.  

전역 컨텍스트는 __arguments(함수의 인자)__ 가 없고, __variable__ 은 해당 스코프의 변수들이다.  
__scope chain(스코프 체인, 자신과 상위 스코프들의 변수 객체)__ 은 자기 자신인 전역 변수객체이다.  
__this__ 는 따로 설정되어 있지 않으면 window이다. (this를 바꾸는 방법은 __new__ 를 호출하는 것이다. 또는 함수에 다른 this 값을 __bind__ 할 수도 있다.)

위의 내용을 객체 형식으로 표현할 경우(표현만 한 거임)
```javascript
'전역 컨텍스트': {
  변수객체: {
    arguments: null,
    variable: ['name', 'wow', 'say']
  },
  scopeChain: ['전역 변수객체'],
  this: window
}
```

wow랑 say는 __호이스팅__ 때문에 선언과 동시에 대입된다.  
그 후 variable의 name에 'chi'가 대입된다.
```javascript
'전역 컨텍스트': {
  변수객체: {
    arguments: null,
    variable: [
      {'name': 'chi'}, 
      {'wow': Function},
      {'say': Function}
    ]
  },
  scopeChain: ['전역 변수객체'],
  this: window
}
```

### 함수 컨텍스트

`say();` 를 호출하는 순간 새로운 컨텍스트인 say 함수 컨텍스트가 생긴다.
```javascript
'say 컨텍스트': {
  변수객체: {
    arguments: null,
    variable: ['name'] // 초기화 후 [{name: 'chi'}]가 된다.
  },
  scopeChain: ['say 변수 객체', '전역 변수객체'],
  this: window
}
```

`wow();` 함수가 호출되어 wow 컨텍스트가 생긴다.
```javascript
'wow 컨텍스트': {
  변수객체: {  
    arguments: [{word: 'hello'}],
    variable: null
  },
  scopeChain: ['wow 변수객체', '전역 변수객체'],
  this: window
}
```

`consolw.log(word + ' ' + name);`의 word랑 name 변수는 wow 컨텍스트 안에서 찾고 없을 경우 scope chain을 따라 전역 스코프에서 찾으면 된다. (say 컨텍스트와 일전 관련이 없다.)

wow 함수 종료후 wow 컨텍스트가 사라지고 say 함수 실행이 마무리되면서 say 컨텍스트, 전역 컨텍스트가 사라진다.

### 호이스팅

변수를 선언하고 초기화했을 때 선언 부분이 최상단으로 끌어올려지는 현상.  
초기화 또는 대입 부분은 그대로 남아있는다.  
함수 표현식이 아닌 __함수선언식__ 일 때는 식 자체가 통째로 끌어올려진다.

```javascript
console.log(chi); // 에러가 아닌 undefined
sayWow(); // 정상적으로 wow
function sayWow() {
  console.log('wow');
}
var chi = 'chi';
```
위의 코드는 다음과 같다.
```javascript
function sayWow() {
  console.log('wow');
}
var chi;

console.log(chi); // 에러가 아닌 undefined
sayWow(); // 정상적으로 wow
chi = 'chi';
```

함수 표현식으로 선언한 경우 에러가 발생, sayYeah가 대입되기 전에 호출되어서 에러 발생
```javascript
sayWow(); // (3)
sayYeah(); // (5) 대입되기 전에 호출해서 에러
var sayYeah = function() { // (1) 선언 (6) 대입
  console.log('yeah');
}
function sayWow(){ // (2)선언과 동시에 초기화(호이스팅)
  console.log('wow'); // (4)
}
```

### 클로저

비공개 변수를 갖고 있는 함수( __IIFE__ )가 __클로저__ 

```javascript
var makeClosure = function() {
  var name = 'chi'; // 비공개 변수
  return function() {
    console.log(name);
  }
};
var closure = makeClosure(); // function(){console.log(name);}
closure(); // 'chi'
```

전역컨텍스트 생성 후, makeClosure 함수 호출 시 makeClosure 컨텍스트도 만들어진다.
```javascript
'전역 컨텍스트': {
  변수객체: {
    arguments: null,
    variable: [{ makeClosure: Function }, 'closure']
  },
  scopeChain: ['전역 변수객체'],
  this: window
};
'makeCloure 컨텍스트': {
  변수객체: {
    arguments: null,
    variable: [{ name: 'chi' }]
  },
  scopeChain: ['makeClosure 변수객체', '전역 변수객체'],
  this: window
};
```

`closure = makeClosure();` function을 return 하는데 그 function 선언 시  
__scope chain__ 은 lexical scoping을 따라서 `['makeClosure 변수객체', '전역 변수객체']`를 포함한다.

> __렉시컬 스코핑(lexical scoping)__  
> 스코프는 함수를 호출할 때가 아니라 선언할 때 생긴다.(정적 스코프)

#### closure 호출 시 컨텍스트 
```javascript
'closure 컨텍스트': {
  변수객체: {
    arguments: null,
    variable: null,
  }
  scopeChain: ['closure 변수객체', 'makeClosure 변수객체', '전역 변수객체'], 
  // scope chain을 통해 makeClosure의 name 변수에 접근할 수 있다.
  this: window
}
```

#### 클로저를 활용한 카운터 예제
```javascript
var counter = function(){
  var count = 0;
  function changeCount(number) {
    count += number;
  }
  return {
    increase: function() {
      changeCount(1);
    },
    decrease: function() {
      changeCount(-1);
    },
    show: function() {
      alert(count);
    }
  }
};
var counterClosure = counter();
// 호출 시 return을 통해 counterClosure컨텍스트에 비공개 변수인 count에 접근할 수 있는 __scope chain__을 반환한다.
// counterClosure에서 계속 count로 접근할 수 있다.
counterClosure.increase();
counterClosure.show(); // 1
counterClosure.decrease();
counterClosure.show(); // 0
```

__ 비공개 변수__ 는 남들이 조작할 걱정이 없다. (해킹 시도, 프로그램 버그 등)
특히 서버와 연결되어 있는 경우 통제하고 있어야함, 그 기본적인 방법이 __클로저__ 이다.

#### 클로저 단점

_성능 문제, 메모리 문제_  
비공개 변수는 자바스크립트에서 언제 메모리 관리를 해야할 지 모르기 때문에 자칫 메모리 낭비로 이어질 수 있다.  
scope chain을 거슬러 올라가는 행동을 하므로 조금 느리다.

#### 이벤트 리스너에서 클로저

이벤트 리스너를 for문으로 연결했을 때 오류가 난다.
클로저를 사용하지 않기 때문

```javascript
for(var i = 0; i < 5; i++) {
  $('#target' + i).on('click', function() {
    alert(i);
  });
}

// alert 값은 모두 5
```
lexical scoping에 따라 함수는 선언할 때 스코프가 생성된다.  
즉, 이벤트 리스너 안의 i는 외부의 i를 계속 참조하고 있는 것  
i는 반복문 종료 후 최종적을 5가 되기 때문에 결국 alert 결과가 모두 5가 됨

IIFE를 사용해 클로저를 만들어준다
```javascript
for(var i = 0; i < 5; i++) {
  (function(j){
    $('#target' + j).on('click', function(){
      alert(j);
    });
  })(i);
} 
// j 값은 i에 해당하는 숫자로 고정되어 해결된다.
```