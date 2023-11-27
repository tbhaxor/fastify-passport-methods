import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

/**
 *
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 * @param {import("fastify").HookHandlerDoneFunction} done
 */
export default function (request, reply, done) {
  request.jwtToken = jwt.sign({ sub: request.user.id }, process.env.JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: "1d",
  });
  done();
}
