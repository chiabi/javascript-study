# Array diff

문제 : 하나의 리스트를 다른 리스트와 비교해 차이를 찾는 함수를 구현. 목록 b에 있는 모든 값을 목록 a에서 제거해야한다.

```javascript
function array_diff(a, b) {
    // ...
}
array_diff([1,2,2,2,3],[2]) // [1,3]
```

너무 먼길을 돌아온 나의 풀이...

```javascript
function array_diff(a, b) {
//   console.log(`a : ${a}, b : ${b}`);
  return a.filter(function(el){
    if( !b.length ) {
      return true;
    } else {
      for ( var i = 0; i < b.length; i++) {
        // console.log(`el : ${el}, b[i] : ${b[i]}`);
        return el !== b[i];
      };
    }
  });
}
```

Best practice 풀이 :

```javascript
function array_diff(a, b) {
    return a.filter(function(x) { return b.indexOf(x) == -1; });
}
```

```javascript
function arry_diff(a, b) {
    return a.filter(e => !b.includes(e));
}
```

아래는 clever 수가 많은데 테스트 환경이 Node라서 위트있게 해결한듯
```javascript
array_diff = require('lodash').difference;
```