# 논리연산자(Logical Operators)

일반적으로 Boolean(logical) 값과 함께 사용된다.값이 같으면 Boolean 값을 반환한다.  
그러나 `&&`과 `||`연산자는 피연산자 중 특정한 피연산자(operand)를 반환한다.  

즉, Boolean 이 아닌 value와 논리 연산자를 함께 사용하면 Boolean이 아닌 value를 return 할 수 있다.

`&&`, `||`, `!`

+ `expr1 && expr2`
    - expr1가 `false`로 변환할 수 있을 경우 expr1을 반환, 아니라면 expr2를 반환
    - Bool값과 함께 사용할 경우 expr1과 expr2가 모두 `true`이면 `true`, 아니라면 `false`를 반환한다.
+ `expr1 || expr2`
    - expr1이 `true`로 변환할 수 있을 경우 expr1을 반환, 아니라면 expr2를 반환
    - Bool값과 함께 사용할 경우 expr1과 expr2가 둘 중 하나가 `true`이면 `true`를 반환한다.
+ `!expr`
    - 단일 피연산자가 `true`로 변환될 수 있을 경우 `false` 반환, 아니라면 `true`를 반환한다.


