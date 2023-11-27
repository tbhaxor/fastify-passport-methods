import dotenv from "dotenv";
import { Strategy } from "passport-google-oauth20";
import { handleOuth2User } from "./utils.mjs";

dotenv.config();

export default new Strategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/login/google",
    scope: ["profile", "openid", "email"],
  },
  /**
   *
   * @param {*} _token
   * @param {*} _refresh
   * @param {import("passport-google-oauth20").Profile} profile
   * @param {import("passport").DoneCallback} done
   */
  (_token, _refresh, profile, done) => {
    handleOuth2User(profile.provider, profile.id, profile.emails[0].value, profile.displayName, done);
  },
);
