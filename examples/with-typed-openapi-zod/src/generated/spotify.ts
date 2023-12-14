import z from "zod";

export type ExternalUrlObject = z.infer<typeof ExternalUrlObject>;
export const ExternalUrlObject = z.object({
  spotify: z.string().optional(),
});

export type ImageObject = z.infer<typeof ImageObject>;
export const ImageObject = z.object({
  height: z.union([z.number(), z.null()]),
  url: z.string(),
  width: z.union([z.number(), z.null()]),
});

export type AlbumRestrictionObject = z.infer<typeof AlbumRestrictionObject>;
export const AlbumRestrictionObject = z.object({
  reason: z.union([z.literal("market"), z.literal("product"), z.literal("explicit")]).optional(),
});

export type AlbumBase = z.infer<typeof AlbumBase>;
export const AlbumBase = z.object({
  album_type: z.union([z.literal("album"), z.literal("single"), z.literal("compilation")]),
  available_markets: z.array(z.string()),
  external_urls: ExternalUrlObject,
  href: z.string(),
  id: z.string(),
  images: z.array(ImageObject),
  name: z.string(),
  release_date: z.string(),
  release_date_precision: z.union([z.literal("year"), z.literal("month"), z.literal("day")]),
  restrictions: z.union([AlbumRestrictionObject, z.undefined()]).optional(),
  total_tracks: z.number(),
  type: z.literal("album"),
  uri: z.string(),
});

export type SimplifiedArtistObject = z.infer<typeof SimplifiedArtistObject>;
export const SimplifiedArtistObject = z.object({
  external_urls: ExternalUrlObject.optional(),
  href: z.string().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  type: z.literal("artist").optional(),
  uri: z.string().optional(),
});

export type CopyrightObject = z.infer<typeof CopyrightObject>;
export const CopyrightObject = z.object({
  text: z.string().optional(),
  type: z.string().optional(),
});

export type ExternalIdObject = z.infer<typeof ExternalIdObject>;
export const ExternalIdObject = z.object({
  ean: z.string().optional(),
  isrc: z.string().optional(),
  upc: z.string().optional(),
});

export type PagingObject = z.infer<typeof PagingObject>;
export const PagingObject = z.object({
  href: z.string(),
  limit: z.number(),
  next: z.union([z.string(), z.null()]),
  offset: z.number(),
  previous: z.union([z.string(), z.null()]),
  total: z.number(),
});

export type LinkedTrackObject = z.infer<typeof LinkedTrackObject>;
export const LinkedTrackObject = z.object({
  external_urls: ExternalUrlObject.optional(),
  href: z.string().optional(),
  id: z.string().optional(),
  type: z.string().optional(),
  uri: z.string().optional(),
});

export type TrackRestrictionObject = z.infer<typeof TrackRestrictionObject>;
export const TrackRestrictionObject = z.object({
  reason: z.string().optional(),
});

export type SimplifiedTrackObject = z.infer<typeof SimplifiedTrackObject>;
export const SimplifiedTrackObject = z.object({
  artists: z.array(SimplifiedArtistObject).optional(),
  available_markets: z.array(z.string()).optional(),
  disc_number: z.number().optional(),
  duration_ms: z.number().optional(),
  explicit: z.boolean().optional(),
  external_urls: ExternalUrlObject.optional(),
  href: z.string().optional(),
  id: z.string().optional(),
  is_local: z.boolean().optional(),
  is_playable: z.boolean().optional(),
  linked_from: LinkedTrackObject.optional(),
  name: z.string().optional(),
  preview_url: z.string().optional(),
  restrictions: TrackRestrictionObject.optional(),
  track_number: z.number().optional(),
  type: z.string().optional(),
  uri: z.string().optional(),
});

export type PagingSimplifiedTrackObject = z.infer<typeof PagingSimplifiedTrackObject>;
export const PagingSimplifiedTrackObject = z.intersection(
  PagingObject,
  z.object({
    items: z.array(SimplifiedTrackObject).optional(),
  }),
);

export type AlbumObject = z.infer<typeof AlbumObject>;
export const AlbumObject = z.intersection(
  AlbumBase,
  z.object({
    artists: z.array(SimplifiedArtistObject).optional(),
    copyrights: z.array(CopyrightObject).optional(),
    external_ids: ExternalIdObject.optional(),
    genres: z.array(z.string()).optional(),
    label: z.string().optional(),
    popularity: z.number().optional(),
    tracks: PagingSimplifiedTrackObject.optional(),
  }),
);

export type FollowersObject = z.infer<typeof FollowersObject>;
export const FollowersObject = z.object({
  href: z.union([z.string(), z.null()]).optional(),
  total: z.number().optional(),
});

export type ArtistObject = z.infer<typeof ArtistObject>;
export const ArtistObject = z.object({
  external_urls: ExternalUrlObject.optional(),
  followers: FollowersObject.optional(),
  genres: z.array(z.string()).optional(),
  href: z.string().optional(),
  id: z.string().optional(),
  images: z.array(ImageObject).optional(),
  name: z.string().optional(),
  popularity: z.number().optional(),
  type: z.literal("artist").optional(),
  uri: z.string().optional(),
});

export type TimeIntervalObject = z.infer<typeof TimeIntervalObject>;
export const TimeIntervalObject = z.object({
  confidence: z.number().optional(),
  duration: z.number().optional(),
  start: z.number().optional(),
});

export type TimeSignature = z.infer<typeof TimeSignature>;
export const TimeSignature = z.number();

export type SectionObject = z.infer<typeof SectionObject>;
export const SectionObject = z.object({
  confidence: z.number().optional(),
  duration: z.number().optional(),
  key: z.number().optional(),
  key_confidence: z.number().optional(),
  loudness: z.number().optional(),
  mode: z.union([z.literal(-1), z.literal(0), z.literal(1)]).optional(),
  mode_confidence: z.number().optional(),
  start: z.number().optional(),
  tempo: z.number().optional(),
  tempo_confidence: z.number().optional(),
  time_signature: TimeSignature.optional(),
  time_signature_confidence: z.number().optional(),
});

export type SegmentObject = z.infer<typeof SegmentObject>;
export const SegmentObject = z.object({
  confidence: z.number().optional(),
  duration: z.number().optional(),
  loudness_end: z.number().optional(),
  loudness_max: z.number().optional(),
  loudness_max_time: z.number().optional(),
  loudness_start: z.number().optional(),
  pitches: z.array(z.number()).optional(),
  start: z.number().optional(),
  timbre: z.array(z.number()).optional(),
});

export type Key = z.infer<typeof Key>;
export const Key = z.number();

export type Loudness = z.infer<typeof Loudness>;
export const Loudness = z.number();

export type Mode = z.infer<typeof Mode>;
export const Mode = z.number();

export type Tempo = z.infer<typeof Tempo>;
export const Tempo = z.number();

export type AudioAnalysisObject = z.infer<typeof AudioAnalysisObject>;
export const AudioAnalysisObject = z.object({
  bars: z.array(TimeIntervalObject).optional(),
  beats: z.array(TimeIntervalObject).optional(),
  meta: z
    .object({
      analysis_time: z.number().optional(),
      analyzer_version: z.string().optional(),
      detailed_status: z.string().optional(),
      input_process: z.string().optional(),
      platform: z.string().optional(),
      status_code: z.number().optional(),
      timestamp: z.number().optional(),
    })
    .optional(),
  sections: z.array(SectionObject).optional(),
  segments: z.array(SegmentObject).optional(),
  tatums: z.array(TimeIntervalObject).optional(),
  track: z
    .object({
      analysis_channels: z.number().optional(),
      analysis_sample_rate: z.number().optional(),
      code_version: z.number().optional(),
      codestring: z.string().optional(),
      duration: z.number().optional(),
      echoprint_version: z.number().optional(),
      echoprintstring: z.string().optional(),
      end_of_fade_in: z.number().optional(),
      key: Key.optional(),
      key_confidence: z.number().optional(),
      loudness: Loudness.optional(),
      mode: Mode.optional(),
      mode_confidence: z.number().optional(),
      num_samples: z.number().optional(),
      offset_seconds: z.number().optional(),
      rhythm_version: z.number().optional(),
      rhythmstring: z.string().optional(),
      sample_md5: z.string().optional(),
      start_of_fade_out: z.number().optional(),
      synch_version: z.number().optional(),
      synchstring: z.string().optional(),
      tempo: Tempo.optional(),
      tempo_confidence: z.number().optional(),
      time_signature: TimeSignature.optional(),
      time_signature_confidence: z.number().optional(),
      window_seconds: z.number().optional(),
    })
    .optional(),
});

export type AudioFeaturesObject = z.infer<typeof AudioFeaturesObject>;
export const AudioFeaturesObject = z.object({
  acousticness: z.number().optional(),
  analysis_url: z.string().optional(),
  danceability: z.number().optional(),
  duration_ms: z.number().optional(),
  energy: z.number().optional(),
  id: z.string().optional(),
  instrumentalness: z.number().optional(),
  key: Key.optional(),
  liveness: z.number().optional(),
  loudness: Loudness.optional(),
  mode: Mode.optional(),
  speechiness: z.number().optional(),
  tempo: Tempo.optional(),
  time_signature: TimeSignature.optional(),
  track_href: z.string().optional(),
  type: z.literal("audio_features").optional(),
  uri: z.string().optional(),
  valence: z.number().optional(),
});

export type AuthorObject = z.infer<typeof AuthorObject>;
export const AuthorObject = z.object({
  name: z.string().optional(),
});

export type NarratorObject = z.infer<typeof NarratorObject>;
export const NarratorObject = z.object({
  name: z.string().optional(),
});

export type AudiobookBase = z.infer<typeof AudiobookBase>;
export const AudiobookBase = z.object({
  authors: z.array(AuthorObject),
  available_markets: z.array(z.string()),
  copyrights: z.array(CopyrightObject),
  description: z.string(),
  edition: z.union([z.string(), z.undefined()]).optional(),
  explicit: z.boolean(),
  external_urls: ExternalUrlObject,
  href: z.string(),
  html_description: z.string(),
  id: z.string(),
  images: z.array(ImageObject),
  languages: z.array(z.string()),
  media_type: z.string(),
  name: z.string(),
  narrators: z.array(NarratorObject),
  publisher: z.string(),
  total_chapters: z.number(),
  type: z.literal("audiobook"),
  uri: z.string(),
});

