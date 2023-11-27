import dotenv from "dotenv";
import { OAuth2Strategy } from "passport-eventbrite-oauth";
import { handleOuth2User } from "./utils.mjs";

dotenv.config();

export default new OAuth2Strategy(
  {
    clientID: process.env.EVENTBRITE_CLIENT_ID,
    clientSecret: process.env.EVENTBRITE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/login/eventbrite",
  },
  (_accessToken, _refreshToken, profile, done) => {
    handleOuth2User(profile.provider, profile.id, profile.emails[0].value, profile.displayName, done);
  },
);
