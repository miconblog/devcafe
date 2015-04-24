## 2015-04-24
 - express application generator로 서버 코드 생성
 - 서버 시작 코드(app.js)는 server.js로 변경
 - 개발환경 설정을 위한 gulp task 설정: develop-server, browser-sync 적용


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
 || 이름        | 메소드 | 내용 || 
 | /           | GET  | 루트 | 
 | /signin     | GET  | 로그인 |
 | /signup     | GET  | 회원가입 | 
 | /admin      | GET  | 관리자 |
 | /board /:id | GET  |
 | /boards/    |      |

### 모델링
 - 게시판 (Board, MVP)
  || id | name || 

 - 글 (Post, MVP)
  || id | title | content | writer | created_at | updated_at | read_count | like_count | comment_count ||
  | 아이디 | 제목 | 작성자 | 작성일 | 최종수정일 | 조회수 | 좋아요 | 댓글수 |

 - 댓글 (Comment, MVP): 수정기능은 없다. 
  || id | post_id | comment | writer | created_at ||
  | 아이디 | 부모 아이디 | 댓글 | 작성자 | 작성일

 - 공유 방식 (Not MVP)
  SNS나 메신저로 글을 공유하면 https://url/router/hashcode 이런 URL의 Agent를 확인해서 
  - 웹에서 접근하면 Facebook 페이지로 보내고, 
  - 앱에서 접근했다면 앱링크로 앱을 열어주고, 앱이 없다면 스토어로 보낸다.
