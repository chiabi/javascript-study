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


/**
 * Javascript 데이터 유형을 검증하여 참/거짓을 반환하는 유틸리티 함수
 * 
 * @global
 * @func isType
 * @param {any} data    - Javascript 모든 데이터 유형
 * @param {string} kind - 데이터 유형 이름(소문자)
 * @returns {boolean}   - 데이터 일치 검증 결과를 참/거짓으로 반환
 */
function isType(data, kind) {
    // validateError()를 사용하여 오류 조건을 발생시킴:
    // kind 데이터 유형이 'string'이 아니면(!), 오류를 발생시킨다. (설정 메시지 출력)
    validateError(kind, '!string', '2번째 전달인자는 문자열이어야 합니다');
    return type(data) === kind;
}


/**
 * 오류 조건을 발생시키는 문장을 만들어 내는 유틸리티 함수
 * 
 * @global
 * @func validateError
 * @param {any} data             - Javascript 모든 데이터
 * @param {string} kind          - 오류 검증을 위한 문자열 e.g) 'string', '!string'
 * @param {string} error_massage - 출력할 오류 메시지(옵션)
 * @returns {string}             - 유효한 경우 출력되는 메시지
 */
function validateError(data, kind, error_massage){
    data = type(data);
    // kind 문자열 인덱스 첫번째에 '!'가 있으면
    if( kind.indexOf('!') === 0 ) {
        if( data !== kind.slice(1) ) {
            throw error_massage || '두 값이 다르기에 오류입니다.';
        }
    } else {
        if ( data === kind ) {
            throw error_massage || '두 값은 동일하기에 오류입니다.';
        }
    } return '오류는 발생하지 않았습니다.';
}



/**
 * 전달된 숫자보다 하나 작은 수 까지의 난수를 반환하는 유틸리티 함수
 * 
 * @global
 * @func randomNumber
 * @param {number} n  - 난수의 최댓값보다 하나 더 큰 값
 * @default {number}  - 2
 * @returns {number}  - 난수
 */
function radomNumber(n) {
    n = n || 2; // 0, 1
    validateEerror(n, '!number', '숫자 값을 전달해주세요.');
    return Math.floor( Math.random() * n);
}



/**
 * 전달된 최소값, 최대값 사이의 난수를 반환하는 유틸리티 함수
 * 
 * @global
 * @func radomMinMax
 * @param {number} min - 최소값
 * @param {number} max - 최대값
 * @returns {number}   - 난수 
 */
function radomMinMax(min, max) {
    validateError(min, '!number', '첫번째 인자 최소값을 전달해주세요.');
    validateError(max, '!number', '두번째 인자 최대값을 전달해주세요.');
    max = max - min;
    return Math.round( Math.random() * max ) + min;
}

