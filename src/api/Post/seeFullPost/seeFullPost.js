import { prisma } from "../../../../generated/prisma-client";
import { COMMENT_FRAGMENT, FULL_POST_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    seeFullPost: async (_, args) => {
      const { id } = args;
      return prisma.post({ id }).$fragment(FULL_POST_FRAGMENT);
      // const comments = await prisma
      //   .post({ id })
      //   .comments()
      //   .$fragment(COMMENT_FRAGMENT);
      // const likeCount = await prisma
      //   .likesConnection({//이건 그냥 프리즈마 속성이다! 카운트세는!
      //     where: { post: { id } }
      //   })
      //   .aggregate()
      //   .count();
      // const files = await prisma.post({ id }).files();
      // const user = await prisma.post({ id }).user();
      // return {
      //   post,
        // comments,
        // likeCount,
        // files,
        // user
      // };
    }
  }
};