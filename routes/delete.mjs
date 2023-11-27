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
  fastify.get("/", { preHandler: [isAuthenticated] }, async (request, reply) => {
    return reply.view("delete.pug", { user: request });
  });

  fastify.post("/", { preHandler: [isAuthenticated] }, async (request, reply) => {
    await db.user.delete({ where: { id: request.user.id } });
    return reply.redirect("/logout");
  });

  done();
}
