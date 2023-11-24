import { getListUsersPlaylists, getPlaylistsTracks } from "./generated/spotify";
import * as SpotifyAPI from "./generated/spotify";

async function main() {
  const userPlaylistsResponse = await getListUsersPlaylists("abc123", {
    limit: 1,
  });

  if (!userPlaylistsResponse.items?.length) {
    return;
  }

  console.log(`${userPlaylistsResponse.items[0].name}`);

  const tracksResponse = await getPlaylistsTracks(
    userPlaylistsResponse.items[0].id!
  );

  console.log(`${tracksResponse.total} tracks`);
  console.log(tracksResponse?.items?.map((t) => t.track?.name));
}

main();

// This highlights how tree-shaking works:
Object.values(SpotifyAPI).forEach((x) => {
  console.log(x);
});
