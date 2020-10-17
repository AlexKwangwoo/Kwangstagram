import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    unfollow: async (_, args, { request }) => {
      isAuthenticated(request);
      const { id } = args;
      const { user } = request;
      try {
        await prisma.updateUser({
          where: { id: user.id },
          data: {
            following: {
              disconnect: {//추가할땐 connect 없앨땐 disconnect!
                id
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