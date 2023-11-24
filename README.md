# openapi-client-generators

Many examples out there in articles and blogs are based of the _Pet Store_ OpenAPI example spec ([link](https://github.com/OAI/OpenAPI-Specification/blob/main/examples/v3.0/petstore.json)) which is a little lightweight to illustrate a real life use case. This comparison is using the Spotify OpenAPI spec ([link](https://raw.githubusercontent.com/APIs-guru/openapi-directory/main/APIs/spotify.com/sonallux/2023.2.27/openapi.yaml)).

## Overview

| Library                                                                                                                                                                                            |                               Bundle size for Spotify (_generated_) |     |                                                                                                                                                                       Downloads |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------: | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| @openapitools/openapi-generator-cli<br />[NPM](https://www.npmjs.com/package/@openapitools/openapi-generator-cli)                                                                                  | Min: 43.11 kB │ gzip: 14.49 kB<br />Max: 121.35 kB │ gzip: 20.93 kB | -   |                                                                                                       ![npm](https://img.shields.io/npm/dm/@openapitools/openapi-generator-cli) |
| feTS<br />[NPM](https://www.npmjs.com/package/fets) - [Docs](https://the-guild.dev/) - [Bundlephobia](fets@0.6.5)                                                                                  |                                           38.01 kB │ gzip: 12.77 kB | -   |                                                                                                                                      ![npm](https://img.shields.io/npm/dm/fets) |
| openapi-fetch + openapi-typescript<br />[NPM](https://www.npmjs.com/package/openapi-fetch) - [Docs](https://openapi-ts.pages.dev) - [Bundlephobia](https://bundlephobia.com/package/openapi-fetch) |                                             3.80 kB │ gzip: 1.62 kB | -   |                       ![npm](https://img.shields.io/npm/dm/openapi-fetch?label=openapi-fetch) ![npm](https://img.shields.io/npm/dm/openapi-typescript?label=openapi-typescript) |
| openapi-typescript-fetch + openapi-typescript<br />[NPM](https://www.npmjs.com/package/openapi-typescript-fetch) - [Bundlephobia](https://bundlephobia.com/package/openapi-typescript-fetch)       |                                             5.03 kB │ gzip: 2.05 kB | -   | ![npm](https://img.shields.io/npm/dm/openapi-typescript-fetch?label=openapi-typescript-fetch) ![npm](https://img.shields.io/npm/dm/openapi-typescript?label=openapi-typescript) |
| openapi-typescript-codegen (fetch)<br />[NPM](https://www.npmjs.com/package/openapi-typescript-codegen)                                                                                            |                                            87.47 kB │ gzip: 7.06 kB | -   |                                                                                                                ![npm](https://img.shields.io/npm/dm/openapi-typescript-codegen) |
| openapi-typescript-codegen (axios)<br />[NPM](https://www.npmjs.com/package/openapi-typescript-codegen)                                                                                            |                                          117.06 kB │ gzip: 18.62 kB | -   |                                                                                                                ![npm](https://img.shields.io/npm/dm/openapi-typescript-codegen) |
| orval<br />[NPM](https://www.npmjs.com/package/orval) - [Docs](https://orval.dev/)                                                                                                                 |  Min: 30.43 kB │ gzip: 12.31 kB<br />Max: 41.79 kB │ gzip: 14.75 kB | -   |                                                                                                                                     ![npm](https://img.shields.io/npm/dm/orval) |
| orval (fetch)<br />[NPM](https://www.npmjs.com/package/orval) - [Docs](https://orval.dev/)                                                                                                         |     Min: 1.36 kB │ gzip: 0.74 kB<br />Max: 11.48 kB │ gzip: 3.12 kB | -   |                                                                                                                                     ![npm](https://img.shields.io/npm/dm/orval) |

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

### orval

```
Argument of type '{ url: string; method: "put"; headers: { 'Content-Type': string; }; data: FollowArtistsUsersBody; params: FollowArtistsUsersParams; }' is not assignable to parameter of type '{ url: string; method: "get" | "post" | "put" | "delete" | "patch"; params?: any; data?: unknown; responseType?: string | undefined; }'.
  Object literal may only specify known properties, and 'headers' does not exist in type '{ url: string; method: "get" | "post" | "put" | "delete" | "patch"; params?: any; data?: unknown; responseType?: string | undefined; }'.
```
