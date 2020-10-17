import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";

export default {
  Mutation: {
    confirmSecret: async (_, args) => {
      const { email, secret } = args;
      const user = await prisma.user({ email });
      if (user.loginSecret === secret) {
        // JWT
        await prisma.updateUser({
          where:{id: user.id}, 
          data:{loginSecret:""
          }// 로그인이 되면 지우고 싶음! 비밀코드를!
      })
        return generateToken(user.id);
        // 토큰을 아이디를 받아서 만든다!
      } else {
        throw Error("Wrong email/secret combination");
      }
    }
  }
};