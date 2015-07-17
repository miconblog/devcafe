# 네이밍 컨벤션
## 파일 및 폴더명
모든 파일 명은 snake_case로 작성한다. snake-case로 작성한 경우 더블 클릭으로 단어를 한번에 잡을수없는 불편함이 있다. 따라서 언더스코어를 이용한 snake_case를 사용한다.


## 데이타베이스
Windows와 OSX를 쓰는 경우엔 대소문자를 구분하지 않지만 리눅스에서는 대소문자를 구분하기 때문에 테이블을 덤프떠서 다른 운영체제에 이식할때 문제가 발생할수있다. 따라서 이런 문제를 사전에 없애기 위해서는 snake_case를 쓰는게 답이다. 

- 테이블명과 컬럼명은 모두 소문자와 언더스코어를 이용해 작성한다.
- table_name, colum_name 
- JS 에서는 snake_case 대신 camelCase를 쓰기 때문에 혼란스러울수있다.
- 따라서 ORM 모듈 딴에서 camelCase와 snake_case를 적절히 커버해주는 getter와 setter를 추가해준다
- 즉, 모델 파일을 제외하고는 모두 camelCase를 가정하고 코딩한다. 

#### 관련 레퍼런스
- http://dev.mysql.com/doc/refman/5.1/en/identifier-case-sensitivity.html
- http://smyck.net/2011/06/21/camel-case-in-mysql-table-names-is-a-bad-idea/

