export namespace Schemas {
  // <Schemas>
  export type ExternalUrlObject = Partial<{ spotify: string }>;
  export type ImageObject = { height: number | null; url: string; width: number | null };
  export type AlbumRestrictionObject = Partial<{ reason: "market" | "product" | "explicit" }>;
  export type AlbumBase = {
    album_type: "album" | "single" | "compilation";
    available_markets: Array<string>;
    external_urls: ExternalUrlObject;
    href: string;
    id: string;
    images: Array<ImageObject>;
    name: string;
    release_date: string;
    release_date_precision: "year" | "month" | "day";
    restrictions?: AlbumRestrictionObject | undefined;
    total_tracks: number;
    type: "album";
    uri: string;
  };
  export type SimplifiedArtistObject = Partial<{
    external_urls: ExternalUrlObject;
    href: string;
    id: string;
    name: string;
    type: "artist";
    uri: string;
  }>;
  export type CopyrightObject = Partial<{ text: string; type: string }>;
  export type ExternalIdObject = Partial<{ ean: string; isrc: string; upc: string }>;
  export type PagingObject = {
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
  };
  export type LinkedTrackObject = Partial<{
    external_urls: ExternalUrlObject;
    href: string;
    id: string;
    type: string;
    uri: string;
  }>;
  export type TrackRestrictionObject = Partial<{ reason: string }>;
  export type SimplifiedTrackObject = Partial<{
    artists: Array<SimplifiedArtistObject>;
    available_markets: Array<string>;
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_urls: ExternalUrlObject;
    href: string;
    id: string;
    is_local: boolean;
    is_playable: boolean;
    linked_from: LinkedTrackObject;
    name: string;
    preview_url: string;
    restrictions: TrackRestrictionObject;
    track_number: number;
    type: string;
    uri: string;
  }>;
  export type PagingSimplifiedTrackObject = PagingObject & Partial<{ items: Array<SimplifiedTrackObject> }>;
  export type AlbumObject = AlbumBase &
    Partial<{
      artists: Array<SimplifiedArtistObject>;
      copyrights: Array<CopyrightObject>;
      external_ids: ExternalIdObject;
      genres: Array<string>;
      label: string;
      popularity: number;
      tracks: PagingSimplifiedTrackObject;
    }>;
  export type FollowersObject = Partial<{ href: string | null; total: number }>;
  export type ArtistObject = Partial<{
    external_urls: ExternalUrlObject;
    followers: FollowersObject;
    genres: Array<string>;
    href: string;
    id: string;
    images: Array<ImageObject>;
    name: string;
    popularity: number;
    type: "artist";
    uri: string;
  }>;
  export type TimeIntervalObject = Partial<{ confidence: number; duration: number; start: number }>;
  export type TimeSignature = number;
  export type SectionObject = Partial<{
    confidence: number;
    duration: number;
    key: number;
    key_confidence: number;
    loudness: number;
    mode: -1 | 0 | 1;
    mode_confidence: number;
    start: number;
    tempo: number;
    tempo_confidence: number;
    time_signature: TimeSignature;
    time_signature_confidence: number;
  }>;
  export type SegmentObject = Partial<{
    confidence: number;
    duration: number;
    loudness_end: number;
    loudness_max: number;
    loudness_max_time: number;
    loudness_start: number;
    pitches: Array<number>;
    start: number;
    timbre: Array<number>;
  }>;
  export type Key = number;
  export type Loudness = number;
  export type Mode = number;
  export type Tempo = number;
  export type AudioAnalysisObject = Partial<{
    bars: Array<TimeIntervalObject>;
    beats: Array<TimeIntervalObject>;
    meta: Partial<{
      analysis_time: number;
      analyzer_version: string;
      detailed_status: string;
      input_process: string;
      platform: string;
      status_code: number;
      timestamp: number;
    }>;
    sections: Array<SectionObject>;
    segments: Array<SegmentObject>;
    tatums: Array<TimeIntervalObject>;
    track: Partial<{
      analysis_channels: number;
      analysis_sample_rate: number;
      code_version: number;
      codestring: string;
      duration: number;
      echoprint_version: number;
      echoprintstring: string;
      end_of_fade_in: number;
      key: Key;
      key_confidence: number;
      loudness: Loudness;
      mode: Mode;
      mode_confidence: number;
      num_samples: number;
      offset_seconds: number;
      rhythm_version: number;
      rhythmstring: string;
      sample_md5: string;
      start_of_fade_out: number;
      synch_version: number;
      synchstring: string;
      tempo: Tempo;
      tempo_confidence: number;
      time_signature: TimeSignature;
      time_signature_confidence: number;
      window_seconds: number;
    }>;
  }>;
  export type AudioFeaturesObject = Partial<{
    acousticness: number;
    analysis_url: string;
    danceability: number;
    duration_ms: number;
    energy: number;
    id: string;
    instrumentalness: number;
    key: Key;
    liveness: number;
    loudness: Loudness;
    mode: Mode;
    speechiness: number;
    tempo: Tempo;
    time_signature: TimeSignature;
    track_href: string;
    type: "audio_features";
    uri: string;
    valence: number;
  }>;
  export type AuthorObject = Partial<{ name: string }>;
  export type NarratorObject = Partial<{ name: string }>;
  export type AudiobookBase = {
    authors: Array<AuthorObject>;
    available_markets: Array<string>;
    copyrights: Array<CopyrightObject>;
    description: string;
    edition?: string | undefined;
    explicit: boolean;
    external_urls: ExternalUrlObject;
    href: string;
    html_description: string;
    id: string;
    images: Array<ImageObject>;
    languages: Array<string>;
    media_type: string;
    name: string;
    narrators: Array<NarratorObject>;
    publisher: string;
    total_chapters: number;
    type: "audiobook";
    uri: string;
  };
  export type ChapterRestrictionObject = Partial<{ reason: string }>;
  export type ResumePointObject = Partial<{ fully_played: boolean; resume_position_ms: number }>;
  export type ChapterBase = {
    audio_preview_url: string;
    available_markets?: Array<string> | undefined;
    chapter_number: number;
    description: string;
    duration_ms: number;
    explicit: boolean;
    external_urls: ExternalUrlObject;
    href: string;
    html_description: string;
    id: string;
    images: Array<ImageObject>;
    is_playable: boolean;
    languages: Array<string>;
    name: string;
    release_date: string;
    release_date_precision: "year" | "month" | "day";
    restrictions?: ChapterRestrictionObject | undefined;
    resume_point: ResumePointObject;
    type: "episode";
    uri: string;
  };
  export type SimplifiedChapterObject = ChapterBase;
  export type PagingSimplifiedChapterObject = PagingObject & Partial<{ items: Array<SimplifiedChapterObject> }>;
  export type AudiobookObject = AudiobookBase & { chapters: PagingSimplifiedChapterObject };
  export type CategoryObject = { href: string; icons: Array<ImageObject>; id: string; name: string };
  export type SimplifiedAudiobookObject = AudiobookBase;
  export type ChapterObject = ChapterBase & { audiobook: SimplifiedAudiobookObject };
  export type ContextObject = Partial<{ external_urls: ExternalUrlObject; href: string; type: string; uri: string }>;
  export type DisallowsObject = Partial<{
    interrupting_playback: boolean;
    pausing: boolean;
    resuming: boolean;
    seeking: boolean;
    skipping_next: boolean;
    skipping_prev: boolean;
    toggling_repeat_context: boolean;
    toggling_repeat_track: boolean;
    toggling_shuffle: boolean;
    transferring_playback: boolean;
  }>;
  export type DeviceObject = Partial<{
    id: string | null;
    is_active: boolean;
    is_private_session: boolean;
    is_restricted: boolean;
    name: string;
    type: string;
    volume_percent: number | null;
  }>;
  export type SimplifiedAlbumObject = AlbumBase & {
    album_group?: "album" | "single" | "compilation" | "appears_on" | undefined;
    artists: Array<SimplifiedArtistObject>;
  };
  export type TrackObject = Partial<{
    album: SimplifiedAlbumObject;
    artists: Array<ArtistObject>;
    available_markets: Array<string>;
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: ExternalIdObject;
    external_urls: ExternalUrlObject;
    href: string;
    id: string;
    is_local: boolean;
    is_playable: boolean;
    linked_from: LinkedTrackObject;
    name: string;
    popularity: number;
    preview_url: string;
    restrictions: TrackRestrictionObject;
    track_number: number;
    type: "track";
    uri: string;
  }>;
  export type EpisodeRestrictionObject = Partial<{ reason: string }>;
  export type EpisodeBase = {
    audio_preview_url: string;
    description: string;
    duration_ms: number;
    explicit: boolean;
    external_urls: ExternalUrlObject;
    href: string;
    html_description: string;
    id: string;
    images: Array<ImageObject>;
    is_externally_hosted: boolean;
    is_playable: boolean;
    language?: string | undefined;
    languages: Array<string>;
    name: string;
    release_date: string;
    release_date_precision: "year" | "month" | "day";
    restrictions?: EpisodeRestrictionObject | undefined;
    resume_point: ResumePointObject;
    type: "episode";
    uri: string;
  };
  export type ShowBase = {
    available_markets: Array<string>;
    copyrights: Array<CopyrightObject>;
    description: string;
    explicit: boolean;
    external_urls: ExternalUrlObject;
    href: string;
    html_description: string;
    id: string;
    images: Array<ImageObject>;
    is_externally_hosted: boolean;
    languages: Array<string>;
    media_type: string;
    name: string;
    publisher: string;
    total_episodes: number;
    type: "show";
    uri: string;
  };
  export type SimplifiedShowObject = ShowBase;
  export type EpisodeObject = EpisodeBase & { show: SimplifiedShowObject };
  export type CurrentlyPlayingContextObject = Partial<{
    actions: DisallowsObject;
    context: ContextObject;
    currently_playing_type: string;
    device: DeviceObject;
    is_playing: boolean;
    item: TrackObject | EpisodeObject;
    progress_ms: number;
    repeat_state: string;
    shuffle_state: boolean;
    timestamp: number;
  }>;
  export type CurrentlyPlayingObject = Partial<{
    context: ContextObject;
    currently_playing_type: string;
    is_playing: boolean;
    item: TrackObject | EpisodeObject;
    progress_ms: number;
    timestamp: number;
  }>;
  export type CursorObject = Partial<{ after: string; before: string }>;
  export type CursorPagingObject = Partial<{
    cursors: CursorObject;
    href: string;
    limit: number;
    next: string;
    total: number;
  }>;
  export type PlayHistoryObject = Partial<{ context: ContextObject; played_at: string; track: TrackObject }>;
  export type CursorPagingPlayHistoryObject = CursorPagingObject & Partial<{ items: Array<PlayHistoryObject> }>;
  export type CursorPagingSimplifiedArtistObject = CursorPagingObject & Partial<{ items: Array<ArtistObject> }>;
  export type DevicesObject = Partial<{ devices: Array<DeviceObject> }>;
  export type ErrorObject = { message: string; status: number };
  export type ExplicitContentSettingsObject = Partial<{ filter_enabled: boolean; filter_locked: boolean }>;
  export type PagingArtistObject = PagingObject & Partial<{ items: Array<ArtistObject> }>;
  export type PlaylistUserObject = Partial<{
    external_urls: ExternalUrlObject;
    followers: FollowersObject;
    href: string;
    id: string;
    type: "user";
    uri: string;
  }>;
  export type PlaylistOwnerObject = PlaylistUserObject & Partial<{ display_name: string | null }>;
  export type PlaylistTracksRefObject = Partial<{ href: string; total: number }>;
  export type SimplifiedPlaylistObject = Partial<{
    collaborative: boolean;
    description: string;
    external_urls: ExternalUrlObject;
    href: string;
    id: string;
    images: Array<ImageObject>;
    name: string;
    owner: PlaylistOwnerObject;
    public: boolean;
    snapshot_id: string;
    tracks: PlaylistTracksRefObject;
    type: string;
    uri: string;
  }>;
  export type PagingPlaylistObject = PagingObject & Partial<{ items: Array<SimplifiedPlaylistObject> }>;
  export type PagingFeaturedPlaylistObject = Partial<{ message: string; playlists: PagingPlaylistObject }>;
  export type PlaylistTrackObject = Partial<{
    added_at: string;
    added_by: PlaylistUserObject;
    is_local: boolean;
    track: TrackObject | EpisodeObject;
  }>;
  export type PagingPlaylistTrackObject = PagingObject & Partial<{ items: Array<PlaylistTrackObject> }>;
  export type SavedAlbumObject = Partial<{ added_at: string; album: AlbumObject }>;
  export type PagingSavedAlbumObject = PagingObject & Partial<{ items: Array<SavedAlbumObject> }>;
  export type SavedAudiobookObject = Partial<{ added_at: string; audiobook: AudiobookObject }>;
  export type PagingSavedAudiobookObject = PagingObject & Partial<{ items: Array<SavedAudiobookObject> }>;
  export type SavedEpisodeObject = Partial<{ added_at: string; episode: EpisodeObject }>;
  export type PagingSavedEpisodeObject = PagingObject & Partial<{ items: Array<SavedEpisodeObject> }>;
  export type SavedShowObject = Partial<{ added_at: string; show: SimplifiedShowObject }>;
  export type PagingSavedShowObject = PagingObject & Partial<{ items: Array<SavedShowObject> }>;
  export type SavedTrackObject = Partial<{ added_at: string; track: TrackObject }>;
  export type PagingSavedTrackObject = PagingObject & Partial<{ items: Array<SavedTrackObject> }>;
  export type PagingSimplifiedAlbumObject = PagingObject & Partial<{ items: Array<SimplifiedAlbumObject> }>;
  export type PagingSimplifiedArtistObject = PagingObject & Partial<{ items: Array<SimplifiedArtistObject> }>;
  export type PagingSimplifiedAudiobookObject = PagingObject & Partial<{ items: Array<SimplifiedAudiobookObject> }>;
  export type SimplifiedEpisodeObject = EpisodeBase;
  export type PagingSimplifiedEpisodeObject = PagingObject & Partial<{ items: Array<SimplifiedEpisodeObject> }>;
  export type PagingSimplifiedShowObject = PagingObject & Partial<{ items: Array<SimplifiedShowObject> }>;
  export type PagingTrackObject = PagingObject & Partial<{ items: Array<TrackObject> }>;
  export type PlayerErrorReasons =
    | "NO_PREV_TRACK"
    | "NO_NEXT_TRACK"
    | "NO_SPECIFIC_TRACK"
    | "ALREADY_PAUSED"
    | "NOT_PAUSED"
    | "NOT_PLAYING_LOCALLY"
    | "NOT_PLAYING_TRACK"
    | "NOT_PLAYING_CONTEXT"
    | "ENDLESS_CONTEXT"
    | "CONTEXT_DISALLOW"
    | "ALREADY_PLAYING"
    | "RATE_LIMITED"
    | "REMOTE_CONTROL_DISALLOW"
    | "DEVICE_NOT_CONTROLLABLE"
    | "VOLUME_CONTROL_DISALLOW"
    | "NO_ACTIVE_DEVICE"
    | "PREMIUM_REQUIRED"
    | "UNKNOWN";
  export type PlayerErrorObject = Partial<{ message: string; reason: PlayerErrorReasons; status: number }>;
  export type PlaylistObject = Partial<{
    collaborative: boolean;
    description: string | null;
    external_urls: ExternalUrlObject;
    followers: FollowersObject;
    href: string;
    id: string;
    images: Array<ImageObject>;
    name: string;
    owner: PlaylistOwnerObject;
    public: boolean;
    snapshot_id: string;
    tracks: PagingPlaylistTrackObject;
    type: string;
    uri: string;
  }>;
  export type PrivateUserObject = Partial<{
    country: string;
    display_name: string;
    email: string;
    explicit_content: ExplicitContentSettingsObject;
    external_urls: ExternalUrlObject;
    followers: FollowersObject;
    href: string;
    id: string;
    images: Array<ImageObject>;
    product: string;
    type: string;
    uri: string;
  }>;
  export type PublicUserObject = Partial<{
    display_name: string | null;
    external_urls: ExternalUrlObject;
    followers: FollowersObject;
    href: string;
    id: string;
    images: Array<ImageObject>;
    type: "user";
    uri: string;
  }>;
  export type QueueObject = Partial<{
    currently_playing: TrackObject | EpisodeObject;
    queue: Array<TrackObject | EpisodeObject>;
  }>;
  export type RecommendationSeedObject = Partial<{
    afterFilteringSize: number;
    afterRelinkingSize: number;
    href: string;
    id: string;
    initialPoolSize: number;
    type: string;
  }>;
  export type RecommendationsObject = { seeds: Array<RecommendationSeedObject>; tracks: Array<TrackObject> };
  export type ShowObject = ShowBase & { episodes: PagingSimplifiedEpisodeObject };
  export type TuneableTrackObject = Partial<{
    acousticness: number;
    danceability: number;
    duration_ms: number;
    energy: number;
    instrumentalness: number;
    key: Key;
    liveness: number;
    loudness: Loudness;
    mode: Mode;
    popularity: number;
    speechiness: number;
    tempo: Tempo;
    time_signature: TimeSignature;
    valence: number;
  }>;

