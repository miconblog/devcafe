## 프로젝트 폴더 구조
현재 다른 프로젝트들의 Practice들을 참고 하고 있어요. 정리해서 최종 확정하겠습니다. 

```` 
    client/                 사용자에게 노출되는 클라이언트 소스
      |-- css/
      |-- js/
      |-- images/
      |-- default.html       서버없이 클라이언트만 독립적으로 호스팅할때 사용하는 html 파일

    flux/ 
      |-- components/        React 컴포런트, 확장자는 jsx
      |-- actions/
      |-- constants/
      |-- dispatchers/
      |-- stores/
      |-- index.jsx             React 메인

    server/    
      |-- app/
      |   |-- board/
      |     |-- board.controller.js
      |     |-- board.model.js
      |     |-- index.js
      |   |-- auth/
      |    ...
      |    ..
      |    .
      |
      |-- libs/               서버에서 사용하는 파이프라인 모듈이나 기타 라이브러리
      |-- bin/
      |-- views/
      |-- server.js
      |-- routes.js

    docs/                   정리된 문서는 모두 여기로 놓을 예정
      |-- README.md        정리된 문서의 모든 인덱스를 모아놓고 프로젝트 가이드를 만들 예정   

    gulpfile.js
    package.json
````




