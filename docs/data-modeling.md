## 라우팅 테이블 

| 이름 | 메소드 | 내용 | 
| --- | --- | --- |
| /           | GET | 루트 | 
| /signin     | GET | 로그인 |
| /signup     | GET | 회원가입 | 
| /admin      | GET | 관리자 |
| /boards/    | GET | 게시판 목록 |
| /boards/:id | GET | 특정 게시판의 게시글 목록 |
| /boards/:id | POST | 특정 게시판에 게시글 작성 |
| /boards/:id | PUT | 특정 게시판에 게시글 수정 |
| /boards/:id | DELETE | 특정 게시판에 게시글 삭제 |

# 데이터 베이스 모델링
테이블의 필드명은 snake_case가 아닌 *camelCase*로 지정한다. camelCase로 지정하는 특별한 이유는 없고 ORM 디폴트 값이 camelCase 다.

## 사용자 모델 (User, MVP)

| 이름 | 패스워드(암호화) | 암호화키 | 이메일 | 이메일확인 | 외부 연동 인증 데이터 | 가입일 | 수정일 |
| --- | --- | --- | --- | --- | --- | --- | --- | 
| name | hashedPassword | salt | email | emailVerified | authData | createdAt(자동생성) | updatedAt(자동생성) |
| STRING | STRING | STRING | STRING | BOOLEAN | TEXT | DATE | DATE |

## 게시판 모델 (Board, MVP)
 - 게시판은 접근이 가능한 그룹별로 여러개 생길수있다. 
  1. 모두의 공간
  2. 회사별 게시판
  3. 웜홀 게시판 (일정 기간만 생성후 사라짐)
 
 - 관계: 게시판은 여러개의 글을 가질수있다.
  - Board.hasMany(Post) -> boardId가 Post에 삽입된다. 

| 대표이름(영문주소) | 게시판이름 | 
| --- | --- |
| id | name |
| STRING, Unique | STRING |

## 포스트 모델 (Post, MVP)
 - 관계1: 포스트를 작성하는 사람이 포스트를 소유한다.
  - Post.belongsTo(User, {as:writer}) -> writerId가 Post 에 추가됨.

| 제목 | 내용 | 게시판[FK] | 작성자[FK] | 작성일(자동생성) | 수정일(자동생성) | 조회수 | 좋아요 | 댓글수 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| title | content | boardId | writerId | createdAt | updatedAt | read_count | like_count | comment_count |
| STRING | TEXT | N/A | N/A | DATE | DATE | INTEGER | INTEGER | INTEGER |

## 댓글 모델 (Comment, MVP)
 - 관계1: 댓글을 쓴 사람이 댓글을 소유한다.
  - Comment.belongsTo(User, {as:writer}) -> writeId가 Comment에 삽입됨. 
 - 관계2: 댓글은 포스트에 소속된다. 
  - Comment.belongsTo(Post) -> postId가 Comment에 삽입됨.

| 댓글 | 작성자[FK] | 소속 포스트[FK] | 작성일 |
| --- | --- | --- |
| comment | writerId | postId | created_at |
| TEXT | N/A | N/A | DATE |


#### 참고링크
http://docs.sequelizejs.com/en/latest/docs/associations/


 - 공유 방식 (Not MVP)
  SNS나 메신저로 글을 공유하면 https://url/router/hashcode 이런 URL의 Agent를 확인해서 
  - 웹에서 접근하면 Facebook 페이지로 보내고, 
  - 앱에서 접근했다면 앱링크로 앱을 열어주고, 앱이 없다면 스토어로 보낸다.
