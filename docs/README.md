# 개발 시작하기

### How to install & develop
로컬에 MySQL과 Redis 서버가 실행되어 있어야한다. 본인의 개발환경이 맥(Mac) 환경이라면 HomeBrew(http://brew.sh/index_ko.html)를 이용해 MySQL이나 Redis를 설치하자. 단 HomeBrew 설치는 알아서 하시라. 여기서는 따로 설명하지 않는다. 그리고 자바스크립트 빌드 도구인 [Gulpjs](http://gulpjs.com/)도 미리 설치되어 있음을 가정한다. 

```
    $> brew install mysql // brew가 없다면 HomeBrew 부터 설치부터하자!
    $> mysql.server start // 위에서 mysql 설치후 서버 실행

    $> brew install redis //
    $> redis-server       // 서버 실행. 서비스 실행은 google 참고. 위의 mysql 과 redis 는 로컬 설치 없이도 가능하게 해야 개발할 때 편할듯합니다. 
    
    .. 소스코드를 체크아웃(혹은 클론) 받고 프로젝트 폴더로 이동한다..

    $> mysql -uroot < database-init.sql // MySQL 서버에 사용할 dev 유저와 devcafe 데이터 베이스를 생성한다.
    $> npm install        // 노드 팩키지 설치
    $> gulp seeds         // 샘플 데이터 생성한다. 
    $> gulp               
```

### 커밋 규칙
 1. 가급적 한글로 적는다. 
 2. 커맨트의 첫번재 라인은 수정한 내용이 어떤 내용인지 한줄로 요약해 적는다. 
 3. GitHub에 정식으로 등록된 이슈와 관련된 내용이 있다면 해쉬(#)로 해당 이슈 번호를 태깅한다. ex) #6 
 4. 커맨트의 두번째 라인은 비워둔다.
 5. 커맨트 세번째 라인은 자유롭게 추가하고 싶은 내용을 적는다. 
  - 예시)
    ```
     #123 수정한 코드가 어떤 내용인지 한줄 요약
     
     한줄로 설명하기 어렵다면 여기서 부터 추가로 작성하면 된다. GitHub에 태깅하고 싶은 내용이 있다면 해쉬(#NUMBER) 태깅한다. 
    ```

## 문서 목록
 1. [서버 구성 구조](https://github.com/miconblog/devcafe/blob/master/docs/infra-structure.md)
 2. [디렉토리 폴더 구조](https://github.com/miconblog/devcafe/blob/master/docs/directory-structure.md)
 3. [데이터 모델링](https://github.com/miconblog/devcafe/blob/master/docs/data-modeling.md)
 4. [참고자료](https://github.com/miconblog/devcafe/blob/master/docs/reference.md): 자료조사한 내용이나 개발중에 고민한 내용들을 정리


