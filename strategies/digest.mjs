import { DigestStrategy } from "passport-http";
import { handleTokenLogin } from "./utils.mjs";

export default new DigestStrategy({ realm: "fastify", qop: "auth" }, handleTokenLogin);
