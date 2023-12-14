import { createSdk } from "./generated/spotify";

async function main() {
  const client = createSdk({
    address: "http://localhost:5678",
  });

  client["get-list-users-playlists"]({
    params: {
      user_id: "abc123",
      limit: 1,
    },
  });
  const { code: c1, data: playlists } = await client[
    "get-list-users-playlists"
  ]({
    params: {
      user_id: "abc123",
      limit: 1,
    },
  });

  if (c1 !== 200) {
    return;
  }

  if (!playlists.items?.length) {
    return;
  }

  console.log(`${playlists.items[0].name}`);

  const { code: c2, data: tracks } = await client["get-playlists-tracks"]({
    params: {
      playlist_id: playlists.items[0].id!,
    },
  });

  if (c2 !== 200) {
    return;
  }

  console.log(`${tracks?.total} tracks`);
  console.log(tracks?.items?.map((t) => t.track?.name));
}

main();
