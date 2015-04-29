## 2015-04-29
 - DB ORM 적용을 위해 sequelize + mysql 추가
  ㅡ 로컬에 mysql 서버가 미리 설치되어 있어야함. 
  - 설치후 아래 명령 실행해서 사용할 유저와 데이터 베이스 미리 생성해 둘것!
```     
     $> mysql -uroot database-create.sql 
```

## 2015-04-28
 - 서버 및 클라이언트 디렉토리 구조 개선 
 - 서버 세션 데이터 관리를 위해 Redis 세션 추가

## 2015-04-27
 - 회의록 정리 및 문서 정리

#### 첫 정기 미팅 정리
 - 점심먹으며 간단히 자기 소개 및 현황 공유
 - browerify와 webpack에 대한 자료 공유 by 현동
 - 현재까지 커밋된 내용 리뷰 by 병대 
 - 정기 행아웃 미팅을 하자! (이번주는 금요일 오후 10시 )
 - 채팅창은 단체 카톡으로 (카톡방 생성 완료)
 - MVP 버전은 심플하게 페이지 기반으로 만들자. (Flux 패턴이나 React-Route 같은 클라이언트 라우팅은 일단 보류!)

#### 이번주 목표
 - 성묵, 병대: DB 스카마 고민
 - 민중: 이메일 인증, Nodemail, Parse.com 
 - 현동: Github 인증
 - 이번주 금요일 10시 행아웃 미팅

#### MVP 버전
 - 회사 메일로 회원 인증
 - 게시판 & 댓글
 - 간단한 스킨


## 2015-04-26
 - gulp 테스크 정리 (require-dir 모듈을 이용해 태스크별로 파일 분리)
 - React를 클라이언트에서도 사용하기 위해 browserify 적용
  - 파일이 변경되면 build를 진행해서 모든 react compoment를 bundle.js로 컴파일해준다.
 - React에 ES6 문법을 적용하기 위해 babelify 적용 
 - 서버에서 렌더링한 React 컴포넌트와 클라이언트 렌더링을 싱크하기 위해 트릭이 좀 필요함. [정리 문서 참고](https://github.com/miconblog/devcafe/blob/master/docs/reference.md)

## 2015-04-24
 - express application generator로 서버 코드 생성
 - 서버 시작 코드(app.js)는 server.js로 변경
 - 개발환경 설정을 위한 gulp task 설정: develop-server, browser-sync 적용
 - React 컴포넌트 적용
 - 서버사이드 템플릿 Jade에서 handlebars로 교체


## 2015-04-21
 - MVP 개발을 위한 범위와 개발 스택 자료 조사
 - 라우터와 모델링 대충 끄적임.

프로젝트 오계명 작성중. 
 - 취미로 하는 거니까 매일 조금식 꾸준히 만들자! 급하게 만들 필요없다. 
 - 그렇다고 너무 처음부터 끝까지 다 만들지말고 있는거 검색해서 잘 활용하자!
 - 충분히 얘기하고 문서 만들고 리뷰하자. 
 - 오프라인이 안되면 온라인 행아웃으로 하자. 
 - 행아웃 내용은 녹화떠서 다른 기여자를 위해 남기자. 

### 라우터 

| 이름        | 메소드 | 내용        | 
| ----------- | ------ | ----        |
| /           | GET    | 루트        | 
| /signin     | GET    | 로그인      |
| /signup     | GET    | 회원가입    | 
| /admin      | GET    | 관리자      |
| /board /:id | GET    |             |
| /boards/    |        |             |

### 모델링
 - 게시판 (Board, MVP)
| 아이디 | 이름 |
| ---- | --- |
| id | name | 
|  | vchar(256) | 

 - 글 (Post, MVP)

| 아이디 | 제목  | 내용    | 작성자 | 작성일     | 최종수정일 | 조회수     | 좋아요     | 댓글수 |
| ------ | ----  | ------  | ------ | ---------- | ------     | ------     | ------     | ------------- |
| id     | title | content | writer | created_at | updated_at | read_count | like_count | comment_count |
|        | vchar(256) | text | vchar(80) | datetime | datetime | int | int | int |

 - 댓글 (Comment, MVP): 수정기능은 없다. 

| 아이디 | 부모 아이디 | 댓글    | 작성자 | 작성일     | 
| -------|-------------|------   |--------|-------     |
| id     | post_id     | comment | writer | created_at |
|        |             | text  | vchar(80) | datetime |

 - 공유 방식 (Not MVP)
  SNS나 메신저로 글을 공유하면 https://url/router/hashcode 이런 URL의 Agent를 확인해서 
  - 웹에서 접근하면 Facebook 페이지로 보내고, 
  - 앱에서 접근했다면 앱링크로 앱을 열어주고, 앱이 없다면 스토어로 보낸다.
