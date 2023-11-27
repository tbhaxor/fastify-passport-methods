import dotenv from "dotenv";
import { Strategy } from "passport-digitalocean";
import { createApiClient } from "dots-wrapper";
import { handleOuth2User } from "./utils.mjs";

dotenv.config();

export default new Strategy(
  {
    clientID: process.env.DIGITALOCEAN_CLIENT_ID,
    clientSecret: process.env.DIGITALOCEAN_CLIENT_SECRET,
    callbackURL: "http://www.localhost:8000/login/digitalocean",
    scope: ["read"],
  },
  async (accessToken, _refreshToken, profile, done) => {
    const client = createApiClient({ token: accessToken });
    const account = await client.account.getAccount().then((response) => response.data.account);
    handleOuth2User(profile.provider, account.uuid, account.email, account.name, done);
  },
);
