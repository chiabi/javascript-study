# Yarn

## [Yarn](https://yarnpkg.com/en/) 설치

> FAST, RELIABLE, AND SECURE DEPENDENCY MANAGEMENT.

NPM 보다 빠르고 안정적이면 보안성이 뛰어나다고 주장하고 있는 새로운 자바스크립트 패키지 매니저

+ `npm install --save` : `yarn add`
+ `npm install --save-dev` : `yarn add --dev` 

```sh
$ npm install --global yarn  # yarn 전역 설치
$ yarn --verision            # yarn -V

$ yarn self-update           # 업데이트

$ yarn init                  # yarn init -y : 프로젝트 디렉토리 초기화, package.json 생성
```

### [yarn.lock](https://yarnpkg.com/en/docs/yarn-lock)

`yarn.lock` 이라는 __lockfile__ 패키지에 대한 각 의존성의 정확한 버전을 저장한다. (이는 여러 컴퓨터에서 일관된 설치를 수행하게 한다.)

`yarn.lock`은 Yarn CLI를 통해 의존성을 추가/ 업그레이드/ 제거하는 것을 전적으로 yarn에서 핸들링하므로 직접 파일을 수정해서는 안된다.

[Yarn : CLI introduction](https://yarnpkg.com/lang/en/docs/cli/)