import path from "path";
import url from "url";
import fs from "fs";

import fastify from "fastify";
import fastifyFormbody from "@fastify/formbody";
import fastifySecureSession from "@fastify/secure-session";
import fastifyPassport from "@fastify/passport";
import fastifyView from "@fastify/view";
import pug from "pug";
import "./strategies";

import deleteRoute from "./routes/delete.mjs";
import signupRoute from "./routes/signup.mjs";
import loginRoute from "./routes/login.mjs";
import isAuthenticated from "./hooks/is-authenticated.mjs";
import dashboardRoute from "./routes/dashboard.mjs";
import logoutRoute from "./routes/logout.mjs";
import socialsRoute from "./routes/socials.mjs";
import profileRoute from "./routes/profile.mjs";
import twoFARoute from "./routes/2fa.mjs";

const server = fastify({ logger: true });

server.register(fastifyFormbody);
server.register(fastifyView, {
  engine: { pug },
  templates: path.join(path.dirname(url.fileURLToPath(import.meta.url)), "templates"),
});
server.register(fastifySecureSession, { key: fs.readFileSync("key.bin"), cookie: { path: "/" } });
server.register(fastifyPassport.initialize());
server.register(fastifyPassport.secureSession());

server.get("/", { preHandler: [isAuthenticated] }, (_request, reply) => reply.redirect("/dashboard"));

server.register(signupRoute, { prefix: "/signup" });
server.register(loginRoute, { prefix: "/login" });
server.register(logoutRoute, { prefix: "/logout" });
server.register(dashboardRoute, { prefix: "/dashboard" });
server.register(socialsRoute, { prefix: "/socials" });
server.register(profileRoute, { prefix: "/profile" });
server.register(deleteRoute, { prefix: "/delete" });
server.register(twoFARoute, { prefix: "/2fa" });

server.listen({ port: 8000, host: "127.0.0.1" });

server.setErrorHandler(function (error, request, reply) {
  console.log(error.stack);
  if (request.isAuthenticated()) {
    return reply.redirect(`/dashboard?error[code]=${error.code}&error[message]=${error.message}`);
  }
  return reply.redirect(`/login?error[code]=${error.code}&error[message]=${error.message}`);
});
