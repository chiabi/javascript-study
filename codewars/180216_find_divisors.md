## Find the divisors

문제 : `divisors` 라는 이름의 함수를 만들어 정수를 받으면 그 정수의 약수 중 자신과 1을 제외한 수의 배열을 반환하고, 정수가 소수일 경우는 문자열로 "[정수] is prime"을 반환한다.

```javascript
function divisors(integer) {

}
divisors(15); // [3, 5];
divisors(12); // [2, 3, 4, 6];
divisors(13); // "13 is prime";
```
 
나의 풀이 : 

702ms
```javascript
function divisors(integer) {
  const INT = integer;
  let array = [];
  for ( let i = 0; i <= INT; i++ ) {
    if ( INT % i === 0 && i !== 1 ) {
      array.push(i);
    }
  }
  if ( array.length > 1) {
    array.pop();
    return array;
  } else {
    return INT + " is prime";
  }
};
```

Clever 추천수 Best 2 풀이 : 

354ms - 400ms
```javascript
function divisors(integer) {
  var res = []
  for (var i = 2; i <= Math.floor(integer / 2); ++i) if (integer % i == 0) res.push(i);
  return res.length ? res : integer + ' is prime'
};
``` 

389ms - 490ms
```javascript
function divisors(integer) {
  for(var div = [], i = 2; i < integer; i++) if(integer % i == 0) div.push(i);
  return div.length > 0 ? div : integer + " is prime";
}
``` 

아.. 어차피 배열에 1은 제외되니까 2부터 넣으면 되지...참...
끄응...

## 소수 알고리즘 - [에라토스테네스의 체](https://ko.wikipedia.org/wiki/%EC%97%90%EB%9D%BC%ED%86%A0%EC%8A%A4%ED%85%8C%EB%84%A4%EC%8A%A4%EC%9D%98_%EC%B2%B4)

