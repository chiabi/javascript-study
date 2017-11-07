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
        // 몬스터를 만들어 준다.
        var monsters = [{
            name: '슬라임',
            hp: 25 + hero.lev * 3,
            att: 10 + hero.lev,
            xp: 10 + hero.lev,
        },{
            name: '스켈레톤',
            hp: 50 + hero.lev * 5,
            att: 15 + hero.lev * 2,
            xp: 20 + hero.lev * 2,
        },{
            name: '마왕',
            hp: 100 + hero.lev * 10,
            att: 25  + hero.lev * 5,
            xp: 50 + hero.lev * 5,
        }];
        var monster = null;
        var turn = true;
        return {
            // 레벨 보여줌
            showLevel: function() {
                document.getElementById('hero-level').innerHTML = hero.lev + 'lev';
                console.log('showLevel(): ' + this);
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
                        console.log('showXp() var self: ' + self);
                        console.log('showXp() window.setTimeout() this: ' + this);
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
            // 몬스터 생성 메소드
            generateMonster: function() {
                monster = JSON.parse(JSON.stringify(monsters[Math.floor(Math.random() * monsters.length)]));
                document.getElementById('monster-name').innerHTML = monster.name;
                document.getElementById('monster-hp').innerHTML = 'HP: ' + monster.hp;
                document.getElementById('monster-att').innerHTML = 'ATT: ' + monster.att;
                this.setMessage(monster.name + '이(가) 공격해온다');
                return this.toggleMenu();
            },
            // 메뉴 인풋을 눌렀을 때 메소드 / 1.모험 -> 몬스터/ 2.쉰다 -> 체력회복 / 3.종료 /
            menuInput: function(input) {
                if(input === '1') {
                    return this.generateMonster();
                } else if (input === '2') {
                    hp = maxHP;
                    return this.updateStat().setMessage('체력을 회복했다.');
                } else if (input === '3') {
                    return this.exit();
                } else {
                    alert('잘못된 입력입니다.');
                }
            },
            // 배틀 인풋을 눌렀을 때 메소드 / 공격 -> 어택 몬스터 / 회복 / 도망 /
            battleInput: function(input) {
                if(input === '1') {
                    return this.attackMonster();
                } else if (input === '2') {
                    // 일정 레벨 이상에서는 완전 회복되지 않고 레벨 + 20만큼만 회복
                    if (hero.hp + hero.lev * 20 < hero.maxHp) {
                        hero.hp += hero.lev * 20;
                    } else {
                        hero.hp = hero.maxHp;
                    }
                    // 체력회복 메시지 -> 몬스터에게 턴을 넘긴다.
                    return this.showHp().setMessage('체력을 회복했다').nextTurn();
                } else if (input === '3') {
                    return this.clearMonster().setMessage('도망쳤다.');
                } else {
                    alert('잘못된 입력');
                }
            },
            // 몬스터를 공격
            attackMonster: function() {
                monster.hp -= hero.att;
                document.getElementById('monster-hp').innerHTML = 'HP: ' + monster.hp;
                if(monster.hp > 0) {
                    return this.setMessage(hero.att + '의 데미지를 입혔다.').nextTurn();
                } else {
                    this.win();
                }
            },
            // 주인공을 공격
            attackHero: function() {
                hero.hp -= monster.att;
                return this.showHp();
            },
            // 다음 턴, 몬스터에게 턴을 넘기는 동작
            nextTurn: function() {
                var self = this;
                turn = !turn; // 반복이 될 때 상태 toggle 역할
                document.getElementById('battle-button').disabled = true;
                if(!turn) {
                    // 1초마다 메시지를 순차적으로 표현
                    window.setTimeout(function() {
                        self.setMessage(monster.name + '의 턴!');
                        window.setTimeout(function() {
                            document.getElementById('battle-button').disabled = false;
                            if(self.attackHero()) {
                                // 함수를 호출할 때 반환되는 값을 다른 일반적인 값들 처럼 사용할 수 있다.
                                self.setMessage(monster.att + '의 데미지를 입었습니다.');
                                window.setTimeout(function(){
                                    self.setMessage(hero.name + '의 턴!');
                                }, 1000);
                            }
                        }, 1000);
                    }, 1000);
                    return this.nextTurn();
                }
                return this;
            },
            // 이겼을때
            win: function() {
                this.setMessage(monster.name + ' 사냥에 성공해 경험치 ' + monster.xp + '을 얻었다.');
                hero.xp += monster.xp;
                return this.clearMonster().showXp();
            },
            // 몬스터 삭제
            clearMonster: function() {
                monster = null;
                document.getElementById('monster-name').innerHTML = '';
                document.getElementById('monster-hp').innerHTML = '';
                document.getElementById('monster-att').innerHTML = '';
                return this.toggleMenu();
            },
            // 게임오버
            gameOver: function() {
                document.getElementById('screen').innerHTML = hero.name + '은 레벨' + hero.lev + '에서 죽었습니다. 새로고침하여 다시 플레이하세요.'
                return false;
            },
            // 종료
            exit: function() {
                document.getElementById('screen').innerHTML = '플레이해주셔서 감사합니다. 새로 시작하려면 새로고침하세요.'
            }
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

// TurnGame = 'hacking';

// 이벤트 리스너 
// 1. 게임 시작 버튼을 눌렀을 때
document.getElementById('start-screen').onsubmit = function(e) {
    var name = document.getElementById('name-input').value;
    e.preventDefault();
    // String.prototoype.trim(); 문자열의 양 끝의 공백을 제거한 새로운 문자열을 반환한다.
    // 문자열 자체 값에는 영향을 끼치지 않는다.
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
document.getElementById('game-menu').onsubmit = function(e) {
    var input = document.getElementById('menu-input');
    var option = input.value;
    e.preventDefault();
    input.value = '';
    TurnGame.getInstance().menuInput(option); // 2.추가
};

// 3. 배틀 버튼을 눌렀을 때
document.getElementById('battle-menu').onsubmit = function(e) {
    var input = document.getElementById('battle-input');
    var option = input.value;
    e.preventDefault();
    input.value = '';
    TurnGame.getInstance().battleInput(option); // 2.추가
};