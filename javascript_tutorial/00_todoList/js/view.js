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
    // 발생하는 event에 따라 다른 함수를 실행(이벤트 추가, 이벤트 핸들러 실행)
    // Controller로부터 넘겨온 정보를 받고 그대로 수행할 것임
    // (Controller는 View에게 역할 전달만 하고 실질적 이벤트 수행은 View에서 한다.)
    View.prototype.bind = function(event, hanlder) {
        var self = this;
        // event: newTodo
        // handler: controller.addItem
        if(event === 'newTodo') {
            console.log('View.bind.newTodo excute!');
            var temp = self.$newTodo;
            temp.addEventListener('change', function() {
                handler(self.$newTodo.value); // addItem(self.$newTodo.value);
            });
        }
    };

    // View에서 핵심 역할을 하는 나머지 메소드 render
    // 앞으로 수 많은 함수들이 추가 되며, 그 함수들은 인자로 넘겨받은 viewCmd를 통해 실행된다.
    // render 메소드는 어떠한 함수를 실행시킬 것인가에 대한 값(viewCmd)과, parameter(data)를 인자로 넘겨받는다.
    // parameter :  Storage로부터 넘겨받는 객체들을 담고 있는 배열 data
    View.prototype.render = function(viewCmd, parameter) {
        var self = this;
        var viewCommands = {
            // showEntries:  View에 private으로 설정되어 있는 addItem 메소드 실행
            // data로 넘어오는 값이 storage에 있는 모든 data이다.
            // 모든 데이터를 출력하는 역할을 하는 메소드
            showEntries: function() {
                console.log('View.render.showEntries execute!');
                self._addItem(paramter);
            },
            // clearNewTodo : input tag를 비워주는 역할
            clearNewTodo: function() {
                console.log('View.render.clearNewTodo execute!');
                self.$newTodo.value = '';
            }
        };
        viewCommands[viewCmd]();
    };

    // View에서 실질적인 역할을 수행하는 private 메소드 생성
    View.prototype._addItem = function(id) {
        // 프린팅 작업
        this.$todoList.innerHTML = this.template.insert(id);
    };

    exports.app = exports.app || {};
    exports.app.View = View;
})(this);