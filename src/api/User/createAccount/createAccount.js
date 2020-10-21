import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    //뮤테이션중 createAccount이름을 빌려 함수를 정의함.. 실제로 만들떄는
    // 밑에의 prisma.createUser와 같은 이미 정의된 함수를 써서 알려줘야함!
    createAccount: async (_, args) => {
      const { username, email, firstName = "", lastName = "", bio = "" } = args;
      const exists = await prisma.$exists.user({
        OR: [
          {
            username,
          },
          { email },
        ], //이메일과 유저네임이 있는지 확인!
      });
      if (exists) {
        throw Error("This username / email is already taken");
      }
      await prisma.createUser({
        // 프리즈마에 이미정의된 내용임!
        username,
        email,
        firstName,
        lastName,
        bio,
      });
      return true;
    },
  },
};
