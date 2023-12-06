import isAuthenticated from "../hooks/is-authenticated.mjs";
import { PrismaClient } from "../generated/prisma-client-js";
import * as uuid from "uuid";
import thirtyTwo from "thirty-two";
import fastifyPassport from "@fastify/passport";

const db = new PrismaClient();

/**
 *
 * @param {import("fastify").FastifyInstance} fastify
 * @param {*} _
 * @param {(err?: Error) => void} done
 */
export default function (fastify, _, done) {
  fastify.get("/setup", { preHandler: [isAuthenticated] }, async (request, reply) => {
    let totp = await db.tOTPKey.findFirst({ where: { userId: request.user.id } });
    if (totp == null) {
      const key = thirtyTwo.encode(uuid.v1()).toString();
      totp = await db.tOTPKey.create({ data: { key, userId: request.user.id } });
    }

    const otpUrl = `otpauth://totp/Fastify Passport?secret=${totp.key}&period=60`;
    const qrImage = `https://chart.googleapis.com/chart?chs=166x166&chld=L|0&cht=qr&chl=${encodeURIComponent(otpUrl)}`;
    return reply.view("2fa.pug", { user: request.user, otpUrl, qrImage, key: thirtyTwo.decode(totp.key).toString() });
  });

  fastify.post(
    "/setup",
    {
      preHandler: [
        isAuthenticated,
        fastifyPassport.authenticate("totp", { failureRedirect: "/2fa/setup?totpFail=true", successRedirect: "/dashboard" }),
      ],
    },
    (request, reply) => {},
  );

  fastify.get("/confirm", { preHandler: [isAuthenticated] }, (request, reply) => {
    return reply.view("2fa-confirm", { user: request.user });
  });

  fastify.post(
    "/confirm",
    {
      preHandler: [isAuthenticated, fastifyPassport.authenticate("totp", { failureRedirect: "/2fa/confirm?totpFail=true" })],
    },
    (request, reply) => {
      request.session.set("is2FaConfirmed", true);
      return reply.redirect("/dashboard");
    },
  );

  fastify.get("/delete", { preHandler: [isAuthenticated] }, async (request, reply) => {
    await db.tOTPKey.delete({ where: { userId: request.user.id } });
    return reply.redirect("/dashboard");
  });

  done();
}
