## Gulp 빌드시 자꾸 'Port 3000 is already in use'가 뜨는 이유
특별한 문제가 없는데 자꾸 Port 에러가 나는 이유는 gulp-develop-server 모듈 때문이다. 이 모듈은 노드 서버를 띄우거나 재시작해주는 빌드 모듈인데 만약 빌드 과정에서 감시하고 있던 파일이 변경이 되면서 이 모듈에게 노드 서버를 재시작하라고 명령을 하게 되면 노드 서버를 재시작하게 되는데 이때 처음 노드서버가 초기화를 거치면서 실행이 완료되지 않으면 이런 현상이 발생한다. 따라서 이런 문제를 회피하기 위해서는 노드 서버의 최소 시작시 개발서버 옵션에 초기화 과정이 오래걸리니까 이시간까지는 보장해줘라! 라는 delay옵션을 주면된다. 기본값은 600ms 로 설정되어 있다.

## Express에서 라우팅 로직의 위치
일반적으로 Express에서 라우팅 모듈은 에러처리를 제외하면 미들웨어의 가장 마지막에 배치하게 된다. 때에 따라서 잘못된 요청이나 공격들을 회피하기 위해 라우터 모듈 앞딴에 필터를 추가하는 경우가 있는데 조심해야한다. 예를 들어 세션값에 로그인 정보가 없는 경우 일반적인 라우터 모듈 앞딴에서 세션값만 보고 로그인 페이지로 리다이렉션 할수도 있다. 
하지만 이렇게 라우팅 모듈 앞딴에서 다른 페이지로 이동시킬 경우 Ajax와 같은 REST API가 중간에 필터링 되면서 302 에러를 내기도한다. 
따라서 라우팅 로직은 최종적으로 라우터 모듈이 알아서 핸들링하도록 미리 터치하지 말자. 안그럼 죄다 꼬이는 수가 생긴다.


## Sequelize로 모델링하다가 foreign key constraint 에러가 발생하는 이유
일단 모델 간에 관계가 특별한 문제가 없다는 가정하에 의심해야하는 부분은 실제 테이블이 생성되지 않아 제약조건에 걸리는 경우다. nodejs로 데이터 베이스 작업을 하는 경우엔 비동기로 이루어지기 때문에 실제 테이블이 생성되지 않는 상태에 삽입을 하거나 테이블이 생성되지 없는 상태에서 제약조건에 걸리는 경우가 있다. 

따라서 반드시 테이블 생성이 모두 끝난 후에 변경작업이 이루어져야한다.

## Flux 패턴
 1. Dispatcher는 Action과 Store를 연결해주는 브릿지 역할로써 싱글톤으로 작성된다. 
 2. ActionCreator는 헬퍼 객체로써 View에서 Dispatcher를 호출할수있도록 메소드를 정의한다.   (이 부분이 좀 귀찮다.)
   즉, View에서 액션헬퍼 메소드를 호출하면 디스패처에서 이벤트가 발생한다.
 3. 디스패처에서 발생한 이벤트를 Store가 감지하기 위해서 Store의 이벤트 변경 콜백을 Dispatcher의 리스너로 등록하는 과정이 필요하다. (바로 이부분이 노가다로 엄청 귀찮은 작업이다!!) 

## Fluxxor
Flux 패턴에서 디스패처에 이벤트를 등록하는 귀찮은 작업들을 자동으로 해주는 React 확장 라이브러리 

 1. Fluxxor는 React Compoment의 mixins 기능을 이용해 기존에 귀찮았던 작업들을 자동으로 해준다. 
 -  mixins을 통해 스토어는 변경은 디스패처의 리스너로 등록되고, 컴포넌트에 state 값을 쉽게 설정하도록  this.getStateFromFlux() 함수를 추가해준다. 
 - 그리고 컴포넌트 프로퍼티(props)로 주입 받은 flux 인스턴스를 반환하는 this.getFlux() 함수도 추가해준다.  
 2. FullStack 구조에서는 Fluxxor로 구성한 스토어와 액션도 컴포넌트를 초기화 할때  받드시 인자로 넣어줘야한다. ex) <App flux={flux} >
 - 즉, 클라이언트 코드 뿐만아니라 서버딴 소스에서도 추가해줘야함을 의미한다.


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