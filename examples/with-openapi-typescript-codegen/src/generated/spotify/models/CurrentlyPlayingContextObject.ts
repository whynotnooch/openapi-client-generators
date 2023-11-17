/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ContextObject } from './ContextObject';
import type { DeviceObject } from './DeviceObject';
import type { DisallowsObject } from './DisallowsObject';
import type { EpisodeObject } from './EpisodeObject';
import type { TrackObject } from './TrackObject';

export type CurrentlyPlayingContextObject = {
    /**
     * Allows to update the user interface based on which playback actions are available within the current context.
     *
     */
    actions?: DisallowsObject;
    /**
     * A Context Object. Can be `null`.
     */
    context?: ContextObject;
    /**
     * The object type of the currently playing item. Can be one of `track`, `episode`, `ad` or `unknown`.
     *
     */
    currently_playing_type?: string;
    /**
     * The device that is currently active.
     *
     */
    device?: DeviceObject;
    /**
     * If something is currently playing, return `true`.
     */
    is_playing?: boolean;
    /**
     * The currently playing track or episode. Can be `null`.
     */
    item?: (TrackObject | EpisodeObject);
    /**
     * Progress into the currently playing track or episode. Can be `null`.
     */
    progress_ms?: number;
    /**
     * off, track, context
     */
    repeat_state?: string;
    /**
     * If shuffle is on or off.
     */
    shuffle_state?: boolean;
    /**
     * Unix Millisecond Timestamp when data was fetched.
     */
    timestamp?: number;
};

