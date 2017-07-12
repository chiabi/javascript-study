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
function randomNumber(n) {
    n = n || 2; // 0, 1
    validateError(n, '!number', '숫자 값을 전달해주세요.');
    return Math.floor( Math.random() * n);
}

/**
 * 전달된 최소값, 최대값 사이의 난수를 반환하는 유틸리티 함수
 * 
 * @global
 * @func randomMinMax
 * @param {number} min - 최소값
 * @param {number} max - 최대값
 * @returns {number}   - 난수 
 */
function randomMinMax(min, max) {
    validateError(min, '!number', '첫번째 인자 최소값을 전달해주세요.');
    validateError(max, '!number', '두번째 인자 최대값을 전달해주세요.');
    max = max - min;
    return Math.round( Math.random() * max ) + min;
}

/**
 * 전달된 인자에서 최소값, 최대값을 구분한 후, 그 사이의 나나수를 반환하는 유틸리티 함수
 * 
 * @global
 * @func randomRange
 * @param {number} n1 - 수 (최대 혹은 최소값)
 * @param {number} n2 - 수 (최대 혹은 최소값)
 * @param {number}    - 난수
 */
function randomRange(n1, n2) {
    var min, max;
    min = Math.min(n1, n2);
    max = Math.max(n1, n2);
    return randomMinMax(min, max);
}


/**
 * 숫자 유형의 데이터인지 감별하는 유틸리티 함수
 *
 * @global
 * @func isNumber
 * @param {any} data  - JavaScript의 모든 데이터 유형
 * @returns {boolean} - 숫자 유형인지 아닌지 유무 true | false
 */
function isNumber(data){
    return isType(data, 'number') && !Number.isNaN(data);
}

/**
 * 문자 유형의 데이터인지 감별하는 유틸리티 함수
 * 
 * @global
 * @func isString
 * @param {any} data  - JavaScript의 모든 데이터 유형
 * @returns {boolean} - 문자 유형인지 아닌지 유무 true | false 
 */
function isString() {
    return isType(data, 'string');
}

/**
 * 불리언 유형의 데이터인지 감별하는 유틸리티 함수
 * 
 * @global
 * @func isBoolean
 * @param {any} data  - JavaScript의 모든 데이터 유형
 * @returns {boolean} - 불리언 유형인지 아닌지 유무 true | false 
 */
function isBoolean() {
    return isType(data, 'bloolean');
}

/**
 * 함수 유형의 데이터인지 감별하는 유틸리티 함수
 * @global
 * @func isFunction
 * @param {any} data  - JavaScript의 모든 데이터 유형
 * @returns {boolean} - 함수 유형인지 아닌지 유무 true | false
 */
function isFunction(data) {
    return isType(data, 'function');
}

/**
 * 배열 유형의 데이터인지 감별하는 유틸리티 함수
 * @global
 * @func isArray
 * @param {any} data  - JavaScript의 모든 데이터 유형
 * @returns {boolean} - 배열 유형인지 아닌지 유무 true | false
 */
function isArray(data) {
    return isType(data, 'array');
}

/**
 * 객체(Object) 유형의 데이터인지 감별하는 유틸리티 함수
 * @global
 * @func isObject
 * @param {any} data  - JavaScript의 모든 데이터 유형
 * @returns {boolean} - 객체(Object) 유형인지 아닌지 유무 true | false
 */
function isObject(data) {
    return isType(data, 'object');
}