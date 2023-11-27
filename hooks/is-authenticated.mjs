/**
 *
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 * @param {import("fastify").HookHandlerDoneFunction} done
 */
export default function (request, reply, done) {
  if (request.isUnauthenticated()) {
    return reply.redirect("/login");
  }

  done();
}
