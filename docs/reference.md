## 코드 변경사항을 감지해서 서버를 재시작하고, 브라우저를 새로고침해주는 도구 비교
express 서버는 develop-server를 이용하고 클라이언트 코드는 browersync로 구성한다. 

#### 참고자료
 - http://www.slant.co/topics/1479/compare/~browsersync_vs_codekit_vs_livereload
 - https://github.com/narirou/gulp-develop-server



## 어떤 템플릿 엔진을 쓸 것인가?
React 컴포넌트를 생각한다면 jade 같이 HTML과는 동떨어진 템플릿 엔진을 쓰기 어렵다. 가급적 HTML을 그대로 유지할수있는 엔진과 그나마 좀 익숙한 엔진으로 선택하자. 당장 성능이 문제될것 같지는 않다! 결론, [handlebars](https://github.com/ericf/express-handlebars/)로 가자!

#### Handlebars 설정할때 겪었던 문제
 1. layout을 설정할때, layoutsDir을 지정해주지 않으면 node의 실행 폴더를 기준으로 layouts/ 폴더를 찾기 때문에 프로젝트 구조를 변경할경우 반드시 지정해야한다. 

 2. 템플릿 확장자를 변경할 경우엔 extname을 따로 지정한다. 기본값은 handlebars로 되어 있다.

```
    app.engine('hbs', exphbs({
      extname: '.hbs',
      layoutsDir: './server/views/layouts',
      defaultLayout: 'main'
    }));
    app.set('view engine', 'hbs');
```

#### 참고자료
 - https://strongloop.com/strongblog/compare-javascript-templates-jade-mustache-dust/
 - http://garann.github.io/template-chooser/
 - https://github.com/ericf/express-handlebars/
 - https://github.com/wycats/handlebars.js/
 - https://github.com/janl/mustache.js/

## Express with React 구조는 어떻게 잡을 것인가?
React는 서버와 클라이언트에서 모두 사용할수있는 아이소모픽(isomorphic) 템플릿 엔진을 포함하고 있기 때문에 가급적 화면을 그려주는 React UI는 서버에서 1차적으로 렌더링해서 내려주는 것이 효율적으로 판단된다. 따라서 Express 서버에서 React 컴포넌트를 같이 사용하기 위해서 components/ 폴더를 clinet/와 server/ 폴더와 같은 위치에 뒀다.

최종 구조는 [프로젝트 폴더구조](https://github.com/miconblog/devcafe/blob/master/docs/directory-structure.md)를 참고한다.

#### 참고자료
 - http://www.joshfinnie.com/blog/reactjs-tutorial-part-1/
 - https://scotch.io/tutorials/build-a-real-time-twitter-stream-with-node-and-react-js
 - https://quickleft.com/blog/react-on-express-tutorial-the-twitter-timeline-game-part-1/
 - http://coenraets.org/blog/2014/12/employee-directory-sample-app-with-react-and-node-js/



## React + Flux 관련 문서
http://fluxxor.com/