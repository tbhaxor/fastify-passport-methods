import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { PrismaClient } from "../generated/prisma-client-js";
import isAuthenticated from "../hooks/is-authenticated.mjs";

const db = new PrismaClient();

/**
 *
 * @param {import("fastify").FastifyInstance} fastify
 * @param {*} _
 * @param {(err?: Error) => void} done
 */
export default function (fastify, _, done) {
  fastify.get("/:id/unlink", { preHandler: [isAuthenticated] }, async (request, reply) => {
    await db.socialAccount.delete({ where: { id: request.params.id } });
    reply.redirect("/dashboard");
  });
  done();
}
