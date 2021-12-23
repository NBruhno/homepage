<p align="center">
  <a href="https://bruhno.com">
    <img src="https://bruhno.com/images/Logo.svg" height="100">
    <h2 align="center">Bruhno</h2>
  </a>
</p>

# What makes up this website
* [Next.js](https://github.com/vercel/next.js) - React framework
* [Vercel](https://github.com/vercel/vercel) - Hosting
* [Fauna](https://planetscale.com) - Database
* [Prisma](https://github.com/prisma/prisma) - Database ORM
### Other important libraries:
  * [Emotion](https://github.com/emotion-js/emotion) - CSS-in-JS
  * [Final Form](https://github.com/final-form/final-form) - Forms
  * [Sentry](https://github.com/getsentry/sentry-javascript) - Error tracking and performance monitoring
### Obvious additions
  * [Babel](https://github.com/babel/babel) - Compiler
  * [Jest](https://github.com/facebook/jest) - Testing
  * [React](https://github.com/facebook/react) - Framework
  * [TypeScript](https://github.com/microsoft/TypeScript) - Typing
  * [Webpack](https://github.com/webpack/webpack) - Bundler

# Getting started
Keep in mind that this application is not aimed at providing a template or reference of implementation.
It is made by and for me specifically.
The code is publicly available to serve as inspiration/proof of concept, and is not meant to be forked and run without modifications.

## Required env variables for running against the implemented services
* `AUTH_IV` - IV for encryption/decryption using `aes-256-cbc` of the public/private keys in config
* `AUTH_SECRET` - Secret for encryption/decryption using `aes-256-cbc` of the public/private keys in config
* `AUTH_SYSTEM_TOKEN` - Secret that the API uses internally to ensure that the request is not from the outside
* `DATABASE_URL` - Database URL, currently a MySQL instance using PlanetScale
* `IGDB_CLIENT_ID` - Personal Client ID key acquired from the Twitch developer portal
* `IGDB_CLIENT_SECRET` - Personal secret acquired from the Twitch developer portal
* `IGDB_TOKEN` - OAuth token generated through the Twitch developer API
* `ITAD_TOKEN` - Token from Is There Any Deal to get game prices

You can verify that you have the required env variables by running `pnpm install verify:env`.
If any of the ones required in the script is missing, it will error out.
Inside `src/config.server.ts` you will find my encrypted public/private keys.
Either replace them with another set of encrypted keys using your iv:secret or put them into your env and replace their reference here.
They are encrypted inside this file because Vercel has a 4KB total limit on env variables, and the keys alone surpass that limit.

## Running the application locally
Make sure to have pnpm (or any package manager of choice) installed, and run `pnpm install` before starting to download the required packages.

To run the application locally, run `pnpm dev`.
This will start Next.

If you want to run the application as it would on Vercel, you can install Vercel `npm i -g vercel` and run `vercel dev`.

You can find the website at `http://localhost:3000` and you can access the API at `http://localhost:3000/api` once running.

## Building the application
To build the application, run `pnpm build`.
Once build, the application can be run with `pnpm start`.

## Linting and testing
To lint the application, run `pnpm lint`. If you want to run eslint and tsc individually, run `pnpm lint:eslint` or `pnpm lint:tsc`

To test the application, run `pnpm test`. Make sure to add the required env variables for testing. Keep in mind that the tests are written to run against my variables and environment, using my public/private key pairs. To properly test the application yourself, you have to update `/src/test/utils.ts`.

# Important note
There is no guarantee that this readme is updated to match updates that are made to this repository. That solely depends on me remembering to update this file.

To make use of all the implemented features, FaunaDB, Vercel and Sentry, you need some knowledge on how to use these services.
If you do not know how to, there is plenty of documentation out there that will help you learn how to use these amazing tools.
This project does not aim to explain any of the used services.
