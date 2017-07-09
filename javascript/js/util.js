/* 
 * jsDoc(http://usejsdoc.org/)
 * 
 * book 함수에 대한 설명 예)
 * @constructor
 * @param {string} title - The title of the book
 * @param {string} author - The author of the book
 * 
 * jsDoc Block Tags(http://usejsdoc.org/index.html#block-tags)
 * @global : 심볼이 문서에서 전역 심볼로 나타나도록 지정, JSDoc은 소스 파일 내 심볼의 실제 범위 무시
 * @function (@func, @method) [<functionName>] : 함수 이름
 * @param {string} [이름] - [설명] : 함수 매개 변수의 이름, 유형 및 설명을 제공
 * @returns {string} : 함수 반환값
*/


/**
 * Javascript 데이터 유형을 완벽하게 문자열로 반환하는 유틸리티 함수
 * 
 * @global
 * @func type
 * @param {any} data - JavasScript 모든 데이터 유형
 * @returns {string} - 소문자로 데이터 유형 이름을 문자열로 반환
 */
function type(data) {
    return Object.prototype.toString.call(data).slice(8,-1).toLowerCase();
}

// Object.prototype.toString.call(<string>)                        --- "[object String]"
// Object.prototype.toString.call(<string>).slicd(8,-1)            --- String
// Object.prototype.toString.call(data).slice(8,-1).toLowerCase(); --- string
