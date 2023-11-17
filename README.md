# openapi-client-generators

Many examples out there in articles and blogs are based of the _Pet Store_ OpenAPI example spec ([link](https://github.com/OAI/OpenAPI-Specification/blob/main/examples/v3.0/petstore.json)) which is a little lightweight to illustrate a real life use case. This comparison is using the Spotify OpenAPI spec ([link](https://raw.githubusercontent.com/APIs-guru/openapi-directory/main/APIs/spotify.com/sonallux/2023.2.27/openapi.yaml)).

## Overview

| Library                                                                                                                                                                                            |                               Bundle size for Spotify (_generated_) |     |                                                                                                                                                                       Downloads |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------: | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| @openapitools/openapi-generator-cli<br />[NPM](https://www.npmjs.com/package/@openapitools/openapi-generator-cli)                                                                                  | Min: 43.11 kB │ gzip: 14.49 kB<br />Max: 121.35 kB │ gzip: 20.93 kB | -   |                                                                           ![npm](https://img.shields.io/npm/dm/@openapitools/openapi-generator-cli?label=openapi-generator-cli) |
| openapi-fetch + openapi-typescript<br />[NPM](https://www.npmjs.com/package/openapi-fetch) - [Docs](https://openapi-ts.pages.dev) - [Bundlephobia](https://bundlephobia.com/package/openapi-fetch) |                                             3.80 kB │ gzip: 1.62 kB | -   |                       ![npm](https://img.shields.io/npm/dm/openapi-fetch?label=openapi-fetch) ![npm](https://img.shields.io/npm/dm/openapi-typescript?label=openapi-typescript) |
| openapi-typescript-fetch + openapi-typescript<br />[NPM](https://www.npmjs.com/package/openapi-typescript-fetch) - [Bundlephobia](https://bundlephobia.com/package/openapi-typescript-fetch)       |                                             5.03 kB │ gzip: 2.05 kB | -   | ![npm](https://img.shields.io/npm/dm/openapi-typescript-fetch?label=openapi-typescript-fetch) ![npm](https://img.shields.io/npm/dm/openapi-typescript?label=openapi-typescript) |

### openapi-generator-cli

NB: Use v6.6.0, as v7.1.0 fails on generating the client with a number of Typescript compilation errors like so:

```
...
src/generated/spotify/api.ts:7710:14 - error TS2451: Cannot redeclare block-scoped variable 'FollowArtistsUsersTypeEnum'.

7710 export const FollowArtistsUsersTypeEnum = {
                  ~~~~~~~~~~~~~~~~~~~~~~~~~~

src/generated/spotify/api.ts:7714:13 - error TS2451: Cannot redeclare block-scoped variable 'FollowArtistsUsersTypeEnum'.

7714 export type FollowArtistsUsersTypeEnum = typeof FollowArtistsUsersTypeEnum[keyof typeof FollowArtistsUsersTypeEnum];
                 ~~~~~~~~~~~~~~~~~~~~~~~~~~
...
```
