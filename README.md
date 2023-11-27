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

> **Note** Configuring all the strategies are required for it. Make sure the callback url is `http://localhost:8000/login/STRATREGY_NAME`.
