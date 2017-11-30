# const, let

변수를 선언하는 방법
+ var 
+ const(constant, 상수)
+ let

const, left은 함수 스코프를 따르지 않고 블록스코프를 따른다.

> 블록스코프  
해당 변수를 해당 블록에서만 접근할 수 있다.

var는 블록스코프가 아닌 함수스코프라서 if블록과는 상관없이 접근할 수 있지만,  
const, let은 블록 바깥에서 접근할 수 없다. 

```javascript
if (true) {
    var x = 3;
}
console.log(x); // 3
```
```javascript
if (true) {
    const y = 3;
}
console.log(y); // y is not defined
```

const, let은 호이스팅이 일어나지 않으므로 변수를 선언하기 전에 변수에 접근하면 에러가 난다.
```javascript
(function() {
    console.log(x);
    var x = 10;
})(); // undefined
```
```javascript
(() => {
    console.log(z);
    const z = 10;
})(); // Uncaught ReferenceError: z is not defined (참조 에러)
```

## const, let의 차이
+ const: 한번 초기화하면 다른 값을 대입할 수 없다.(절대 바꾸면 안되는 값 설정)
+ let: 기존의 var처럼 계속 값을 바꿔줄 수 있다.

```javascript
const a = 10;
a = 101; // Uncaught TypeError: Assignment to constant variable. (타입 에러)
```
```javascript
let b = 10;
b = 101; 
```

※ const는 다시 대입하는 것만 막는다. const에 할당된 객체나 배열의 요소를 바꾸는 것을 막지 않는다.  
즉, 데이터의 주소값만 고정한다. `=`을 통한 대입만 막는다.
(pass-by-value는 막고 pass-by-reference는 못 막는다는 의미인감)

```javascript
const c = [1,2,3];
c[0] = 4;
c; // [4,2,3]

const d = {name: 'chi'};
d.name = 'seon';
d; // {name: 'seon'}
const e = d;
e; // {name: 'seon'}
d.gender = 'male';
e; // {name: 'seon', gender: 'male'}
d; // {name: 'seon', gender: 'male'}
```

var의 기능은 let이 다 한다고 생각하면 된다.