# AWS에서 세션 스토어로 사용할 Redis 설정
로컬 환경에서는 그냥 레디스 서버 설치하고 뭐 이렇게 저렇게 했는데, AWS는 ElastiCache라고 해서 멤캐시와 레디스를 손쉽게 제공한다. 일단 가격이 t2.micro 가격을 확인해보니 시간당 $0.017불 한달로 계산해보니 가격이 후덜덜하다...

한달 720시간 * $0.017 = 12.24불 

## 설정하는 방법
AWS console > ElastiCache > Launch Cache Cluster 에서 레디스로 고른다음 Enable Replication 은 체크 해제한다. 테스트용이고 한대만 붙일꺼니까 자동으로 복제해주는 Replication 설정은 필요없다. 그리고 레디스 서버 한달로 계산하면 무지 비싸다. 연습할꺼 아니면 최소 사양으로 운영하다가 하나씩 늘리는게 좋다. 

인스턴스 생성이 끝났으면 Cache Clusters 메뉴에서 방금 생성한 Redis 서버에서  1 node 를 클릭하면 접속할수있는 Endpoint를 확인할수있다. 

여튼 결론! ElastiCache 너무 비싸서 그냥 EC2 서버에 때려박자! 나중에 사용자 많아지고 돈 많이 벌면 AWS로 가자. 

