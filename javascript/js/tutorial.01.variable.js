// var dateChecker = function() {
//   var date = new Date(); // 현재 날짜 저장
//   alert(date);           // 날짜 알림
// };
// dateChecker();           // 실행

/*
 * 숫자 야구 게임
 * 1. 수비자 : 0 ~ 9 중 4개의 중복 없는 수를 뽑는다. ( 랜덤한 숫자 )
 * 2. 공격자 : 10번의 기회 안에 4개의 숫자를 맞춘다.
 * 3. 매시도 마다 4개의 수 중 맞춘 개수를 볼이나 스트라이크로 알려준다.
 *    볼 : 숫자만 맞을경우, 스트라이크 : 숫자와 자리까지 맞을 경우
 */

// 알고리즘 : 문제를 해결하기 위한 규칙과 절차, 접근법
// 1. 0 ~ 9 중에 중복 없는 4개의 수
//   + 방법 1. 0~9 하나를 뽑고 다음 숫자를 뽑을 때 첫번째와 같으면 다시 뽑는다. 이런식으로 뽑은 수와 비교한다. 
//   + 방법 2. 배열에 0~9를 넣고 하나씩 뽑으면 숫자가 사라져 겹칠일이 없다.

// Math.random() : Math 객체의 random 메서드

/* 첫번째 알고리즘 */
// var number = [];
// number[0] = Math.floor(Math.random() * 10);
// do {
//   number[1] = Math.floor(Math.random() * 10);
// } while(number[1] === number[0])
// do {
//   number[2] = Math.floor(Math.random() * 10);
// } while(number[2] === number[0] || number[2] === number[1])
// do {
//   number[3] = Math.floor(Math.random() * 10);
// } while(number[3] === number[0] || number[3] === number[1] || number[3] === number[2])

/* 두번째 알고리즘 */
var list = [0,1,2,3,4,5,6,7,8,9];
var number = [];
for (var i = 0; i < 4; i++) {
  var select = Math.floor(Math.random() * list.length);
  // console.log('list', list, 'number', number, 'length', list.length);
  number[i] = list.splice(select, 1)[0];
}

// 2. 공격자의 숫자를 받는다. 10번의 기회가 있다.

// count 변수 : 10번의 숫자를 센다.
// strike     : 스트라이크를 기록한다. 
// ball       : 볼을 기록한다.

var count = 1;
var strike = 0;
var ball = 0;
while (count < 10) {
  // 숫자를 입력받고 비교를 준비하는 부분
  var input = prompt('숫자를 입력하세요'); // 숫자를 받는 부분
  var inputArray = input.split(''); // split 함수를 사용해 input 변수를 한글자씩 따로 나눔
  strike = 0; // strike와 ball의 개수 초기화
  ball = 0;
  count++;    // 시도 횟수는 하나 증가
  // 입력받은 숫자를 비교분석하는 부분
  for(var j = 0; j < 4; j++) {
    for(var k = 0; k < 4; k++) {
      if(number[j] == inputArray[k]){
        if(j === k) {
          strike++;
        } else {
          ball++;
        }
        break;
      }
    }
  }
  if (strike === 4) {
    console.log('홈런!!! ' + (count - 1) + '번 만에 맞추셨습니다');
    break;
  } else if (count >= 10) {
    console.error('시도 횟수를 초과하셨습니다.');
  } else {
    console.info(inputArray.join('') + ': ' + strike + '스트라이크 ' + ball + '볼');
  }
}
