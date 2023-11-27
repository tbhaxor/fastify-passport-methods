import isAuthenticated from "../hooks/is-authenticated.mjs";
import { PrismaClient } from "../generated/prisma-client-js";
import fastifyPassport from "@fastify/passport";
import bcrypt from "bcrypt";

const db = new PrismaClient();

/**
 *
 * @param {import("fastify").FastifyInstance} fastify
 * @param {*} _
 * @param {(err?: Error) => void} done
 */
export default function (fastify, _, done) {
  fastify.get("/", { preHandler: [isAuthenticated] }, async (request, reply) => {
    return reply.view("profile.pug", { user: request.user });
  });

  fastify.post(
    "/",
    { preHandler: [fastifyPassport.authenticate(Object.keys(fastifyPassport.strategies))] },
    async (request, reply) => {
      if (request.body.password) {
        request.body.password = bcrypt.hashSync(request.body.password, 13);
      }

      if (request.user.email != request.body.email) {
        const isDuplicateEmail = await db.user.count({ where: { email: request.body.email } }).then((count) => count === 1);
        if (isDuplicateEmail) {
          return reply.view("profile.pug", { user: request.body, error: "Email account already exists!" });
        }
      }

      await db.user.update({
        where: { id: request.user.id },
        data: { email: request.body.email, password: request.body.password, name: request.body.name },
      });

      return reply.redirect("/dashboard");
    },
  );

  done();
}
