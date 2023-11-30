import isAuthenticated from "../hooks/is-authenticated.mjs";
import { PrismaClient } from "../generated/prisma-client-js";
import * as uuid from "uuid";
import thirtyTwo from "thirty-two";
import generateTOTP from "totp-generator";
const db = new PrismaClient();

/**
 *
 * @param {import("fastify").FastifyInstance} fastify
 * @param {*} _
 * @param {(err?: Error) => void} done
 */
export default function (fastify, _, done) {
  fastify.get("/setup", { preHandler: [isAuthenticated] }, async (request, reply) => {
    const key = uuid.v1();
    const encodedKey = thirtyTwo.encode(key);
    const token = generateTOTP(key, { algorithm: "SHA-512", digits: 6, period: 30 });

    await db.tOTPKey.upsert({
      create: { key: key, userId: request.user.id },
      where: { userId: request.user.id },
      update: { key },
    });

    const otpUrl = "otpauth://totp/" + request.user.email + "?secret=" + encodedKey + "&period=60";
    const qrImage = "https://chart.googleapis.com/chart?chs=166x166&chld=L|0&cht=qr&chl=" + encodeURIComponent(otpUrl);
    return reply.view("2fa.pug", { user: request.user, otpUrl, qrImage, token, key });
  });

  fastify.post("/setup", { preHandler: [isAuthenticated] }, async (request, reply) => {});
  done();
}
