import fastifyPassport from "@fastify/passport";
import { PrismaClient } from "../generated/prisma-client-js";

import localStrategy from "./local.mjs";
import bearerStrategy from "./bearer.mjs";
import httpStrategy from "./http.mjs";
import githubStrategy from "./github.mjs";
import twitterStrategy from "./twitter.mjs";
import gitlabStrategy from "./gitlab.mjs";
import googleStrategy from "./google.mjs";
import facebookStrategy from "./facebook.mjs";
import digestStrategy from "./digest.mjs";
import jwtStrategy from "./jwt.mjs";
import slackStrategy from "./slack.mjs";
import digitaloceanStrategy from "./digitalocean.mjs";
import eventbriteStrategy from "./eventbrite.mjs";
import amazonStrategy from "./amazon.mjs";
import linkedinStrategy from "./linkedin.mjs";

const db = new PrismaClient();

fastifyPassport.registerUserDeserializer(function (userId) {
  return db.user.findFirst({ where: { id: userId }, select: { id: true, email: true, name: true, token: true } });
});

fastifyPassport.registerUserSerializer(function (user) {
  return user.id;
});

fastifyPassport
  .use("local", localStrategy)
  .use("bearer", bearerStrategy)
  .use("digest", digestStrategy)
  .use("http", httpStrategy)
  .use("github", githubStrategy)
  .use("twitter", twitterStrategy)
  .use("google", googleStrategy)
  .use("facebook", facebookStrategy)
  .use("jwt", jwtStrategy)
  .use("slack", slackStrategy)
  .use("digitalocean", digitaloceanStrategy)
  .use("eventbrite", eventbriteStrategy)
  .use("amazon", amazonStrategy)
  .use("linkedin", linkedinStrategy)
  .use("gitlab", gitlabStrategy);
