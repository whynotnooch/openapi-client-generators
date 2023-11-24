import axios from "axios";
import { getListUsersPlaylists, getPlaylistsTracks } from "./generated/spotify";
import * as SpotifyAPI from "./generated/spotify";

axios.defaults.baseURL = "http://localhost:5678";

async function main() {
  const { data: playlists } = await getListUsersPlaylists("abc123", {
    limit: 1,
  });

  if (!playlists?.items?.length) {
    return;
  }

  console.log(`${playlists.items[0].name}`);

  const { data: tracks } = await getPlaylistsTracks(playlists.items[0].id!);

  console.log(`${tracks?.total} tracks`);
  console.log(tracks?.items?.map((t) => t.track?.name));
}

main();

// This highlights how tree-shaking works:
Object.values(SpotifyAPI).forEach((x) => {
  console.log(x);
});
