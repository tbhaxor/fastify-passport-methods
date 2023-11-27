import { BasicStrategy } from "passport-http";
import { handleLocalLogin } from "./utils.mjs";

export default new BasicStrategy({ realm: "fastify" }, handleLocalLogin);
