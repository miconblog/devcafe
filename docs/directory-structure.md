## 프로젝트 폴더 구조

```` 
    public/                  사용자에게 노출되는 클라이언트 소스
      |-- css/
      |-- js/
      |-- images/
      |-- default.html       서버없이 클라이언트만 독립적으로 호스팅할때 사용하는 html 파일

    flux/ 
      |-- components/        React Views 확장자는 jsx, View는 여러개 일수 있으므로 폴더로 묶었음.
      |   |-- pages/         각 서버 페이지에서 최상위 루트 컴포넌트만 모아놓은 폴더
      |   |..
      |-- stores/            React Stores, 스토어도 여러개가 될수 있으므로 폴더로 묶었음.
      |-- actionCreator.js   React Action Helper, 액션 헬퍼는 디스패처와 마찬가지로 싱글톤
      |-- base.jsx           Browerify Bundle 압축을 위한 설정 파일

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

    docs/                  정리된 문서는 모두 여기로 놓을 예정
      |-- README.md        정리된 문서의 모든 인덱스를 모아놓고 프로젝트 가이드를 만들 예정   

    gulp/                  빌드관련 설정
    gulpfile.js
    package.json
````



