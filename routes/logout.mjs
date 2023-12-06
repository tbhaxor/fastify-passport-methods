/**
 *
 * @param {import("fastify").FastifyInstance} fastify
 * @param {*} _
 * @param {(err?: Error) => void} done
 */
export default function (fastify, _, done) {
  fastify.get("/", async (request, reply) => {
    await request.logout();
    request.session.delete();
    return reply.redirect("/login");
  });

  done();
}
