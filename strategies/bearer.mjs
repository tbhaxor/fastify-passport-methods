import { Strategy } from "passport-http-bearer";
import { handleTokenLogin } from "./utils.mjs";

export default new Strategy({ realm: "fastify" }, handleTokenLogin);
