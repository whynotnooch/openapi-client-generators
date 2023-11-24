import { createClient, type NormalizeOAS } from "fets";
import type openapi from "./generated/spotify-openapi";

async function main() {
  const client = createClient<NormalizeOAS<typeof openapi>>({
    endpoint: "https://api.spotify.com/v1",
  });

  const userPlaylistResponse = await client["/users/{user_id}/playlists"].get({
    headers: {
      Authorization: "Bearer xyz",
    },
    params: {
      user_id: "123abc",
    },
    query: { limit: 1 },
  });

  if (!userPlaylistResponse.ok) {
    return;
  }

  const playlists = await userPlaylistResponse.json();
  if (!playlists?.items?.length) {
    return;
  }

  console.log(`${playlists.items[0].name}`);

  const playlistTracksResponse = await client[
    "/playlists/{playlist_id}/tracks"
  ].get({
    headers: {
      Authorization: "Bearer xyz",
    },
    params: {
      playlist_id: playlists.items[0].id!,
    },
  });
  if (!playlistTracksResponse.ok) {
    return;
  }

  const tracks = await playlistTracksResponse.json();

  console.log(`${tracks?.total} tracks`);
  console.log(tracks?.items?.map((t) => t.track?.name));
}

main();
