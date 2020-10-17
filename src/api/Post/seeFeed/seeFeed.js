import { prisma } from "../../../../generated/prisma-client";

export default {
  // seeFeed는 결국 내가 팔로워 하는 사람들의 포스트를 같이 나열해 준다!
  Query: {
    seeFeed: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const following = await prisma.user({ id: user.id }).following();
      return prisma.posts({
        where: {
          user: {
            id_in: [...following.map(user => user.id), user.id] 
            //앞에꺼는 내가팔로잉 하는사람들 포스트 뒤에는 내꺼 포스트가져옴!
            // ...은 안에 속성 다가져오는것임! 
            //(map은 하나하나 모든어레이 만들어서 준다!)
          }
        },
        orderBy: "createdAt_DESC"
      });
    }
  }
};