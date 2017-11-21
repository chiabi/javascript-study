// 화면에 데이터를 그리는 역할을 수행한다.
// template을 인자로 받아 자신의 프로퍼티에 추가한다.
// View에서 생성자 함수에 조작해야할 element를 저장해 둘 것이다.
// controller와 binding되어, 레코드의 변경을 바로바로 화면에 렌더링하는 역할을 할 것이다.
(function(exports) {
    'use strict';
    function View(template) {
        console.log('view created!');
        this.template = template;

        // template로부터 전달받는 view를 추가시킬 ul 태그와 값 입력할 input 태그를 선택
        // 생성자 함수에 프로퍼티로 각 태그들을 선택하여 추가한다.
        this.$todoList = document.getElementById('todo-list');
        this.$newTodo = document.getElementById('new-list');
    }

    // 핵심 역할을 하게 될 두 메소드 중 하나인 bind를 생성
    View.prototype.bind = function(event, hanlder) {

    };
    exports.app = exports.app || {};
    exports.app.View = View;
})(this);