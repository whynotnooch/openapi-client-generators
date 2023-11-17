import * as SpotifyAPI from "./generated/spotify";

async function main() {
  const playlistClient = new SpotifyAPI.PlaylistsApi();
  const { data: playlists } = await playlistClient.getListUsersPlaylists(
    "abc123",
    1
  );

  if (!playlists.items.length) {
    return;
  }

  console.log(`${playlists.items[0].name}`);

  // const tracksClient = new SpotifyAPI.TracksApi();
  // const { data: tracks } = await tracksClient.getPlaylistsTracks(
  //   playlists.items[0].id!
  // );

  // console.log(`${tracks?.total} tracks`);
  // console.log(tracks?.items?.map((t) => t.track?.name));
}

main();

// This highlights how tree-shaking works (or only partially works):
console.log({
  AlbumApi: SpotifyAPI.AlbumsApi,
  ArtistsApi: SpotifyAPI.ArtistsApi,
  AudiobooksApi: SpotifyAPI.AudiobooksApi,
  CategoriesApi: SpotifyAPI.CategoriesApi,
  ChaptersApi: SpotifyAPI.ChaptersApi,
  EpisodesApi: SpotifyAPI.EpisodesApi,
  GenresApi: SpotifyAPI.GenresApi,
  LibraryApi: SpotifyAPI.LibraryApi,
  MarketsApi: SpotifyAPI.MarketsApi,
  PlayerApi: SpotifyAPI.PlayerApi,
  PlaylistsApi: SpotifyAPI.PlaylistsApi,
  SearchApi: SpotifyAPI.SearchApi,
  ShowsApi: SpotifyAPI.ShowsApi,
  TracksApi: SpotifyAPI.TracksApi,
  UsersApi: SpotifyAPI.UsersApi,
});
