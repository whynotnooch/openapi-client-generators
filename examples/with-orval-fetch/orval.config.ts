export default {
  spotify: {
    input: "../../src/spotify-openapi.yaml",
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
