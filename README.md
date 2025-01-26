# openapi-client-generators

A list of awesome OpenAPI client generators.

This document aims to make a informed comparison of OpenAPI tools to generate type-safe (Typescript) client from an OpenAPI specification file.

## Overview

For each of the following tools, we generated a client from a real life use case ([Spotify OpenAPI specification](https://raw.githubusercontent.com/APIs-guru/openapi-directory/main/APIs/spotify.com/sonallux/2023.2.27/openapi.yaml)) and wrote a dead simple example application in order to compare generated clients capabilities, ease of use and bundle size footprint, and more.

| Library                                                                                                                                                                       |                             Bundle size (gzip)[1] |                                                                                                      Last release |                                                                                                               Stars |                                                                                 Downloads |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------: | ----------------------------------------------------------------------------------------------------------------: | ------------------------------------------------------------------------------------------------------------------: | ----------------------------------------------------------------------------------------: |
| abaca<br />[NPM](https://www.npmjs.com/package/abaca)                                                                                                                         |                                31.65 kB (4.41 kB) |                               ![GitHub release (with filter)](https://img.shields.io/npm/v/abaca?logo=npm&label=) |                          ![GitHub Repo stars](https://img.shields.io/github/stars/opvious/abaca?logo=github&label=) |                               ![npm](https://img.shields.io/npm/dm/abaca?logo=npm&label=) |
| feTS<br />[NPM](https://www.npmjs.com/package/fets) - [Docs](https://the-guild.dev/) - [Bundlephobia](https://bundlephobia.com/package/fets)                                  |                               38.01 kB (12.77 kB) |                                ![GitHub release (with filter)](https://img.shields.io/npm/v/fets?logo=npm&label=) |                           ![GitHub Repo stars](https://img.shields.io/github/stars/ardatan/fets?logo=github&label=) |                                ![npm](https://img.shields.io/npm/dm/fets?logo=npm&label=) |
| oazapfts<br />[NPM](https://www.npmjs.com/package/oazapfts)                                                                                                                   |     8.52 kB (3.10 kB)<br />🚛: 22.02 kB (5.57 kB) |                            ![GitHub release (with filter)](https://img.shields.io/npm/v/oazapfts?logo=npm&label=) |                      ![GitHub Repo stars](https://img.shields.io/github/stars/oazapfts/oazapfts?logo=github&label=) |                            ![npm](https://img.shields.io/npm/dm/oazapfts?logo=npm&label=) |
| openapi-generator-cli<br />[NPM](https://www.npmjs.com/package/@openapitools/openapi-generator-cli)                                                                           | 56.20 kB (15.96 kB)<br />🚛: 121.59 kB (21.02 kB) | ![GitHub release (with filter)](https://img.shields.io/npm/v/@openapitools/openapi-generator-cli?logo=npm&label=) |         ![GitHub Repo stars](https://img.shields.io/github/stars/OpenAPITools/openapi-generator?logo=github&label=) | ![npm](https://img.shields.io/npm/dm/@openapitools/openapi-generator-cli?logo=npm&label=) |
| openapi-fetch<br />[NPM](https://www.npmjs.com/package/openapi-fetch) - [Docs](https://openapi-ts.pages.dev) - [Bundlephobia](https://bundlephobia.com/package/openapi-fetch) |                                 3.80 kB (1.62 kB) |                       ![GitHub release (with filter)](https://img.shields.io/npm/v/openapi-fetch?logo=npm&label=) |                   ![GitHub Repo stars](https://img.shields.io/github/stars/drwpow/openapi-fetch?logo=github&label=) |                       ![npm](https://img.shields.io/npm/dm/openapi-fetch?logo=npm&label=) |
| openapi-typescript<br />[NPM](https://www.npmjs.com/package/openapi-typescript) - [Docs](https://openapi-ts.pages.dev)                                                        |                                    _(types only)_ |                  ![GitHub release (with filter)](https://img.shields.io/npm/v/openapi-typescript?logo=npm&label=) |              ![GitHub Repo stars](https://img.shields.io/github/stars/drwpow/openapi-typescript?logo=github&label=) |                  ![npm](https://img.shields.io/npm/dm/openapi-typescript?logo=npm&label=) |
| openapi-typescript-codegen (fetch)<br />[NPM](https://www.npmjs.com/package/openapi-typescript-codegen)                                                                       |                                87.47 kB (7.06 kB) |          ![GitHub release (with filter)](https://img.shields.io/npm/v/openapi-typescript-codegen?logo=npm&label=) | ![GitHub Repo stars](https://img.shields.io/github/stars/ferdikoomen/openapi-typescript-codegen?logo=github&label=) |          ![npm](https://img.shields.io/npm/dm/openapi-typescript-codegen?logo=npm&label=) |
| openapi-typescript-codegen (axios)<br />[NPM](https://www.npmjs.com/package/openapi-typescript-codegen)                                                                       |                              117.06 kB (18.62 kB) |                                                                                                                ⤴️ |                                                                                                                  ⤴️ |                                                                                        ⤴️ |
| openapi-typescript-fetch<br />[NPM](https://www.npmjs.com/package/openapi-typescript-fetch) - [Bundlephobia](https://bundlephobia.com/package/openapi-typescript-fetch)       |                                 5.03 kB (2.05 kB) |            ![GitHub release (with filter)](https://img.shields.io/npm/v/openapi-typescript-fetch?logo=npm&label=) |   ![GitHub Repo stars](https://img.shields.io/github/stars/ajaishankar/openapi-typescript-fetch?logo=github&label=) |            ![npm](https://img.shields.io/npm/dm/openapi-typescript-fetch?logo=npm&label=) |
| orval<br />[NPM](https://www.npmjs.com/package/orval) - [Docs](https://orval.dev/)                                                                                            |  30.43 kB (12.38 kB)<br />🚛: 41.79 kB (14.75 kB) |                               ![GitHub release (with filter)](https://img.shields.io/npm/v/orval?logo=npm&label=) |                        ![GitHub Repo stars](https://img.shields.io/github/stars/anymaniax/orval?logo=github&label=) |                               ![npm](https://img.shields.io/npm/dm/orval?logo=npm&label=) |
| orval (fetch)<br />[NPM](https://www.npmjs.com/package/orval) - [Docs](https://orval.dev/)                                                                                    |    1.36 kB (0.74 kB) <br />🚛: 11.48 kB (3.12 kB) |                                                                                                                ⤴️ |                                                                                                                  ⤴️ |                                                                                        ⤴️ |
| typed-openapi<br />[NPM](https://www.npmjs.com/package/typed-openapi)                                                                                                         |                                 1.83 kB (0.90 kB) |                       ![GitHub release (with filter)](https://img.shields.io/npm/v/typed-openapi?logo=npm&label=) |                 ![GitHub Repo stars](https://img.shields.io/github/stars/astahmer/typed-openapi?logo=github&label=) |                       ![npm](https://img.shields.io/npm/dm/typed-openapi?logo=npm&label=) |
| typed-openapi (runtime: zod)<br />[NPM](https://www.npmjs.com/package/typed-openapi)                                                                                          |                               89.72 kB (17.77 kB) |                                                                                                                ⤴️ |                                                                                                                  ⤴️ |                                                                                        ⤴️ |

**Notes:**

- [1]: Variations come from using a few endpoints or importing the entire client. Other generated clients have a flat cost.

## Additional notes

### feTs

`feTS` requires a typescript file as the input. A script `scripts/generate.sh` downloads the OpenAPI spec file and converts it from YAML to JSON and from JSON to Typescript. [https://github.com/microsoft/TypeScript/issues/32063](https://github.com/microsoft/TypeScript/issues/32063)

### openapi-generator-cli

Using v7.1.0 failed on generating the client with a number of TypeScript compilation errors. The example uses v6.6.0 instead.

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

### typed-openapi

To generate the client/types, we had to update the input OpenAPI spec file in order to remove the property `operationId`

- [https://github.com/astahmer/typed-openapi/issues/19](https://github.com/astahmer/typed-openapi/issues/19)
- [https://github.com/astahmer/typed-openapi/issues/2](https://github.com/astahmer/typed-openapi/issues/2)
