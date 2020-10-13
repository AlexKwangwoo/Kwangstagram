import { generateSecret } from "../../../utils";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    requestSecret: async (_, args) => {
      const { email } = args;
      const loginSecret = generateSecret();
      try {
        await prisma.updateUser({ data: { loginSecret }, where: { email } });
        return true; // loginSecret은 loginSecret:loginSecret이다!
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
};