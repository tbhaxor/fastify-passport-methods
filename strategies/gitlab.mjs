import dotenv from "dotenv";
import { Strategy } from "passport-gitlab2";
import { handleOuth2User } from "./utils.mjs";

dotenv.config();

export default new Strategy(
  {
    clientID: process.env.GITLAB_CLIENT_ID,
    clientSecret: process.env.GITLAB_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/login/gitlab",
    scope: ["email", "profile", "read_user"],
  },
  /** @type {VerifyFunction} */
  (_accessToken, _refreshToken, profile, done) => {
    handleOuth2User(profile.provider, profile.id, profile.emails[0].value, profile.displayName, done);
  },
);
