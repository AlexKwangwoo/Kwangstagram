import { prisma } from "../../../../generated/prisma-client";

export default {
  Subscription: {
    newMessage: {
      subscribe: (_, args) => {//realtime기능넣기!! and조건에 맞을시 업데이트!
        const { roomId } = args;
        return prisma.$subscribe.message({
          AND: [
            { mutation_in: "CREATED" },
            {
              node: {
                room: { id: roomId }
              }
            }
          ]
        }).node();//node를 받아와야 roomid까지 받아올수있다! 그래야 playground
        //에서 실시간으로 받아볼수있음!
      },
      resolve: payload => payload //resolve는 payload를 리턴한다
      // 더많은것을 바꿀수도 있음!
      // 의미는 new message가 변경 됬다는거임!
    }
  }
};