export type ChapterRestrictionObject = z.infer<typeof ChapterRestrictionObject>;
export const ChapterRestrictionObject = z.object({
  reason: z.string().optional(),
});

export type ResumePointObject = z.infer<typeof ResumePointObject>;
export const ResumePointObject = z.object({
  fully_played: z.boolean().optional(),
  resume_position_ms: z.number().optional(),
});

export type ChapterBase = z.infer<typeof ChapterBase>;
export const ChapterBase = z.object({
  audio_preview_url: z.string(),
  available_markets: z.union([z.array(z.string()), z.undefined()]).optional(),
  chapter_number: z.number(),
  description: z.string(),
  duration_ms: z.number(),
  explicit: z.boolean(),
  external_urls: ExternalUrlObject,
  href: z.string(),
  html_description: z.string(),
  id: z.string(),
  images: z.array(ImageObject),
  is_playable: z.boolean(),
  languages: z.array(z.string()),
  name: z.string(),
  release_date: z.string(),
  release_date_precision: z.union([z.literal("year"), z.literal("month"), z.literal("day")]),
  restrictions: z.union([ChapterRestrictionObject, z.undefined()]).optional(),
  resume_point: ResumePointObject,
  type: z.literal("episode"),
  uri: z.string(),
});

export type SimplifiedChapterObject = z.infer<typeof SimplifiedChapterObject>;
export const SimplifiedChapterObject = z.object({
  audio_preview_url: z.string(),
  available_markets: z.union([z.array(z.string()), z.undefined()]).optional(),
  chapter_number: z.number(),
  description: z.string(),
  duration_ms: z.number(),
  explicit: z.boolean(),
  external_urls: ExternalUrlObject,
  href: z.string(),
  html_description: z.string(),
  id: z.string(),
  images: z.array(ImageObject),
  is_playable: z.boolean(),
  languages: z.array(z.string()),
  name: z.string(),
  release_date: z.string(),
  release_date_precision: z.union([z.literal("year"), z.literal("month"), z.literal("day")]),
  restrictions: z.union([ChapterRestrictionObject, z.undefined()]).optional(),
  resume_point: ResumePointObject,
  type: z.literal("episode"),
  uri: z.string(),
});

export type PagingSimplifiedChapterObject = z.infer<typeof PagingSimplifiedChapterObject>;
export const PagingSimplifiedChapterObject = z.intersection(
  PagingObject,
  z.object({
    items: z.array(SimplifiedChapterObject).optional(),
  }),
);

export type AudiobookObject = z.infer<typeof AudiobookObject>;
export const AudiobookObject = z.intersection(
  AudiobookBase,
  z.object({
    chapters: PagingSimplifiedChapterObject,
  }),
);

export type CategoryObject = z.infer<typeof CategoryObject>;
export const CategoryObject = z.object({
  href: z.string(),
  icons: z.array(ImageObject),
  id: z.string(),
  name: z.string(),
});

export type SimplifiedAudiobookObject = z.infer<typeof SimplifiedAudiobookObject>;
export const SimplifiedAudiobookObject = z.object({
  authors: z.array(AuthorObject),
  available_markets: z.array(z.string()),
  copyrights: z.array(CopyrightObject),
  description: z.string(),
  edition: z.union([z.string(), z.undefined()]).optional(),
  explicit: z.boolean(),
  external_urls: ExternalUrlObject,
  href: z.string(),
  html_description: z.string(),
  id: z.string(),
  images: z.array(ImageObject),
  languages: z.array(z.string()),
  media_type: z.string(),
  name: z.string(),
  narrators: z.array(NarratorObject),
  publisher: z.string(),
  total_chapters: z.number(),
  type: z.literal("audiobook"),
  uri: z.string(),
});

export type ChapterObject = z.infer<typeof ChapterObject>;
export const ChapterObject = z.intersection(
  ChapterBase,
  z.object({
    audiobook: SimplifiedAudiobookObject,
  }),
);

export type ContextObject = z.infer<typeof ContextObject>;
export const ContextObject = z.object({
  external_urls: ExternalUrlObject.optional(),
  href: z.string().optional(),
  type: z.string().optional(),
  uri: z.string().optional(),
});

export type DisallowsObject = z.infer<typeof DisallowsObject>;
export const DisallowsObject = z.object({
  interrupting_playback: z.boolean().optional(),
  pausing: z.boolean().optional(),
  resuming: z.boolean().optional(),
  seeking: z.boolean().optional(),
  skipping_next: z.boolean().optional(),
  skipping_prev: z.boolean().optional(),
  toggling_repeat_context: z.boolean().optional(),
  toggling_repeat_track: z.boolean().optional(),
  toggling_shuffle: z.boolean().optional(),
  transferring_playback: z.boolean().optional(),
});

export type DeviceObject = z.infer<typeof DeviceObject>;
export const DeviceObject = z.object({
  id: z.union([z.string(), z.null()]).optional(),
  is_active: z.boolean().optional(),
  is_private_session: z.boolean().optional(),
  is_restricted: z.boolean().optional(),
  name: z.string().optional(),
  type: z.string().optional(),
  volume_percent: z.union([z.number(), z.null()]).optional(),
});

export type SimplifiedAlbumObject = z.infer<typeof SimplifiedAlbumObject>;
export const SimplifiedAlbumObject = z.intersection(
  AlbumBase,
  z.object({
    album_group: z
      .union([
        z.literal("album"),
        z.literal("single"),
        z.literal("compilation"),
        z.literal("appears_on"),
        z.undefined(),
      ])
      .optional(),
    artists: z.array(SimplifiedArtistObject),
  }),
);

export type TrackObject = z.infer<typeof TrackObject>;
export const TrackObject = z.object({
  album: SimplifiedAlbumObject.optional(),
  artists: z.array(ArtistObject).optional(),
  available_markets: z.array(z.string()).optional(),
  disc_number: z.number().optional(),
  duration_ms: z.number().optional(),
  explicit: z.boolean().optional(),
  external_ids: ExternalIdObject.optional(),
  external_urls: ExternalUrlObject.optional(),
  href: z.string().optional(),
  id: z.string().optional(),
  is_local: z.boolean().optional(),
  is_playable: z.boolean().optional(),
  linked_from: LinkedTrackObject.optional(),
  name: z.string().optional(),
  popularity: z.number().optional(),
  preview_url: z.string().optional(),
  restrictions: TrackRestrictionObject.optional(),
  track_number: z.number().optional(),
  type: z.literal("track").optional(),
  uri: z.string().optional(),
});

export type EpisodeRestrictionObject = z.infer<typeof EpisodeRestrictionObject>;
export const EpisodeRestrictionObject = z.object({
  reason: z.string().optional(),
});

export type EpisodeBase = z.infer<typeof EpisodeBase>;
export const EpisodeBase = z.object({
  audio_preview_url: z.string(),
  description: z.string(),
  duration_ms: z.number(),
  explicit: z.boolean(),
  external_urls: ExternalUrlObject,
  href: z.string(),
  html_description: z.string(),
  id: z.string(),
  images: z.array(ImageObject),
  is_externally_hosted: z.boolean(),
  is_playable: z.boolean(),
  language: z.union([z.string(), z.undefined()]).optional(),
  languages: z.array(z.string()),
  name: z.string(),
  release_date: z.string(),
  release_date_precision: z.union([z.literal("year"), z.literal("month"), z.literal("day")]),
  restrictions: z.union([EpisodeRestrictionObject, z.undefined()]).optional(),
  resume_point: ResumePointObject,
  type: z.literal("episode"),
  uri: z.string(),
});

export type ShowBase = z.infer<typeof ShowBase>;
export const ShowBase = z.object({
  available_markets: z.array(z.string()),
  copyrights: z.array(CopyrightObject),
  description: z.string(),
  explicit: z.boolean(),
  external_urls: ExternalUrlObject,
  href: z.string(),
  html_description: z.string(),
  id: z.string(),
  images: z.array(ImageObject),
  is_externally_hosted: z.boolean(),
  languages: z.array(z.string()),
  media_type: z.string(),
  name: z.string(),
  publisher: z.string(),
  total_episodes: z.number(),
  type: z.literal("show"),
  uri: z.string(),
});

export type SimplifiedShowObject = z.infer<typeof SimplifiedShowObject>;
export const SimplifiedShowObject = z.object({
  available_markets: z.array(z.string()),
  copyrights: z.array(CopyrightObject),
  description: z.string(),
  explicit: z.boolean(),
  external_urls: ExternalUrlObject,
  href: z.string(),
  html_description: z.string(),
  id: z.string(),
  images: z.array(ImageObject),
  is_externally_hosted: z.boolean(),
  languages: z.array(z.string()),
  media_type: z.string(),
  name: z.string(),
  publisher: z.string(),
  total_episodes: z.number(),
  type: z.literal("show"),
  uri: z.string(),
});

export type EpisodeObject = z.infer<typeof EpisodeObject>;
export const EpisodeObject = z.intersection(
  EpisodeBase,
  z.object({
    show: SimplifiedShowObject,
  }),
);

export type CurrentlyPlayingContextObject = z.infer<typeof CurrentlyPlayingContextObject>;
export const CurrentlyPlayingContextObject = z.object({
  actions: DisallowsObject.optional(),
  context: ContextObject.optional(),
  currently_playing_type: z.string().optional(),
  device: DeviceObject.optional(),
  is_playing: z.boolean().optional(),
  item: z.union([TrackObject, EpisodeObject]).optional(),
  progress_ms: z.number().optional(),
  repeat_state: z.string().optional(),
  shuffle_state: z.boolean().optional(),
  timestamp: z.number().optional(),
});

export type CurrentlyPlayingObject = z.infer<typeof CurrentlyPlayingObject>;
export const CurrentlyPlayingObject = z.object({
  context: ContextObject.optional(),
  currently_playing_type: z.string().optional(),
  is_playing: z.boolean().optional(),
  item: z.union([TrackObject, EpisodeObject]).optional(),
  progress_ms: z.number().optional(),
  timestamp: z.number().optional(),
});

