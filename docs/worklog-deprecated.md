## 2015-06-19
 - 댓글 CRD를 Flux 패턴으로 리팩토링

## 2015-06-16
 - 코멘트 CRD 구현

## 2015-06-10
 - 헤더 디자인 적용
 - 사용자 이름, 이메일 변경 뼈대 구현(이메일 인증은 여러 이메일을 허용할 것인지 여부가 결정되면 구현할 예정)

## 2015-06-09
 - React 랜더링 작업을 미들웨어로 만들어 라우터의 맨 마지막에 꼽아 넣음.
 - 비슷한 코드가 많았던 서버 페이지를 하나로 통일함.
 - 서버 페이지 부분 삽입(partials)형태로 헤더 분리 

## 2015-06-06
 - 관리자 패이지 추가
 - 글을 읽은 유저 테이블인 read_user 생성 및 조회수 기능 추가 
 - 글 목록 페이지 적용
 
## 2015-06-03
 - 비밀번호 변경 페이지 작성. 
  - 인증코드를 통해 이메일 인증후 바로 비밀번호 변경을 해야한다. 
  - 때로는 비밀번호 만료기간이 되어 시스템이 자동으로 업데이트 할수도 있다. (회원정보에 lastPassUpdated 필드를 추가하면 가능하다.)
  - 때로는 직접 프로필 페이지에서 비밀번호 변경페이지로 이동하기를 원할때도 있다. 

#### TODO 
 - 비밀번호 유효값 설정이 필요하다. 예) 6자리 이상 특수문자 포함

## 2015-05-25
 - 게시판 글쓰기 기능 추가

## 2015-05-21
 - 게시판 목록에서 상세 게시글을 볼수있도록 상세 페이지 추가
 - Admin 페이지 추가

## 2015-05-19
 - 게시판 모델링 변경 
 - 로그인하면 접근 가능한 게시판 목록을 볼수있도록 수정

## 2015-05-18
 - 회원 생성시 인증을 위한 신규 이슈 Github에 등록
 - 디렉토리 구조 개선 및 문서 정리
 - Github 라벨 정리
 - User 모델을 Member 모델로 변경 

## 2015-05-15
 - React 클라이언트 랜더링 테스트를 위한 TODO 앱 추가 및 불필요한 파일 제거 혹은 리팩토링
 - Flux와 Fluxxor에 대한 이해를 위해 간단한 문서 정리

## 2015-05-14
 - 현재까지 커밋된 내용을 중심으로 코드 리뷰 진행함.

## 2015-05-13
 - Redis 서버에서 저장된 세션값 가져오는 방법 문서로 정리
 - 페이지 플로우 정리중
 - TODO
  1. 패스워드 변경 페이지 만들기

## 2015-05-12
 - 간단한 로그인 기능 추가
    1. 인증된 사용자를 redis 세션에 저장한다.
    2. 로그아웃하면 Redis 세션에서 인증정보를 제거한다.

## 2015-05-11
 - 회원가입시 인증 메일을 보내주는 기능 추가

## 2015-05-08
 - SEED DB는 gulp 빌드시에 진행하는 방식으로 변경 
 - Flux 패턴을 좀더 쉽게 쓰기위해 [Fluxxor](http://fluxxor.com) 검토 해보니 확실히 쓰기 쉬웠음. 곧 fluxxor를 적용할 예정임. 
 - 회원가입 플로우
  - 회사 이메일로 가입신청 -> 이메일로 받은 인증 URL을 클릭 -> 인증 완료후 패스워드 설정 페이지로 이동
  - 추후 이메일 인증은 Parse.com을 활용. 


## 2015-05-07
 - 서버 라우팅을 위해 하나의 App 컴포런트를 페이지별로 분리
 - 분리 해놓고 보니 역시나 클라이언트 랜더링을 하기위해서는 페이지별로 코드를 컴파일해야하는 귀찮음이 존재함.

## 2015-05-04
 - 포스트(Post)와 댓글(Comment) 모델 수정
 - 테스트용 씨드 데이터에 관계 데이터 추가 --> 나중에 씨드에서 관계 모델로 변경 예정

## 2015-05-03
 - React 렌더링 모듈(pipe-render-react)을 없애고 라우터 모듈 안에서 랜더링 후 요청 파라메터(req)에 넣어주는 형태로 변경
 - 게시판(Board)과 포스트(Post) 모델 및 관련 샘플 라우터 페이지 추가

## 2015-05-01
 - 게시판 모델링중

## 2015-04-30
 - 데이터 모델링 문서 추가

## 2015-04-29
 - DB ORM 적용을 위해 sequelize + mysql 추가
  - 로컬에 mysql 서버가 미리 설치되어 있어야함. 
  - 설치후 아래 명령 실행해서 사용할 유저와 데이터 베이스 미리 생성해 둘것!
```     
     $> mysql -uroot < database-init.sql 
```
  - 유저 모델링 및 패스워드 암호화 적용
  - 데이터베이스 테스트를 위한 seed 데이터 추가 (나중에 제거하거나 개발 모드에서만 동작하도록 코드 변경 필요)

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