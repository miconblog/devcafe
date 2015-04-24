## 코드 변경사항을 감지해서 서버를 재시작하고, 브라우저를 새로고침해주는 도구 비교
express 서버는 develop-server를 이용하고 클라이언트 코드는 browersync로 구성한다. 

#### 참고자료
 - http://www.slant.co/topics/1479/compare/~browsersync_vs_codekit_vs_livereload
 - https://github.com/narirou/gulp-develop-server



## 어떤 템플릿 엔진을 쓸 것인가?
React 컴포넌트를 생각한다면 jade 같이 HTML과는 동떨어진 템플릿 엔진을 쓰기 어렵다. 가급적 HTML을 그대로 유지할수있는 엔진과 그나마 좀 익숙한 엔진으로 선택하자. 당장 성능이 문제될것 같지는 않다! 결론, [handlebars](https://github.com/ericf/express-handlebars/)로 가자!

#### Handlebars 설정할때 겪었던 문제
 - 1. layout을 설정할때, layoutsDir을 지정해주지 않으면 node의 실행 폴더를 기준으로 layouts/ 폴더를 찾기 때문에 프로젝트 구조를 변경할경우 반드시 지정해야한다. 

 - 2. 템플릿 확장자를 변경할 경우엔 extname을 따로 지정한다. 기본값은 handlebars로 되어 있다.

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

## Express with React 관련 문서
쓸만한 express + react 제너레이터는 아직 없는듯, 좀 더 찾아보자 보자...

#### 참고자료
 - http://www.joshfinnie.com/blog/reactjs-tutorial-part-1/
 - https://scotch.io/tutorials/build-a-real-time-twitter-stream-with-node-and-react-js
 - https://quickleft.com/blog/react-on-express-tutorial-the-twitter-timeline-game-part-1/
 - http://coenraets.org/blog/2014/12/employee-directory-sample-app-with-react-and-node-js/



## React + Flux 관련 문서
http://fluxxor.com/