import dotenv from "dotenv";
import { Strategy } from "passport-slack-oauth2";
import { handleOuth2User } from "./utils.mjs";

dotenv.config();

export default new Strategy(
  {
    clientID: process.env.SLACK_CLIENT_ID,
    clientSecret: process.env.SLACK_CLIENT_SECRET,
    callbackURL: "https://localhost:8000/login/slack",
    skipUserProfile: false, // default
    scope: ["identity.basic", "identity.email", "identity.avatar", "identity.team"], // default
  },
  (_accessToken, _refreshToken, profile, done) => {
    handleOuth2User(profile.provider, profile.id, profile.user.email, profile.displayName, done);
  },
);
