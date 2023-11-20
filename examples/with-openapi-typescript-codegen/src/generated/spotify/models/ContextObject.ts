/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ExternalUrlObject } from './ExternalUrlObject';

export type ContextObject = {
    /**
     * External URLs for this context.
     */
    external_urls?: ExternalUrlObject;
    /**
     * A link to the Web API endpoint providing full details of the track.
     */
    href?: string;
    /**
     * The object type, e.g. "artist", "playlist", "album", "show".
     *
     */
    type?: string;
    /**
     * The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the context.
     *
     */
    uri?: string;
};

