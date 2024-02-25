# 샘플 프로젝트

## 프로젝트 세팅

### 사전 준비 / 설치 항목
- nodeJS를 설치합니다.
- `npm install` 커맨드로 디팬던시를 설치합니다.
- eslint와 prettier, editorconfig와 관련된 개발툴의 PlugIn을 설치합니다.
  - intelliJ
    - [Preitter](https://plugins.jetbrains.com/plugin/10456-prettier)
    - [FileWatchers](https://plugins.jetbrains.com/plugin/7177-file-watchers)
  - VS Code
    - [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
    - [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
    - [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
    - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
    - [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
- 코딩 컨벤션을 유지하기 위해 PlugIn의 Run On Save 옵션을 켭니다. 

### 로컬 개발환경

#### 로컬서버 실행
- 터미널에서 `npm run start` 커맨드 실행
- 크롬 웹브라우저 에서 http://localhost:3000/ 열기

#### 빌드하기
- 터미널에서 `npm run build` 커맨드 실행

### 코드 작성 규칙
- 파일명은 **camelCase** 로 작성합니다.
- 컴포넌트명은 **PascalCase** 로 작성합니다.
- 공통 상수는 대문자 **SNAKE_CASE** 로 작성합니다.
- CSS 클래스명은 **kebob-case** 로 작성합니다.
- 변수, 함수, 클래스, 파일 등 모든 경우의 명명규칙으로 **약어 사용을 지양**하고, 길더라도 어떤 정보인지 인지하기 쉽게 작성합니다.

### 코드구조
- App.js: 모든 페이지에 반영되는 Provider 등을 정의합니다.
- pages: 라우팅 경로와 일치하는 디렉토리 구조와 페이지로 구성하며, 페이지의 전체 레이아웃을 결정합니다.
- designSystem: 프로젝트에 공통으로 사용되는 UI 컴포넌트 경로입니다.
- componets: 화면을 구성하는 실제 컴포넌트 경로입니다.
  - pageItem: 페이지에 귀속되는 컴포넌트 경로입니다.
  - provider: 전역적으로 사용하는 Context와 Provider 컴포넌트입니다.
- service: 서버와 네트워크 통신을 수행하는 API나 socket 통신을 정의합니다.
- types: 여러 파일에서 공유하는 type 또는 interface를 정의합니다.
- consts: 여러 파일에서 공유하는 상수들을 정의합니다.
- hooks: 여러 컴포넌트에서 공유하는 react custom hook을 정의합니다.
- utils: 공통적으로 사용하는 util 함수를 정의합니다.

### Dependency
- React: React로 이루어진 CSR 및 SPA 프로젝트입니다.
- Typescript: 휴먼 에러를 최소화하기 위하여 Typescript를 활용합니다.
- date-fns: 날짜/시간 등의 포맷을 쉽게 관리하기 위해 사용합니다.
- axios: Restful 통신을 위해 사용합니다.
- react-query: API 통신과 관련된 상태를 관리하기 위해 사용합니다.
- eslint, stylelint, prettier: 코딩 컨벤션 유지와 에러를 방지하기 위해 사용합니다.
- husky: git hook으로서 git action 전후로 실행할 동작을 정의합니다. 이 프로젝트에서는 커밋 전에 eslint와 stylelint에 어긋난 코드가 없는지 검사합니다.
- tailwindcss: css는 tailwind로 클래스를 정의합니다.


## 페이지 구성
- [dashboard](.docs/pages/dashboard.md)
