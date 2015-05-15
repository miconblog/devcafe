## 가끔씩 터미널에서 gulp로 서버가 재시작 되지 않는 경우 해결방법
개발중에 간혹 gulp 명령을 통해 서버를 죽였다가 다시 띄울때 동일한 포트가 열려있다면 뜨지 않는 경우가 있는데, 원인은 아직 파악이 안됐으나 간혹 Ctrl+C 키를 눌러 노드 서버를 종료시킬때 서버가 제대로 안죽는 경우가 있다. 이럴때는 먼저 3000번 포트가 열려있는지 부터 확인한다. 

```
    $> lsof -iTCP:3000        // TCP 3000번 포트가 열려있는지 확인
    
    COMMAND  PID USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
    node    1085  mic   14u  IPv6 0x406ecd4bc4e02685      0t0  TCP *:hbci (LISTEN)
```

위처럼 3000번 포트를 사용하는 노드가 아직도 살아 있는 경우 죽이면 된다. 

```
    $> kill -9 1085           // PID가 1085인 프로세스 죽이기 
```


## Redis에 Session을 저장하고 저장된 세션 값을 확인하는 방법
일단 Redis 서버에 Session 을 저장하기 위해서는 다음과 같이 세션을 만들고 store를 Redis로 지정해야한다.

```
    var session = require('express-session');
    var RedisStore = require('connect-redis')(session);

    ... 중략 ... 

    app.use(session({ 
      secret: 'devcafe', 
      store : new RedisStore({
        ttl: 30 * 60              // 60초 * 30 = 30분 
      }),
      saveUninitialized: true,
      resave: true
    }));
```
이렇게 세션을 만들면, req.session 객체를 사용할수있게 되고 여기에 Key-Value 쌍으로 어떤 값이는 설정할수있게 된다. 그리고 req.session.save() 함수를 이용해 Redis 서버에 저장한다. 저장된 값을 실제로 확인해보기 위해서 redis-cli를 이용한다.

```
    $> redis-cli                <--- Redis 서버에 접속
    
    127.0.0.1:6379> KEYS *      <--- 서버에 저장된 키값을 확인해보자.
     1) "group:cid:1:privileges:groups:topics:reply"
     2) "group:cid:2:privileges:groups:find"
     3) "plugins:active"
     4) "ip:recent"
     5) "uid:1:followed_tids"
     6) "group:cid:4:privileges:groups:topics:create"
     7) "analytics:pageviews:mo

     ... 중략 ...

```
KEYS * 명령은 실제로 저장된 모든 키값들을 보여준다. express-session을 통해 저장된 녀석들은 *sess:세션아이디* 형태로 저장되기 때문에 다음과 같이 KEYS 명령을 통해 저장된 세션을 찾아볼수 있다. 

```
    127.0.0.1:6379> keys sess:*    <---- 대소문자를 가리지 않는다.
    1) "sess:X77EVZhfyfzlEp7JNcWz_4N4L78GZbbH"
    2) "sess:0marx5NWNBTGKVPzPG_Ro0Cse39V3DVp"
     ... 중략 ...

```
마지막으로 해당 세션이 저장된 값은 get 명령을 이용한다. 
```
    127.0.0.1:6379> get sess:X77EVZhfyfzlEp7JNcWz_4N4L78GZbbH    <--- 정확한 키값을 입력한다.
    "{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}"
```
참고로 위에서 ttl 값이 30분이기 때문에 30분이 지나면 자동으로 해당 세션값이 redis에서 삭제된다. 

#### 참고자료
 - http://lzone.de/cheat-sheet/Redis
 - https://github.com/tj/connect-redis


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

## React 컴포넌트를 서버와 클라이언트에서 동시에 사용하기 위한 트릭!
React 컴포넌트는 기본적으로 클라이언트에서 렌더링 된다는 전제로 만들어졌다. 즉, 앵귤러처럼 자바스크립트 코드를 클라이언트가 내려받은 후에 데이터를 입혀서 화면을 다시 갱신하는 방식이다. 하지만 이런 방식은 서버에서 동일한 마크업을 내려주지 않으면 화면 깜빡임을 겪을수 밖에 없다. 그리고 같은 마크업이라 하더라도 사실상 최소 1회는 클라이언트에서 다시 랜더링하는 단점이 있다.  

이런 단점을 극복하고자 React는 같은 컴포너트 코드를 이용해 서버에서도 동일하게 랜더링 할수있게 만들어졌다. 이렇게 서버에서 미리 랜더링하게 되면 클라이언트는 내부적으로 checksum 데이터를 이용해 서버에서 내려준 마크업과 클라이언트에서 생성한 마크업(virtual-dom으로 메모리에 그려놓은 데이터)이 같으면 화면을 갱신하지 않는다.

아무튼 위와 같은 효과를 누리려면 아래와 같은 지식을 바탕으로 사전작업이 필요하다. 

서버 렌더링(SSR, Server Side Rendering 이라고 부르기도함)은 클라이언트 랜더링과 다르게 ComponentDidMount 같은 라이프 사이클 콜백이 호출되지 않는다. 그리고 state도 감지하지 못한다. 생각해봐라 서버에서 내려주는 마크업이나 자바스크립트는 서버에서 동작하는 거지 브라우저안에서 동작하는게 아니다. 즉, 서버는 한번 내려주면 끝이기 때문에 생각해보면 당연하다.
따라서 서버에서 컴포넌트를 내려줄때 어떤 상태값을 가지고 렌더링 했다면 클라이언트도 당연히 이 초기에 설정된 상태값을 알고 있어야 똑같은 화면을 그릴수 있게 된다. 이 말은 즉 서버와 클라이언트는 각자 독립적으로 컴포넌트를 초기화 한다는 얘기다. 때문에 클라이언트는 서버에서 어떤 값으로 컴포넌트를 초기화 했는지 알아야하고, 반대로 서버는 반드시 어떤 값으로 초기화 했는지 그 값을 클라이언트에게 알려줘야한다. 
그럼 어떻게 알려줄수있을까? 쉽다. 그냥 아래와 같이 JSON 데이터로 클라이언트에 내려주면 된다.

```
// 서버 라우터 코드
var syncProps = { title: 'Express!!!' };
var markup = React.renderToString(
  ReactComponent(syncProps)
);
res.render('home', { 
  markup: markup,
  props : safeStringify(syncProps)
});

// 서버 레이아웃 템플릿
<body>
  {{{ body }}}
  <script id="props" type="application/json">{{{ props }}}</script>
  <script type="text/javascript" src="js/bundle.js"></script>
</body>


// 클라이언트 코드 (in bundle.js)
var props = JSON.parse(document.getElementById("props").innerHTML);

React.render(ReactComponent(props), document.getElementById('main'));

```

#### 참고문서
 - http://www.crmarsh.com/react-ssr/

## package.json에 있는 tilde(~)과 caret(^)의 차이
npm update 명령어 수행시 모듈을 업데이트 할수있는데 아래와 같은 방식으로 업데이트 된다.
물결(~)은 최신 패치 버전 1.2.x
꺽쇠(^)는 최신 마이너 버전 1.x.x

메이저 버전 업데이트는 많은 변동이 있으므로 수동으로 해야함. 

#### 참고 문서
http://fredkschott.com/post/2014/02/npm-no-longer-defaults-to-tildes/


## React + Flux 관련 문서
http://fluxxor.com/