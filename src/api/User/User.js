import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    posts: ({ id }) => prisma.user({ id }).posts(),
    following: ({ id }) => prisma.user({ id }).following(),
    followers: ({ id }) => prisma.user({ id }).followers(),
    likes: ({ id }) => prisma.user({ id }).likes(),
    comments: ({ id }) => prisma.user({ id }).comments(),
    rooms: ({ id }) => prisma.user({ id }).rooms(),
    postsCount: ({ id }) =>
      prisma
        .postsConnection({ where: { user: { id } } })
        .aggregate()
        .count(),
    followingCount: ({ id }) =>
      prisma
        .usersConnection({ where: { followers_some: { id } } })
        .aggregate()
        .count(),
    followersCount: ({ id }) =>
      prisma
        .usersConnection({ where: { following_none: { id } } })
        .aggregate()
        .count(),
    fullName: (parent) => {
      // 월래는(parent,__,{request{}) 였는데 하나만해도됨
      return `${parent.firstName} ${parent.lastName}`;
    }, // 이렇게 정의하면 여기뿐만아니라 모든곳에서 다쓸수있음
    //왜냐면 이게곧 schema로 들어가서 공유될것이기 때문이다!
    isFollowing: async (parent, _, { request }) => {
      const { user } = request;
      //여기서 user는 로그인한사람을 가리킨다!
      const { id: parentId } = parent; //parent 이름 변경 방법! 가져와서 변수붙임!
      //parent는 user에서 한단계 위의 사람이 누구인지 알고싶은것이다
      //즉 seeUser에서는 id가져오는사람이 parent고 me에서는
      //내가 (로그인한사람)parent이다!
      try {
        //처음껀 내아이디 두번째는 팔로우 아이디
        return prisma.$exists.user({
          AND: [
            //user가 가진속성중에서 (지금로그인한)
            {
              id: user.id, // 얘는 로그인한사람 아이디가 있고
            },
            {
              following_some: {
                id: parentId, //내가 팔로잉 하는 사람중 parentId(현재 찾는사람id)가 있는지
              }, //둘다 합격이면and에 의해 true!!
            },
          ],
        }); // 즉 지금 구경하고있는 사람이 로그인한사람의 팔로윙중에 있으면 true
        // false없으면
      } catch {
        return false;
      }
    },
    // 유저가 그를 팔로잉하는지 확인하고 싶다
    // 즉 UserProfile을 요청한 사람이 이 UserProfile을 팔로잉 했는가를 확인할려함
    isSelf: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return user.id === parentId;
      // parent와 request가 같으면
      // 내 프로필을 요청한다는거임
      // 즉 이츠미는 내로그인상태에서 다른유저 봤을때 itsme하면 false나옴
      //왜냐면 내가 아니니깐!
    },
  },
};
