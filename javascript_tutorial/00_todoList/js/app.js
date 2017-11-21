// 각 JS 파일 모듈화하고 의존성 관계 확립하기
// 코드를 작성할 모듈들을 준비하고, 각각의 관계와 역할을 정리해두자

// 모듈화를 위해 즉시 실행함수로 app.js에 작성될 코드를 감싸준다.
(function(){
    'use strict';
    function App() {
        console.log('App created');
        this.storage = new app.Storage(name); 
        // name은 localstorage에서 key 값으로 사용되므로 아무값이나 넣어주면 된다.
        this.model = new app.Model(this.storage);
        this.template = new app.Template();
        this.view = new app.View(this.template);
        this.controller = new app.Controller(this.model, this.view);
    }
    var todo = new App();
})();