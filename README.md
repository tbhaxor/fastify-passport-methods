# fastify-passport-methods

Implementation of all the popular authentication strategies using passportjs in the fastify

## Setup commands

```console
yarn install
yarn generate:key
yarn prisma:generate
yarn prisma:migrate
yarn dev
```

> [!NOTE]
> Configuring all the strategies are required for it. Make sure the callback url is `http://localhost:8000/login/STRATREGY_NAME`.

## Environment Configuration

|           Variable           | Description                                                                                           |
| :--------------------------: | ----------------------------------------------------------------------------------------------------- |
|    `CREATE_IF_NOT_FOUND`     | Accepts `true` or `false`. Determines whether to auto-create a user if not exists or return an error. |
|      `GITHUB_CLIENT_ID`      | GitHub client ID for authentication.                                                                  |
|    `GITHUB_CLIENT_SECRET`    | GitHub client secret for authentication.                                                              |
|     `TWITTER_CLIENT_ID`      | Twitter client ID for authentication.                                                                 |
|   `TWITTER_CLIENT_SECRET`    | Twitter client secret for authentication.                                                             |
|      `GITLAB_CLIENT_ID`      | GitLab client ID for authentication.                                                                  |
|    `GITLAB_CLIENT_SECRET`    | GitLab client secret for authentication.                                                              |
|      `GOOGLE_CLIENT_ID`      | Google client ID for authentication.                                                                  |
|    `GOOGLE_CLIENT_SECRET`    | Google client secret for authentication.                                                              |
|     `FACEBOOK_CLIENT_ID`     | Facebook client ID for authentication.                                                                |
|   `FACEBOOK_CLIENT_SECRET`   | Facebook client secret for authentication.                                                            |
|         `JWT_SECRET`         | Secret key for JSON Web Token (JWT) authentication.                                                   |
|      `SLACK_CLIENT_ID`       | Slack client ID for authentication.                                                                   |
|    `SLACK_CLIENT_SECRET`     | Slack client secret for authentication.                                                               |
|   `DIGITALOCEAN_CLIENT_ID`   | DigitalOcean client ID for authentication.                                                            |
| `DIGITALOCEAN_CLIENT_SECRET` | DigitalOcean client secret for authentication.                                                        |
|    `EVENTBRITE_CLIENT_ID`    | Eventbrite client ID for authentication.                                                              |
|  `EVENTBRITE_CLIENT_SECRET`  | Eventbrite client secret for authentication.                                                          |
|      `AMAZON_CLIENT_ID`      | Amazon client ID for authentication.                                                                  |
|    `AMAZON_CLIENT_SECRET`    | Amazon client secret for authentication.                                                              |
