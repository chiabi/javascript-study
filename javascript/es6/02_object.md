# Object(객체)

+ 메소드를 줄여쓸 수 있게 되었다.
+ 참조하는 변수의 이름과 속성의 이름이 같을 경우 한 번만 써도 되게 되었다.
+ 동적 속성 생성 - 속성의 이름에 변수의 값이 사용될 때, 자제척으로 계산하지 못하고 계산 후 속성을 따로 추가해주었는데, 그냥 키 값으로 계산해서 쓸 수 있다.


```javascript
// 기존 객체 사용 코드
var sayYeah = function() {
    alert('Yeah');
};
var a = 1;
var b = 'Wow';
var object = {
    sayHello: function() {
        alert('hello');
    },
    sayYeah: sayYeah
};
object[a + 3] = 'four';
object['say' + b] = function() {
    alert('Wow');
}
```
```javascript
// ES6 코드
const a = 1;
const b = 'Wow';
const sayYeah = () => {
    alert('Yeah');
};
const object2 = {
    sayHello() {
        alert('hell');
    },
    sayYeah,
    [a + 3]: 'four',
    ['say' + b]() {
        alert('Wow');
    }
};
```

##  메소드를 줄여 쓸 수 있게 됨
