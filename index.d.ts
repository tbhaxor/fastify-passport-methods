import { User as PrismaUser } from "./generated/prisma-client-js";

declare module "fastify" {
  interface PassportUser extends PrismaUser {}
}

declare global {
  declare namespace Express {
    interface User extends PrismaUser {}
    interface AuthInfo extends PrismaUser {}
  }
}
