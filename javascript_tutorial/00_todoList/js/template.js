// 각각의 js 파일들을 모듈화 시킨다.
// 생성자 함수를 정의하고, 모듈을 exports 변수를 통해, 외부로 노출시킨다.
// 노출시킬때도, app이라는 namespace안에 노출시킨다.

// template.js 
// 생성자 함수에 html 코드 조각을 담고 있다.
// view가 redering 할 때 넘겨받은 data 인자로 html 코드 조각의 일부를 치환하여, 
// 우리가 원하는 형식으로 입력한 데이터를 출력하는 일종의 템블릿 엔진 역할을 수행
(function(exports) {
    'use strict';
    function Template() {
        console.log('template created');
        // list에 추가될 html 코드 조각을 template 화
        this.defaultTemplate = 
        '<li data-id="{{id}}" class="{{completed}}">' +
            '<div class="view">' +
                '<input type="checkbox" class="toggle" {{checked}}>' +
                '<label>{{title}}</label>' +
                '<button class="destory"></button>' +
            '</div>' +
        '</li>';
    }
    // 어딘가로부터 넘겨받을 data를 템플릿에 삽입할 메소드
    Template.prototype.insert = function(data) {
        var view = '';
        for(var i = 0; i < data.length; i++) {
            var template = this.defaultTemplate;
            var completed = '';
            var checked = '';

            if(data[i].completed) { // data[i].completed's default value = false;
                completed = 'completed';
                checked = 'checked';
            }

            template = template.replace('{{id}}', data[i].id);
            template = template.replace('{{title}}', data[i].title);
            template = template.replace('{{completed}}', completed);
            template = template.replace('{{checked}}', checked);

            view = view + template;
        }
        return view;
    };
    exports.app = exports.app || {};
    exports.app.Template = Template;
})(this);