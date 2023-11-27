import { PrismaClient } from "../generated/prisma-client-js";
import bcrypt from "bcrypt";
import * as uuid from "uuid";

const db = new PrismaClient();

/**
 *
 * @param {string} token
 * @param {import("passport").DoneCallback} done
 * @returns
 */
export async function handleTokenLogin(token, done) {
  if (!token) {
    return done(new Error("Provide the authentication token"), null);
  }

  const user = await db.user.findFirst({ where: { token } });
  if (!user) {
    return done(new Error("Invalid token"), null);
  }

  return done(null, user);
}

/**
 *
 * @param {string} username
 * @param {string} password
 * @param {(err?: Error | null, user?: import("../generated/prisma-client-js").User | null) => void} done
 */
export async function handleLocalLogin(username, password, done) {
  const user = await db.user.findFirst({ where: { email: username } });
  if (!user) {
    return done(new Error("User account not found"), null);
  }

  if (!bcrypt.compareSync(password, user.password)) {
    return done(new Error("Invalid username or password"), null);
  }

  return done(null, user);
}

/**
 *
 * @param {string} provider
 * @param {string} profileId
 * @param {string} email
 * @param {string} name
 * @param {(err?: Error | null, user?: import("../generated/prisma-client-js").User | null) => void | undefined} done
 * @return {Promise<Omit<import("../generated/prisma-client-js").User, "password"> | null>}
 */
export async function handleOuth2User(provider, profileId, email, name, done) {
  const socialAccount = await db.socialAccount.findFirst({ where: { id: profileId, provider }, include: { user: true } });
  if (socialAccount) {
    if (typeof done === "function") return done(null, socialAccount.user);
    return user;
  }

  // if user exists from email, link the social account
  const user = await db.user.findFirst({ where: { email } });
  if (user) {
    await db.socialAccount.create({ data: { provider, id: profileId, userId: user.id } });

    if (typeof done === "function") return done(null, user);
    return user;
  }

  // create user and link social account, if allowed to create on oauth
  if (process.env.CREATE_IF_NOT_FOUND === "true") {
    const newUser = await db.user.create({ data: { email, name, token: uuid.v1() } });
    await db.socialAccount.create({ data: { userId: newUser.id, provider, id: profileId } });

    if (typeof done === "function") return done(null, newUser);
    return newUser;
  }

  if (typeof done === "function") return done(new Error("User account not found"));
  return null;
}
