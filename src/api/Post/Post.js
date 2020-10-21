import { prisma } from "../../../generated/prisma-client";

export default {
  Post: {
    files: ({ id }) => prisma.post({ id }).files(),
    comments: ({ id }) => prisma.post({ id }).comments(),
    user: ({ id }) => prisma.post({ id }).user(),
    likes: ({ id }) => prisma.post({ id }).likes(),
    isLiked: async (parent, _, { request }) => {
      //내가 포스트 좋아요눌렀는지 확인!
      const { user } = request;
      console.log(user);
      const { id } = parent;
      console.log(parent);
      return prisma.$exists.like({
        //true or false로 반환!
        AND: [
          //즉 like가 가지고 있는 속성이 user가 있고 post가 있는데
          //prisma 가서 확인해보면 나옴!
          //유저아이디가 지금접속한 사람이랑 같고
          //라이크가 속한 포스터자체의 아이디가 있으면 true임!
          {
            user: {
              id: user.id,
            },
          },
          {
            post: {
              id,
            },
          },
        ],
      });
    },
    likeCount: (parent) =>
      prisma
        .likesConnection({
          where: { post: { id: parent.id } },
        })
        .aggregate()
        .count(),
    commentCount: (parent) =>
      prisma
        .commentsConnection({
          where: { post: { id: parent.id } },
        })
        .aggregate()
        .count(),
  },
};
