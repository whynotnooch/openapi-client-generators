/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export { ApiClient } from './ApiClient';

export { ApiError } from './core/ApiError';
export { BaseHttpRequest } from './core/BaseHttpRequest';
export { CancelablePromise, CancelError } from './core/CancelablePromise';
export { OpenAPI } from './core/OpenAPI';
export type { OpenAPIConfig } from './core/OpenAPI';

export { AlbumBase } from './models/AlbumBase';
export type { AlbumObject } from './models/AlbumObject';
export { AlbumRestrictionObject } from './models/AlbumRestrictionObject';
export { ArtistObject } from './models/ArtistObject';
export type { AudioAnalysisObject } from './models/AudioAnalysisObject';
export { AudiobookBase } from './models/AudiobookBase';
export type { AudiobookObject } from './models/AudiobookObject';
export { AudioFeaturesObject } from './models/AudioFeaturesObject';
export type { AuthorObject } from './models/AuthorObject';
export type { CategoryObject } from './models/CategoryObject';
export { ChapterBase } from './models/ChapterBase';
export type { ChapterObject } from './models/ChapterObject';
export type { ChapterRestrictionObject } from './models/ChapterRestrictionObject';
export type { ContextObject } from './models/ContextObject';
export type { CopyrightObject } from './models/CopyrightObject';
export type { CurrentlyPlayingContextObject } from './models/CurrentlyPlayingContextObject';
export type { CurrentlyPlayingObject } from './models/CurrentlyPlayingObject';
export type { CursorObject } from './models/CursorObject';
export type { CursorPagingObject } from './models/CursorPagingObject';
export type { CursorPagingPlayHistoryObject } from './models/CursorPagingPlayHistoryObject';
export type { CursorPagingSimplifiedArtistObject } from './models/CursorPagingSimplifiedArtistObject';
export type { DeviceObject } from './models/DeviceObject';
export type { DevicesObject } from './models/DevicesObject';
export type { DisallowsObject } from './models/DisallowsObject';
export { EpisodeBase } from './models/EpisodeBase';
export type { EpisodeObject } from './models/EpisodeObject';
export type { EpisodeRestrictionObject } from './models/EpisodeRestrictionObject';
export type { ErrorObject } from './models/ErrorObject';
export type { ExplicitContentSettingsObject } from './models/ExplicitContentSettingsObject';
export type { ExternalIdObject } from './models/ExternalIdObject';
export type { ExternalUrlObject } from './models/ExternalUrlObject';
export type { FollowersObject } from './models/FollowersObject';
export type { ImageObject } from './models/ImageObject';
export type { Key } from './models/Key';
export type { LinkedTrackObject } from './models/LinkedTrackObject';
export type { Loudness } from './models/Loudness';
export type { Mode } from './models/Mode';
export type { NarratorObject } from './models/NarratorObject';
export type { PagingArtistObject } from './models/PagingArtistObject';
export type { PagingFeaturedPlaylistObject } from './models/PagingFeaturedPlaylistObject';
export type { PagingObject } from './models/PagingObject';
export type { PagingPlaylistObject } from './models/PagingPlaylistObject';
export type { PagingPlaylistTrackObject } from './models/PagingPlaylistTrackObject';
export type { PagingSavedAlbumObject } from './models/PagingSavedAlbumObject';
export type { PagingSavedAudiobookObject } from './models/PagingSavedAudiobookObject';
export type { PagingSavedEpisodeObject } from './models/PagingSavedEpisodeObject';
export type { PagingSavedShowObject } from './models/PagingSavedShowObject';
export type { PagingSavedTrackObject } from './models/PagingSavedTrackObject';
export type { PagingSimplifiedAlbumObject } from './models/PagingSimplifiedAlbumObject';
export type { PagingSimplifiedArtistObject } from './models/PagingSimplifiedArtistObject';
export type { PagingSimplifiedAudiobookObject } from './models/PagingSimplifiedAudiobookObject';
export type { PagingSimplifiedChapterObject } from './models/PagingSimplifiedChapterObject';
export type { PagingSimplifiedEpisodeObject } from './models/PagingSimplifiedEpisodeObject';
export type { PagingSimplifiedShowObject } from './models/PagingSimplifiedShowObject';
export type { PagingSimplifiedTrackObject } from './models/PagingSimplifiedTrackObject';
export type { PagingTrackObject } from './models/PagingTrackObject';
export type { PathAlbumId } from './models/PathAlbumId';
export type { PathArtistId } from './models/PathArtistId';
export type { PathAudiobookId } from './models/PathAudiobookId';
export type { PathChapterId } from './models/PathChapterId';
export type { PathPlaylistId } from './models/PathPlaylistId';
export type { PathShowId } from './models/PathShowId';
export type { PathUserId } from './models/PathUserId';
export type { PlayerErrorObject } from './models/PlayerErrorObject';
export { PlayerErrorReasons } from './models/PlayerErrorReasons';
export type { PlayHistoryObject } from './models/PlayHistoryObject';
export type { PlaylistObject } from './models/PlaylistObject';
export type { PlaylistOwnerObject } from './models/PlaylistOwnerObject';
export type { PlaylistTrackObject } from './models/PlaylistTrackObject';
export type { PlaylistTracksRefObject } from './models/PlaylistTracksRefObject';
export { PlaylistUserObject } from './models/PlaylistUserObject';
export type { PrivateUserObject } from './models/PrivateUserObject';
export { PublicUserObject } from './models/PublicUserObject';
export type { QueryAdditionalTypes } from './models/QueryAdditionalTypes';
export type { QueryAlbumIds } from './models/QueryAlbumIds';
export type { QueryAudiobookIds } from './models/QueryAudiobookIds';
export type { QueryChapterIds } from './models/QueryChapterIds';
export type { QueryIncludeGroups } from './models/QueryIncludeGroups';
export type { QueryLimit } from './models/QueryLimit';
export type { QueryMarket } from './models/QueryMarket';
export type { QueryOffset } from './models/QueryOffset';
export type { QueryShowIds } from './models/QueryShowIds';
export type { QueryTrackIds } from './models/QueryTrackIds';
export type { QueueObject } from './models/QueueObject';
export type { RecommendationSeedObject } from './models/RecommendationSeedObject';
export type { RecommendationsObject } from './models/RecommendationsObject';
export type { ResumePointObject } from './models/ResumePointObject';
export type { SavedAlbumObject } from './models/SavedAlbumObject';
export type { SavedAudiobookObject } from './models/SavedAudiobookObject';
export type { SavedEpisodeObject } from './models/SavedEpisodeObject';
export type { SavedShowObject } from './models/SavedShowObject';
export type { SavedTrackObject } from './models/SavedTrackObject';
export { SectionObject } from './models/SectionObject';
export type { SegmentObject } from './models/SegmentObject';
export { ShowBase } from './models/ShowBase';
export type { ShowObject } from './models/ShowObject';
export { SimplifiedAlbumObject } from './models/SimplifiedAlbumObject';
export { SimplifiedArtistObject } from './models/SimplifiedArtistObject';
export type { SimplifiedAudiobookObject } from './models/SimplifiedAudiobookObject';
export type { SimplifiedChapterObject } from './models/SimplifiedChapterObject';
export type { SimplifiedEpisodeObject } from './models/SimplifiedEpisodeObject';
export type { SimplifiedPlaylistObject } from './models/SimplifiedPlaylistObject';
export type { SimplifiedShowObject } from './models/SimplifiedShowObject';
export type { SimplifiedTrackObject } from './models/SimplifiedTrackObject';
export type { Tempo } from './models/Tempo';
export type { TimeIntervalObject } from './models/TimeIntervalObject';
export type { TimeSignature } from './models/TimeSignature';
export { TrackObject } from './models/TrackObject';
export type { TrackRestrictionObject } from './models/TrackRestrictionObject';
export type { TuneableTrackObject } from './models/TuneableTrackObject';

export { AlbumsService } from './services/AlbumsService';
export { ArtistsService } from './services/ArtistsService';
export { AudiobooksService } from './services/AudiobooksService';
export { CategoriesService } from './services/CategoriesService';
export { ChaptersService } from './services/ChaptersService';
export { EpisodesService } from './services/EpisodesService';
export { GenresService } from './services/GenresService';
export { LibraryService } from './services/LibraryService';
export { MarketsService } from './services/MarketsService';
export { PlayerService } from './services/PlayerService';
export { PlaylistsService } from './services/PlaylistsService';
export { SearchService } from './services/SearchService';
export { ShowsService } from './services/ShowsService';
export { TracksService } from './services/TracksService';
export { UsersService } from './services/UsersService';
