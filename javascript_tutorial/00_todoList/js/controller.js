// 모델과 뷰를 연결하는 역할
// 모델과 뷰 모두에 접근해야하므로 두가지 인자를 받아 자신의 프로퍼티에 추가한다.
// 모든 바인딩이 컨트롤러에서 이루어지며, 사용자의 요청을 받는 부분이 컨트롤러이다.
(function(exports) {
    'use strict';
    function Controller(model, view) {
        console.log('controller created!');
        this.model = model;
        this.view = view;
    }
    exports.app = exports.app || {};
    exports.app.Controller = Controller;
})(this);