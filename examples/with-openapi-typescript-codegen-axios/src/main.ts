import { ApiClient } from "./generated/spotify";

async function main() {
  const client = new ApiClient({
    BASE: "http://localhost:5678",
  });

  const playlists = await client.users.getListUsersPlaylists("123abc", 1);

  if (!playlists?.items?.length) {
    return;
  }

  console.log(`${playlists.items[0].name}`);

  const tracks = await client.tracks.getPlaylistsTracks(playlists.items[0].id!);

  console.log(`${tracks?.total} tracks`);
  console.log(tracks?.items?.map((t) => t.track?.name));
}

main();