  // </Schemas>
}

export namespace Endpoints {
  // <Endpoints>

  export type get_Albums = {
    method: "GET";
    path: "/albums";
    parameters: {
      query: { ids: string; market: string };
    };
    response: { albums: Array<Schemas.AlbumObject> };
  };
  export type get_AlbumsId = {
    method: "GET";
    path: "/albums/{id}";
    parameters: {
      query: Partial<{ market: string }>;
      path: { id: string };
    };
    response: Schemas.AlbumObject;
  };
  export type get_AlbumsIdtracks = {
    method: "GET";
    path: "/albums/{id}/tracks";
    parameters: {
      query: Partial<{ market: string; limit: number; offset: number }>;
      path: { id: string };
    };
    response: Schemas.PagingSimplifiedTrackObject;
  };
  export type get_Artists = {
    method: "GET";
    path: "/artists";
    parameters: {
      query: { ids: string };
    };
    response: { artists: Array<Schemas.ArtistObject> };
  };
  export type get_ArtistsId = {
    method: "GET";
    path: "/artists/{id}";
    parameters: {
      path: { id: string };
    };
    response: Schemas.ArtistObject;
  };
  export type get_ArtistsIdalbums = {
    method: "GET";
    path: "/artists/{id}/albums";
    parameters: {
      query: Partial<{ include_groups: string; market: string; limit: number; offset: number }>;
      path: { id: string };
    };
    response: Schemas.PagingSimplifiedAlbumObject;
  };
  export type get_ArtistsIdrelatedArtists = {
    method: "GET";
    path: "/artists/{id}/related-artists";
    parameters: {
      path: { id: string };
    };
    response: { artists: Array<Schemas.ArtistObject> };
  };
  export type get_ArtistsIdtopTracks = {
    method: "GET";
    path: "/artists/{id}/top-tracks";
    parameters: {
      query: Partial<{ market: string }>;
      path: { id: string };
    };
    response: { tracks: Array<Schemas.TrackObject> };
  };
  export type get_AudioAnalysisId = {
    method: "GET";
    path: "/audio-analysis/{id}";
    parameters: {
      path: { id: string };
    };
    response: Schemas.AudioAnalysisObject;
  };
  export type get_AudioFeatures = {
    method: "GET";
    path: "/audio-features";
    parameters: {
      query: { ids: string };
    };
    response: { audio_features: Array<Schemas.AudioFeaturesObject> };
  };
  export type get_AudioFeaturesId = {
    method: "GET";
    path: "/audio-features/{id}";
    parameters: {
      path: { id: string };
    };
    response: Schemas.AudioFeaturesObject;
  };
  export type get_Audiobooks = {
    method: "GET";
    path: "/audiobooks";
    parameters: {
      query: { ids: string; market: string };
    };
    response: { audiobooks: Array<Schemas.AudiobookObject> };
  };
  export type get_AudiobooksId = {
    method: "GET";
    path: "/audiobooks/{id}";
    parameters: {
      query: Partial<{ market: string }>;
      path: { id: string };
    };
    response: Schemas.AudiobookObject;
  };
  export type get_AudiobooksIdchapters = {
    method: "GET";
    path: "/audiobooks/{id}/chapters";
    parameters: {
      query: Partial<{ market: string; limit: number; offset: number }>;
      path: { id: string };
    };
    response: Schemas.PagingSimplifiedChapterObject;
  };
  export type get_Browsecategories = {
    method: "GET";
    path: "/browse/categories";
    parameters: {
      query: Partial<{ country: string; locale: string; limit: number; offset: number }>;
    };
    response: { categories: Schemas.PagingObject & Partial<{ items: Array<Schemas.CategoryObject> }> };
  };
  export type get_BrowsecategoriesCategory_id = {
    method: "GET";
    path: "/browse/categories/{category_id}";
    parameters: {
      query: Partial<{ country: string; locale: string }>;
      path: { category_id: string };
    };
    response: Schemas.CategoryObject;
  };
  export type get_BrowsecategoriesCategory_idplaylists = {
    method: "GET";
    path: "/browse/categories/{category_id}/playlists";
    parameters: {
      query: Partial<{ country: string; limit: number; offset: number }>;
      path: { category_id: string };
    };
    response: Schemas.PagingFeaturedPlaylistObject;
  };
  export type get_BrowsefeaturedPlaylists = {
    method: "GET";
    path: "/browse/featured-playlists";
    parameters: {
      query: Partial<{ country: string; locale: string; timestamp: string; limit: number; offset: number }>;
    };
    response: Schemas.PagingFeaturedPlaylistObject;
  };
  export type get_BrowsenewReleases = {
    method: "GET";
    path: "/browse/new-releases";
    parameters: {
      query: Partial<{ country: string; limit: number; offset: number }>;
    };
    response: { albums: Schemas.PagingSimplifiedAlbumObject };
  };
  export type get_Chapters = {
    method: "GET";
    path: "/chapters";
    parameters: {
      query: { ids: string; market: string };
    };
    response: { chapters: Array<Schemas.ChapterObject> };
  };
  export type get_ChaptersId = {
    method: "GET";
    path: "/chapters/{id}";
    parameters: {
      query: Partial<{ market: string }>;
      path: { id: string };
    };
    response: Schemas.ChapterObject;
  };
  export type get_Episodes = {
    method: "GET";
    path: "/episodes";
    parameters: {
      query: { ids: string; market: string };
    };
    response: { episodes: Array<Schemas.EpisodeObject> };
  };
  export type get_EpisodesId = {
    method: "GET";
    path: "/episodes/{id}";
    parameters: {
      query: Partial<{ market: string }>;
      path: { id: string };
    };
    response: Schemas.EpisodeObject;
  };
  export type get_Markets = {
    method: "GET";
    path: "/markets";
    parameters: never;
    response: Partial<{ markets: Array<string> }>;
  };
  export type get_Me = {
    method: "GET";
    path: "/me";
    parameters: never;
    response: Schemas.PrivateUserObject;
  };
  export type delete_Mealbums = {
    method: "DELETE";
    path: "/me/albums";
    parameters: {
      query: { ids: string };

      body: Partial<{ ids: Array<string> } & { string: any }>;
    };
    response: unknown;
  };
  export type get_Mealbums = {
    method: "GET";
    path: "/me/albums";
    parameters: {
      query: Partial<{ limit: number; offset: number; market: string }>;
    };
    response: Schemas.PagingSavedAlbumObject;
  };
  export type put_Mealbums = {
    method: "PUT";
    path: "/me/albums";
    parameters: {
      query: { ids: string };

      body: Partial<{ ids: Array<string> } & { string: any }>;
    };
    response: unknown;
  };
  export type get_Mealbumscontains = {
    method: "GET";
    path: "/me/albums/contains";
    parameters: {
      query: { ids: string };
    };
    response: Array<boolean>;
  };
  export type delete_Meaudiobooks = {
    method: "DELETE";
    path: "/me/audiobooks";
    parameters: {
      query: { ids: string };
    };
    response: unknown;
  };
  export type get_Meaudiobooks = {
    method: "GET";
    path: "/me/audiobooks";
    parameters: {
      query: Partial<{ limit: number; offset: number }>;
    };
    response: Schemas.PagingSavedAudiobookObject;
  };
  export type put_Meaudiobooks = {
    method: "PUT";
    path: "/me/audiobooks";
    parameters: {
      query: { ids: string };
    };
    response: unknown;
  };
  export type get_Meaudiobookscontains = {
    method: "GET";
    path: "/me/audiobooks/contains";
    parameters: {
      query: { ids: string };
    };
    response: Array<boolean>;
  };
  export type delete_Meepisodes = {
    method: "DELETE";
    path: "/me/episodes";
    parameters: {
      query: { ids: string };

      body: Partial<{ ids: Array<string> } & { string: any }>;
    };
    response: unknown;
  };
  export type get_Meepisodes = {
    method: "GET";
    path: "/me/episodes";
    parameters: {
      query: Partial<{ market: string; limit: number; offset: number }>;
    };
    response: Schemas.PagingSavedEpisodeObject;
  };
  export type put_Meepisodes = {
    method: "PUT";
    path: "/me/episodes";
    parameters: {
      query: { ids: string };

      body: { ids: Array<string> } & { string: any };
    };
    response: unknown;
  };
  export type get_Meepisodescontains = {
    method: "GET";
    path: "/me/episodes/contains";
    parameters: {
      query: { ids: string };
    };
    response: Array<boolean>;
  };
  export type delete_Mefollowing = {
    method: "DELETE";
    path: "/me/following";
    parameters: {
      query: { type: "artist" | "user"; ids: string };

      body: Partial<{ ids: Array<string> } & { string: any }>;
    };
    response: unknown;
  };
  export type get_Mefollowing = {
    method: "GET";
    path: "/me/following";
    parameters: {
      query: { type: "artist"; after: string; limit: number };
    };
    response: { artists: Schemas.CursorPagingSimplifiedArtistObject };
  };
  export type put_Mefollowing = {
    method: "PUT";
    path: "/me/following";
    parameters: {
      query: { type: "artist" | "user"; ids: string };

      body: { ids: Array<string> } & { string: any };
    };
    response: unknown;
  };
  export type get_Mefollowingcontains = {
    method: "GET";
    path: "/me/following/contains";
    parameters: {
      query: { type: "artist" | "user"; ids: string };
    };
    response: Array<boolean>;
  };
  export type get_Meplayer = {
    method: "GET";
    path: "/me/player";
    parameters: {
      query: Partial<{ market: string; additional_types: string }>;
    };
    response: unknown;
  };
  export type put_Meplayer = {
    method: "PUT";
    path: "/me/player";
    parameters: {
      body: { device_ids: Array<string>; play?: boolean | undefined } & { string: any };
    };
    response: unknown;
  };
  export type get_MeplayercurrentlyPlaying = {
    method: "GET";
    path: "/me/player/currently-playing";
    parameters: {
      query: Partial<{ market: string; additional_types: string }>;
    };
    response: Schemas.CurrentlyPlayingObject;
  };
  export type get_Meplayerdevices = {
    method: "GET";
    path: "/me/player/devices";
    parameters: never;
    response: Schemas.DevicesObject;
  };
  export type post_Meplayernext = {
    method: "POST";
    path: "/me/player/next";
    parameters: {
      query: Partial<{ device_id: string }>;
    };
    response: unknown;
  };
  export type put_Meplayerpause = {
    method: "PUT";
    path: "/me/player/pause";
    parameters: {
      query: Partial<{ device_id: string }>;
    };
    response: unknown;
  };
  export type put_Meplayerplay = {
    method: "PUT";
    path: "/me/player/play";
    parameters: {
      query: Partial<{ device_id: string }>;

      body: Partial<
        { context_uri: string; offset: unknown; position_ms: number; uris: Array<string> } & { string: any }
      >;
    };
    response: unknown;
  };
  export type post_Meplayerprevious = {
    method: "POST";
    path: "/me/player/previous";
    parameters: {
      query: Partial<{ device_id: string }>;
    };
    response: unknown;
  };
  export type get_Meplayerqueue = {
    method: "GET";
    path: "/me/player/queue";
    parameters: never;
    response: Schemas.QueueObject;
  };
  export type post_Meplayerqueue = {
    method: "POST";
    path: "/me/player/queue";
    parameters: {
      query: { uri: string; device_id: string };
    };
    response: unknown;
  };
  export type get_MeplayerrecentlyPlayed = {
    method: "GET";
    path: "/me/player/recently-played";
    parameters: {
      query: Partial<{ limit: number; after: number; before: number }>;
    };
    response: Schemas.CursorPagingPlayHistoryObject;
  };
  export type put_Meplayerrepeat = {
    method: "PUT";
    path: "/me/player/repeat";
    parameters: {
      query: { state: string; device_id: string };
    };
    response: unknown;
  };
  export type put_Meplayerseek = {
    method: "PUT";
    path: "/me/player/seek";
    parameters: {
      query: { position_ms: number; device_id: string };
    };
    response: unknown;
  };
  export type put_Meplayershuffle = {
    method: "PUT";
    path: "/me/player/shuffle";
    parameters: {
      query: { state: boolean; device_id: string };
    };
    response: unknown;
  };
  export type put_Meplayervolume = {
    method: "PUT";
    path: "/me/player/volume";
    parameters: {
      query: { volume_percent: number; device_id: string };
    };
    response: unknown;
  };
  export type get_Meplaylists = {
    method: "GET";
    path: "/me/playlists";
    parameters: {
      query: Partial<{ limit: number; offset: number }>;
    };
    response: Schemas.PagingPlaylistObject;
  };
  export type delete_Meshows = {
    method: "DELETE";
    path: "/me/shows";
    parameters: {
      query: { ids: string; market: string };

      body: Partial<{ ids: Array<string> }>;
    };
    response: unknown;
  };
  export type get_Meshows = {
    method: "GET";
    path: "/me/shows";
    parameters: {
      query: Partial<{ limit: number; offset: number }>;
    };
    response: Schemas.PagingSavedShowObject;
  };
  export type put_Meshows = {
    method: "PUT";
    path: "/me/shows";
    parameters: {
      query: { ids: string };

      body: Partial<{ ids: Array<string> }>;
    };
    response: unknown;
  };
  export type get_Meshowscontains = {
    method: "GET";
    path: "/me/shows/contains";
    parameters: {
      query: { ids: string };
    };
    response: Array<boolean>;
  };
  export type get_Metopartists = {
    method: "GET";
    path: "/me/top/artists";
    parameters: {
      query: Partial<{ time_range: string; limit: number; offset: number }>;
    };
    response: Schemas.PagingArtistObject;
  };
  export type get_Metoptracks = {
    method: "GET";
    path: "/me/top/tracks";
    parameters: {
      query: Partial<{ time_range: string; limit: number; offset: number }>;
    };
    response: Schemas.PagingTrackObject;
  };
  export type delete_Metracks = {
    method: "DELETE";
    path: "/me/tracks";
    parameters: {
      query: { ids: string };

      body: Partial<{ ids: Array<string> } & { string: any }>;
    };
    response: unknown;
  };
  export type get_Metracks = {
    method: "GET";
    path: "/me/tracks";
    parameters: {
      query: Partial<{ market: string; limit: number; offset: number }>;
    };
    response: Schemas.PagingSavedTrackObject;
  };
  export type put_Metracks = {
    method: "PUT";
    path: "/me/tracks";
    parameters: {
      query: { ids: string };

      body: { ids: Array<string> } & { string: any };
    };
    response: unknown;
  };
  export type get_Metrackscontains = {
    method: "GET";
    path: "/me/tracks/contains";
    parameters: {
      query: { ids: string };
    };
    response: Array<boolean>;
  };
  export type get_PlaylistsPlaylist_id = {
    method: "GET";
    path: "/playlists/{playlist_id}";
    parameters: {
      query: Partial<{ market: string; fields: string; additional_types: string }>;
      path: { playlist_id: string };
    };
    response: Schemas.PlaylistObject;
  };
  export type put_PlaylistsPlaylist_id = {
    method: "PUT";
    path: "/playlists/{playlist_id}";
    parameters: {
      path: { playlist_id: string };

      body: Partial<{ collaborative: boolean; description: string; name: string; public: boolean } & { string: any }>;
    };
    response: unknown;
  };
  export type delete_PlaylistsPlaylist_idfollowers = {
    method: "DELETE";
    path: "/playlists/{playlist_id}/followers";
    parameters: {
      path: { playlist_id: string };
    };
    response: unknown;
  };
  export type put_PlaylistsPlaylist_idfollowers = {
    method: "PUT";
    path: "/playlists/{playlist_id}/followers";
    parameters: {
      path: { playlist_id: string };

      body: Partial<{ public: boolean } & { string: any }>;
    };
    response: unknown;
  };
  export type get_PlaylistsPlaylist_idfollowerscontains = {
    method: "GET";
    path: "/playlists/{playlist_id}/followers/contains";
    parameters: {
      query: { ids: string };
      path: { playlist_id: string };
    };
    response: Array<boolean>;
  };
  export type get_PlaylistsPlaylist_idimages = {
    method: "GET";
    path: "/playlists/{playlist_id}/images";
    parameters: {
      path: { playlist_id: string };
    };
    response: Array<Schemas.ImageObject>;
  };
  export type put_PlaylistsPlaylist_idimages = {
    method: "PUT";
    path: "/playlists/{playlist_id}/images";
    parameters: {
      path: { playlist_id: string };
    };
    response: unknown;
  };
  export type delete_PlaylistsPlaylist_idtracks = {
    method: "DELETE";
    path: "/playlists/{playlist_id}/tracks";
    parameters: {
      path: { playlist_id: string };

      body: { snapshot_id?: string | undefined; tracks: Array<Partial<{ uri: string }>> };
    };
    response: Partial<{ snapshot_id: string }>;
  };
  export type get_PlaylistsPlaylist_idtracks = {
    method: "GET";
    path: "/playlists/{playlist_id}/tracks";
    parameters: {
      query: Partial<{ market: string; fields: string; limit: number; offset: number; additional_types: string }>;
      path: { playlist_id: string };
    };
    response: Schemas.PagingPlaylistTrackObject;
  };
  export type post_PlaylistsPlaylist_idtracks = {
    method: "POST";
    path: "/playlists/{playlist_id}/tracks";
    parameters: {
      query: Partial<{ position: number; uris: string }>;
      path: { playlist_id: string };

      body: Partial<{ position: number; uris: Array<string> } & { string: any }>;
    };
    response: Partial<{ snapshot_id: string }>;
  };
  export type put_PlaylistsPlaylist_idtracks = {
    method: "PUT";
    path: "/playlists/{playlist_id}/tracks";
    parameters: {
      query: Partial<{ uris: string }>;
      path: { playlist_id: string };

      body: Partial<
        {
          insert_before: number;
          range_length: number;
          range_start: number;
          snapshot_id: string;
          uris: Array<string>;
        } & { string: any }
      >;
    };
    response: Partial<{ snapshot_id: string }>;
  };
  export type get_Recommendations = {
    method: "GET";
    path: "/recommendations";
    parameters: {
      query: Partial<{
        limit: number;
        market: string;
        seed_artists: string;
        seed_genres: string;
        seed_tracks: string;
        min_acousticness: number;
        max_acousticness: number;
        target_acousticness: number;
        min_danceability: number;
        max_danceability: number;
        target_danceability: number;
        min_duration_ms: number;
        max_duration_ms: number;
        target_duration_ms: number;
        min_energy: number;
        max_energy: number;
        target_energy: number;
        min_instrumentalness: number;
        max_instrumentalness: number;
        target_instrumentalness: number;
        min_key: number;
        max_key: number;
        target_key: number;
        min_liveness: number;
        max_liveness: number;
        target_liveness: number;
        min_loudness: number;
        max_loudness: number;
        target_loudness: number;
        min_mode: number;
        max_mode: number;
        target_mode: number;
        min_popularity: number;
        max_popularity: number;
        target_popularity: number;
        min_speechiness: number;
        max_speechiness: number;
        target_speechiness: number;
        min_tempo: number;
        max_tempo: number;
        target_tempo: number;
        min_time_signature: number;
        max_time_signature: number;
        target_time_signature: number;
        min_valence: number;
        max_valence: number;
        target_valence: number;
      }>;
    };
    response: Schemas.RecommendationsObject;
  };
  export type get_RecommendationsavailableGenreSeeds = {
    method: "GET";
    path: "/recommendations/available-genre-seeds";
    parameters: never;
    response: { genres: Array<string> };
  };
  export type get_Search = {
    method: "GET";
    path: "/search";
    parameters: {
      query: {
        q: string;
        type: Array<"album" | "artist" | "playlist" | "track" | "show" | "episode" | "audiobook">;
        market: string;
        limit: number;
        offset: number;
        include_external: "audio";
      };
    };
    response: Partial<{
      albums: Schemas.PagingSimplifiedAlbumObject;
      artists: Schemas.PagingArtistObject;
      audiobooks: Schemas.PagingSimplifiedAudiobookObject;
      episodes: Schemas.PagingSimplifiedEpisodeObject;
      playlists: Schemas.PagingPlaylistObject;
      shows: Schemas.PagingSimplifiedShowObject;
      tracks: Schemas.PagingTrackObject;
    }>;
  };
  export type get_Shows = {
    method: "GET";
    path: "/shows";
    parameters: {
      query: { market: string; ids: string };
    };
    response: { shows: Array<Schemas.SimplifiedShowObject> };
  };
  export type get_ShowsId = {
    method: "GET";
    path: "/shows/{id}";
    parameters: {
      query: Partial<{ market: string }>;
      path: { id: string };
    };
    response: Schemas.ShowObject;
  };
  export type get_ShowsIdepisodes = {
    method: "GET";
    path: "/shows/{id}/episodes";
    parameters: {
      query: Partial<{ market: string; limit: number; offset: number }>;
      path: { id: string };
    };
    response: Schemas.PagingSimplifiedEpisodeObject;
  };
  export type get_Tracks = {
    method: "GET";
    path: "/tracks";
    parameters: {
      query: { market: string; ids: string };
    };
    response: { tracks: Array<Schemas.TrackObject> };
  };
  export type get_TracksId = {
    method: "GET";
    path: "/tracks/{id}";
    parameters: {
      query: Partial<{ market: string }>;
      path: { id: string };
    };
    response: Schemas.TrackObject;
  };
  export type get_UsersUser_id = {
    method: "GET";
    path: "/users/{user_id}";
    parameters: {
      path: { user_id: string };
    };
    response: Schemas.PublicUserObject;
  };
  export type get_UsersUser_idplaylists = {
    method: "GET";
    path: "/users/{user_id}/playlists";
    parameters: {
      query: Partial<{ limit: number; offset: number }>;
      path: { user_id: string };
    };
    response: Schemas.PagingPlaylistObject;
  };
  export type post_UsersUser_idplaylists = {
    method: "POST";
    path: "/users/{user_id}/playlists";
    parameters: {
      path: { user_id: string };

      body: {
        collaborative?: boolean | undefined;
        description?: string | undefined;
        name: string;
        public?: boolean | undefined;
      } & { string: any };
    };
    response: Schemas.PlaylistObject;
  };

