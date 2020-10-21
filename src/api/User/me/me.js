import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    me: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      return await prisma.user({ id: user.id }); //prisma.user는 User을 리턴함!
      //여기서 리턴을 user로 해줘서
      //프론트앤드에서 header쪽 me에서 user 입력없이 바로 username 이 가능함!
    },
  },
};
