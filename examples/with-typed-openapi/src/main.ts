import { EndpointParameters, Method } from "./generated/spotify";
import { createApiClient } from "./generated/spotify";

const fetcher = (method: Method, url: string, params?: EndpointParameters) => {
  // This is the most basic fetcher but note that with v0.3.0, this is not enough as the
  // path params and query params are not being automatically replaced:
  // https://github.com/astahmer/typed-openapi/issues/19
  return fetch(url, { method, body: JSON.stringify(params) }).then((res) =>
    res.json()
  );
};

async function main() {
  const client = createApiClient(fetcher, "http://localhost:5678");

  const playlists = await client.get("/users/{user_id}/playlists", {
    path: {
      user_id: "abc123",
    },
    query: {
      limit: 1,
    },
  });

  if (!playlists.items?.length) {
    return;
  }

  console.log(`${playlists.items[0].name}`);

  const tracks = await client.get("/playlists/{playlist_id}/tracks", {
    path: {
      playlist_id: playlists.items[0].id!,
    },
    query: {},
  });

  console.log(`${tracks?.total} tracks`);
  console.log(tracks?.items?.map((t) => t.track?.name));
}

main();
