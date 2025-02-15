/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PlayerErrorReasons } from './PlayerErrorReasons';

export type PlayerErrorObject = {
    /**
     * A short description of the cause of the error.
     *
     */
    message?: string;
    reason?: PlayerErrorReasons;
    /**
     * The HTTP status code. Either `404 NOT FOUND` or `403 FORBIDDEN`.  Also returned in the response header.
     *
     */
    status?: number;
};

