/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ContextObject } from './ContextObject';
import type { TrackObject } from './TrackObject';

export type PlayHistoryObject = {
    /**
     * The context the track was played from.
     */
    context?: ContextObject;
    /**
     * The date and time the track was played.
     */
    played_at?: string;
    /**
     * The track the user listened to.
     */
    track?: TrackObject;
};

