import dotenv from "dotenv";
import { Strategy } from "passport-github2";
import { handleOuth2User } from "./utils.mjs";

dotenv.config();

export default new Strategy(
  {
    callbackURL: "http://localhost:8000/login/github",
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  },
  /**
   *
   * @param {string} _accessToken
   * @param {string} _refreshToken
   * @param {import("passport-github2").Profile} profile
   * @param {import("passport").DoneCallback} done
   * @returns
   */
  async (_accessToken, _refreshToken, profile, done) => {
    console.log(_accessToken);
    await handleOuth2User(profile.provider, profile.id, profile.emails[0].value, profile.displayName, done);
  },
);
