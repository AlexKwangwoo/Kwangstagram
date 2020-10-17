import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    follow: async (_, args, { request }) => {
      isAuthenticated(request);
      const { id } = args;
      const { user } = request;
      try {
        await prisma.updateUser({
          where: { id: user.id },//이아이디는 업데이트 할아이디 즉 접속한사람
          data: {
            following: {
              connect: {
                id// 여기 아이디는 인자로 받는아이디(팔로우할사람)
              }
            }
          }
        });
        return true;
      } catch {
        return false;
      }
    }
  }
};