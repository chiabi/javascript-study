// 1. 구문 (Statement) : 각각의 명령
//  값(Vaules), 연산자(Operators), 표현식(Expressions), Keywords, 주석(Comments)으로 구성되며 세미콜론(;)으로 끝나야함
var x = 5;
var y = 6;
var z = x + y;
document.getElementById('demo').innerHTML = z;

// 구문은 code bock({...})으로 그룹화 할 수 있음
// 목적 : 함께 실행되어져야 하는 구문 정의 (ex- function)
function myFuction(x, y) {
    return x + y;
}

// 구문은 대개 위에서 아래로 순서대로 실행
// 흐름 제어(Control Flow) : 조건문 (if, switch), 반복문(while, for)의 사용으로 실행순서가 제어될 수 있음
// 함수 호출로 실행 순서가 변경될 수 있음
var time = 10;
var greeting;
if (time < 10) {
    greeting = 'Good morning';
} else if (time < 20) {
    greeting = 'Good day';
} else {
    greeting = 'Good evening';
}
console.log(greeting);

// ※ 다른 언어와 달리 자바스크립트에서는 블록유효범위(Block-level scope)를 생성하지 않는다.
// 함수 단위의 유효범위(Function-level scope)만이 생성된다.


// 2. 표현식(Expression)
// 값, 변수, 연산자의 조합 -> 연산을 통해 하나의 값을 만든다.
// 즉, 표현식은 하나의 값으로 평가될 수 있는 문장이다.
5 * 10 // 50
'Hello' + ' ' + 'world' // 'Hello world' 

// 3. 변수(Variable)
// data를 저장(할당), 참조하기 위해 사용 됨
// 변수 선언 시 `var` keyword가 사용됨.