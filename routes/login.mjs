import fastifyPassport from "@fastify/passport";

/**
 *
 * @param {import("fastify").FastifyInstance} fastify
 * @param {*} _
 * @param {(err?: Error) => void} done
 */
export default function (fastify, _, done) {
  fastify.get("/", (request, reply) => {
    if (request.isAuthenticated()) {
      return reply.redirect("/dashboard");
    }
    return reply.view("login.pug");
  });

  fastify.get("/:method", (request, reply) => {
    /** @type {string} */
    const method = request.params.method;
    fastifyPassport.authenticate(method, { session: true, failureRedirect: "/login", successRedirect: "/dashboard" })(
      request,
      reply,
    );
  });

  fastify.post("/:method", (request, reply) => {
    /** @type {string} */
    const method = request.params.method;
    fastifyPassport.authenticate(method, { session: true, failureRedirect: "/login", successRedirect: "/dashboard" })(
      request,
      reply,
    );
  });

  done();
}
