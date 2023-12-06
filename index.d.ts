import { User as PrismaUser } from "./generated/prisma-client-js";
import "express";

declare module "fastify" {
  interface PassportUser extends PrismaUser {}
}

declare global {
  namespace Express {
    interface User extends PrismaUser {}
  }
}

declare module "@fastify/secure-session" {
  interface SessionData {
    is2FaConfirmed: boolean;
  }
}
