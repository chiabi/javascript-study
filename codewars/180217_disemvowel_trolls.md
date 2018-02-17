## Disemvowel Trolls

문제 : 문자열을 받아 모든 모음이 제거된 새로운 문자열을 반환하는 함수를 작성한다. 예를 들어 "This website is LOSERS LOL!" 이라는 문자열을 받으면 "Ths wbst s fr lsrs LL"을 반환한다.  
`y`는 모음으로 간주되지 않는다.

```javascript
function disemvowel(str) {
  return str;
}

disemvowel("This website is for losers LOL!"); //"Ths wbst s fr lsrs LL!"
```

나의 풀이 : 

```javascript
function disemvowel(str) {
  return str.split(/[aeiou]/ig).join('');
}
```

Best practice 추천수 Best 2 풀이 : 

```javascript
function disemvowel(str) {
  return str.replace(/[aeiou]/gi, '');
}
```

```javascript
function disemvowel(str) {
  return (str || "").replace(/[aeiou]/gi, "");
}
```

Clever 추천수 Best 3 풀이 : 

```javascript
function disemvowel(str) {
  var vowels = ['a', 'e', 'i', 'o', 'u'];
  
  return str.split('').filter(function(el) {
    return vowels.indexOf(el.toLowerCase()) == -1;
  }).join('');
}
```

```javascript
disemvowel = str => str.replace(/[aeiou]/ig, '');
```

결론 split과 join의 결합대신 replace를 쓰면 더 간단하다...  
그리고 플래그 i(Ignore Case)는 대소문자를 구별하지 않고 검색하므로  
`/[AaEeIiOoUu]/g`는  `/[aeiou]/ig`와 동일하다.