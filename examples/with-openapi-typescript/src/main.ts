import createClient from "openapi-fetch";
import { paths } from "./generated/spotify";

async function main() {
  const { GET } = createClient<paths>();

  const { data: playlists } = await GET("/users/{user_id}/playlists", {
    params: {
      path: {
        user_id: "abc123",
      },
      query: {
        limit: 1,
      },
    },
  });

  if (!playlists?.items?.length) {
    return;
  }

  console.log(`${playlists.items[0].name}`);

  const { data: tracks } = await GET("/playlists/{playlist_id}/tracks", {
    params: {
      path: { playlist_id: playlists.items[0].id! },
    },
  });

  console.log(`${tracks?.total} tracks`);
  console.log(tracks?.items?.map((t) => t.track?.name));
}

main();