export type CursorObject = z.infer<typeof CursorObject>;
export const CursorObject = z.object({
  after: z.string().optional(),
  before: z.string().optional(),
});

export type CursorPagingObject = z.infer<typeof CursorPagingObject>;
export const CursorPagingObject = z.object({
  cursors: CursorObject.optional(),
  href: z.string().optional(),
  limit: z.number().optional(),
  next: z.string().optional(),
  total: z.number().optional(),
});

export type PlayHistoryObject = z.infer<typeof PlayHistoryObject>;
export const PlayHistoryObject = z.object({
  context: ContextObject.optional(),
  played_at: z.string().optional(),
  track: TrackObject.optional(),
});

export type CursorPagingPlayHistoryObject = z.infer<typeof CursorPagingPlayHistoryObject>;
export const CursorPagingPlayHistoryObject = z.intersection(
  CursorPagingObject,
  z.object({
    items: z.array(PlayHistoryObject).optional(),
  }),
);

export type CursorPagingSimplifiedArtistObject = z.infer<typeof CursorPagingSimplifiedArtistObject>;
export const CursorPagingSimplifiedArtistObject = z.intersection(
  CursorPagingObject,
  z.object({
    items: z.array(ArtistObject).optional(),
  }),
);

export type DevicesObject = z.infer<typeof DevicesObject>;
export const DevicesObject = z.object({
  devices: z.array(DeviceObject).optional(),
});

export type ErrorObject = z.infer<typeof ErrorObject>;
export const ErrorObject = z.object({
  message: z.string(),
  status: z.number(),
});

export type ExplicitContentSettingsObject = z.infer<typeof ExplicitContentSettingsObject>;
export const ExplicitContentSettingsObject = z.object({
  filter_enabled: z.boolean().optional(),
  filter_locked: z.boolean().optional(),
});

export type PagingArtistObject = z.infer<typeof PagingArtistObject>;
export const PagingArtistObject = z.intersection(
  PagingObject,
  z.object({
    items: z.array(ArtistObject).optional(),
  }),
);

export type PlaylistUserObject = z.infer<typeof PlaylistUserObject>;
export const PlaylistUserObject = z.object({
  external_urls: ExternalUrlObject.optional(),
  followers: FollowersObject.optional(),
  href: z.string().optional(),
  id: z.string().optional(),
  type: z.literal("user").optional(),
  uri: z.string().optional(),
});

export type PlaylistOwnerObject = z.infer<typeof PlaylistOwnerObject>;
export const PlaylistOwnerObject = z.intersection(
  PlaylistUserObject,
  z.object({
    display_name: z.union([z.string(), z.null()]).optional(),
  }),
);

export type PlaylistTracksRefObject = z.infer<typeof PlaylistTracksRefObject>;
export const PlaylistTracksRefObject = z.object({
  href: z.string().optional(),
  total: z.number().optional(),
});

export type SimplifiedPlaylistObject = z.infer<typeof SimplifiedPlaylistObject>;
export const SimplifiedPlaylistObject = z.object({
  collaborative: z.boolean().optional(),
  description: z.string().optional(),
  external_urls: ExternalUrlObject.optional(),
  href: z.string().optional(),
  id: z.string().optional(),
  images: z.array(ImageObject).optional(),
  name: z.string().optional(),
  owner: PlaylistOwnerObject.optional(),
  public: z.boolean().optional(),
  snapshot_id: z.string().optional(),
  tracks: PlaylistTracksRefObject.optional(),
  type: z.string().optional(),
  uri: z.string().optional(),
});

export type PagingPlaylistObject = z.infer<typeof PagingPlaylistObject>;
export const PagingPlaylistObject = z.intersection(
  PagingObject,
  z.object({
    items: z.array(SimplifiedPlaylistObject).optional(),
  }),
);

export type PagingFeaturedPlaylistObject = z.infer<typeof PagingFeaturedPlaylistObject>;
export const PagingFeaturedPlaylistObject = z.object({
  message: z.string().optional(),
  playlists: PagingPlaylistObject.optional(),
});

export type PlaylistTrackObject = z.infer<typeof PlaylistTrackObject>;
export const PlaylistTrackObject = z.object({
  added_at: z.string().optional(),
  added_by: PlaylistUserObject.optional(),
  is_local: z.boolean().optional(),
  track: z.union([TrackObject, EpisodeObject]).optional(),
});

export type PagingPlaylistTrackObject = z.infer<typeof PagingPlaylistTrackObject>;
export const PagingPlaylistTrackObject = z.intersection(
  PagingObject,
  z.object({
    items: z.array(PlaylistTrackObject).optional(),
  }),
);

export type SavedAlbumObject = z.infer<typeof SavedAlbumObject>;
export const SavedAlbumObject = z.object({
  added_at: z.string().optional(),
  album: AlbumObject.optional(),
});

export type PagingSavedAlbumObject = z.infer<typeof PagingSavedAlbumObject>;
export const PagingSavedAlbumObject = z.intersection(
  PagingObject,
  z.object({
    items: z.array(SavedAlbumObject).optional(),
  }),
);

export type SavedAudiobookObject = z.infer<typeof SavedAudiobookObject>;
export const SavedAudiobookObject = z.object({
  added_at: z.string().optional(),
  audiobook: AudiobookObject.optional(),
});

export type PagingSavedAudiobookObject = z.infer<typeof PagingSavedAudiobookObject>;
export const PagingSavedAudiobookObject = z.intersection(
  PagingObject,
  z.object({
    items: z.array(SavedAudiobookObject).optional(),
  }),
);

export type SavedEpisodeObject = z.infer<typeof SavedEpisodeObject>;
export const SavedEpisodeObject = z.object({
  added_at: z.string().optional(),
  episode: EpisodeObject.optional(),
});

export type PagingSavedEpisodeObject = z.infer<typeof PagingSavedEpisodeObject>;
export const PagingSavedEpisodeObject = z.intersection(
  PagingObject,
  z.object({
    items: z.array(SavedEpisodeObject).optional(),
  }),
);

export type SavedShowObject = z.infer<typeof SavedShowObject>;
export const SavedShowObject = z.object({
  added_at: z.string().optional(),
  show: SimplifiedShowObject.optional(),
});

export type PagingSavedShowObject = z.infer<typeof PagingSavedShowObject>;
export const PagingSavedShowObject = z.intersection(
  PagingObject,
  z.object({
    items: z.array(SavedShowObject).optional(),
  }),
);

export type SavedTrackObject = z.infer<typeof SavedTrackObject>;
export const SavedTrackObject = z.object({
  added_at: z.string().optional(),
  track: TrackObject.optional(),
});

export type PagingSavedTrackObject = z.infer<typeof PagingSavedTrackObject>;
export const PagingSavedTrackObject = z.intersection(
  PagingObject,
  z.object({
    items: z.array(SavedTrackObject).optional(),
  }),
);

export type PagingSimplifiedAlbumObject = z.infer<typeof PagingSimplifiedAlbumObject>;
export const PagingSimplifiedAlbumObject = z.intersection(
  PagingObject,
  z.object({
    items: z.array(SimplifiedAlbumObject).optional(),
  }),
);

export type PagingSimplifiedArtistObject = z.infer<typeof PagingSimplifiedArtistObject>;
export const PagingSimplifiedArtistObject = z.intersection(
  PagingObject,
  z.object({
    items: z.array(SimplifiedArtistObject).optional(),
  }),
);

export type PagingSimplifiedAudiobookObject = z.infer<typeof PagingSimplifiedAudiobookObject>;
export const PagingSimplifiedAudiobookObject = z.intersection(
  PagingObject,
  z.object({
    items: z.array(SimplifiedAudiobookObject).optional(),
  }),
);

export type SimplifiedEpisodeObject = z.infer<typeof SimplifiedEpisodeObject>;
export const SimplifiedEpisodeObject = z.object({
  audio_preview_url: z.string(),
  description: z.string(),
  duration_ms: z.number(),
  explicit: z.boolean(),
  external_urls: ExternalUrlObject,
  href: z.string(),
  html_description: z.string(),
  id: z.string(),
  images: z.array(ImageObject),
  is_externally_hosted: z.boolean(),
  is_playable: z.boolean(),
  language: z.union([z.string(), z.undefined()]).optional(),
  languages: z.array(z.string()),
  name: z.string(),
  release_date: z.string(),
  release_date_precision: z.union([z.literal("year"), z.literal("month"), z.literal("day")]),
  restrictions: z.union([EpisodeRestrictionObject, z.undefined()]).optional(),
  resume_point: ResumePointObject,
  type: z.literal("episode"),
  uri: z.string(),
});

export type PagingSimplifiedEpisodeObject = z.infer<typeof PagingSimplifiedEpisodeObject>;
export const PagingSimplifiedEpisodeObject = z.intersection(
  PagingObject,
  z.object({
    items: z.array(SimplifiedEpisodeObject).optional(),
  }),
);

export type PagingSimplifiedShowObject = z.infer<typeof PagingSimplifiedShowObject>;
export const PagingSimplifiedShowObject = z.intersection(
  PagingObject,
  z.object({
    items: z.array(SimplifiedShowObject).optional(),
  }),
);

export type PagingTrackObject = z.infer<typeof PagingTrackObject>;
export const PagingTrackObject = z.intersection(
  PagingObject,
  z.object({
    items: z.array(TrackObject).optional(),
  }),
);

export type PlayerErrorReasons = z.infer<typeof PlayerErrorReasons>;
export const PlayerErrorReasons = z.union([
  z.literal("NO_PREV_TRACK"),
  z.literal("NO_NEXT_TRACK"),
  z.literal("NO_SPECIFIC_TRACK"),
  z.literal("ALREADY_PAUSED"),
  z.literal("NOT_PAUSED"),
  z.literal("NOT_PLAYING_LOCALLY"),
  z.literal("NOT_PLAYING_TRACK"),
  z.literal("NOT_PLAYING_CONTEXT"),
  z.literal("ENDLESS_CONTEXT"),
  z.literal("CONTEXT_DISALLOW"),
  z.literal("ALREADY_PLAYING"),
  z.literal("RATE_LIMITED"),
  z.literal("REMOTE_CONTROL_DISALLOW"),
  z.literal("DEVICE_NOT_CONTROLLABLE"),
  z.literal("VOLUME_CONTROL_DISALLOW"),
  z.literal("NO_ACTIVE_DEVICE"),
  z.literal("PREMIUM_REQUIRED"),
  z.literal("UNKNOWN"),
]);

