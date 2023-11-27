import dotenv from "dotenv";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaClient } from "../generated/prisma-client-js";

dotenv.config();

const db = new PrismaClient();

export default new Strategy(
  {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    algorithms: ["HS256"],
    ignoreExpiration: false,
  },
  /** @type {import("passport-jwt").VerifyCallback} */
  async (payload, done) => {
    if (!payload.sub) {
      return done(new Error("User ID is not provided"), null);
    }
    const user = await db.user.findFirst({ where: { id: payload.sub } });
    if (!user) {
      return done(new Error("User not found"), null);
    }
    return done(null, user);
  },
);
