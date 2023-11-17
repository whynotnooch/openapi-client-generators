/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AlbumBase } from './AlbumBase';
import type { CopyrightObject } from './CopyrightObject';
import type { ExternalIdObject } from './ExternalIdObject';
import type { PagingSimplifiedTrackObject } from './PagingSimplifiedTrackObject';
import type { SimplifiedArtistObject } from './SimplifiedArtistObject';

export type AlbumObject = (AlbumBase & {
    /**
     * The artists of the album. Each artist object includes a link in `href` to more detailed information about the artist.
     *
     */
    artists?: Array<SimplifiedArtistObject>;
    /**
     * The copyright statements of the album.
     */
    copyrights?: Array<CopyrightObject>;
    /**
     * Known external IDs for the album.
     *
     */
    external_ids?: ExternalIdObject;
    /**
     * A list of the genres used to classify the album. (If not yet classified, the array is empty.)
     */
    genres?: Array<string>;
    /**
     * The label for the album.
     */
    label?: string;
    /**
     * The popularity of the album, with 100 being the most popular. The popularity is calculated from the popularity of the album's individual tracks.
     */
    popularity?: number;
    /**
     * The tracks of the album.
     *
     */
    tracks?: PagingSimplifiedTrackObject;
});

