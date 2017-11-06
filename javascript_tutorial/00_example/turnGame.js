// 전체 게임 객체를 싱글턴 객체로 만들고
// 테이터를 처리하는 부분은 메소드 체이닝 패턴을 사용한다.

// 싱글턴이라 객체 하나만 생성
// initiate 함수안의 instance객체에 기본적으로 필요한 메소드를 만든다. (게임에 필요한 정보를 보여주는 역할)
var TurnGame = (function(){
    var instance;
    var initiate = function(heroName) {
        var hero = {
            name: heroName,
            lev: 1,
            maxHp: 100,
            hp: 100,
            xp: 0, // 경험치
            att: 10 // 공격력
        }; // 비공개 변수
        return {
            // 레벨 보여줌
            showLevel: function() {
                document.getElementById('hero-level').innerHTML = hero.lev + 'lev';
                return this;
            },
            // 경험치 계산해서 레벨업시 경험치 재계산하고 레벨과 hp상승치 보여줌
            showXp: function(){
                var self = this;
                if(hero.xp > 15 * hero.lev) {
                    hero.xp -= 15 * hero.lev;
                    hero.maxHp += 10;
                    hero.hp = hero.maxHp;
                    hero.att += hero.lev;
                    hero.lev++;
                    window.setTimeout(function(){
                        self.setMessage('레벨업!');
                    }, 1000);
                }
                document.getElementById('hero-xp').innerHTML = 'XP: ' + hero.xp + '/' + 15 * hero.lev;
                document.getElementById('hero-att').innerHTML = 'ATT: ' + hero.att;
                return this.showLevel().showHp();
            },
            showHp: function(){
                if(hero.hp < 0) {
                    return this.gameOver();
                }
                document.getElementById('hero-hp').innerHTML = 'HP: ' + hero.hp + '/' + hero.maxHp;
                return this;
            },
            toggleMenu: function(){
                document.getElementById('hero-name').innerHTML = hero.name;
                document.getElementById('start-screen').style.display = 'none';
                if(document.getElementById('game-menu').style.display === 'block') {
                    document.getElementById('game-menu').style.display = 'none';
                    document.getElementById('battle-menu').style.display = 'block';
                    document.getElementById('battle-input').focus();
                }else {
                    document.getElementById('game-menu').style.display = 'block';
                    document.getElementById('battle-menu').style.display = 'none';
                    document.getElementById('menu-input').focus();
                }
                return this;
            },
            setMessage: function(msg){
                document.getElementById('message').innerHTML = msg;
                return this;
            },
        };
    };
    return {
        getInstance: function(name) {
            if(!instance) {
                instance = initiate(name);
            }
            return instance;
        }
    };
})(); // 선언과 동시에 실행

// 이벤트 리스너 
// 1. 게임 시작 버튼을 눌렀을 때
document.getElementById('start-screen').onsubmit = function(e) {
    var name = document.getElementById('name-input').value;
    e.preventDefault();
    if(name && name.trim() && confirm(name + ' 으로 하시겠습니까?')) {
        TurnGame.getInstance(name).showXp().toggleMenu(); // 체이닝
    } else {
        alert('이름을 입력해주세요.');
    }
}
// 메소드체이닝 
// `TurnGame.getInstance`, `TurnGame.showXP`, `TurnGame.toggleMenu` 모두 intance 또는 this를 return하므로 
// instance 객체의 메소드를 연속으로 쓸 수 있다.
// 계속 같은 객체를 return하기 때문에 그 객체의 메소드를 연속으로 쓸 수 있는 것

// 2. 게임 메뉴 버튼을 눌렀을 때


// 3. 배틀 버튼을 눌렀을 때