export type PlayerErrorObject = z.infer<typeof PlayerErrorObject>;
export const PlayerErrorObject = z.object({
  message: z.string().optional(),
  reason: PlayerErrorReasons.optional(),
  status: z.number().optional(),
});

export type PlaylistObject = z.infer<typeof PlaylistObject>;
export const PlaylistObject = z.object({
  collaborative: z.boolean().optional(),
  description: z.union([z.string(), z.null()]).optional(),
  external_urls: ExternalUrlObject.optional(),
  followers: FollowersObject.optional(),
  href: z.string().optional(),
  id: z.string().optional(),
  images: z.array(ImageObject).optional(),
  name: z.string().optional(),
  owner: PlaylistOwnerObject.optional(),
  public: z.boolean().optional(),
  snapshot_id: z.string().optional(),
  tracks: PagingPlaylistTrackObject.optional(),
  type: z.string().optional(),
  uri: z.string().optional(),
});

export type PrivateUserObject = z.infer<typeof PrivateUserObject>;
export const PrivateUserObject = z.object({
  country: z.string().optional(),
  display_name: z.string().optional(),
  email: z.string().optional(),
  explicit_content: ExplicitContentSettingsObject.optional(),
  external_urls: ExternalUrlObject.optional(),
  followers: FollowersObject.optional(),
  href: z.string().optional(),
  id: z.string().optional(),
  images: z.array(ImageObject).optional(),
  product: z.string().optional(),
  type: z.string().optional(),
  uri: z.string().optional(),
});

export type PublicUserObject = z.infer<typeof PublicUserObject>;
export const PublicUserObject = z.object({
  display_name: z.union([z.string(), z.null()]).optional(),
  external_urls: ExternalUrlObject.optional(),
  followers: FollowersObject.optional(),
  href: z.string().optional(),
  id: z.string().optional(),
  images: z.array(ImageObject).optional(),
  type: z.literal("user").optional(),
  uri: z.string().optional(),
});

export type QueueObject = z.infer<typeof QueueObject>;
export const QueueObject = z.object({
  currently_playing: z.union([TrackObject, EpisodeObject]).optional(),
  queue: z.array(z.union([TrackObject, EpisodeObject])).optional(),
});

export type RecommendationSeedObject = z.infer<typeof RecommendationSeedObject>;
export const RecommendationSeedObject = z.object({
  afterFilteringSize: z.number().optional(),
  afterRelinkingSize: z.number().optional(),
  href: z.string().optional(),
  id: z.string().optional(),
  initialPoolSize: z.number().optional(),
  type: z.string().optional(),
});

export type RecommendationsObject = z.infer<typeof RecommendationsObject>;
export const RecommendationsObject = z.object({
  seeds: z.array(RecommendationSeedObject),
  tracks: z.array(TrackObject),
});

export type ShowObject = z.infer<typeof ShowObject>;
export const ShowObject = z.intersection(
  ShowBase,
  z.object({
    episodes: PagingSimplifiedEpisodeObject,
  }),
);

export type TuneableTrackObject = z.infer<typeof TuneableTrackObject>;
export const TuneableTrackObject = z.object({
  acousticness: z.number().optional(),
  danceability: z.number().optional(),
  duration_ms: z.number().optional(),
  energy: z.number().optional(),
  instrumentalness: z.number().optional(),
  key: Key.optional(),
  liveness: z.number().optional(),
  loudness: Loudness.optional(),
  mode: Mode.optional(),
  popularity: z.number().optional(),
  speechiness: z.number().optional(),
  tempo: Tempo.optional(),
  time_signature: TimeSignature.optional(),
  valence: z.number().optional(),
});

export type get_Albums = typeof get_Albums;
export const get_Albums = {
  method: z.literal("GET"),
  path: z.literal("/albums"),
  parameters: z.object({
    query: z.object({
      ids: z.string(),
      market: z.string(),
    }),
  }),
  response: z.object({
    albums: z.array(AlbumObject),
  }),
};

export type get_AlbumsId = typeof get_AlbumsId;
export const get_AlbumsId = {
  method: z.literal("GET"),
  path: z.literal("/albums/{id}"),
  parameters: z.object({
    query: z.object({
      market: z.string().optional(),
    }),
    path: z.object({
      id: z.string(),
    }),
  }),
  response: AlbumObject,
};

export type get_AlbumsIdtracks = typeof get_AlbumsIdtracks;
export const get_AlbumsIdtracks = {
  method: z.literal("GET"),
  path: z.literal("/albums/{id}/tracks"),
  parameters: z.object({
    query: z.object({
      market: z.string().optional(),
      limit: z.number().optional(),
      offset: z.number().optional(),
    }),
    path: z.object({
      id: z.string(),
    }),
  }),
  response: PagingSimplifiedTrackObject,
};

export type get_Artists = typeof get_Artists;
export const get_Artists = {
  method: z.literal("GET"),
  path: z.literal("/artists"),
  parameters: z.object({
    query: z.object({
      ids: z.string(),
    }),
  }),
  response: z.object({
    artists: z.array(ArtistObject),
  }),
};

export type get_ArtistsId = typeof get_ArtistsId;
export const get_ArtistsId = {
  method: z.literal("GET"),
  path: z.literal("/artists/{id}"),
  parameters: z.object({
    path: z.object({
      id: z.string(),
    }),
  }),
  response: ArtistObject,
};

export type get_ArtistsIdalbums = typeof get_ArtistsIdalbums;
export const get_ArtistsIdalbums = {
  method: z.literal("GET"),
  path: z.literal("/artists/{id}/albums"),
  parameters: z.object({
    query: z.object({
      include_groups: z.string().optional(),
      market: z.string().optional(),
      limit: z.number().optional(),
      offset: z.number().optional(),
    }),
    path: z.object({
      id: z.string(),
    }),
  }),
  response: PagingSimplifiedAlbumObject,
};

export type get_ArtistsIdrelatedArtists = typeof get_ArtistsIdrelatedArtists;
export const get_ArtistsIdrelatedArtists = {
  method: z.literal("GET"),
  path: z.literal("/artists/{id}/related-artists"),
  parameters: z.object({
    path: z.object({
      id: z.string(),
    }),
  }),
  response: z.object({
    artists: z.array(ArtistObject),
  }),
};

export type get_ArtistsIdtopTracks = typeof get_ArtistsIdtopTracks;
export const get_ArtistsIdtopTracks = {
  method: z.literal("GET"),
  path: z.literal("/artists/{id}/top-tracks"),
  parameters: z.object({
    query: z.object({
      market: z.string().optional(),
    }),
    path: z.object({
      id: z.string(),
    }),
  }),
  response: z.object({
    tracks: z.array(TrackObject),
  }),
};

export type get_AudioAnalysisId = typeof get_AudioAnalysisId;
export const get_AudioAnalysisId = {
  method: z.literal("GET"),
  path: z.literal("/audio-analysis/{id}"),
  parameters: z.object({
    path: z.object({
      id: z.string(),
    }),
  }),
  response: AudioAnalysisObject,
};

export type get_AudioFeatures = typeof get_AudioFeatures;
export const get_AudioFeatures = {
  method: z.literal("GET"),
  path: z.literal("/audio-features"),
  parameters: z.object({
    query: z.object({
      ids: z.string(),
    }),
  }),
  response: z.object({
    audio_features: z.array(AudioFeaturesObject),
  }),
};

export type get_AudioFeaturesId = typeof get_AudioFeaturesId;
export const get_AudioFeaturesId = {
  method: z.literal("GET"),
  path: z.literal("/audio-features/{id}"),
  parameters: z.object({
    path: z.object({
      id: z.string(),
    }),
  }),
  response: AudioFeaturesObject,
};

export type get_Audiobooks = typeof get_Audiobooks;
export const get_Audiobooks = {
  method: z.literal("GET"),
  path: z.literal("/audiobooks"),
  parameters: z.object({
    query: z.object({
      ids: z.string(),
      market: z.string(),
    }),
  }),
  response: z.object({
    audiobooks: z.array(AudiobookObject),
  }),
};

export type get_AudiobooksId = typeof get_AudiobooksId;
export const get_AudiobooksId = {
  method: z.literal("GET"),
  path: z.literal("/audiobooks/{id}"),
  parameters: z.object({
    query: z.object({
      market: z.string().optional(),
    }),
    path: z.object({
      id: z.string(),
    }),
  }),
  response: AudiobookObject,
};

export type get_AudiobooksIdchapters = typeof get_AudiobooksIdchapters;
export const get_AudiobooksIdchapters = {
  method: z.literal("GET"),
  path: z.literal("/audiobooks/{id}/chapters"),
  parameters: z.object({
    query: z.object({
      market: z.string().optional(),
      limit: z.number().optional(),
      offset: z.number().optional(),
    }),
    path: z.object({
      id: z.string(),
    }),
  }),
  response: PagingSimplifiedChapterObject,
};

export type get_Browsecategories = typeof get_Browsecategories;
export const get_Browsecategories = {
  method: z.literal("GET"),
  path: z.literal("/browse/categories"),
  parameters: z.object({
    query: z.object({
      country: z.string().optional(),
      locale: z.string().optional(),
      limit: z.number().optional(),
      offset: z.number().optional(),
    }),
  }),
  response: z.object({
    categories: z.intersection(
      PagingObject,
      z.object({
        items: z.array(CategoryObject).optional(),
      }),
    ),
  }),
};

export type get_BrowsecategoriesCategory_id = typeof get_BrowsecategoriesCategory_id;
export const get_BrowsecategoriesCategory_id = {
  method: z.literal("GET"),
  path: z.literal("/browse/categories/{category_id}"),
  parameters: z.object({
    query: z.object({
      country: z.string().optional(),
      locale: z.string().optional(),
    }),
    path: z.object({
      category_id: z.string(),
    }),
  }),
  response: CategoryObject,
};

