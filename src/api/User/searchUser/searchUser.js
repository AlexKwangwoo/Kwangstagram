import { prisma } from "../../../../generated/prisma-client";

export default {//여기선 사용자 인증이 필요없음!
  Query: {
    searchUser: async (_, args) =>
      prisma.users({// prisma에서 user를 가져와 이름에 의해 찾음!
        where: {
          OR: [
            { username_contains: args.term },//뭘로 찾을지..
            { firstName_contains: args.term },
            { lastName_contains: args.term }
          ]
        }
      })
  }
};