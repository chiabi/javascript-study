# 합병정렬 (O(NlogN))

삽입 정렬보다 더 복잡하지만 성능이 더 좋아 자주 쓰이는 정렬 방법  
단, 30개 이하의 숫자 정렬은 삽입 정렬과 별다른 차이가 없고, 정렬하는데 추가적인 메모리가 필요하다(단점)  

보통 __재귀함수__ 를 사용해 만든다.

수학자 폰 노이만이 개발한 __분할 정복__ 알고리즘에 속한다.

> __분할 정복 알고리즘__  
어떤 문제를 그대로 해결할 수 없을 때, 작은 문제로 분할해서 푸는 방법  

배열을 두 개로 나누고, 나눈 것을 다시 두 개로 나눠 정렬한다.  
두 배열의 제일 앞 수(배열에서 제일 작은 수여야함)를 비교해 작은 숫자를 결과 배열에 넣어준다.  
합병정렬은 반복적으로 쪼개서 마지막에 합치는 방법  
배열 원소의 개수가 홀수여도 상관없다.

```javascript
[5,2,4,7,6,1,3,8], [결과배열]
// 재귀를 사용해 작은 배열로 쪼갠다. (분할 정복)
[5,2,4,7][6,1,3,8], [결과배열]
[5,2][4,7] [6,1][3,8], [결과배열]
[5][2],[결과배열] [4][7],[결과배열] [6][1],[결과배열] [3][8],[결과배열] , [결과배열]
/// 중간 과정__ 다시 합병 정렬
[5][],[2] [][7],[4] [6][],[1] [][8],[3] , [결과배열]
[2,5][4,7],[결과배열] [1,6][3,8],[결과배열] [결과배열]
[5][4,7],[2] [6][3,8],[1] [결과배열]
/// ...
[2,4,5,7][1,3,6,8], [결과배열]

// 합병 정렬
[2,4,5,7][3,6,8], [1]
[4,5,7][3,6,8], [1,2]
[4,5,7][6,8], [1,2,3]
[5,7][6,8], [1,2,3,4]
[7][6,8], [1,2,3,4,5]
[7][8], [1,2,3,4,5,6]
[8], [1,2,3,4,5,6,7]
[], [1,2,3,4,5,6,7,8]
```

```javascript
// 쪼개는 것
function mergeSort() {

}
// 비교해서 정렬 합병하는 것
function merge() {

}

mergeSort([5,2,4,7,6,1,3,8]);
```
결과배열의 추가적인 저장공간이 필요하므로 굉장히 큰 데이터를 처리하는 경우 문제가 생길 수도 있다.

※ 정렬의 __return__ 값이 array인지 새로운 배열 result인지 주의깊게 보아야 한다.  
새로운 배열 return은 그만큼 메모리를 더 잡아먹는다는 의미이다.

> 일부 브라우저에서는 array.sort()를 할 때 합병정렬을 사용한다고 한다.

***

### Array.prototype.slice()

slice() 어떤 배열의 begin 부터 end까지에 대한 shallow copy를 새로운 배열 객체로 반환한다.  
(원본 배열은 수정되지 않는다.)

> __접근자 메서드__  
배열을 수정하지 않고 배열 일부를 반환한다.

> __Shallow copy__  
> + shallow copy(얕은 복사)는 B에 A를 할당하면 두 변수는 동일한 메모리 영역을 가리키므로 나중에 내용을 수정하면 둘 중 어느 내용이든 즉시 다른 내용에 반영된다.  
> + depp copy(깊은 복사)는 B에 A를 할당하면 A가 가리키는 메모리 영역의 값이 B가 가리키는 메모리 영역으로 복사되어 나중에 둘 중 하나의 내용을 수정해도 공유되지 않고 고유하다.  
>
>[Stack overflow: What is the difference between a deep copy and a shallow copy?](https://stackoverflow.com/questions/184710/what-is-the-difference-between-a-deep-copy-and-a-shallow-copy)

+ `arr.slice()`  
0번 인덱스부터 slice  
+ `arr.slice(begin)`  
end가 생략되면 slice는 배열의 끝까지(arr.length) 추출한다.  
음수 인덱스는 배열의 끝에서부터의 길이를 나타낸다.  
+ `arr.slice(begin, end)`  
begin 인덱스부터 end 인덱스를 제외하고 end 인덱스까지 추출

#### return value

추출된 요소가 포한 된 __새로운 배열__

### Array.prototype.sort();

배열의 요소를 적절한 위치에 정렬하고 배열을 반환한다.  
기본 정렬순서는 문자열 Unicode 코드 포인트에 따른다.  

> __변경자 메서드__  
배열을 수정한다.

+ `arr.sort()`  
각 요소의 문자열 변환에 따라 각 문자의 유니코드 코드 포인트 값에 따라 정렬된다.
+ `arr.sort(compareFunction)`  
정렬 순서를 정의하는 함수를 지정.

#### return value

소트 된 배열. (※ 새로운 배열을 만들지 않는다)

