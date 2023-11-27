import dotenv from "dotenv";
import { Strategy } from "passport-facebook";
import { handleOuth2User } from "./utils.mjs";

dotenv.config();

export default new Strategy(
  {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:8000/login/facebook",
    profileFields: ["name", "email"],
  },
  /** @type {import("passport-facebook").VerifyFunction} */
  (_accessToken, _refreshToken, profile, done) => {
    if (!profile.displayName) {
      profile.displayName = `${profile.name.givenName} ${profile.name.familyName}`;
    }
    handleOuth2User(profile.provider, profile.id, profile.emails[0].value, profile.displayName, done);
  },
);