  // </Endpoints>
}

// <EndpointByMethod>
export type EndpointByMethod = {
  get: {
    "/albums": Endpoints.get_Albums;
    "/albums/{id}": Endpoints.get_AlbumsId;
    "/albums/{id}/tracks": Endpoints.get_AlbumsIdtracks;
    "/artists": Endpoints.get_Artists;
    "/artists/{id}": Endpoints.get_ArtistsId;
    "/artists/{id}/albums": Endpoints.get_ArtistsIdalbums;
    "/artists/{id}/related-artists": Endpoints.get_ArtistsIdrelatedArtists;
    "/artists/{id}/top-tracks": Endpoints.get_ArtistsIdtopTracks;
    "/audio-analysis/{id}": Endpoints.get_AudioAnalysisId;
    "/audio-features": Endpoints.get_AudioFeatures;
    "/audio-features/{id}": Endpoints.get_AudioFeaturesId;
    "/audiobooks": Endpoints.get_Audiobooks;
    "/audiobooks/{id}": Endpoints.get_AudiobooksId;
    "/audiobooks/{id}/chapters": Endpoints.get_AudiobooksIdchapters;
    "/browse/categories": Endpoints.get_Browsecategories;
    "/browse/categories/{category_id}": Endpoints.get_BrowsecategoriesCategory_id;
    "/browse/categories/{category_id}/playlists": Endpoints.get_BrowsecategoriesCategory_idplaylists;
    "/browse/featured-playlists": Endpoints.get_BrowsefeaturedPlaylists;
    "/browse/new-releases": Endpoints.get_BrowsenewReleases;
    "/chapters": Endpoints.get_Chapters;
    "/chapters/{id}": Endpoints.get_ChaptersId;
    "/episodes": Endpoints.get_Episodes;
    "/episodes/{id}": Endpoints.get_EpisodesId;
    "/markets": Endpoints.get_Markets;
    "/me": Endpoints.get_Me;
    "/me/albums": Endpoints.get_Mealbums;
    "/me/albums/contains": Endpoints.get_Mealbumscontains;
    "/me/audiobooks": Endpoints.get_Meaudiobooks;
    "/me/audiobooks/contains": Endpoints.get_Meaudiobookscontains;
    "/me/episodes": Endpoints.get_Meepisodes;
    "/me/episodes/contains": Endpoints.get_Meepisodescontains;
    "/me/following": Endpoints.get_Mefollowing;
    "/me/following/contains": Endpoints.get_Mefollowingcontains;
    "/me/player": Endpoints.get_Meplayer;
    "/me/player/currently-playing": Endpoints.get_MeplayercurrentlyPlaying;
    "/me/player/devices": Endpoints.get_Meplayerdevices;
    "/me/player/queue": Endpoints.get_Meplayerqueue;
    "/me/player/recently-played": Endpoints.get_MeplayerrecentlyPlayed;
    "/me/playlists": Endpoints.get_Meplaylists;
    "/me/shows": Endpoints.get_Meshows;
    "/me/shows/contains": Endpoints.get_Meshowscontains;
    "/me/top/artists": Endpoints.get_Metopartists;
    "/me/top/tracks": Endpoints.get_Metoptracks;
    "/me/tracks": Endpoints.get_Metracks;
    "/me/tracks/contains": Endpoints.get_Metrackscontains;
    "/playlists/{playlist_id}": Endpoints.get_PlaylistsPlaylist_id;
    "/playlists/{playlist_id}/followers/contains": Endpoints.get_PlaylistsPlaylist_idfollowerscontains;
    "/playlists/{playlist_id}/images": Endpoints.get_PlaylistsPlaylist_idimages;
    "/playlists/{playlist_id}/tracks": Endpoints.get_PlaylistsPlaylist_idtracks;
    "/recommendations": Endpoints.get_Recommendations;
    "/recommendations/available-genre-seeds": Endpoints.get_RecommendationsavailableGenreSeeds;
    "/search": Endpoints.get_Search;
    "/shows": Endpoints.get_Shows;
    "/shows/{id}": Endpoints.get_ShowsId;
    "/shows/{id}/episodes": Endpoints.get_ShowsIdepisodes;
    "/tracks": Endpoints.get_Tracks;
    "/tracks/{id}": Endpoints.get_TracksId;
    "/users/{user_id}": Endpoints.get_UsersUser_id;
    "/users/{user_id}/playlists": Endpoints.get_UsersUser_idplaylists;
  };
  delete: {
    "/me/albums": Endpoints.delete_Mealbums;
    "/me/audiobooks": Endpoints.delete_Meaudiobooks;
    "/me/episodes": Endpoints.delete_Meepisodes;
    "/me/following": Endpoints.delete_Mefollowing;
    "/me/shows": Endpoints.delete_Meshows;
    "/me/tracks": Endpoints.delete_Metracks;
    "/playlists/{playlist_id}/followers": Endpoints.delete_PlaylistsPlaylist_idfollowers;
    "/playlists/{playlist_id}/tracks": Endpoints.delete_PlaylistsPlaylist_idtracks;
  };
  put: {
    "/me/albums": Endpoints.put_Mealbums;
    "/me/audiobooks": Endpoints.put_Meaudiobooks;
    "/me/episodes": Endpoints.put_Meepisodes;
    "/me/following": Endpoints.put_Mefollowing;
    "/me/player": Endpoints.put_Meplayer;
    "/me/player/pause": Endpoints.put_Meplayerpause;
    "/me/player/play": Endpoints.put_Meplayerplay;
    "/me/player/repeat": Endpoints.put_Meplayerrepeat;
    "/me/player/seek": Endpoints.put_Meplayerseek;
    "/me/player/shuffle": Endpoints.put_Meplayershuffle;
    "/me/player/volume": Endpoints.put_Meplayervolume;
    "/me/shows": Endpoints.put_Meshows;
    "/me/tracks": Endpoints.put_Metracks;
    "/playlists/{playlist_id}": Endpoints.put_PlaylistsPlaylist_id;
    "/playlists/{playlist_id}/followers": Endpoints.put_PlaylistsPlaylist_idfollowers;
    "/playlists/{playlist_id}/images": Endpoints.put_PlaylistsPlaylist_idimages;
    "/playlists/{playlist_id}/tracks": Endpoints.put_PlaylistsPlaylist_idtracks;
  };
  post: {
    "/me/player/next": Endpoints.post_Meplayernext;
    "/me/player/previous": Endpoints.post_Meplayerprevious;
    "/me/player/queue": Endpoints.post_Meplayerqueue;
    "/playlists/{playlist_id}/tracks": Endpoints.post_PlaylistsPlaylist_idtracks;
    "/users/{user_id}/playlists": Endpoints.post_UsersUser_idplaylists;
  };
};

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
    ...params: MaybeOptionalArg<TEndpoint["parameters"]>
  ): Promise<TEndpoint["response"]> {
    return this.fetcher("get", this.baseUrl + path, params[0]);
  }
  // </ApiClient.get>

  // <ApiClient.delete>
  delete<Path extends keyof DeleteEndpoints, TEndpoint extends DeleteEndpoints[Path]>(
    path: Path,
    ...params: MaybeOptionalArg<TEndpoint["parameters"]>
  ): Promise<TEndpoint["response"]> {
    return this.fetcher("delete", this.baseUrl + path, params[0]);
  }
  // </ApiClient.delete>

  // <ApiClient.put>
  put<Path extends keyof PutEndpoints, TEndpoint extends PutEndpoints[Path]>(
    path: Path,
    ...params: MaybeOptionalArg<TEndpoint["parameters"]>
  ): Promise<TEndpoint["response"]> {
    return this.fetcher("put", this.baseUrl + path, params[0]);
  }
  // </ApiClient.put>

  // <ApiClient.post>
  post<Path extends keyof PostEndpoints, TEndpoint extends PostEndpoints[Path]>(
    path: Path,
    ...params: MaybeOptionalArg<TEndpoint["parameters"]>
  ): Promise<TEndpoint["response"]> {
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
