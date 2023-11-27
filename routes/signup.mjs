import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { PrismaClient } from "../generated/prisma-client-js";
import bcrypt from "bcrypt";
import { createHash } from "crypto";

const db = new PrismaClient();

/**
 *
 * @param {import("fastify").FastifyInstance} fastify
 * @param {*} _
 * @param {(err?: Error) => void} done
 */
export default function (fastify, _, done) {
  fastify.get("/", (_request, reply) => reply.view("signup.pug", { user: { name: "", email: "" } }));

  fastify.post("/", async (request, reply) => {
    try {
      request.body.password = await bcrypt.hash(request.body.password, 13);
      const token = createHash("sha256").update(request.body.email).digest("hex");
      await db.user.create({ data: { ...request.body, token } });

      return reply.redirect("/login");
    } catch (error) {
      let message = "Something went wrong!";

      if (error.constructor.name == PrismaClientKnownRequestError.name) {
        switch (error.code) {
          case "P2002":
            message = "Email already exists!";
            break;
        }
      }

      return reply.view("signup.pug", { error: message, user: { email: request.body.email, name: request.body.name } });
    }
  });

  done();
}
