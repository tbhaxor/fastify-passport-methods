import { PrismaClient } from "../generated/prisma-client-js";
import { Strategy } from "passport-totp";
import thirtyTwo from "thirty-two";

const db = new PrismaClient();

export default new Strategy({ codeField: "token" }, async (user, done) => {
  const totp = await db.tOTPKey.findFirst({ where: { userId: user.id } });
  return done(null, thirtyTwo.decode(totp.key).toString());
});
