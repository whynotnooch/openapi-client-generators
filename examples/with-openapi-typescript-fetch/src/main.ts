import { Fetcher } from "openapi-typescript-fetch";
import { paths } from "./generated/spotify";

async function main() {
  const fetcher = Fetcher.for<paths>();
  fetcher.configure({
    baseUrl: "http://localhost:5678",
  });

  const findPlaylistsByUser = fetcher
    .path("/users/{user_id}/playlists")
    .method("get")
    .create();

  const getTracksByPlaylist = fetcher
    .path("/playlists/{playlist_id}/tracks")
    .method("get")
    .create();

  const { data: playlists } = await findPlaylistsByUser({
    limit: 1,
    user_id: "abc123",
  });

  if (!playlists?.items?.length) {
    return;
  }

  console.log(`${playlists.items[0].name}`);

  const { data: tracks } = await getTracksByPlaylist({
    playlist_id: playlists.items[0].id!,
  });

  console.log(`${tracks?.total} tracks`);
  console.log(tracks?.items?.map((t) => t.track?.name));
}

main();
