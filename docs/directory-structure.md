## 프로젝트 폴더 구조
현재 다른 프로젝트들의 Practice들을 참고 하고 있어요. 정리해서 최종 확정하겠습니다. 

````
    components/         서버와 클라이언트가 동시에 사용할수있는 React 컴포넌트, 확장자는 jsx다. 
    
    client/             사용자에게 노출되는 클라이언트 소스
      ---- css/
      ---- js/
      ---- images/
      ---- default.html 서버없이 클라이언트만 독립적으로 호스팅할때 사용하는 html 파일

    server/             서버 소스, express 제너레이터로 생성한 구조를 그대로 따른다.
      ---- bin/
      ---- routes/
      ---- views/
      ---- server.js

    docs/               정리된 문서는 모두 여기로 놓을 예정
      ---- README.md    정리된 문서의 모든 인덱스를 모아놓고 프로젝트 가이드를 만들 예정   

    gulpfile.js
    package.json
````




