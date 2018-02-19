## Descending Order

문제 : 음이 아닌 정수를 인수로 받아 그 숫자를 내림차순으로 반환하는 함수를 만든다. 숫자를 재정렬하여 가장 높은 숫자를 만드는 것

```javascript
function descendingOrder(n){
    // 
}

descendingOrder(123456789) // 987654321
```

나의 풀이 : 

```javascript
function descendingOrder(n) {
    return parseInt(n.toString().split('').sort(function(a, b){return b-a}).join(''));
}
```

Best practice 풀이 : 

```javascript
function descendingOrder(n) {
    return pareInt(String(n).split('').sort().reverse().joing(''));
}
```

```javascript
function descendingOrder(n) {
    return +(n + '').split('').sort(function(a, b){ function b - a}).join('');
}
```

숫자를 문자열로 바꾸는 방법이 다양하구나;;

1. `String(n)`
2. `n.toString()`
3. `'' + n`
4. `n + ''`

***
[What's the best way to convert a number to a string in JavaScript?
](https://stackoverflow.com/questions/5765398/whats-the-best-way-to-convert-a-number-to-a-string-in-javascript)

