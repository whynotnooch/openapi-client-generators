/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AlbumRestrictionObject } from './AlbumRestrictionObject';
import type { ExternalUrlObject } from './ExternalUrlObject';
import type { ImageObject } from './ImageObject';

export type AlbumBase = {
    /**
     * The type of the album.
     *
     */
    album_type: AlbumBase.album_type;
    /**
     * The markets in which the album is available: [ISO 3166-1 alpha-2 country codes](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). _**NOTE**: an album is considered available in a market when at least 1 of its tracks is available in that market._
     *
     */
    available_markets: Array<string>;
    /**
     * Known external URLs for this album.
     *
     */
    external_urls: ExternalUrlObject;
    /**
     * A link to the Web API endpoint providing full details of the album.
     *
     */
    href: string;
    /**
     * The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the album.
     *
     */
    id: string;
    /**
     * The cover art for the album in various sizes, widest first.
     *
     */
    images: Array<ImageObject>;
    /**
     * The name of the album. In case of an album takedown, the value may be an empty string.
     *
     */
    name: string;
    /**
     * The date the album was first released.
     *
     */
    release_date: string;
    /**
     * The precision with which `release_date` value is known.
     *
     */
    release_date_precision: AlbumBase.release_date_precision;
    /**
     * Included in the response when a content restriction is applied.
     *
     */
    restrictions?: AlbumRestrictionObject;
    /**
     * The number of tracks in the album.
     */
    total_tracks: number;
    /**
     * The object type.
     *
     */
    type: AlbumBase.type;
    /**
     * The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the album.
     *
     */
    uri: string;
};

export namespace AlbumBase {

    /**
     * The type of the album.
     *
     */
    export enum album_type {
        ALBUM = 'album',
        SINGLE = 'single',
        COMPILATION = 'compilation',
    }

    /**
     * The precision with which `release_date` value is known.
     *
     */
    export enum release_date_precision {
        YEAR = 'year',
        MONTH = 'month',
        DAY = 'day',
    }

    /**
     * The object type.
     *
     */
    export enum type {
        ALBUM = 'album',
    }


}