export type get_BrowsecategoriesCategory_idplaylists = typeof get_BrowsecategoriesCategory_idplaylists;
export const get_BrowsecategoriesCategory_idplaylists = {
  method: z.literal("GET"),
  path: z.literal("/browse/categories/{category_id}/playlists"),
  parameters: z.object({
    query: z.object({
      country: z.string().optional(),
      limit: z.number().optional(),
      offset: z.number().optional(),
    }),
    path: z.object({
      category_id: z.string(),
    }),
  }),
  response: PagingFeaturedPlaylistObject,
};

export type get_BrowsefeaturedPlaylists = typeof get_BrowsefeaturedPlaylists;
export const get_BrowsefeaturedPlaylists = {
  method: z.literal("GET"),
  path: z.literal("/browse/featured-playlists"),
  parameters: z.object({
    query: z.object({
      country: z.string().optional(),
      locale: z.string().optional(),
      timestamp: z.string().optional(),
      limit: z.number().optional(),
      offset: z.number().optional(),
    }),
  }),
  response: PagingFeaturedPlaylistObject,
};

export type get_BrowsenewReleases = typeof get_BrowsenewReleases;
export const get_BrowsenewReleases = {
  method: z.literal("GET"),
  path: z.literal("/browse/new-releases"),
  parameters: z.object({
    query: z.object({
      country: z.string().optional(),
      limit: z.number().optional(),
      offset: z.number().optional(),
    }),
  }),
  response: z.object({
    albums: PagingSimplifiedAlbumObject,
  }),
};

export type get_Chapters = typeof get_Chapters;
export const get_Chapters = {
  method: z.literal("GET"),
  path: z.literal("/chapters"),
  parameters: z.object({
    query: z.object({
      ids: z.string(),
      market: z.string(),
    }),
  }),
  response: z.object({
    chapters: z.array(ChapterObject),
  }),
};

export type get_ChaptersId = typeof get_ChaptersId;
export const get_ChaptersId = {
  method: z.literal("GET"),
  path: z.literal("/chapters/{id}"),
  parameters: z.object({
    query: z.object({
      market: z.string().optional(),
    }),
    path: z.object({
      id: z.string(),
    }),
  }),
  response: ChapterObject,
};

export type get_Episodes = typeof get_Episodes;
export const get_Episodes = {
  method: z.literal("GET"),
  path: z.literal("/episodes"),
  parameters: z.object({
    query: z.object({
      ids: z.string(),
      market: z.string(),
    }),
  }),
  response: z.object({
    episodes: z.array(EpisodeObject),
  }),
};

export type get_EpisodesId = typeof get_EpisodesId;
export const get_EpisodesId = {
  method: z.literal("GET"),
  path: z.literal("/episodes/{id}"),
  parameters: z.object({
    query: z.object({
      market: z.string().optional(),
    }),
    path: z.object({
      id: z.string(),
    }),
  }),
  response: EpisodeObject,
};

export type get_Markets = typeof get_Markets;
export const get_Markets = {
  method: z.literal("GET"),
  path: z.literal("/markets"),
  parameters: z.never(),
  response: z.object({
    markets: z.array(z.string()).optional(),
  }),
};

export type get_Me = typeof get_Me;
export const get_Me = {
  method: z.literal("GET"),
  path: z.literal("/me"),
  parameters: z.never(),
  response: PrivateUserObject,
};

export type delete_Mealbums = typeof delete_Mealbums;
export const delete_Mealbums = {
  method: z.literal("DELETE"),
  path: z.literal("/me/albums"),
  parameters: z.object({
    query: z.object({
      ids: z.string(),
    }),
    body: z.intersection(
      z.object({
        ids: z.array(z.string()).optional(),
      }),
      z.object({
        string: z.any().optional(),
      }),
    ),
  }),
  response: z.unknown(),
};

export type get_Mealbums = typeof get_Mealbums;
export const get_Mealbums = {
  method: z.literal("GET"),
  path: z.literal("/me/albums"),
  parameters: z.object({
    query: z.object({
      limit: z.number().optional(),
      offset: z.number().optional(),
      market: z.string().optional(),
    }),
  }),
  response: PagingSavedAlbumObject,
};

export type put_Mealbums = typeof put_Mealbums;
export const put_Mealbums = {
  method: z.literal("PUT"),
  path: z.literal("/me/albums"),
  parameters: z.object({
    query: z.object({
      ids: z.string(),
    }),
    body: z.intersection(
      z.object({
        ids: z.array(z.string()).optional(),
      }),
      z.object({
        string: z.any().optional(),
      }),
    ),
  }),
  response: z.unknown(),
};

export type get_Mealbumscontains = typeof get_Mealbumscontains;
export const get_Mealbumscontains = {
  method: z.literal("GET"),
  path: z.literal("/me/albums/contains"),
  parameters: z.object({
    query: z.object({
      ids: z.string(),
    }),
  }),
  response: z.array(z.boolean()),
};

