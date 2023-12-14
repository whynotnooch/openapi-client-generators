# openapi-client-generators

Many examples out there in articles and blogs are based of the _Pet Store_ OpenAPI example spec ([link](https://github.com/OAI/OpenAPI-Specification/blob/main/examples/v3.0/petstore.json)) which is a little lightweight to illustrate a real life use case. This comparison is using the Spotify OpenAPI spec ([link](https://raw.githubusercontent.com/APIs-guru/openapi-directory/main/APIs/spotify.com/sonallux/2023.2.27/openapi.yaml)).

## Overview

| Library                                                                                                                                                                                            |                                        Bundle size (_generated_) |                                                                                                      Last Release |                                                                                                               Stars |                                                                                 Downloads |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------: | ----------------------------------------------------------------------------------------------------------------: | ------------------------------------------------------------------------------------------------------------------: | ----------------------------------------------------------------------------------------: |
| @openapitools/openapi-generator-cli<br />[NPM](https://www.npmjs.com/package/@openapitools/openapi-generator-cli)                                                                                  | <span style="white-space: nowrap">43.11 kB - 121.35 kB[1]</span> | ![GitHub release (with filter)](https://img.shields.io/npm/v/@openapitools/openapi-generator-cli?logo=npm&label=) |         ![GitHub Repo stars](https://img.shields.io/github/stars/OpenAPITools/openapi-generator?logo=github&label=) | ![npm](https://img.shields.io/npm/dm/@openapitools/openapi-generator-cli?logo=npm&label=) |
| feTS<br />[NPM](https://www.npmjs.com/package/fets) - [Docs](https://the-guild.dev/) - [Bundlephobia](fets@0.6.5)                                                                                  |                                        38.01 kB │ gzip: 12.77 kB |                                ![GitHub release (with filter)](https://img.shields.io/npm/v/fets?logo=npm&label=) |                           ![GitHub Repo stars](https://img.shields.io/github/stars/ardatan/fets?logo=github&label=) |                                ![npm](https://img.shields.io/npm/dm/fets?logo=npm&label=) |
| openapi-typescript<br />[NPM](https://www.npmjs.com/package/openapi-typescript) - [Docs](https://openapi-ts.pages.dev)                                                                             |                                          _(Generate types only)_ |                  ![GitHub release (with filter)](https://img.shields.io/npm/v/openapi-typescript?logo=npm&label=) |              ![GitHub Repo stars](https://img.shields.io/github/stars/drwpow/openapi-typescript?logo=github&label=) |                  ![npm](https://img.shields.io/npm/dm/openapi-typescript?logo=npm&label=) |
| openapi-fetch + openapi-typescript<br />[NPM](https://www.npmjs.com/package/openapi-fetch) - [Docs](https://openapi-ts.pages.dev) - [Bundlephobia](https://bundlephobia.com/package/openapi-fetch) |                                          3.80 kB │ gzip: 1.62 kB |                       ![GitHub release (with filter)](https://img.shields.io/npm/v/openapi-fetch?logo=npm&label=) |                   ![GitHub Repo stars](https://img.shields.io/github/stars/drwpow/openapi-fetch?logo=github&label=) |                       ![npm](https://img.shields.io/npm/dm/openapi-fetch?logo=npm&label=) |
| openapi-typescript-fetch + openapi-typescript<br />[NPM](https://www.npmjs.com/package/openapi-typescript-fetch) - [Bundlephobia](https://bundlephobia.com/package/openapi-typescript-fetch)       |                                          5.03 kB │ gzip: 2.05 kB |            ![GitHub release (with filter)](https://img.shields.io/npm/v/openapi-typescript-fetch?logo=npm&label=) |   ![GitHub Repo stars](https://img.shields.io/github/stars/ajaishankar/openapi-typescript-fetch?logo=github&label=) |            ![npm](https://img.shields.io/npm/dm/openapi-typescript-fetch?logo=npm&label=) |
| openapi-typescript-codegen (fetch)<br />[NPM](https://www.npmjs.com/package/openapi-typescript-codegen)                                                                                            |                                         87.47 kB │ gzip: 7.06 kB |          ![GitHub release (with filter)](https://img.shields.io/npm/v/openapi-typescript-codegen?logo=npm&label=) | ![GitHub Repo stars](https://img.shields.io/github/stars/ferdikoomen/openapi-typescript-codegen?logo=github&label=) |          ![npm](https://img.shields.io/npm/dm/openapi-typescript-codegen?logo=npm&label=) |
| openapi-typescript-codegen (axios)<br />[NPM](https://www.npmjs.com/package/openapi-typescript-codegen)                                                                                            |                                       117.06 kB │ gzip: 18.62 kB |          ![GitHub release (with filter)](https://img.shields.io/npm/v/openapi-typescript-codegen?logo=npm&label=) | ![GitHub Repo stars](https://img.shields.io/github/stars/ferdikoomen/openapi-typescript-codegen?logo=github&label=) |          ![npm](https://img.shields.io/npm/dm/openapi-typescript-codegen?logo=npm&label=) |
| orval<br />[NPM](https://www.npmjs.com/package/orval) - [Docs](https://orval.dev/)                                                                                                                 |  <span style="white-space: nowrap">30.43 kB - 41.79 kB[1]</span> |                               ![GitHub release (with filter)](https://img.shields.io/npm/v/orval?logo=npm&label=) |                        ![GitHub Repo stars](https://img.shields.io/github/stars/anymaniax/orval?logo=github&label=) |                               ![npm](https://img.shields.io/npm/dm/orval?logo=npm&label=) |
| orval (fetch)<br />[NPM](https://www.npmjs.com/package/orval) - [Docs](https://orval.dev/)                                                                                                         |   <span style="white-space: nowrap">1.36 kB - 11.48 kB[1]</span> |                               ![GitHub release (with filter)](https://img.shields.io/npm/v/orval?logo=npm&label=) |                        ![GitHub Repo stars](https://img.shields.io/github/stars/anymaniax/orval?logo=github&label=) |                               ![npm](https://img.shields.io/npm/dm/orval?logo=npm&label=) |

**Notes:**

- [1]: Variations come from using a few endpoints or importing the entire client. Other generated clients have a flat cost.

### feTS

- scripts/generate.sh
- https://github.com/microsoft/TypeScript/issues/32063

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
