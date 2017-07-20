// 엄격 모드 선언, 코드의 최상단에 선언한다.
"use strict"

// DOM Script 에서 Single var pattern을 사용한 예
var html = window.document.documentElment,
    head = window.document.head,
    body = window.document.body;

console.log('html: ', html);
console.log('head: ', head);
console.log('body: ', body);

// https://github.com/yamoo9/FDS/blob/4th/LECTURE/DAY07/study/01.js.operators.js
// https://github.com/owl423/FDS04_Summary/blob/master/README/0530.md