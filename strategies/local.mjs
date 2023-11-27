import { Strategy } from "passport-local";
import { handleLocalLogin } from "./utils.mjs";

export default new Strategy({ usernameField: "email", passwordField: "password" }, handleLocalLogin);
