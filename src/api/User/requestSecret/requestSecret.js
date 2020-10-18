import { generateSecret, sendSecretMail } from "../../../utils";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    requestSecret: async (_, args, { request }) => {
      const { email } = args;
      const loginSecret = generateSecret();
      // throw Error("kalala");
      try {
        // throw Error();
        await sendSecretMail(email, loginSecret);
        await prisma.updateUser({ data: { loginSecret }, where: { email } });
        return true; // loginSecret은 loginSecret:loginSecret이다!
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};
