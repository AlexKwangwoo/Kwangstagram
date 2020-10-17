import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeUser: async (_, args) => {
      const { id } = args;
      const user = await prisma.user({id}) //이건 id : id이다! 위의 아이디!
      const posts = await prisma.user({id}).posts(); 
      // user의 아이디 받아서 user내용과 post내용을 return함
      return {
        user,
        posts
      }
    }
  }
};