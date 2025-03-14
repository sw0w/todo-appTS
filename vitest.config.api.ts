import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/server/**/*.test.ts"],
    globals: true,
    coverage: {
      provider: "istanbul",
      reporter: ["text", "json", "html"],
    },
  },
});
