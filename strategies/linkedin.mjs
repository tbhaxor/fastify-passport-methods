import dotenv from "dotenv";
import { Strategy } from "passport-linkedin-oauth2";
import { handleOuth2User } from "./utils.mjs";

dotenv.config();

export default new Strategy(
  {
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/login/linkedin",
    scope: ["r_emailaddress", "r_liteprofile"],
    state: true,
  },
  /** @type {import("passport-linkedin-oauth2").VerifyFunction} */
  (_accessToken, _refereshToken, profile, done) => {
    handleOuth2User(profile.provider, profile.id, profile.emails[0].value, profile.displayName, done);
  },
);