export type delete_Meaudiobooks = typeof delete_Meaudiobooks;
export const delete_Meaudiobooks = {
  method: z.literal("DELETE"),
  path: z.literal("/me/audiobooks"),
  parameters: z.object({
    query: z.object({
      ids: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type get_Meaudiobooks = typeof get_Meaudiobooks;
export const get_Meaudiobooks = {
  method: z.literal("GET"),
  path: z.literal("/me/audiobooks"),
  parameters: z.object({
    query: z.object({
      limit: z.number().optional(),
      offset: z.number().optional(),
    }),
  }),
  response: PagingSavedAudiobookObject,
};

export type put_Meaudiobooks = typeof put_Meaudiobooks;
export const put_Meaudiobooks = {
  method: z.literal("PUT"),
  path: z.literal("/me/audiobooks"),
  parameters: z.object({
    query: z.object({
      ids: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type get_Meaudiobookscontains = typeof get_Meaudiobookscontains;
export const get_Meaudiobookscontains = {
  method: z.literal("GET"),
  path: z.literal("/me/audiobooks/contains"),
  parameters: z.object({
    query: z.object({
      ids: z.string(),
    }),
  }),
  response: z.array(z.boolean()),
};

export type delete_Meepisodes = typeof delete_Meepisodes;
export const delete_Meepisodes = {
  method: z.literal("DELETE"),
  path: z.literal("/me/episodes"),
  parameters: z.object({
    query: z.object({
      ids: z.string(),
    }),
    body: z.intersection(
      z.object({
        ids: z.array(z.string()).optional(),
      }),
      z.object({
        string: z.any().optional(),
      }),
    ),
  }),
  response: z.unknown(),
};

export type get_Meepisodes = typeof get_Meepisodes;
export const get_Meepisodes = {
  method: z.literal("GET"),
  path: z.literal("/me/episodes"),
  parameters: z.object({
    query: z.object({
      market: z.string().optional(),
      limit: z.number().optional(),
      offset: z.number().optional(),
    }),
  }),
  response: PagingSavedEpisodeObject,
};

export type put_Meepisodes = typeof put_Meepisodes;
export const put_Meepisodes = {
  method: z.literal("PUT"),
  path: z.literal("/me/episodes"),
  parameters: z.object({
    query: z.object({
      ids: z.string(),
    }),
    body: z.intersection(
      z.object({
        ids: z.array(z.string()),
      }),
      z.object({
        string: z.any(),
      }),
    ),
  }),
  response: z.unknown(),
};

export type get_Meepisodescontains = typeof get_Meepisodescontains;
export const get_Meepisodescontains = {
  method: z.literal("GET"),
  path: z.literal("/me/episodes/contains"),
  parameters: z.object({
    query: z.object({
      ids: z.string(),
    }),
  }),
  response: z.array(z.boolean()),
};

export type delete_Mefollowing = typeof delete_Mefollowing;
export const delete_Mefollowing = {
  method: z.literal("DELETE"),
  path: z.literal("/me/following"),
  parameters: z.object({
    query: z.object({
      type: z.union([z.literal("artist"), z.literal("user")]),
      ids: z.string(),
    }),
    body: z.intersection(
      z.object({
        ids: z.array(z.string()).optional(),
      }),
      z.object({
        string: z.any().optional(),
      }),
    ),
  }),
  response: z.unknown(),
};

export type get_Mefollowing = typeof get_Mefollowing;
export const get_Mefollowing = {
  method: z.literal("GET"),
  path: z.literal("/me/following"),
  parameters: z.object({
    query: z.object({
      type: z.literal("artist"),
      after: z.string(),
      limit: z.number(),
    }),
  }),
  response: z.object({
    artists: CursorPagingSimplifiedArtistObject,
  }),
};

export type put_Mefollowing = typeof put_Mefollowing;
export const put_Mefollowing = {
  method: z.literal("PUT"),
  path: z.literal("/me/following"),
  parameters: z.object({
    query: z.object({
      type: z.union([z.literal("artist"), z.literal("user")]),
      ids: z.string(),
    }),
    body: z.intersection(
      z.object({
        ids: z.array(z.string()),
      }),
      z.object({
        string: z.any(),
      }),
    ),
  }),
  response: z.unknown(),
};

export type get_Mefollowingcontains = typeof get_Mefollowingcontains;
export const get_Mefollowingcontains = {
  method: z.literal("GET"),
  path: z.literal("/me/following/contains"),
  parameters: z.object({
    query: z.object({
      type: z.union([z.literal("artist"), z.literal("user")]),
      ids: z.string(),
    }),
  }),
  response: z.array(z.boolean()),
};

export type get_Meplayer = typeof get_Meplayer;
export const get_Meplayer = {
  method: z.literal("GET"),
  path: z.literal("/me/player"),
  parameters: z.object({
    query: z.object({
      market: z.string().optional(),
      additional_types: z.string().optional(),
    }),
  }),
  response: z.unknown(),
};

export type put_Meplayer = typeof put_Meplayer;
export const put_Meplayer = {
  method: z.literal("PUT"),
  path: z.literal("/me/player"),
  parameters: z.object({
    body: z.intersection(
      z.object({
        device_ids: z.array(z.string()),
        play: z.union([z.boolean(), z.undefined()]).optional(),
      }),
      z.object({
        string: z.any(),
      }),
    ),
  }),
  response: z.unknown(),
};

export type get_MeplayercurrentlyPlaying = typeof get_MeplayercurrentlyPlaying;
export const get_MeplayercurrentlyPlaying = {
  method: z.literal("GET"),
  path: z.literal("/me/player/currently-playing"),
  parameters: z.object({
    query: z.object({
      market: z.string().optional(),
      additional_types: z.string().optional(),
    }),
  }),
  response: CurrentlyPlayingObject,
};

export type get_Meplayerdevices = typeof get_Meplayerdevices;
export const get_Meplayerdevices = {
  method: z.literal("GET"),
  path: z.literal("/me/player/devices"),
  parameters: z.never(),
  response: DevicesObject,
};

export type post_Meplayernext = typeof post_Meplayernext;
export const post_Meplayernext = {
  method: z.literal("POST"),
  path: z.literal("/me/player/next"),
  parameters: z.object({
    query: z.object({
      device_id: z.string().optional(),
    }),
  }),
  response: z.unknown(),
};

export type put_Meplayerpause = typeof put_Meplayerpause;
export const put_Meplayerpause = {
  method: z.literal("PUT"),
  path: z.literal("/me/player/pause"),
  parameters: z.object({
    query: z.object({
      device_id: z.string().optional(),
    }),
  }),
  response: z.unknown(),
};

export type put_Meplayerplay = typeof put_Meplayerplay;
export const put_Meplayerplay = {
  method: z.literal("PUT"),
  path: z.literal("/me/player/play"),
  parameters: z.object({
    query: z.object({
      device_id: z.string().optional(),
    }),
    body: z.intersection(
      z.object({
        context_uri: z.string().optional(),
        offset: z.unknown().optional(),
        position_ms: z.number().optional(),
        uris: z.array(z.string()).optional(),
      }),
      z.object({
        string: z.any().optional(),
      }),
    ),
  }),
  response: z.unknown(),
};

export type post_Meplayerprevious = typeof post_Meplayerprevious;
export const post_Meplayerprevious = {
  method: z.literal("POST"),
  path: z.literal("/me/player/previous"),
  parameters: z.object({
    query: z.object({
      device_id: z.string().optional(),
    }),
  }),
  response: z.unknown(),
};

export type get_Meplayerqueue = typeof get_Meplayerqueue;
export const get_Meplayerqueue = {
  method: z.literal("GET"),
  path: z.literal("/me/player/queue"),
  parameters: z.never(),
  response: QueueObject,
};

export type post_Meplayerqueue = typeof post_Meplayerqueue;
export const post_Meplayerqueue = {
  method: z.literal("POST"),
  path: z.literal("/me/player/queue"),
  parameters: z.object({
    query: z.object({
      uri: z.string(),
      device_id: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type get_MeplayerrecentlyPlayed = typeof get_MeplayerrecentlyPlayed;
export const get_MeplayerrecentlyPlayed = {
  method: z.literal("GET"),
  path: z.literal("/me/player/recently-played"),
  parameters: z.object({
    query: z.object({
      limit: z.number().optional(),
      after: z.number().optional(),
      before: z.number().optional(),
    }),
  }),
  response: CursorPagingPlayHistoryObject,
};

export type put_Meplayerrepeat = typeof put_Meplayerrepeat;
export const put_Meplayerrepeat = {
  method: z.literal("PUT"),
  path: z.literal("/me/player/repeat"),
  parameters: z.object({
    query: z.object({
      state: z.string(),
      device_id: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type put_Meplayerseek = typeof put_Meplayerseek;
export const put_Meplayerseek = {
  method: z.literal("PUT"),
  path: z.literal("/me/player/seek"),
  parameters: z.object({
    query: z.object({
      position_ms: z.number(),
      device_id: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type put_Meplayershuffle = typeof put_Meplayershuffle;
export const put_Meplayershuffle = {
  method: z.literal("PUT"),
  path: z.literal("/me/player/shuffle"),
  parameters: z.object({
    query: z.object({
      state: z.boolean(),
      device_id: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type put_Meplayervolume = typeof put_Meplayervolume;
export const put_Meplayervolume = {
  method: z.literal("PUT"),
  path: z.literal("/me/player/volume"),
  parameters: z.object({
    query: z.object({
      volume_percent: z.number(),
      device_id: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type get_Meplaylists = typeof get_Meplaylists;
export const get_Meplaylists = {
  method: z.literal("GET"),
  path: z.literal("/me/playlists"),
  parameters: z.object({
    query: z.object({
      limit: z.number().optional(),
      offset: z.number().optional(),
    }),
  }),
  response: PagingPlaylistObject,
};

export type delete_Meshows = typeof delete_Meshows;
export const delete_Meshows = {
  method: z.literal("DELETE"),
  path: z.literal("/me/shows"),
  parameters: z.object({
    query: z.object({
      ids: z.string(),
      market: z.string(),
    }),
    body: z.object({
      ids: z.array(z.string()).optional(),
    }),
  }),
  response: z.unknown(),
};

export type get_Meshows = typeof get_Meshows;
export const get_Meshows = {
  method: z.literal("GET"),
  path: z.literal("/me/shows"),
  parameters: z.object({
    query: z.object({
      limit: z.number().optional(),
      offset: z.number().optional(),
    }),
  }),
  response: PagingSavedShowObject,
};

export type put_Meshows = typeof put_Meshows;
export const put_Meshows = {
  method: z.literal("PUT"),
  path: z.literal("/me/shows"),
  parameters: z.object({
    query: z.object({
      ids: z.string(),
    }),
    body: z.object({
      ids: z.array(z.string()).optional(),
    }),
  }),
  response: z.unknown(),
};

export type get_Meshowscontains = typeof get_Meshowscontains;
export const get_Meshowscontains = {
  method: z.literal("GET"),
  path: z.literal("/me/shows/contains"),
  parameters: z.object({
    query: z.object({
      ids: z.string(),
    }),
  }),
  response: z.array(z.boolean()),
};

export type get_Metopartists = typeof get_Metopartists;
export const get_Metopartists = {
  method: z.literal("GET"),
  path: z.literal("/me/top/artists"),
  parameters: z.object({
    query: z.object({
      time_range: z.string().optional(),
      limit: z.number().optional(),
      offset: z.number().optional(),
    }),
  }),
  response: PagingArtistObject,
};

export type get_Metoptracks = typeof get_Metoptracks;
export const get_Metoptracks = {
  method: z.literal("GET"),
  path: z.literal("/me/top/tracks"),
  parameters: z.object({
    query: z.object({
      time_range: z.string().optional(),
      limit: z.number().optional(),
      offset: z.number().optional(),
    }),
  }),
  response: PagingTrackObject,
};

export type delete_Metracks = typeof delete_Metracks;
export const delete_Metracks = {
  method: z.literal("DELETE"),
  path: z.literal("/me/tracks"),
  parameters: z.object({
    query: z.object({
      ids: z.string(),
    }),
    body: z.intersection(
      z.object({
        ids: z.array(z.string()).optional(),
      }),
      z.object({
        string: z.any().optional(),
      }),
    ),
  }),
  response: z.unknown(),
};

export type get_Metracks = typeof get_Metracks;
export const get_Metracks = {
  method: z.literal("GET"),
  path: z.literal("/me/tracks"),
  parameters: z.object({
    query: z.object({
      market: z.string().optional(),
      limit: z.number().optional(),
      offset: z.number().optional(),
    }),
  }),
  response: PagingSavedTrackObject,
};

export type put_Metracks = typeof put_Metracks;
export const put_Metracks = {
  method: z.literal("PUT"),
  path: z.literal("/me/tracks"),
  parameters: z.object({
    query: z.object({
      ids: z.string(),
    }),
    body: z.intersection(
      z.object({
        ids: z.array(z.string()),
      }),
      z.object({
        string: z.any(),
      }),
    ),
  }),
  response: z.unknown(),
};

export type get_Metrackscontains = typeof get_Metrackscontains;
export const get_Metrackscontains = {
  method: z.literal("GET"),
  path: z.literal("/me/tracks/contains"),
  parameters: z.object({
    query: z.object({
      ids: z.string(),
    }),
  }),
  response: z.array(z.boolean()),
};

export type get_PlaylistsPlaylist_id = typeof get_PlaylistsPlaylist_id;
export const get_PlaylistsPlaylist_id = {
  method: z.literal("GET"),
  path: z.literal("/playlists/{playlist_id}"),
  parameters: z.object({
    query: z.object({
      market: z.string().optional(),
      fields: z.string().optional(),
      additional_types: z.string().optional(),
    }),
    path: z.object({
      playlist_id: z.string(),
    }),
  }),
  response: PlaylistObject,
};

export type put_PlaylistsPlaylist_id = typeof put_PlaylistsPlaylist_id;
export const put_PlaylistsPlaylist_id = {
  method: z.literal("PUT"),
  path: z.literal("/playlists/{playlist_id}"),
  parameters: z.object({
    path: z.object({
      playlist_id: z.string(),
    }),
    body: z.intersection(
      z.object({
        collaborative: z.boolean().optional(),
        description: z.string().optional(),
        name: z.string().optional(),
        public: z.boolean().optional(),
      }),
      z.object({
        string: z.any().optional(),
      }),
    ),
  }),
  response: z.unknown(),
};

export type delete_PlaylistsPlaylist_idfollowers = typeof delete_PlaylistsPlaylist_idfollowers;
export const delete_PlaylistsPlaylist_idfollowers = {
  method: z.literal("DELETE"),
  path: z.literal("/playlists/{playlist_id}/followers"),
  parameters: z.object({
    path: z.object({
      playlist_id: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type put_PlaylistsPlaylist_idfollowers = typeof put_PlaylistsPlaylist_idfollowers;
export const put_PlaylistsPlaylist_idfollowers = {
  method: z.literal("PUT"),
  path: z.literal("/playlists/{playlist_id}/followers"),
  parameters: z.object({
    path: z.object({
      playlist_id: z.string(),
    }),
    body: z.intersection(
      z.object({
        public: z.boolean().optional(),
      }),
      z.object({
        string: z.any().optional(),
      }),
    ),
  }),
  response: z.unknown(),
};

export type get_PlaylistsPlaylist_idfollowerscontains = typeof get_PlaylistsPlaylist_idfollowerscontains;
export const get_PlaylistsPlaylist_idfollowerscontains = {
  method: z.literal("GET"),
  path: z.literal("/playlists/{playlist_id}/followers/contains"),
  parameters: z.object({
    query: z.object({
      ids: z.string(),
    }),
    path: z.object({
      playlist_id: z.string(),
    }),
  }),
  response: z.array(z.boolean()),
};

export type get_PlaylistsPlaylist_idimages = typeof get_PlaylistsPlaylist_idimages;
export const get_PlaylistsPlaylist_idimages = {
  method: z.literal("GET"),
  path: z.literal("/playlists/{playlist_id}/images"),
  parameters: z.object({
    path: z.object({
      playlist_id: z.string(),
    }),
  }),
  response: z.array(ImageObject),
};

export type put_PlaylistsPlaylist_idimages = typeof put_PlaylistsPlaylist_idimages;
export const put_PlaylistsPlaylist_idimages = {
  method: z.literal("PUT"),
  path: z.literal("/playlists/{playlist_id}/images"),
  parameters: z.object({
    path: z.object({
      playlist_id: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type delete_PlaylistsPlaylist_idtracks = typeof delete_PlaylistsPlaylist_idtracks;
export const delete_PlaylistsPlaylist_idtracks = {
  method: z.literal("DELETE"),
  path: z.literal("/playlists/{playlist_id}/tracks"),
  parameters: z.object({
    path: z.object({
      playlist_id: z.string(),
    }),
    body: z.object({
      snapshot_id: z.union([z.string(), z.undefined()]).optional(),
      tracks: z.array(
        z.object({
          uri: z.string().optional(),
        }),
      ),
    }),
  }),
  response: z.object({
    snapshot_id: z.string().optional(),
  }),
};

export type get_PlaylistsPlaylist_idtracks = typeof get_PlaylistsPlaylist_idtracks;
export const get_PlaylistsPlaylist_idtracks = {
  method: z.literal("GET"),
  path: z.literal("/playlists/{playlist_id}/tracks"),
  parameters: z.object({
    query: z.object({
      market: z.string().optional(),
      fields: z.string().optional(),
      limit: z.number().optional(),
      offset: z.number().optional(),
      additional_types: z.string().optional(),
    }),
    path: z.object({
      playlist_id: z.string(),
    }),
  }),
  response: PagingPlaylistTrackObject,
};

export type post_PlaylistsPlaylist_idtracks = typeof post_PlaylistsPlaylist_idtracks;
export const post_PlaylistsPlaylist_idtracks = {
  method: z.literal("POST"),
  path: z.literal("/playlists/{playlist_id}/tracks"),
  parameters: z.object({
    query: z.object({
      position: z.number().optional(),
      uris: z.string().optional(),
    }),
    path: z.object({
      playlist_id: z.string(),
    }),
    body: z.intersection(
      z.object({
        position: z.number().optional(),
        uris: z.array(z.string()).optional(),
      }),
      z.object({
        string: z.any().optional(),
      }),
    ),
  }),
  response: z.object({
    snapshot_id: z.string().optional(),
  }),
};

export type put_PlaylistsPlaylist_idtracks = typeof put_PlaylistsPlaylist_idtracks;
export const put_PlaylistsPlaylist_idtracks = {
  method: z.literal("PUT"),
  path: z.literal("/playlists/{playlist_id}/tracks"),
  parameters: z.object({
    query: z.object({
      uris: z.string().optional(),
    }),
    path: z.object({
      playlist_id: z.string(),
    }),
    body: z.intersection(
      z.object({
        insert_before: z.number().optional(),
        range_length: z.number().optional(),
        range_start: z.number().optional(),
        snapshot_id: z.string().optional(),
        uris: z.array(z.string()).optional(),
      }),
      z.object({
        string: z.any().optional(),
      }),
    ),
  }),
  response: z.object({
    snapshot_id: z.string().optional(),
  }),
};

export type get_Recommendations = typeof get_Recommendations;
export const get_Recommendations = {
  method: z.literal("GET"),
  path: z.literal("/recommendations"),
  parameters: z.object({
    query: z.object({
      limit: z.number().optional(),
      market: z.string().optional(),
      seed_artists: z.string().optional(),
      seed_genres: z.string().optional(),
      seed_tracks: z.string().optional(),
      min_acousticness: z.number().optional(),
      max_acousticness: z.number().optional(),
      target_acousticness: z.number().optional(),
      min_danceability: z.number().optional(),
      max_danceability: z.number().optional(),
      target_danceability: z.number().optional(),
      min_duration_ms: z.number().optional(),
      max_duration_ms: z.number().optional(),
      target_duration_ms: z.number().optional(),
      min_energy: z.number().optional(),
      max_energy: z.number().optional(),
      target_energy: z.number().optional(),
      min_instrumentalness: z.number().optional(),
      max_instrumentalness: z.number().optional(),
      target_instrumentalness: z.number().optional(),
      min_key: z.number().optional(),
      max_key: z.number().optional(),
      target_key: z.number().optional(),
      min_liveness: z.number().optional(),
      max_liveness: z.number().optional(),
      target_liveness: z.number().optional(),
      min_loudness: z.number().optional(),
      max_loudness: z.number().optional(),
      target_loudness: z.number().optional(),
      min_mode: z.number().optional(),
      max_mode: z.number().optional(),
      target_mode: z.number().optional(),
      min_popularity: z.number().optional(),
      max_popularity: z.number().optional(),
      target_popularity: z.number().optional(),
      min_speechiness: z.number().optional(),
      max_speechiness: z.number().optional(),
      target_speechiness: z.number().optional(),
      min_tempo: z.number().optional(),
      max_tempo: z.number().optional(),
      target_tempo: z.number().optional(),
      min_time_signature: z.number().optional(),
      max_time_signature: z.number().optional(),
      target_time_signature: z.number().optional(),
      min_valence: z.number().optional(),
      max_valence: z.number().optional(),
      target_valence: z.number().optional(),
    }),
  }),
  response: RecommendationsObject,
};

export type get_RecommendationsavailableGenreSeeds = typeof get_RecommendationsavailableGenreSeeds;
export const get_RecommendationsavailableGenreSeeds = {
  method: z.literal("GET"),
  path: z.literal("/recommendations/available-genre-seeds"),
  parameters: z.never(),
  response: z.object({
    genres: z.array(z.string()),
  }),
};

export type get_Search = typeof get_Search;
export const get_Search = {
  method: z.literal("GET"),
  path: z.literal("/search"),
  parameters: z.object({
    query: z.object({
      q: z.string(),
      type: z.array(
        z.union([
          z.literal("album"),
          z.literal("artist"),
          z.literal("playlist"),
          z.literal("track"),
          z.literal("show"),
          z.literal("episode"),
          z.literal("audiobook"),
        ]),
      ),
      market: z.string(),
      limit: z.number(),
      offset: z.number(),
      include_external: z.literal("audio"),
    }),
  }),
  response: z.object({
    albums: PagingSimplifiedAlbumObject.optional(),
    artists: PagingArtistObject.optional(),
    audiobooks: PagingSimplifiedAudiobookObject.optional(),
    episodes: PagingSimplifiedEpisodeObject.optional(),
    playlists: PagingPlaylistObject.optional(),
    shows: PagingSimplifiedShowObject.optional(),
    tracks: PagingTrackObject.optional(),
  }),
};

export type get_Shows = typeof get_Shows;
export const get_Shows = {
  method: z.literal("GET"),
  path: z.literal("/shows"),
  parameters: z.object({
    query: z.object({
      market: z.string(),
      ids: z.string(),
    }),
  }),
  response: z.object({
    shows: z.array(SimplifiedShowObject),
  }),
};

export type get_ShowsId = typeof get_ShowsId;
export const get_ShowsId = {
  method: z.literal("GET"),
  path: z.literal("/shows/{id}"),
  parameters: z.object({
    query: z.object({
      market: z.string().optional(),
    }),
    path: z.object({
      id: z.string(),
    }),
  }),
  response: ShowObject,
};

export type get_ShowsIdepisodes = typeof get_ShowsIdepisodes;
export const get_ShowsIdepisodes = {
  method: z.literal("GET"),
  path: z.literal("/shows/{id}/episodes"),
  parameters: z.object({
    query: z.object({
      market: z.string().optional(),
      limit: z.number().optional(),
      offset: z.number().optional(),
    }),
    path: z.object({
      id: z.string(),
    }),
  }),
  response: PagingSimplifiedEpisodeObject,
};

export type get_Tracks = typeof get_Tracks;
export const get_Tracks = {
  method: z.literal("GET"),
  path: z.literal("/tracks"),
  parameters: z.object({
    query: z.object({
      market: z.string(),
      ids: z.string(),
    }),
  }),
  response: z.object({
    tracks: z.array(TrackObject),
  }),
};

export type get_TracksId = typeof get_TracksId;
export const get_TracksId = {
  method: z.literal("GET"),
  path: z.literal("/tracks/{id}"),
  parameters: z.object({
    query: z.object({
      market: z.string().optional(),
    }),
    path: z.object({
      id: z.string(),
    }),
  }),
  response: TrackObject,
};

export type get_UsersUser_id = typeof get_UsersUser_id;
export const get_UsersUser_id = {
  method: z.literal("GET"),
  path: z.literal("/users/{user_id}"),
  parameters: z.object({
    path: z.object({
      user_id: z.string(),
    }),
  }),
  response: PublicUserObject,
};

export type get_UsersUser_idplaylists = typeof get_UsersUser_idplaylists;
export const get_UsersUser_idplaylists = {
  method: z.literal("GET"),
  path: z.literal("/users/{user_id}/playlists"),
  parameters: z.object({
    query: z.object({
      limit: z.number().optional(),
      offset: z.number().optional(),
    }),
    path: z.object({
      user_id: z.string(),
    }),
  }),
  response: PagingPlaylistObject,
};

export type post_UsersUser_idplaylists = typeof post_UsersUser_idplaylists;
export const post_UsersUser_idplaylists = {
  method: z.literal("POST"),
  path: z.literal("/users/{user_id}/playlists"),
  parameters: z.object({
    path: z.object({
      user_id: z.string(),
    }),
    body: z.intersection(
      z.object({
        collaborative: z.union([z.boolean(), z.undefined()]).optional(),
        description: z.union([z.string(), z.undefined()]).optional(),
        name: z.string(),
        public: z.union([z.boolean(), z.undefined()]).optional(),
      }),
      z.object({
        string: z.any(),
      }),
    ),
  }),
  response: PlaylistObject,
};

// <EndpointByMethod>
export const EndpointByMethod = {
  get: {
    "/albums": get_Albums,
    "/albums/{id}": get_AlbumsId,
    "/albums/{id}/tracks": get_AlbumsIdtracks,
    "/artists": get_Artists,
    "/artists/{id}": get_ArtistsId,
    "/artists/{id}/albums": get_ArtistsIdalbums,
    "/artists/{id}/related-artists": get_ArtistsIdrelatedArtists,
    "/artists/{id}/top-tracks": get_ArtistsIdtopTracks,
    "/audio-analysis/{id}": get_AudioAnalysisId,
    "/audio-features": get_AudioFeatures,
    "/audio-features/{id}": get_AudioFeaturesId,
    "/audiobooks": get_Audiobooks,
    "/audiobooks/{id}": get_AudiobooksId,
    "/audiobooks/{id}/chapters": get_AudiobooksIdchapters,
    "/browse/categories": get_Browsecategories,
    "/browse/categories/{category_id}": get_BrowsecategoriesCategory_id,
    "/browse/categories/{category_id}/playlists": get_BrowsecategoriesCategory_idplaylists,
    "/browse/featured-playlists": get_BrowsefeaturedPlaylists,
    "/browse/new-releases": get_BrowsenewReleases,
    "/chapters": get_Chapters,
    "/chapters/{id}": get_ChaptersId,
    "/episodes": get_Episodes,
    "/episodes/{id}": get_EpisodesId,
    "/markets": get_Markets,
    "/me": get_Me,
    "/me/albums": get_Mealbums,
    "/me/albums/contains": get_Mealbumscontains,
    "/me/audiobooks": get_Meaudiobooks,
    "/me/audiobooks/contains": get_Meaudiobookscontains,
    "/me/episodes": get_Meepisodes,
    "/me/episodes/contains": get_Meepisodescontains,
    "/me/following": get_Mefollowing,
    "/me/following/contains": get_Mefollowingcontains,
    "/me/player": get_Meplayer,
    "/me/player/currently-playing": get_MeplayercurrentlyPlaying,
    "/me/player/devices": get_Meplayerdevices,
    "/me/player/queue": get_Meplayerqueue,
    "/me/player/recently-played": get_MeplayerrecentlyPlayed,
    "/me/playlists": get_Meplaylists,
    "/me/shows": get_Meshows,
    "/me/shows/contains": get_Meshowscontains,
    "/me/top/artists": get_Metopartists,
    "/me/top/tracks": get_Metoptracks,
    "/me/tracks": get_Metracks,
    "/me/tracks/contains": get_Metrackscontains,
    "/playlists/{playlist_id}": get_PlaylistsPlaylist_id,
    "/playlists/{playlist_id}/followers/contains": get_PlaylistsPlaylist_idfollowerscontains,
    "/playlists/{playlist_id}/images": get_PlaylistsPlaylist_idimages,
    "/playlists/{playlist_id}/tracks": get_PlaylistsPlaylist_idtracks,
    "/recommendations": get_Recommendations,
    "/recommendations/available-genre-seeds": get_RecommendationsavailableGenreSeeds,
    "/search": get_Search,
    "/shows": get_Shows,
    "/shows/{id}": get_ShowsId,
    "/shows/{id}/episodes": get_ShowsIdepisodes,
    "/tracks": get_Tracks,
    "/tracks/{id}": get_TracksId,
    "/users/{user_id}": get_UsersUser_id,
    "/users/{user_id}/playlists": get_UsersUser_idplaylists,
  },
  delete: {
    "/me/albums": delete_Mealbums,
    "/me/audiobooks": delete_Meaudiobooks,
    "/me/episodes": delete_Meepisodes,
    "/me/following": delete_Mefollowing,
    "/me/shows": delete_Meshows,
    "/me/tracks": delete_Metracks,
    "/playlists/{playlist_id}/followers": delete_PlaylistsPlaylist_idfollowers,
    "/playlists/{playlist_id}/tracks": delete_PlaylistsPlaylist_idtracks,
  },
  put: {
    "/me/albums": put_Mealbums,
    "/me/audiobooks": put_Meaudiobooks,
    "/me/episodes": put_Meepisodes,
    "/me/following": put_Mefollowing,
    "/me/player": put_Meplayer,
    "/me/player/pause": put_Meplayerpause,
    "/me/player/play": put_Meplayerplay,
    "/me/player/repeat": put_Meplayerrepeat,
    "/me/player/seek": put_Meplayerseek,
    "/me/player/shuffle": put_Meplayershuffle,
    "/me/player/volume": put_Meplayervolume,
    "/me/shows": put_Meshows,
    "/me/tracks": put_Metracks,
    "/playlists/{playlist_id}": put_PlaylistsPlaylist_id,
    "/playlists/{playlist_id}/followers": put_PlaylistsPlaylist_idfollowers,
    "/playlists/{playlist_id}/images": put_PlaylistsPlaylist_idimages,
    "/playlists/{playlist_id}/tracks": put_PlaylistsPlaylist_idtracks,
  },
  post: {
    "/me/player/next": post_Meplayernext,
    "/me/player/previous": post_Meplayerprevious,
    "/me/player/queue": post_Meplayerqueue,
    "/playlists/{playlist_id}/tracks": post_PlaylistsPlaylist_idtracks,
    "/users/{user_id}/playlists": post_UsersUser_idplaylists,
  },
};
export type EndpointByMethod = typeof EndpointByMethod;
// </EndpointByMethod>

// <EndpointByMethod.Shorthands>
export type GetEndpoints = EndpointByMethod["get"];
export type DeleteEndpoints = EndpointByMethod["delete"];
export type PutEndpoints = EndpointByMethod["put"];
export type PostEndpoints = EndpointByMethod["post"];
export type AllEndpoints = EndpointByMethod[keyof EndpointByMethod];
// </EndpointByMethod.Shorthands>

// <ApiClientTypes>
export type EndpointParameters = {
  body?: unknown;
  query?: Record<string, unknown>;
  header?: Record<string, unknown>;
  path?: Record<string, unknown>;
};

export type MutationMethod = "post" | "put" | "patch" | "delete";
export type Method = "get" | "head" | MutationMethod;

export type DefaultEndpoint = {
  parameters?: EndpointParameters | undefined;
  response: unknown;
};

export type Endpoint<TConfig extends DefaultEndpoint = DefaultEndpoint> = {
  operationId: string;
  method: Method;
  path: string;
  parameters?: TConfig["parameters"];
  meta: {
    alias: string;
    hasParameters: boolean;
    areParametersRequired: boolean;
  };
  response: TConfig["response"];
};

type Fetcher = (
  method: Method,
  url: string,
  parameters?: EndpointParameters | undefined,
) => Promise<Endpoint["response"]>;

type RequiredKeys<T> = {
  [P in keyof T]-?: undefined extends T[P] ? never : P;
}[keyof T];

type MaybeOptionalArg<T> = RequiredKeys<T> extends never ? [config?: T] : [config: T];

// </ApiClientTypes>

// <ApiClient>
export class ApiClient {
  baseUrl: string = "";

  constructor(public fetcher: Fetcher) {}

  setBaseUrl(baseUrl: string) {
    this.baseUrl = baseUrl;
    return this;
  }

  // <ApiClient.get>
  get<Path extends keyof GetEndpoints, TEndpoint extends GetEndpoints[Path]>(
    path: Path,
    ...params: MaybeOptionalArg<z.infer<TEndpoint["parameters"]>>
  ): Promise<z.infer<TEndpoint["response"]>> {
    return this.fetcher("get", this.baseUrl + path, params[0]);
  }
  // </ApiClient.get>

  // <ApiClient.delete>
  delete<Path extends keyof DeleteEndpoints, TEndpoint extends DeleteEndpoints[Path]>(
    path: Path,
    ...params: MaybeOptionalArg<z.infer<TEndpoint["parameters"]>>
  ): Promise<z.infer<TEndpoint["response"]>> {
    return this.fetcher("delete", this.baseUrl + path, params[0]);
  }
  // </ApiClient.delete>

  // <ApiClient.put>
  put<Path extends keyof PutEndpoints, TEndpoint extends PutEndpoints[Path]>(
    path: Path,
    ...params: MaybeOptionalArg<z.infer<TEndpoint["parameters"]>>
  ): Promise<z.infer<TEndpoint["response"]>> {
    return this.fetcher("put", this.baseUrl + path, params[0]);
  }
  // </ApiClient.put>

  // <ApiClient.post>
  post<Path extends keyof PostEndpoints, TEndpoint extends PostEndpoints[Path]>(
    path: Path,
    ...params: MaybeOptionalArg<z.infer<TEndpoint["parameters"]>>
  ): Promise<z.infer<TEndpoint["response"]>> {
    return this.fetcher("post", this.baseUrl + path, params[0]);
  }
  // </ApiClient.post>
}

export function createApiClient(fetcher: Fetcher, baseUrl?: string) {
  return new ApiClient(fetcher).setBaseUrl(baseUrl ?? "");
}

/**
 Example usage:
 const api = createApiClient((method, url, params) =>
   fetch(url, { method, body: JSON.stringify(params) }).then((res) => res.json()),
 );
 api.get("/users").then((users) => console.log(users));
 api.post("/users", { body: { name: "John" } }).then((user) => console.log(user));
 api.put("/users/:id", { path: { id: 1 }, body: { name: "John" } }).then((user) => console.log(user));
*/

// </ApiClient