[소수 알고리즘 : 참고](http://ledgku.tistory.com/61)

> 소수(Prime Number) : 약수로 1과 자기 자신만을 가지는 정수

### 기본적인 접근
 
소수는 1과 N(소수 구하려는 수)만을 약수로 가진다.  
2부터 N - 1 까지의 수로는 나눠져서는 안된다.

```javascript
function checkPrime(integer) {
  var isPrime = true;
  for (var i = 2; i < integer; i++ ) {
    if ( integer % i == 0 ) {
      // 소수인지를 알아보는 것이므로 아래와 같은 방법은 
      // 불필요한 반복을 줄일 수 있다.
      isPrime = false;
      break;
    }
  }
  if (isPrime) {
    return integer + " is prime";
  } else {
    return integer + " is not prime";
  }
}
```
소수인 수를 구할 경우 연산은 N - 1번 이뤄진다.

### 에라토스테네스의 접근법

주어진 자연수 N이 소수이기 위해선 N이 N의 제곱근보다 크지 않은 어떤 소수로도 나눠지지 않는다.  
수가 수를 나누면 몫이 발생하는 데 몫과 나누는 수 둘 중 하나는 반드시 N의 제곱근 이하이기 때문이다.
 
즉, 소수이기 위해선 반드시 그 자신의 제곱근 보다 작은 소수로 나눠지지 않아야 한다.

```javascript
function checkPrime(integer) {
  var isPrime = true;
  // 2부터 N의 제곱근의 수로 나눠서 나눠지는 수가 있으면 반복문 종료 
  for (var i = 2; i <= Math.sqrt(integer); i++ ) {
    // console.log(i);
    if ( integer % i === 0 ) {
      isPrime = false;
      break;
    }
  }
  if (isPrime) {
    return integer + " is prime";
  } else {
    return integer + " is not prime";
  }
}
```

### 에라토스테네스의 체

고대 그리스 수학자 에라토스테네스가 발견한 소수를 찾는 방법이다.   
2부터 소수를 구하고자 하는 구간의 모든 수를 나열하고, 2, 3, 5, 7 등 소수인 자기 자신을 제외한 자신의 배수를 순서대로 모두 지운다. 이러한 과정을 반복하면 구하는 구간의 모든 소수가 남는다.


```javascript
function erathosthenes(integer) {
  var arr = [],
      upperLimit = Math.sqrt(integer),
      output = [];
  // 0에서 (N - 1)까지의 배열을 구한다.
  for ( var i = 0; i < integer; i++ ) {
    arr.push(true);
  }
  // 2, 3, 5.. 에서 시작하는 소수의 배수를 제거한다.
  for ( var i = 2; i <= upperLimit; i++ ) {
    // 0, 1은 제외될 것
    if (arr[i]) {
      // 만약 arr[i]의 값이 true이면
      for ( var j = i * i; j < integer; j += i ) {
        // i의 배수가 integer보다 작을 때까지 반복
        arr[j] = false;
        // 배수가 되는 수는 값을 false로 넣는다.
      }
    }
  }
  // 이제 true로 설정된 모든 arry[i]는 소수이다.
  for ( var i = 2; i < integer; i++ ) {
    if (arr[i]) {
      output.push(i);
    }
  }
  return output;
}
```
주어진 수가 소수인지 아닌지를 판별만 할 경우 두번째 방법이 좋고  
주어진 수까지의 모든 소수를 구하기 위해서는 에라토스테네스의 체를 사용한다.

## 약수(divisor) 구하는 알고리즘 정리
 
> 약수 : 어떤 수를 나누었을 때 나머지가 0이 되는 수

2부터 N까지 차례로 나누어 나머지가 0이 되는지 확인한다.  
N의 제곱근보다 작은 약수를 먼저 구한 뒤 이를 이용해 N의 제곱근 보다 큰 약수를 구한다.
 
예를 들어 100의 약수 1, 2, 4, 5, 10, 20, 25, 50, 100에서 
100의 제곱근 10보다 작은 약수 1, 2, 4, 5를 먼저 구한뒤 100/1 = 10, 100/2 = 50... 이런식으로 100의 제곱근보다 큰 약수를 구한다.

위의 접근방법으로 풀어본 내 풀이
```javascript
function divisors(integer) {
  var res = [];
  for ( var i = 1; i <= Math.sqrt(integer); i++ ) {
    if ( integer % i === 0 ) {
      res.push(i);
    }
  }
  for (var j = res.length; j; j--) {
    if ( integer % j === 0 ) {
      res.push(integer / j);
    }
  }
  return res;
}
```

어디서 sort로 정렬하는 거 보고 수정한 방법
```javascript
function divisors(integer) {
  var res = [];
  for ( var i = 1; i <= Math.sqrt(integer); i++ ) {
    if ( integer % i === 0 ) {
      res.push(i);
      if ( integer / i !== i) {
        res.push(integer / i);
      }
    }
  }
  res.sort(function (a, b) {
    return a - b;
  });
  return res;
}
```

그럼 약수로 1과 자기자신을 제외하여 구하는 아래의 이 식은 어떤 접근방법일까?  
1을 제외한 가장 작은 약수인 2와 그 2로 나눈 몫까지의 약수를 구하면 1과 자기자신을 제외한 약수 그룹을 얻을 수 있다.
```javascript
function divisors(integer) {
  var res = []
  for (var i = 2; i <= Math.floor(integer / 2); ++i) {
    if (integer % i == 0) {
      res.push(i);
    } 
  }  
  return res.length ? res : integer + ' is prime'
};
```

## Find primes in range (complexity matters)

정수 1부터 정수 N 사이에 있는 소수의 개수를 반환하는 함수 만들기

나의 풀이 :

```javascript
function numberOfPrime(n) {
	var result = 0;
	var arr = [];
	for ( var i = 2; i <= n; i++) {
    var isPrime = true;
    for (var j = 2; j <= Math.sqrt(i); j++) {
    	if( i % j === 0) {
        	isPrime = false;
        	break;
      }
    }
    if (isPrime) {
      arr.push(i);
    }
  }
  result = arr.length;
	return result;
}

// 아래는 테스트로 출력해 보기 위한 코드입니다.
console.log( numberOfPrime(13) )
```
위의 식은 에라토스테네스의 체를 사용하면 풀 수 있다.