import dotenv from "dotenv";
import { Strategy } from "passport-amazon";
import { handleOuth2User } from "./utils.mjs";

dotenv.config();

export default new Strategy(
  {
    clientID: process.env.AMAZON_CLIENT_ID,
    clientSecret: process.env.AMAZON_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/login/amazon",
    scope: ["profile"],
  },
  (_accessToken, _refreshToken, profile, done) => {
    handleOuth2User(profile.provider, profile.id, profile.emails[0].value, profile.displayName, done);
  },
);
