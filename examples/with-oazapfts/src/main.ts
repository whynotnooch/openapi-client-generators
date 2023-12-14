import {
  TrackObject,
  getPlaylistsByPlaylistIdTracks,
  getUsersByUserIdPlaylists,
} from "./generated/spotify";
// import * as SpotifyAPI from "./generated/spotify";

async function main() {
  const playlistsResponse = await getUsersByUserIdPlaylists("abc123", {
    limit: 1,
  });
  if (playlistsResponse.status !== 200) {
    return;
  }

  const playlists = playlistsResponse.data;
  if (!playlists.items?.length) {
    return;
  }

  console.log(`${playlists.items[0].name}`);

  const tracksResponse = await getPlaylistsByPlaylistIdTracks(
    playlists.items[0].id!
  );
  if (tracksResponse.status !== 200) {
    return;
  }

  const tracks = tracksResponse.data;
  console.log(`${tracks?.total} tracks`);
  console.log(
    tracks?.items?.map((t) => {
      // oneOf is not generated correctly:
      // https://github.com/oazapfts/oazapfts/pull/503#issuecomment-1828480622
      const track = t.track as unknown as TrackObject;

      return track.name;
    })
  );
}

console.log({
  // SpotifyAPI,
});

main();
