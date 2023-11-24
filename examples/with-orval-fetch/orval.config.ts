export default {
  spotify: {
    input:
      "https://raw.githubusercontent.com/APIs-guru/openapi-directory/main/APIs/spotify.com/sonallux/2023.2.27/openapi.yaml",
    output: {
      override: {
        mutator: {
          path: "./src/custom-instance.ts",
          name: "customInstance",
        },
      },
      target: "./src/generated/spotify.ts",
    },
  },
};
