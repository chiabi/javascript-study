## Disemvowel Trolls

문제 : 공백으로 구분된 숫자로 이루어진 문자열을 받아 가장 큰 수와 가장 작은 수를 반환해야 한다.

조건 : 모든 숫자는 유효한 `Int32`이므로 유효성 검사를 할 필요가 없다. 입력 문자열에는 항상 하나 이상의 숫자가 있다. 출력 문자열은 단일 공백으로 구분 된 두 개의 숫자여야하며 가장 높은 숫자가 첫번째여야 한다.

```javascript
function highAndLow(numbers){
    // ...
}

highAndLow("4 5 29 54 4 0 -214 542 -64 1 -3 6 -6") // "542 -214"
```

나의 풀이 : 

```javascript
function highAndLow(numbers){
    var arr = numbers.split(' ').sort(function(a, b){ return a - b});
    var arr2 = [arr.pop(), arr.shift()];
    return arr2.join(' ');
}
```

왜 오류나지....  
아래는 오류나서 수정해서 제출한 풀이

```javascript
function highAndLow(numbers){
    var arr = numbers.split(' ');
    var max = arr.slice(0).sort(function(a, b){ return a - b})[0];
    var min = arr.slice(0).sort(function(a, b){ return a - b})[0];
    return [max, min].join(' ');
}
```

Best practice 추천수 Best 2 풀이 : 

```javascript
function highAndLow(numbers){
  numbers = numbers.split(' ').map(Number);
  return Math.max.apply(0, numbers) + ' ' + Math.min.apply(0, numbers);
}
```

```javascript
function highAndLow(numbers){
  numbers = numbers.split(' ');
  return `${Math.max(...numbers)} ${Math.min(...numbers)}`;
}
```

그냥 Math랑 문자열 결합으로 해결하는 구나...

```javascript
function highAndLow(numbers){
  var arr = numbers.split(' ').sort(function(a, b) { return a - b });
  return arr[arr.length -1] + ' ' + arr[0];
}
```
