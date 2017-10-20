## 네임스페이스

[참조 : 함수의 범위(scope)](https://www.zerocho.com/category/Javascript/post/5740531574288ebc5f2ba97e)

전역변수를 만들면 다른 사람의 라이브러리를 사용할 경우 같은 변수명을 사용해 의도치 않게 변수를 덮어쓰는 불상사가 발생할 수 있다.  

고유 네임스페이스를 만들어 겹치지 않게 한다.  
대부분의 라이브러리가 네임스페이스를 사용하고 있다.  
e.g. jindo(naver), FB(facebook), jQuery 또는 $(jquery)

```javascript
var obj = { // obj라는 고유 네임스페이스를 만듦
  x: 'local',
  y: function() {
    alert(this.x);
  }
}
// `obj.x`, `obj.y()` 식으로 접근해야한다.
```

#### 보완 1 
누군가 x, y를 고의적으로 바꿀 수 있다.  
(e.g. `obj.x = 'hacked';`라고 추가할 경우 `obj.y();` 호출 시 local 대신 hacked가 alert된다.)

```javascript
var another = function() {
  var x = 'local'; // 비공개 변수 x
  function y() {
    alert(x);
  }
  return {y : y}; // 공개 변수 y
}
var newScope = another();
```

`another();` 호출 시 return에 의해 `{y: function(){alert(x)}};`가 newScope에 저장된다.  
이제 newScope라는 네임스페이스를 통해서 y에 접근할 수 있다.

__reutrn을 통해 공개할 변수(y)만 공개__ 하고 변수(x)는 비공개할 수 있다.

## IIFE(즉시 호출 함수 표현식), 모듈패턴

함수를 선언하자마자 바로 실행시킨다.  
`function(){}`로 선언하면서 동시에 `()`를 붙여 바로 실행시킨다.  

비공개 변수가 없는 자바스크립트에 __비공개 변수__ 기능을 만들어준다.
```javascript
// 위 스크립트를 간략하게 수정
var newScope = (function(){
  var x = 'local'; // 비공개 변수 x
  return {
    y: function() { // 공개 변수 y
      alert(x);
    }
  };
})();
```

## 싱글턴 패턴

객체를 만들 때, 하나의 생성자로 여러 객체를 만들 수 있지만, 
필요에 의해 __단 하나__ 의 객체만을 만들 때 사용한다.

__객체 리터럴__이 __싱글턴 패턴__의 대표적인 예

```javascript
var obj = {
  a: 'hello',
  b: function() {
    alert(this.a)
  } 
}
```

### 보완 1

모든 속성이 다 공개되어 있다는 단점을 보완, 비공개로 만들어준다.
```javascript
var singleton = (function(){
  var instance;
  var a = 'hello'; // a는 비공개 변수
  function initiate() { // 함수 안의 내용이 실제 객체의 내용
    return {
      a: a,
      b: function() {
        alert(a);
      }
    };
  }
  return { // IIFE로 즉시 반환되는 부분, getInstance라는 메소드를 가진 객체를 반환
    getInstance: function(){ 
      if(!instance) { // (3) getInstatnce를 여러번 호출했을 경우 이미 instance 객체가 있는 경우는 initiate을 거치지 않고 바로 반환한다.
        instance = initiate(); // (1) getInstance 호출 시, 내부적으로 initiate 함수가 호출되고 instance에 위 객체의 내용이 저장되고
      }
      return instance; // (2)동시에 반환된다.
    }
  }
})();
var first = singleton.getInstance();
var second = singleton.getInstance();
console.log(first === second); // treu;
```
__IIFE__ 로 __비공개 변수__ 를 가질 수 있게 만들어준다.
싱글턴 패턴은 모듈 패턴을 변형한 디자인 패턴.

처음 네임스페이스를 만들 때 사용한다.
e.g. 게임 객체를 싱글턴으로 만든다 > 게임을 실행 시 게임은 한번만 켜져야 하므로

## 생성자 패턴

대부분의 객체는 이 패턴으로 만들게 된다. 특히, 상속이 필요할 때 제일 많이 쓰인다.
```javascript
function Vehicle(name, speed) {
  this.name = name;
  this.speed = speed;
}
Vehicle.prototype.drive = function() {
  console.log(this.name + ' runs at ' + this.speed)
};
```

위 코드를 모듈패턴을 함께 사용해 하나로 묶어준다.
```javascript
var Vehicle = (function(){
  function Vehicle(name, speed) {
    this.name = name; 
    this.speed = speed;
  }
  Vehicle.prototype.drive = function() {
    console.log(this.name + ' runs at ' + this.speed);
  };
  return Vehicle;
})();
```
__IIFE__ 라서 바로 변수 Vehicle에 생성자 Vehicle이 덮어씌워진다.