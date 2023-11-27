// TODO: This

import dotenv from "dotenv";
import { Strategy } from "passport-twitter";
import { handleOuth2User } from "./utils.mjs";
dotenv.config();

export default new Strategy(
  {
    callbackURL: "http://localhost:8000/login/twitter",
    consumerKey: process.env.TWITTER_CLIENT_ID,
    consumerSecret: process.env.TWITTER_CLIENT_SECRET,
    includeEmail: true,
  },
  /**
   * @param {string} _token
   * @param {string} _refresh
   * @param {import("passport-twitter").Profile} profile
   * @param {import("passport").DoneCallback} done
   */
  (_token, _refresh, profile, done) => {
    handleOuth2User(profile.provider, profile.id, profile.emails[0].value, profile.displayName, done);
  },
);
