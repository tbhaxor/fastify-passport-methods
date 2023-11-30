import isAuthenticated from "../hooks/is-authenticated.mjs";
import { PrismaClient } from "../generated/prisma-client-js";
import fastifyPassport from "@fastify/passport";
import jwtInjector from "../hooks/jwt-injector.mjs";

const db = new PrismaClient();

/**
 *
 * @param {import("fastify").FastifyInstance} fastify
 * @param {*} _
 * @param {(err?: Error) => void} done
 */
export default function (fastify, _, done) {
  fastify.get("/", { preHandler: [isAuthenticated, jwtInjector] }, async (request, reply) => {
    const socialAccounts = await db.socialAccount.findMany({
      where: { userId: request.user.id },
      orderBy: { provider: "asc" },
    });
    const has2FASetup = await db.tOTPKey.count({ where: { userId: request.user.id } }).then((count) => count === 1);
    return reply.view("dashboard.pug", { user: request.user, jwtToken: request.jwtToken, socialAccounts, has2FASetup });
  });

  fastify.get(
    "/api",
    { preHandler: [fastifyPassport.authenticate(["jwt", "bearer", "http", "digest"], { session: false }), jwtInjector] },
    async (request, reply) => {
      if (!request.isAuthenticated()) {
        return reply.status(401).send({ error: "User is not authenticated", statusCode: 401 });
      }
      const socialAccounts = await db.socialAccount.findMany({
        where: { userId: request.user.id },
      });
      return reply.send({
        user: { ...request.user, password: undefined, token: undefined },
        token: { bearer: request.user.token, jwt: request.jwtToken },
        socialAccounts,
      });
    },
  );

  done();
}
